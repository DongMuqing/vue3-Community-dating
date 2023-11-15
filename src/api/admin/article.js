import axios from '@/utils/request'

const articles = {
  // 1. 获取所有
  getArticles: () => axios({
    url: '/article',
    method: 'GET'
  }),
  addArticles: (article) => axios({
    url: '/article/add',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8' ,
      'satoken': localStorage.getItem("satoken")
    },
    data: JSON.stringify(article)
  }),
  delById: (id) => axios({
    url: '/article/delete?id='+encodeURIComponent(id),
    method: 'DELETE',
    headers: {
      'satoken': localStorage.getItem("satoken")
    },
  }),
  editArticles: (article) => axios({
    url: '/article/edit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8' ,
      'satoken': localStorage.getItem("satoken")
    },
    data: JSON.stringify(article)
  }),
  //获取用户所有文章
  getArticleByUser: (current,size) => axios({
    url: '/article/get?current='+encodeURIComponent(current)+'&size='+encodeURIComponent(size),
    method: 'GET',
    headers: {
      'satoken': localStorage.getItem("satoken")
    },
  }),
}

export default articles
