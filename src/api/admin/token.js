import axios from '@/utils/request' 
import { userStore } from '@/store/user'

const token = {
    // 1. 获取所有
    getToken: () => axios({
      url: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' ,// 添加Content-Type请求头
        'satoken':userStore().getToken
      },
    }),
  
}

export default token
