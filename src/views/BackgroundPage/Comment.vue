<script setup>
import comments from '@/api/admin/comment';
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

const Comments = ref([]);
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

const id = ref('');
const roleFlag = ref('');
const fetchComments = () => {
  comments.getComments(current.value, size.value)
    .then(res => {
      const { msg } = res.data;
      const { total:newTotal, pages:newPages, data } = res.data.data;
      Comments.value = data;
      total.value = newTotal;
      pages.value = newPages;
      ElMessage({
        message: msg,
        type: 'success',
      });
    })
    .catch(error => {
      // Handle errors
    });
};

const deleteComment = (id) => {
  comments.delComments(id)
    .then(res => {
      ElMessage({
        message: res.data.msg,
        type: 'success',
      });
      fetchComments();
    })
    .catch(error => {
    });
};

const handleSizeChange = (val) => {
  size.value = val;
  fetchComments();
};

const handleCurrentChange = (val) => {
  current.value = val;
  fetchComments();
};



onMounted(() => {
  fetchComments();
 
});
</script>


<template>
    <div>
        <div class="main">
            <div class="info">
                <el-table :data="Comments" style="width: 100%">
                    <el-table-column label="评论id" prop="commentId"></el-table-column>
                    <el-table-column label="动态ID" prop="postId"></el-table-column>
                    <el-table-column label="日期" prop="createTime"></el-table-column>

                    <el-table-column label="头像" prop="avatar">
                        <template  #default="scope">
                            <el-avatar :src="scope.row.avatar"></el-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column label="内容" prop="content"></el-table-column>

                    <el-table-column label="评论时间" prop="createTime">
                        <template  #default="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="地址" prop="address"></el-table-column>
                    <el-table-column label="操作" >
                        <template #default="scope">
                            <el-button size="small" type="danger" @click="deleteComment(scope.row.commentId)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
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
    overflow-y: auto;

    .info {
        .el-table {
            overflow-y: hidden;
        }
    }
}
</style>