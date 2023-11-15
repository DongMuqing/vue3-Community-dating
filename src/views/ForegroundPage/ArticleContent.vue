<template>
    <div class="main">
        <el-button @click="goBack">返回</el-button>
        <div id="preview" class="preview"></div>
    </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
export default {
    data() {
        return {
            content: ''
        }
    },
    methods: {
        renderMarkdown() {
            Vditor.preview(document.getElementById("preview"), this.content, {
                hljs: { style: "github" }
            })
        },
        goBack() {
            //后退到之前页面
            this.$router.go(-1)
        }
    },
    created() {
        this.content = this.$route.query.content
    },
    mounted() {
        this.renderMarkdown();
    },

}

</script>

<style lang="less" scoped>
.main {
    width: 33vw;
    margin: 60px 50px;

    @media screen and (max-width: 600px) {
        width: 100vw;
        margin: 80px 0px;

    }

    .preview {
        width: 500px;
        color: var(--pColor);
        @media screen and (max-width: 600px) {
            width: 100vw;
            margin: 0px 2px;
        }
    }
}
</style>