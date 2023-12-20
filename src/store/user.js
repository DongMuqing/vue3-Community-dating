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
        },
        clearUserInfo(){
            this.userInfo=''
            this.satoken=''
        }
    },
    getters:{
        getRole() {
            return this.userInfo.role;
          },
          getToken(){
            return this.satoken
          },
          getId(){
            return this.userInfo.id
          },
          getUserName(){
            return this.userInfo.username
          },
          getAvatar(){
            return this.userInfo.avatar
          }
    },
    persist: {
        enabled: true // true 表示开启持久化保存
      }
});

