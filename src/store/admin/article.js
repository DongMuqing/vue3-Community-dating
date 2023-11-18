import { defineStore } from 'pinia';

export const articleContentStore = defineStore('article', {
  state: () => ({
    //文章数据
    articles: [],
    //当前查看文章详情的index唯一id
    id: '',
    //文章在Vditor中的value
    content:''
  }),
  actions: {
    setArticles(articles) {
      this.articles = articles;
    },
    setId(id) {
      this.id = id;
    },
    setContent(content){
        this.content=content
    }
  },
  getters:{
    getArticleById() {
        return this.articles.find(article => article.id === this.id);
      },
    getContent(){
        return this.content
    }
  }
});

