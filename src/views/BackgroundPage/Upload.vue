<script setup>
import ossUtil from '@/api/admin/oss'
import { ref, onMounted, watch } from 'vue';
import { ElMessage } from 'element-plus';
onMounted(() => {
  fetchDirectory();
})
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


const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const directory = ref([]);
const filepath = ref([]);
const selectDirectory = ref([]);
const fileList = ref([]);

//移除当前上传的文件
const handleRemove = (uploadFile, uploadFiles) => {

};

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};

const fetchDirectory = () => {
  ossUtil.getDirectory()
    .then(response => {
      const data = response.data.data;
      directory.value = data;
    })
    .catch(error => {

    });
};


//获取指定路径的所有文件地址
const getFilePage = () => {
  if (selectDirectory.value !== '') {
    ossUtil.paging(selectDirectory.value, current.value, size.value)
      .then(response => {
        ElMessage({
          message: response.data.msg,
          type: 'success',
        });
        const { total: newTotal, pages: newPages, data } = response.data.data;
        total.value = newTotal;
        pages.value = newPages;
        filepath.value = data[current.value];
      })
      .catch(error => {

      });
  } else {
    ElMessage({
      message: '请选择一个目录',
      type: 'warning',
    });
  }
};
//删除指定文件
const handleDelete = (relativePath) => {
  ossUtil.delete(relativePath)
    .then(res => {
      ElMessage({
        message: res.data.msg,
        type: 'success',
      });
      getFilePage()
    });
};

const handleSizeChange = (val) => {
  size.value = val;
  getFilePage()
};

const handleCurrentChange = (val) => {
  current.value = val;
  getFilePage()
};

const upload = () => {
  if (selectDirectory.value !== '') {
    if (fileList.value.length > 0) {
      const formData = new FormData();
      for (const file of fileList.value) {
        formData.append('files', file.raw);
      }
      formData.append('path', selectDirectory.value);
      ossUtil.uploadFile(formData)
        .then(res => {
          ElMessage({
            message: res.data.msg,
            type: 'success',
          });
          fileList.value = [];
        });
    } else {
      ElMessage({
        message: '请选择上传文件',
        type: 'warning',
      });
    }
  } else {
    ElMessage({
      message: '请选择一个目录',
      type: 'warning',
    });
  }
};
//当选择的文件目录发生变化时 自动查询新目录的所有文件
watch(selectDirectory, (newValue, oldValue) => {
  getFilePage(newValue)
});

</script>


<template>
  <div class="main">
    <div class="search">
      <el-button @click="upload">上传到当前目录</el-button>
      <el-select v-model="selectDirectory" placeholder="请选择文件目录">
        <el-option v-for="item in directory" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-upload v-model:file-list="fileList" list-type="picture-card" :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove" :multiple="true" accept="image/*" :auto-upload="false" :drag="true">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img  :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
    <div class="fileinfo">
      <el-table :data="filepath" stripe style="width: 100%">
        <el-table-column prop="id" label="id" width="180">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="180">
        </el-table-column>
        <el-table-column prop="lastModified" label="最后修改时间">
        </el-table-column>
        <el-table-column label="显示">
          <template #default="scope">
            <el-image :src="scope.row.path" lazy style="height: 100px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="danger" @click="handleDelete(scope.row.relativePath)">删除</el-button>
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
  </div>
</template>

<style lang="less" scoped>
.main {
  height: 80vh;

  .fileinfo {
    margin-top: 50px;
    height: 60vh;
    overflow-y: auto;
  }
}
</style>