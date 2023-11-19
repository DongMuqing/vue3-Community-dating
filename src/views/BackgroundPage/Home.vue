<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from '@/store/user'
onMounted(() => {
    userInfos.value = userStores.userInfo
})
const userStores = userStore()
const userInfos = ref([])
</script>

<template>
    <div>
        <el-card class="box-card">
            <div class="user">
                <img :src="userInfos.avatar" alt="">
                <div class="userinfo">
                    <p class="name">{{ userInfos.username }}</p>
                    <p class="access">{{ userInfos.role }}</p>
                </div>
            </div>
            <div class="login-info">
                <p>上次登录时间：<span>{{ userInfos.loginTime }}</span></p>
            </div>
        </el-card>
    </div>
</template>

<style lang="less" scoped>
div {
    .box-card {
        width: 400px;
        .user {
            padding-bottom: 20px;
            margin-bottom: 20px;
            border-bottom: 1px solid #ccc;
            display: flex;
            align-items: center;

            img {
                margin-right: 40px;
                width: 150px;
                height: 150px;
                border-radius: 50%;
            }

            .userinfo {
                .name {
                    font-size: 32px;
                    margin-bottom: 10px;
                }

                .access {
                    color: #999999;
                }
            }
        }

        .login-info {
            p {
                line-height: 28px;
                font-size: 14px;
                color: #999999;

                span {
                    color: #666666;
                    margin-left: 60px;
                }
            }
        }
    }
}</style>