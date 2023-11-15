import axios from '@/utils/request'

const users = {
  //登出
  logout: () => axios({
    url: '/user/logout',
    method: 'POST',
    headers: {
      'satoken': localStorage.getItem("satoken")
    }
  }),
  //分页用户信息
  pagingUserInfo: (current, size) => axios({
    url: '/user/userInfo?current=' + encodeURIComponent(current) + '&size=' + encodeURIComponent(size),
    method: 'POST',
    headers: {
      'satoken': localStorage.getItem("satoken")
    }
  }),
  editRole: (role) => axios({
    url: '/user/edit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'satoken': localStorage.getItem("satoken")
    },
    data: JSON.stringify(role)
  }),
  deleteById:(id) => axios({
    url: '/user/delete?id='+ encodeURIComponent(id),
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'satoken': localStorage.getItem("satoken")
    },
  }),
}

export default users
