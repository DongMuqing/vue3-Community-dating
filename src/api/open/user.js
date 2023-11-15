import axios from '@/utils/requestOpen'

const users = {
    // 登录 
    login: (loginInfo) => axios({
      url: '/user',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8' ,
        // 添加Content-Type请求头
      },
      data: JSON.stringify(loginInfo) ,
    }),
    sendCode:(email,username)=>axios({
      url:'/user/code?email='+encodeURIComponent(email)+'&username='+encodeURIComponent(username),
      method:'POST',
      headers:{
        'Content-Type': 'application/json;charset=UTF-8' ,
      }
    }),
    register:(email,username,password,code) => axios({
      url:'/user/register?email='+encodeURIComponent(email)+'&username='+encodeURIComponent(username)+'&password='+encodeURIComponent(password)+'&code='+encodeURIComponent(code),
      method:'POST',
      headers:{
        'Content-Type': 'application/json;charset=UTF-8' ,
      }
    }),
    getInfoById:(id) => axios({
      url:'/user/getinfo?id='+encodeURIComponent(id),
      method:'POST',
      headers:{
        'satoken':localStorage.getItem("satoken")
      }
    }),
}

export default users
