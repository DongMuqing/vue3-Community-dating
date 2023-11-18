import { defineStore } from 'pinia';

export const userStore = defineStore('user', {
    state: () => ({
       userInfo:'',
       token:''
    }),
    actions: {
        setUserInfo(userInfo) {
            this.userInfo = userInfo;
        }
    },
    getters:{
        getRole() {
            return this.userInfo.role;
          },
    },
    persist: {
        enabled: true // true 表示开启持久化保存
      }
});

