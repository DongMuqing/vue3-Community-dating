<script setup>
import weathers from '@/views/ForegroundPage/weathe.vue';

</script>

<template>
  <div class="info">
    <weathers/>
  </div>
</template>

<style lang="less" scoped>
.info {
  width: 295px;
  height: 100vh;
  background-color: var(--bgc--right);
  @media screen and (max-width: 1440px) {
    display: none
  }
}
</style>