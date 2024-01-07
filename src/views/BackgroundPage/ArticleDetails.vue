<script setup>
import { ref, onMounted, watch } from 'vue'
import { articleContentStore } from '@/store/admin/article'
import { useRouter } from "vue-router"
import Tinymce from '../../components/Tinymce/Tinymce.vue';
const router = useRouter()
const articlesStore = articleContentStore()

const article = ref('')

//当前文章的内容 后续需要进行监听是否需要修改
const articleItem = ref('')
//获取当前文章数据
const getArticle = () => {
  article.value = articlesStore.getArticleById
}
const goBack = () => {
  // 后退到之前页面
  router.go(-1);
};
//获取当前的文章内容
const handleChange = (item) => {
  articleItem.value = item
}
//修改文章
const edit = () => {

}
onMounted(() => {
  getArticle()
})
// 监视文章变化，变化时重新获取文章
watch(() => articlesStore.getArticleById, (newArticle) => {
  getArticle()
})
const showConfirmationDialog = () => {
 
}
watch(() => articleItem.value,() => {
  
  }
)
</script>

<template>
  <el-button @click="goBack">返回</el-button>
  <el-button @click="edit">修改</el-button>
  <Tinymce v-model="article.content" @change="handleChange" width="100%" />
</template>


<style scoped lang='less'></style>