<script setup>
import submitFriendlink from '@/api/open/friendlink';
import { ref } from 'vue';
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router"
//路由
const router = useRouter()
//表单ref对象
const formRef = ref(null)
//提交的数据
const formData = ref({
  logo: '',
  url: '',
  name: '',
  intro: ''
});
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      const formDataObj = new FormData();
      formDataObj.append('url', formData.value.url);
      formDataObj.append('name', formData.value.name);
      formDataObj.append('intro', formData.value.intro);
      formDataObj.append('logo', formData.value.logo);
      submitFriendlink.submitFriendlinks(formDataObj)
        .then(res => {
          if (res.data.code == 20011) {
            ElMessage({
              message: res.data.msg,
              type: 'success'
            })
            formData.value = {
              logo: '',
              url: '',
              name: '',
              intro: ''
            }
          } else if (res.data.code = 20010) {
            ElMessage({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
        .catch(error => {

        })
    }
  })
}
const goBack = () => {
  router.go(-1)
}

//数据效验规则
const rules = {
  logo: [
    { required: true, message: '请输入网站封面', trigger: 'change' },
    { type: 'url', message: '请输入封面地址！', trigger: 'change' },
  ],
  url: [
    { required: true, message: '请输入网站地址', trigger: 'change' },
    { type: 'url', message: '请输入有效的网站地址！', trigger: 'change' },
  ],
  name:
    [
      { required: true, message: '请输入网站名字！', trigger: 'change' }
    ],
  intro:
    [
      { required: true, message: '请输入网站简介！', trigger: 'change' }
    ],
}
//清空
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
};
</script>

<template>
  <div>
    <el-button @click="goBack">返回</el-button>
    <el-form ref="formRef" :model="formData" label-width="100px" @submit.native.prevent :rules="rules">
      <el-form-item label="网站封面" prop="logo">
        <el-input v-model="formData.logo" placeholder="Eg.https://1.jpg"></el-input>
      </el-form-item>
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
        <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
        <el-button @click="resetForm(formRef)">清空</el-button>
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
</style>