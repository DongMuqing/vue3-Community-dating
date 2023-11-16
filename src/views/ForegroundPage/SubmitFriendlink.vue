<script setup>
import submitFriendlink from '@/api/open/friendlink';
import { ref } from 'vue';
import { compressImg } from '@/utils/compress';

const formData = ref({
  url: '',
  name: '',
  intro: ''
});
const imageUrl = ref('');
const fileList = ref([]);
const previewImage = ref(null);
import { ElMessage } from 'element-plus'
const submitForm = () => {
  const formDataObj = new FormData();
  formDataObj.append('url', formData.value.url);
  formDataObj.append('name', formData.value.name);
  formDataObj.append('intro', formData.value.intro);
  formDataObj.append('logo', fileList.value);
  
  submitFriendlink.submitFriendlinks(formDataObj)
    .then(res => {
      if (res.data.code == 20011) {
        ElMessage({
          message: res.data.msg,
          type: 'success'
        });
      }
    })
    .catch(error => {
    
    })
    .finally(() => {
      // 无论成功或失败，清空文件列表和预览图片
      fileList.value = [];
      previewImage.value = null;
    });
};

const submitUpload = () => {
  $refs.upload.submit();
};

const handleFileChange = async (event) => {
  const files = event.target.files;

  // 获得图片路径进行预览
  previewImage.value = URL.createObjectURL(files[0]);

  // 压缩当前图片
  const compressedFiles = await Promise.all(
    Array.from(files).map((file) => compressImage(file, 0.85))
  );

  fileList.value = compressedFiles[0].file;
};

const compressImage = async (file, quality) => {
  // 在 Vue 组件中使用
  return compressImg(file, quality);
};
</script>

<template>
  <div>
    <div class="subimg">
      <p>请选择网站logo</p>
      <!-- accept限制上传的文件类型 -->
      <input type="file" name="logo" @change="handleFileChange" accept="image/*">
    </div>
    <div v-if="previewImage" class="showimg">
      <img :src="previewImage" alt="Preview" style="max-width: 200px; max-height: 200px;">
    </div>
    <el-form ref="form" :model="formData" label-width="100px" @submit.native.prevent>
      <el-form-item label="网站地址" prop="url">
        <el-input v-model="formData.url" placeholder="Eg.https://qingmumu.xyz"></el-input>
      </el-form-item>
      <el-form-item label="网站名字" prop="name">
        <el-input v-model="formData.name" placeholder="请输入网站名字"></el-input>
      </el-form-item>
      <el-form-item label="网站简介" prop="intro">
        <el-input v-model="formData.intro" placeholder="请输入网站简介"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>



<style lang="less" scoped>
.subimg {
  margin: 50px 0px 10px 30px;
  color: var(--pColor);
  p {
    font-size: 20px;
    color: var(--pColor);
  }
}

.showimg {
  margin-left: 30px;
}

.avatar-uploader .el-upload {
  border: 1px dashed pink;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-form {


  .el-form-item {
    .el-input {
      width: 30vw;

      @media screen and (max-width: 600px) {
        width: 70vw;
      }
    }
  }
}
</style>@/api/friendlink/friendlink