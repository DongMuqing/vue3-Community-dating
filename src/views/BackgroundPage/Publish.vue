<script setup>
import { ref } from 'vue'
import Tinymce from '../../components/Tinymce/Tinymce.vue';

let content = ref('')
const handleChange =(item)=> {
    console.log('change', item)
}
</script>

<template>
  <Tinymce v-model="content" @change="handleChange" width="100%" />
</template>


<style scoped lang='less'>

</style>