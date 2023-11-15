import axios from '@/utils/requestOpen'

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
  
}

export default dynamics
