import axios from '@/utils/request'


const comments = {
  getComments: (current,size) => axios({
    url: '/comments?current=' + encodeURIComponent(current) + '&size=' + encodeURIComponent(size),
    method: 'GET',
    headers: {
      'satoken': localStorage.getItem("satoken")
    },
  }),
  submitComments: (commentInfo) => axios({
    url: '/comments/add',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'satoken': localStorage.getItem("satoken")
    },
    data: JSON.stringify(commentInfo)
  }),
  delComments: (id) => axios({
    url: '/comments?id='+encodeURIComponent(id),
    method: 'DELETE',
    headers: {
      'satoken': localStorage.getItem("satoken")
    }
  }),
}

export default comments
