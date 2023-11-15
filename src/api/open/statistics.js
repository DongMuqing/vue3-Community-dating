import axios from '@/utils/requestOpen'


const statistics = {
    // 1. 站点信息
    getStatistics: () => axios({
      url: '/statistics',
      method: 'POST'
    }),
}

export default statistics 
