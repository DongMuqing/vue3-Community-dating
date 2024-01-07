<template>
    <div class="chat">
        <div class="list-pane">
            <div class="user-pane">
                <div class="user-count">
                    <h3>当前在线人数：{{ userCount }}</h3>
                </div>
                <div class="user-list">
                    <div class="user" v-for="user in userList" :key="user">
                        <p class="username">{{ user }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="chat-pane">
            <div class="chat-header">
                <h2>Chat - {{ nickname }}</h2>
            </div>
            <div class="chat-message" ref="chatHistory">
                <div class="user-message" v-for="message in messages" :key="message">
                    <div class="img">
                        <el-image class="user-img" :src="message.avatar"></el-image>
                    </div>
                    <div class="message">
                        <div class="username">
                            {{ message.username }} <span class="time">{{ message.sendingTime }}</span>
                        </div>
                        <div class="text user-text" v-if="nickname === message.username">
                            {{ message.msg }}
                        </div>
                        <div class="text" v-if="nickname !== message.username">
                            {{ message.msg }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-textarea">
                <el-input v-model="text" class="user-textarea" type="textarea" resize="none"
                    @keydown.enter="sendButton"></el-input>
                <el-button type="primary" class="send-button" @click="sendButton">发送</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onActivated, onDeactivated } from "vue";
import { userStore } from '@/store/user';
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus";
import { formatTime } from '../../utils/formatTime'
const userStores = userStore()
//路由
const router = useRouter();
// 用户名
const nickname = ref();
nickname.value = userStores.getUserName

const socketUrl = ref(import.meta.env.VITE_APP_API_URL_SOCKET + userStores.getId + "/" + userStores.getUserName + "/" + userStores.getToken)

let socket

// 用户数量
const userCount = ref(0);
// 用户列表
const userList = ref([]);
// 信息框
const text = ref();
// 信息列表
const messages = ref([]);

// 发送信息
const sendButton = (event) => {
    event.preventDefault()
    if (text.value != null && text.value !== "" && nickname.value != null) {
        socket.send(text.value)
        text.value = '';
    }
}

onActivated(() => {
    if (WebSocket === "undefined") {
        ElMessage({
            message: "您的浏览器暂不支持WebSocket!",
            type: 'warning',
        });
        router.push("/")
        return
    }
    socket = new WebSocket(socketUrl.value);
    // 连接服务器
    socket.onopen = () => {
        console.log("已连接至服务器");
    };

    // 浏览器接收服务端发送的消息
    socket.onmessage = (msg) => {
        let data = JSON.parse(msg.data)
        // 接收到的信息:可以为用户列表数据,也可以是新发的消息,
        // 所有需要进行判断接收到的是什么信息,然后添加到对应数据里面
        if (data.userList != undefined) {
            // 接收用户列表
            userList.value = data.userList
            userCount.value = data.userList.length
        } else {
            // 接收用户消息
            data.sendingTime=formatTime(data.sendingTime)
            messages.value.push(data);
            // 获取节点
            let chatHistory = document.getElementsByClassName("chat-message")[0];
            if (chatHistory.scrollHeight >= chatHistory.clientHeight) {
                setTimeout(function () {
                    //设置滚动条到最底部
                    chatHistory.scrollTop = chatHistory.scrollHeight;
                }, 0);
            }
        }
        //第一次进来时需要接收100条消息记录
        if (data.messages != undefined) {
            data.messages.forEach(data => {
                data.sendingTime=formatTime(data.sendingTime)
                messages.value.push(data);
            })
            // 获取节点
            let chatHistory = document.getElementsByClassName("chat-message")[0];
            if (chatHistory.scrollHeight >= chatHistory.clientHeight) {
                setTimeout(function () {
                    //设置滚动条到最底部
                    chatHistory.scrollTop = chatHistory.scrollHeight;
                }, 0);
            }
        }
        if (data.closeUser != undefined) {
            ElMessage({
                message: data.closeUser + "离开了聊天室！",
                type: 'success',
            })
        }
        //自己加入则不提示
        if (data.joinUser != undefined && data.joinUser != nickname.value) {
            ElMessage({
                message: data.joinUser + "加入了聊天室！",
                type: 'success',
            })
        }
    };
    // 错误事件
    socket.onerror = (e) => {
<<<<<<< HEAD
        console.log("error"+e);
=======
>>>>>>> b0856c8b639e8641283d4eb889cd2512aa7ee35f
        console.log("WebSocket 服务发生错误");
    }
})
onDeactivated(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        // 关闭服务
        socket.onclose = () => {
            console.log("WebSocket 服务已关闭");
        }
    }
})
</script>
  
<style lang="less" scoped>
@keyframes chat {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.chat {
    display: flex;
    height: 95vh;
    margin: 0;
    // background-image: linear-gradient(to right, #5FC3E4 0%, #E55D87 100%);
    animation: chat 1s;

    .list-pane {
        position: relative;
        width: calc(20% - 48px);
        height: calc(100% - 32px);
        background-color: white;
        border-radius: 16px;
        margin-right: 16px;
        padding: 16px;

        .user-count {
            width: 100%;
            height: 64px;
            border-bottom: 2px solid;
            border-image: linear-gradient(to right, #5FC3E4 0%, #E55D87 100%) 2 2 2 2;
            margin-bottom: 16px;
        }

        .user-pane {
            width: 100%;
            height: calc(100% - 40px);

            .user-list {
                display: flex;
                flex-direction: column;
                position: relative;
                width: 100%;
                height: calc(100% - 64px);
                overflow: auto;


                .user {
                    display: flex;
                    align-items: center;
                    margin-bottom: 16px;

                    .user-img {
                        width: 48px;
                        height: 48px;
                        border: pink solid 2px;
                        border-radius: 64px;
                    }

                    .username {
                        font-size: 24px;
                        margin: 0 0 0 16px;
                        padding: 0;
                    }
                }
            }

            .user-list {
                &::-webkit-scrollbar {
                    width: 8px;
                    border-right: 8px;
                }

                &::-webkit-scrollbar-thumb {
                    border-radius: 8px;
                    background: #E55D87;
                }

                &::-webkit-scrollbar-track {
                    border-radius: 8px;
                    background: #f0f0f0;
                }
            }
        }
    }

    .chat-pane {
        display: flex;
        flex-direction: column;
        width: calc(80% - 80px);
        height: calc(100% - 64px);
        background-color: white;
        border-radius: 16px;
        margin-left: 16px;
        padding: 32px;

        .chat-header {
            display: flex;
            align-items: center;
            width: calc(100% - 16px);
            height: 5%;
            padding-left: 16px;
            text-align: left;
            border-bottom: 2px solid gray;
            margin-bottom: 16px;

            h2 {
                padding: 0;
                margin: 0;
            }
        }

        .chat-message {
            width: calc(100% - 34px);
            height: 80%;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            background-color: #f5f6f7;
            border: 1px solid #DCDFE6;
            border-bottom: 0;
            padding: 16px;
            overflow: auto;

            .user-message {
                display: flex;
                width: 100%;
                height: auto;
                margin-bottom: 16px;

                .img {
                    width: 64px;
                    height: 64px;
                    margin-right: 16px;

                    .user-img {
                        width: 64px;
                        height: 64px;
                        margin-right: 16px;
                        border: 2px solid white;
                        border-radius: 8px;
                    }
                }

                .message {
                    position: relative;

                    .username {
                        text-align: left;
                        margin-bottom: 8px;
                        height: 24px;

                        .time {
                            padding-left: 16px;
                            color: gray;
                        }
                    }

                    .text {
                        float: left;
                        text-align: left;
                        color: white;
                        background-color: #1E6EFF;
                        padding: 8px 16px;
                        border-radius: 0 4px 4px 4px;

                        &::selection {
                            background: #3399FF;
                        }

                        &::before {
                            content: '';
                            position: absolute;
                            top: 32px;
                            left: -4px;
                            border-top: 2px solid #1E6EFF;
                            border-right: 2px solid #1E6EFF;
                            border-bottom: 2px solid transparent;
                            border-left: 2px solid transparent;
                        }
                    }

                    .user-text {
                        color: black;
                        background-color: white;

                        &::selection {
                            color: white;
                        }

                        &::before {
                            border-top: 2px solid white;
                            border-right: 2px solid white;
                        }
                    }
                }
            }
        }

        .chat-textarea {
            position: relative;
            width: 100%;
            height: 15%;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            background-color: #f5f6f7;

            .user-textarea {
                width: 100%;
                height: 100%;

                textarea {
                    width: 100%;
                    height: 100%;
                    border-bottom-left-radius: 4px;
                    border-bottom-right-radius: 4px;
                    font-size: 24px;
                }
            }

            .send-button {
                position: absolute;
                right: 0;
                bottom: 0;
                padding: 12px 24px;
                border-bottom-right-radius: 4px;
            }
        }

        .chat-message {

            &::-webkit-scrollbar,
            textarea::-webkit-scrollbar {
                width: 6px;
                border-right: 8px;
            }

            &::-webkit-scrollbar-thumb,
            textarea::-webkit-scrollbar-thumb {
                border-radius: 8px;
                background: #4b8aff;
            }

            &::-webkit-scrollbar-track,
            textarea::-webkit-scrollbar-track {
                border-radius: 8px;
                background: #f0f0f0;
            }
        }
    }
}
</style>
  