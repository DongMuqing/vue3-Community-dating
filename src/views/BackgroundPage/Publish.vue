<script setup>
import { ref } from 'vue'
import Tinymce from '../../components/Tinymce/Tinymce.vue';
import addArticle from '@/api/admin/article'
import { uploadArticleImage } from '@/utils/upload';
import { ElMessage } from 'element-plus';

let content = ref('')
//文章实体
const article = ref({
  title: '',
  content: '',
  cover: ''
})
// 封面文件
const coverFile = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

//获取当前的文章内容
const handleChange = (item) => {
   console.log(item);
}
//移除当前上传的文件
const handleRemove = (uploadFile, uploadFiles) => {

};
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};
const submitContent = async () => {
  if (article.title == '') {
    ElMessage({
      message: "请输入标题！",
      type: 'warning'
    });
    return;
  }
  if (article.content == '') {
    ElMessage({
      message: "内容不可为空！",
      type: 'warning'
    });
    return;
  }
  if (article.cover == '') {
    ElMessage({
      message: "请选择封面！",
      type: 'warning'
    });
    return;
  }
  // 先上传封面 获取返回封面地址
  article.cover= await upload()
  //提交整个文章
  addArticle.addArticles().then(res => {
    if (res.data.code === 20041) {
      ElMessage({
        message: res.data.msg,
        type: 'success',
      })
      //置空当前的内容值
      content.value = ''
    } else {
      ElMessage(res.data.msg);
    }
  })
}

const upload = () => {
  if (coverFile.value.length == 1) {
    uploadArticleImage(coverFile.value.raw)
      .then(res => {
        ElMessage({
          message: res.data.msg,
          type: 'success',
        });
        //置空封面文件
        coverFile.value = [];
      });
  } else {
    ElMessage({
      message: '只能上传一张封面',
      type: 'warning',
    });
  }
} 
</script>

<template>
  <Tinymce v-model="article.content" @change="handleChange" width="100%" />
  <el-form :model="article" label-width="60px">
    <el-form-item label="标题">
      <el-input v-model="article.title" />
    </el-form-item>
  </el-form>
  <!-- 上传封面 -->
  <el-upload v-model:file-list="coverFile" list-type="picture-card" :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove" :multiple="true" accept="image/*" :auto-upload="false" :drag="true">
    <el-icon>
      <Plus />
    </el-icon>
  </el-upload>
  <el-button @click="submitContent">提交</el-button>
</template>


<style scoped lang='less'></style>