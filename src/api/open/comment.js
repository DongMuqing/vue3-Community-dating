import axios from '@/utils/requestOpen'


const comments = {
  //添加评论
  submitComments: (commentInfo) => axios({
    url: '/comments/add',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'satoken': localStorage.getItem("satoken")
    },
    data: JSON.stringify(commentInfo)
  }),
}

export default comments
