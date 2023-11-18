import { defineStore } from 'pinia';

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    //文章数据
    articles: [],
    //当前查看文章详情的index唯一id
    id: ''
  }),
  actions: {
    setArticles(articles) {
      this.articles = articles;
    },
    setId(id) {
      this.id = id;
    },
    getArticleById() {
      return this.articles.find(article => article.id === this.id);
    },
  },
});

