import axios from 'axios'
import { ElMessage } from 'element-plus'


const apiUrl = 'http://localhost:8080/api/v1'

const service = axios.create({
    baseURL: apiUrl,
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
