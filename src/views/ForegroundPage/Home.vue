<script setup>
import Left from '@/components/before/Left.vue'
import Center from '@/components/before/Center.vue'
import Right from '@/components/before/Right.vue'

</script>

<template>
  <div>
    <div class="all">
      <Left />
      <Center />
      <Right />
    </div>
  </div>
</template>



<style lang="less" scoped>
.all {
  display: flex;
  margin-top: 60px;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  border-radius: 25px;
  overflow: auto;

  @media screen and (max-width: 600px) {
    margin-top: 0px;
  }
}

.nav {
  position: fixed;
  bottom: 0px;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  width: 100vw;
  height: 80px;

  @media screen and (min-width: 1200px) {
    display: none
  }
}
</style>