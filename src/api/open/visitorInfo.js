import axios from '@/utils/requestOpen'

const address = {
    getVisitorInfo:()=>axios({
      url:'/ip/visitorInfo',
      method:'POST'
    })
}

export default address
