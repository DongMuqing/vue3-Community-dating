import axios from '@/utils/request' 

const dynamics = {
    // 1. 获取所有
    getDynamics: () => axios({
      url: '/post/DynamicAndComment',
      method: 'POST',
    }),
    //点赞
    Upvote: (num) => axios({
      url: '/post/upvote',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8' ,
      },
      data: JSON.stringify(num) ,
    }),
   delPost: (id) => axios({
    url: '/post/delete?id='+id,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8' ,
      'satoken':localStorage.getItem("satoken")
    },
  }),
  //post的发布
  submitPost: (post) => axios({
    url: '/post/publish',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8' ,
      'satoken':localStorage.getItem("satoken")
    },
    data:JSON.stringify(post)
  }),
  editPost: (post) => axios({
    url: '/post/edit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8' ,
      'satoken':localStorage.getItem("satoken")
    },
    data:JSON.stringify(post)
  }),
  postPage:(current,size)=>axios({
    url:'/post/paging?current='+encodeURIComponent(current)+'&size='+encodeURIComponent(size),
    method:'POST',
    headers:{
      'Content-Type': 'application/json;charset=UTF-8' ,
      'satoken':localStorage.getItem("satoken")
    }
  })
}

export default dynamics
