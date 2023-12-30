<script setup>
import { ref, onMounted } from 'vue';
import getPost from '@/api/admin/post';
import { uploadPostImage } from '@/utils/upload';
import { ElMessage } from 'element-plus';
onMounted(() => {
  fetchDynamics();
})


const post = ref([]);
//分页相关属性
//总条数
const total = ref(0);
//总页数
const pages = ref(0);
//页大小
const size = ref(10);
//第几页
const current = ref(1);
//是否为分页按钮添加背景色
const background = ref(true)
// 是否禁用分页
const disabled = ref(false)

//打开dialog对话框
const centerDialogVisible = ref(false)

//提交的post数据
const posts = ref({
  title: '',
  content: '',
  imgSrcList: ''
});
const formLabelWidth = ref('120px')
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
//移除当前上传的文件
const handleRemove = (uploadFile, uploadFiles) => {

};

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};

const fileList = ref([]);

const fetchDynamics = () => {
  getPost.postPage(current.value, size.value)
    .then(response => {
      const { total: newTotal, pages: newPages, data } = response.data.data;
      total.value = newTotal;
      pages.value = newPages;
      data.forEach(post => {
        post.imgSrcList = post.imgSrcList.split(",").map(item => item.trim().replace(/'/g, ''));
      });
      post.value = data;
    })
    .catch(error => {
    });
};

const submitPost = async () => {
  try {
    if (posts.value.title !== '' && posts.value.content !== '' && fileList.value.length > 0) {
      const imgUrl = await uploadPostImage(fileList.value);
      posts.value.imgSrcList = imgUrl;
      getPost.submitPost(posts.value)
        .then(res => {
          ElMessage({
            message: res.data.msg,
            type: 'success'
          });
          fetchDynamics();
          const newEmptyPosts = {
            title: '',
            content: '',
            imgSrcList: ''
          };
          fileList.value = [];
          posts.value = newEmptyPosts;
        })
        .catch(error => {
          ElMessage.error(error);
        });
    }else if(fileList.length>9){
      ElMessage({
        message: '最多只能上传九张图片！',
        type: 'warning'
      });
    } 
    else {
      ElMessage({
        message: '请输入必要数据或选择上传图片！',
        type: 'warning'
      });
    }
  } catch (error) {
    ElMessage.error('提交失败', error);
  }
};
const handleSizeChange = (val) => {
  size.value = val;
  fetchDynamics();
};

const handleCurrentChange = (val) => {
  current.value = val;
  fetchDynamics();
};

const handleDelete = (id) => {
  getPost.delPost(id)
    .then(res => {
      ElMessage({
        message: res.data.msg,
        type: 'success'
      });
      fetchDynamics();
    })
    .catch(error => {
    });
};


</script>
<template>
  <div class="main">
    <div class="publish"><el-button @click="centerDialogVisible = true">去发布</el-button></div>
    <div class="info">
      <!-- 详情 -->
      <el-table :data="post" style="width: 100%">

        <el-table-column type="expand">
          <template #default="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="id">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="日期">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="标题">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="内容">
                <span>{{ props.row.content }}</span>
              </el-form-item>
              <el-form-item label="发布地点">
                <span>{{ props.row.location }}</span>
              </el-form-item>
              <el-form-item label="点赞数">
                <span>{{ props.row.upvoteNum }}</span>
              </el-form-item>
              <el-form-item label="图片">
                <!-- <span>{{ props.row.imgSrclist }}</span> -->
                <div class="demo-image__preview">
                  <template v-for="(src, index) in props.row.imgSrcList" class="test">
                    <el-image :src="src" :preview-src-list="post.imgSrcList" lazy>
                    </el-image>
                  </template>
                </div>
              </el-form-item>

            </el-form>
          </template>
        </el-table-column>

        <!-- 外层数据 -->
        <el-table-column label="动态ID" prop="id"></el-table-column>
        <el-table-column label="日期" prop="createTime"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="demo-pagination-block">
      <!-- 默认第一页 每页10条 -->
      <el-pagination v-model:current-page="current" v-model:page-size="size" :page-sizes="[10, 20, 50, 100]"
        :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>


    <!-- 提交post dialog -->
    <div>
      <el-dialog title="动态内容" v-model="centerDialogVisible" width="50%" align-center>
        <el-form>
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="posts.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="posts.content"></el-input>
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitPost">
              提交
            </el-button>
          </span>
        </template>
        <!-- 图片上传 -->

        <el-upload v-model:file-list="fileList" tip="请上传图片,不超过九张！" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :multiple="true" accept="image/*"
          :auto-upload="false" :limit="9" :drag="true" >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>

      </el-dialog>
    </div>
  </div>
</template>



<style lang="less" scoped>
.main {
  height: 80vh;
  overflow-y: visible;

  .publish {
    float: right;
  }

  .el-table {
    .demo-table-expand {
      font-size: 0;

      .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;

        label {
          width: 90px;
          color: #99a9bf;
          font-size: 18px;
        }

        span {
          font-size: 16px;
        }

        .demo-image__preview {
          width: 100%;

          .el-image {
            width: 108px;
            height: 108px;
            margin-right: 10px;
            margin-top: 20px;
            border-radius: 15% 15%;
          }
        }
      }
    }
  }
}
</style>