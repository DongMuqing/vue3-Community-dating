import { defineStore } from 'pinia';

export const userStore = defineStore('user', {
    state: () => ({
       userInfo:'',
       satoken:''
    }),
    actions: {
        setUserInfo(userInfo) {
            this.userInfo = userInfo;
        },
        setToken(token){
            this.satoken=token
        }
    },
    getters:{
        getRole() {
            return this.userInfo.role;
          },
          getToken(){
            return this.satoken
          }
    },
    persist: {
        enabled: true // true 表示开启持久化保存
      }
});

