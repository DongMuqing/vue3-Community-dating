import axios from '@/utils/requestOpen'

const weather = {
    getWeather: () => axios({
        url: '/weather',
        method: 'POST'
      }),
      getActualWeather: () => axios({
        url: '/weather/base',
        method: 'POST'
      }),
}

export default weather
