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

<script>
import submitFriendlink from '@/api/open/friendlink'
import { compressImg } from '@/utils/compress'
export default {
  data() {
    return {
      formData: {
        url: '',
        name: '',
        intro: '',

      },
      imageUrl: '',
      fileList: [],
      //预览图片
      previewImage: null,
    }
  },
  methods: {
    submitForm() {
      const formData = new FormData();
      formData.append('url', this.formData.url)
      formData.append('name', this.formData.name)
      formData.append('intro', this.formData.intro)
      formData.append('logo', this.fileList)
      submitFriendlink.submitFriendlinks(formData)
        .then(res => {
          if (res.data.code == 20011) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.$refs.form.resetFields();
            this.fileList = []
            this.previewImage = null
          }
        })
        .catch(error => {
          this.fileList = []
          this.previewImage = null
          this.$message.error(res.data.msg)
        });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    async handleFileChange(event) {
      const files = event.target.files;
      //获得图片路劲进行预览
      this.previewImage = URL.createObjectURL(files[0]);
      //压缩当前图片
      const compressedFiles = await Promise.all(
        Array.from(files).map((file) => this.compressImage(file, 0.85))
      );
      this.fileList = compressedFiles[0].file
    },

    async compressImage(file, quality) {
      // 在Vue组件中使用
      return compressImg(file, quality);
    },

  },
  mounted() {
  }
}
</script>

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