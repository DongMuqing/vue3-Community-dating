<script setup>
import 'vditor/dist/index.css'
import getarticles from '@/api/open/article';
import { useRouter } from "vue-router"
import { ref,computed } from 'vue'
import { useArticlesStore } from '@/store/index';
const articlesStore = useArticlesStore();


//路由
const router = useRouter();
const articles = ref([])
// 最大显示长度
const maxLength = ref(40)
const fetchArticles = () => {
  getarticles.getArticles()
    .then(response => {
      // 处理接口返回的数据
      articles.value = response.data.data;
        // 调用 action 存入 Pinia
        articlesStore.setArticles(articles.value);
    })
    .catch(error => {
      // 处理错误
    });
}
fetchArticles()
const handleWork = (row) => {
  // 存入 Pinia   当前文章的index唯一标识
  articlesStore.setId(row);
  router.push({
    name: 'article',
    params: {
    id: row,
  },
  })
}
const truncatedArticle = (index) => {
  const article = articles.value[index];
  if (article.content.length > maxLength.value) {
    return article.content.slice(0, maxLength.value) + "...";
  } else {
    return article.content;
  }
}


</script>

<template>
  <div class="main">
    <div v-for="(article, index) in articles" :key="index" class="article">
      <div class="Articleintroduction" @click="handleWork(index)">
        <div class="left">
          <el-image :src="article.cover" alt="" lazy></el-image>
        </div>
        <div class="right">
          <h2>{{ article.title }}</h2>
          <span>{{ article.username }}-{{ article.createTime }}</span>
          <p>{{ truncatedArticle(index) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>



<style lang="less" scoped>
.main {
  padding: 40px 0;
  border-bottom: 1px solid #ebf2ed;

  .article {
    padding: 40px 40px;
    line-height: 24px;
    border-bottom: 2px solid #ebf2ed;

    .Articleintroduction {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;

      .left {
        .el-image {
          width: 140px;
          height: 200px;
          border-radius: 12px;
          box-shadow: #d0dada 0px 3px 14px 1px;
          color: #1e87f0;
          line-height: 24px;
        }
      }

      .right {
        margin-left: 20px;
        margin-right: 20px;

        h2 {
          color: var(--pColor);
          font-size: 18px;
          line-height: 23.4px;
          margin-bottom: 5px;
        }

        span {
          color: var(--pColor);
          font-size: 13px;
          line-height: 19.5px;
        }

        p {
          color: var(--pColor);
          line-height: 24px;
        }
      }
    }
  }
}</style>@/api/article/article