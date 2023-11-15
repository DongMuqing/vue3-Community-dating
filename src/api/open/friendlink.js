import axios from '@/utils/requestOpen'


const friendlinks = {
    // 获取友链
    getFriendlinks: () => axios({
      url: '/friendlink',
      method: 'GET'
    }),
    //提交友链
    submitFriendlinks:(friendlinkInfo)=>axios({
      url: '/friendlink',
      method: 'POST',
      headers:{
        'Content-Type' : 'multipart/form-data'
      },
      data:friendlinkInfo
    })
}

export default friendlinks
