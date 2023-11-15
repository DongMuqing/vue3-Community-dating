import axios from '@/utils/requestOpen'


const menus = {
    // 获取导航
    getMenus: () => axios({
      url: '/menu',
      method: 'GET'
    })
}

export default menus
