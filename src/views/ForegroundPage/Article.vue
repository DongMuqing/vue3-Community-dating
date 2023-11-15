<template>
  <div class="main">
    <div v-for="(article, index) in articles" :key="index" class="article" >
      <div class="Articleintroduction"  @click="handleWork(article)">
        <div class="left">
          <el-image :src="article.cover" alt="" lazy></el-image>
        </div>
        <div class="right">
          <h2>{{ article.title }}</h2>
          <span>{{ article.username }}-{{ article.createTime }}</span>
          <p>{{truncatedArticle(index)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vditor/dist/index.css'
import articles from '@/api/open/article';
import weather from '@/views/ForegroundPage/weathe.vue';
export default {

  components: {
    weather
  },
  data() {
    return {
      articles: [
      ],
      maxLength: 40 // 最大显示长度
    }

  },
  methods: {
    fetchArticles() {
      articles.getArticles()
        .then(response => {
          // 处理接口返回的数据
          this.articles = response.data.data;
        })
        .catch(error => {
          // 处理错误
        });
    },
    handleWork(row) {
      this.$router.push({
        name: 'article',
        query: {
          id: row.id,
          content: row.content
        }
      })
    },
  },
  mounted() {
    this.fetchArticles();
  },
  computed: {
    truncatedArticle() {
      return (index) => {
        const article = this.articles[index];
        if (article.content.length > this.maxLength) {
          return article.content.slice(0, this.maxLength) + "...";
        } else {
          return article.content;
        }
      };
    }
  }
}
</script>

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
          font-size:18px;
          line-height:23.4px;
          margin-bottom: 5px;
        }
        span {
          color: var(--pColor);
          font-size:13px;
          line-height:19.5px;
        }
        p {
          color: var(--pColor);
          line-height:24px;
        }
      }
    }
  }
}
</style>@/api/article/article