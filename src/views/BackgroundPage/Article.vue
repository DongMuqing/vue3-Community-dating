<script setup>
import getarticles from '@/api/admin/article'
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from "vue-router"
import { articleContentStore } from '@/store/admin/article'

const articlesStore = articleContentStore()
onMounted(() => {
  getArticle();
});
const router = useRouter()
const article = ref({
  cover: '',
  title: '',
  content: '',
});

const Releasetime = ref({
  date: '',
  time: '',
});
const articles = ref([]);
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


const flush = () => {
  getArticle();
};

const goPublish = () => {
  router.push('/main/publish');
};

const handleSizeChange = (val) => {
  size.value = val;
  getArticle();
};

const handleCurrentChange = (val) => {
  current.value = val;
  getArticle();
};
//获取
const getArticle = () => {
  getarticles.getArticleByUser(current.value, size.value)
    .then(res => {
      const { msg } = res.data;
      const { total:newTotal, pages:newPages, data } = res.data.data;
      articles.value = data;
      total.value =newTotal;
      pages.value = newPages;
       //文章数据存入pinia
      articlesStore.setArticles(articles.value)
      ElMessage({
        message: msg,
        type: 'success',
      });
    });
};
//删除
const handleDelete = (id) => {
  getarticles.delById(id)
    .then(res => {
      ElMessage({
        message: res.data.msg,
        type: 'success',
      });
      getArticle();
    });
};
//文章详情
const handleInfo=(id)=>{
  articlesStore.setId(id)
  router.push("/main/articles")
}

</script>


<template>
  <div class="main">
    <el-button type="" @click="flush" >刷 新</el-button>
    <el-button type="" @click="goPublish">去发布</el-button>
    <div class="info">

      <el-table :data="articles" style="width: 100%">
      
        <el-table-column label="文章ID" prop="id"></el-table-column>
        <el-table-column label="封面">
          <template  #default="scope">
            <el-avatar :src="scope.row.cover"></el-avatar>
          </template>
        </el-table-column>

        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="操作">
          <template  #default="scope">
            <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            <el-button size="small" type="primary" @click="handleInfo(scope.row.id)">详情</el-button>
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
 

  .info {
    .el-table {
      overflow-y: hidden;
    }
  }

  #vditor {
    margin-left: 30vw;
    margin-top: 20px;
  }
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
</style>