<script setup>
import { ref, onMounted } from 'vue';
import menus from "@/api/admin/menu";
import { useRouter } from "vue-router"

const router = useRouter()
const menuData = ref([]);

const fetchMenus = () => {
  menus.getMenu()
    .then(response => {
      menuData.value = response.data.data;
    })
    .catch(error => {
     
    });
};

const clickMenu = (chan) => {
  router.push('/main' + chan);
};

onMounted(() => {
  fetchMenus();
});
</script>


<template>
  <!-- 菜单 -->
  <div class="nav">
    <el-row class="tac">
      <el-col :span="28" v-for="(data, index) in menuData">
        <el-menu 
        default-active="2" 
        class="el-menu-vertical-demo" 
        active-text-color="none" 
        @click="clickMenu(data.path)">
          <el-menu-item index="data.id" :key="data.id">
            <el-icon>
              <component :is="data.icon" />
            </el-icon>
            <span>{{ data.label }}</span>
          </el-menu-item>
        </el-menu>

      </el-col>
    </el-row>
  </div>
</template>



<style lang="less" scoped> 
.nav {
   background-color: var(--bgc--left);
   display: flex;
   flex-direction: column;
   align-items: center;
   line-height: 24px;

   .el-row {
     display: block;
     height: 100vh;
     width: 285px;
     text-align: center;

     .el-col {

       .el-menu {
         background-color: var(--bgc--left);
         border-right: none;
       }
     }
   }
 }
</style>