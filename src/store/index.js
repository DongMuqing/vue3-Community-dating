import { ref, computed } from 'vue'

import { defineStore } from 'pinia';

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: [],
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
      console.log(this.id);
      return this.articles.find(article => article.id === this.id);
    },
  },
});

