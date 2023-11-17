import { defineStore } from 'pinia';

export const menuStore = defineStore('menu', {
    state: () => ({
        menuFlag: false
    }),
    actions: {
        setMenuFlag(flag) {
            this.menuFlag = flag;
        },
        getMenuFlag(){
            return this.menuFlag
        }
    },
});

