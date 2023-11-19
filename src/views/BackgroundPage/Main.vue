<script setup>
import CommonAside from '../../components/after/CommonAsid.vue';

</script>

<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <CommonAside></CommonAside>
      </el-aside>
      <el-main>
        <router-view>

        </router-view>
      </el-main>

    </el-container>
  </div>
</template>

<style lang="less" scoped>

</style>
