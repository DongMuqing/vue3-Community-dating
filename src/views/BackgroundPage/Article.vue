<script setup>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import getarticles from '@/api/admin/article'
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from "vue-router"

const router = useRouter()

const contentEditor = ref('');
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

const createEditor = () => {
  contentEditor.value = new Vditor('vditor', {
    height: 660,
    icon: 'material',
    placeholder: '开始编辑',
    toolbarConfig: {
      pin: true,
    },
    cache: {
      after(text) {},
    },
    counter: {
      enable: true,
    },
    resize: {
      enable: true,
      position: 'bottom',
    },
  });
};
// 提交
const submitForm = () => {
  formatDate();
  const value = contentEditor.value.getValue();
  article.content = value;
  if (value.length === 1 || value == null || value === '') {
    ElMessage({
      message: '不可以为空！',
      type: 'warning',
    });
  } else {
    getarticles.value.addArticles(article)
      .then(response => {
        ElMessage({
          message: response.data.msg,
          type: 'success',
        });
        contentEditor.value.setValue('');
        const newEmptyArticle = {
          cover: '',
          title: '',
          content: '',
          createTime: '',
        };
        Object.assign(article, newEmptyArticle);
      })
      .catch(error => {

      });
  }
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

const formatDate = () => {
  Releasetime.date = formaDate(Releasetime.date);
  Releasetime.time = formaTime(Releasetime.time);
  article.createTime = Releasetime.date + ' ' + Releasetime.time;
  Releasetime.date = '';
  Releasetime.time = '';
};

onMounted(() => {
  createEditor();
  getArticle();
});
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
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            <el-button size="small" type="primary" @click="handleInfo(scope.row.content)">详情</el-button>
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