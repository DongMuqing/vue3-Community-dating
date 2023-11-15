import axios from 'axios'
import { ElMessage } from 'element-plus'


let apiUrl = ''; 
function getApi() {
  const userDataJSON = localStorage.getItem('userData');
  const userData = JSON.parse(userDataJSON);
  const role = userData.role; // 获取最新的 role 值
 
  // 根据用户身份选择不同的接口
  if (role === '管理员') {
    apiUrl = 'http://localhost:8080/api/v1/admin';
  } else if (role === '用户') {
    apiUrl = 'http://localhost:8080/api/v1/user';
  }
  return apiUrl; // 返回最新的 role 值
}

const service = axios.create({
    baseURL: getApi(),
    timeout: 30 * 1000
})
// 添加响应拦截器
service.interceptors.response.use(
    (res) => {
      // 在响应返回后可以在这里进行一些操作，例如验证状态码
      if (res.data.code === 40100) {
        // 如果状态码为40100则表示权限不够，则显示消息通知,并中断请求
        ElMessage({
          message: res.data.msg,
          type: 'warning'
        });
        return new Promise(() => {}); // 返回未解析的Promise，中断请求
      }else{
        return res; // 返回响应对象，以便其他地方继续处理
      }
    },
    (error) => {
      // 处理响应错误
      return Promise.reject(error);
    }
  );
  
  export default service;
