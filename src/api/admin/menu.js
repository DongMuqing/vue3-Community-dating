import axios from '@/utils/request' 


const menus = {
    getMenu: () => axios({
      url: '/menu/after',
      method: 'GET',
      headers:{
        'satoken':localStorage.getItem("satoken")
      }
    }),
}

export default menus
