import axios from '@/utils/requestOpen'

const articles = {
  // 1. 获取所有
  getArticles: () => axios({
    url: '/article',
    method: 'GET'
  })
}

export default articles
