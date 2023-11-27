<script setup>

 
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>


<style lang="less" >
html,
body {
  margin: 0;
  padding: 0;
  background-color: var(--bgc);
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 20px;
}

body::-webkit-scrollbar {
  display: none;
}
#loading-animation{
  display: none;
  background: linear-gradient(to top,#70b9f1,#1e3c55);
}
</style>