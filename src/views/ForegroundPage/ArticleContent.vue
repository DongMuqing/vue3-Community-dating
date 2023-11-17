<script setup>
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router"
import { useArticlesStore } from '@/store/index';

const articlesStore = useArticlesStore();

const content = ref('');
const router = useRouter()
const renderMarkdown = () => {
    Vditor.preview(document.getElementById("preview"), content.value, {
        hljs: { style: "github" }
    });
};

const goBack = () => {
    // 后退到之前页面
    router.go(-1);
};

onMounted(() => {
    const articles = articlesStore.articles;
    const articleId = articlesStore.id;
    const currentArticle = articles[articleId];
    content.value = currentArticle.content;
    renderMarkdown();
});
</script>

<template>
    <div class="main">
        <el-button @click="goBack">返回</el-button>
        <div id="preview" class="preview"></div>
    </div>
</template>

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