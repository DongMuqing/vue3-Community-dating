import axios from '@/utils/request' 

const address = {
    getVisitorInfo:()=>axios({
      url:'/ip/visitorInfo',
      method:'POST'
    }),
    VisitorInfo:(current,size)=>axios({
      url:'ip/getVisitorInfo?current='+encodeURIComponent(current)+'&size='+encodeURIComponent(size),
      method:'POST',
      headers:{
        'satoken':localStorage.getItem("satoken") 
      }
    })
}

export default address
