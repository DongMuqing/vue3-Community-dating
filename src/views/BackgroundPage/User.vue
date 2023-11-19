<script setup>
import users from '@/api/admin/user';
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
onMounted(() => {
  fetchUserInfo();
})
const userInfo = ref([]);
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

const options = ref([
  { value: '管理员' },
  { value: '用户' },
]);

const value = ref('');
const user = ref({
  id: '',
  role: '',
});
const fetchUserInfo = () => {
  users.pagingUserInfo(current.value, size.value)
    .then(res => {
      const { msg } = res.data;
      const { total: newTotal, pages: newPages, data } = res.data.data;
      userInfo.value = data;
      total.value = newTotal;
      pages.value = newPages;
      ElMessage({
        message: msg,
        type: 'success',
      });
    })
    .catch(error => {
    });
};

const editRole = (id, role) => {
  user.value.id = id;
  user.value.role = role;
  users.editRole(user.value)
    .then(res => {
      const { msg } = res.data;
      ElMessage({
        message: msg,
        type: 'success',
      });
    });
};

const deleteUser = (id) => {
  users.deleteById(id)
    .then(res => {
      const { msg } = res.data;
      fetchUserInfo();
      ElMessage({
        message: msg,
        type: 'success',
      });
    });
};

const handleSizeChange = (val) => {
  size.value = val;
  fetchUserInfo();
};

const handleCurrentChange = (val) => {
  current.value = val;
  fetchUserInfo();
};



</script>


<template>
  <div>
    <div class="main">
      <div class="info">
        <el-table :data="userInfo" style="width: 100%">

          <el-table-column prop="id" label="id">
          </el-table-column>

          <el-table-column prop="avatar" label="头像">
            <template #default="scope">
              <el-avatar :src="scope.row.avatar"></el-avatar>
            </template>
          </el-table-column>

          <el-table-column prop="username" label="用户名">
          </el-table-column>

          <el-table-column prop="email" label="用户名">
          </el-table-column>

          <el-table-column prop="loginTime" label="上次登录时间">
            <template #default="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.loginTime }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="role" label="角色">
            <template #default="scope">
              <el-select v-model="scope.row.role" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="editRole(scope.row.id, scope.row.role)">修改角色</el-button>
              <el-button size="small" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
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