<script setup>
import visInfo from '@/api/admin/visitorInfo';
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from "vue-router"

const router = useRouter()
const  VisitorInfo=ref([])
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
const fetchVisitorInfo = () => {
  visInfo.VisitorInfo(current.value, size.value)
    .then(response => {
      const data = response.data.data.data;
      VisitorInfo.value = data;
      total.value = response.data.data.total;
      pages.value = response.data.data.pages;
      ElMessage({
        message: response.data.msg,
        type: 'success',
      });
    })
    .catch(error => {
    });
};

const handleSizeChange = (val) => {
  size.value = val;
  fetchVisitorInfo();
};

const handleCurrentChange = (val) => {
  current.value = val;
  fetchVisitorInfo();
};

onMounted(() => {
  fetchVisitorInfo();
});
</script>

<template>
  <div>
    <div class="main">
      <div class="info">
        <el-table :data="VisitorInfo" style="width: 100%">
          <el-table-column prop="accessTime" label="时间">
          </el-table-column>

          <el-table-column prop="ip" label="ip">
          </el-table-column>

          <el-table-column prop="address" label="地址">
          </el-table-column>
          <el-table-column prop="clientType" label="浏览设备">
          </el-table-column>
          <el-table-column prop="os" label="操作系统">
          </el-table-column>
          <el-table-column prop="browser" label="浏览器">
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