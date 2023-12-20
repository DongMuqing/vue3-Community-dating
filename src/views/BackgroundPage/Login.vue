<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import users from '@/api/open/user'
import { userStore } from '@/store/user'
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router"
onMounted(() => {
    window.addEventListener('keydown', keyDown);
    const login = document.getElementById('login');
    const register = document.getElementById('register');
    const formBox = document.querySelector('.form-box');
    const registerBox = document.querySelector('.register-box');
    const loginBox = document.querySelector('.login-box');

    register.addEventListener('click', () => {
        formBox.style.transform = 'translateX(90%)';
        loginBox.classList.add('hidden');
        registerBox.classList.remove('hidden');
    });

    login.addEventListener('click', () => {
        formBox.style.transform = 'translateX(-10%)';
        registerBox.classList.add('hidden');
        loginBox.classList.remove('hidden');
    });
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', keyDown);
});
const router = useRouter()
const pwdFlag = ref(true);
const user = ref({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    code: '',
});
const loginUser = ref({
    username: '',
    password: '',
});

const userStores = userStore();

const reset = () => {
    loginUser.value.username = '';
    loginUser.value.password = '';
};

const login = () => {
    const loginInfo = loginUser.value;
    users
        .login(loginInfo)
        .then((res) => {
            if (res.data.code === 20041) {
                const { tokenInfo } = res.data.data;
                userStores.setUserInfo(res.data.data);
                userStores. setToken(tokenInfo.tokenValue)
                localStorage.setItem(tokenInfo.tokenName, tokenInfo.tokenValue);
                ElMessage({
                    message: res.data.msg,
                    type: 'success',
                })
                //清除登录信息
                reset()
                router.push('/main')
            } else {
                ElMessage(res.data.msg);
            }
        })
        .catch((error) => {
        });
};

const register = () => {
    if (verify()) {
        users
            .register(user.value.email, user.value.username, user.value.password, user.value.code)
            .then((res) => {
                ElMessage({
                    message: res.data.msg,
                    type: 'success',
                });
                router.push('/login');
            });
    }
};

const sendCode = () => {
    if (verify()) {
        users.sendCode(user.value.email, user.value.username).then((res) => {
            ElMessage({
                message: res.data.msg,
                type: 'success',
            });
        });
    }
};

const verify = () => {
    // Your verification logic here
};

const changge = () => {
    pwdFlag.value = !pwdFlag.value;
};

const keyDown = (e) => {
    if (e.keyCode === 13) {
        // Enter key pressed
        login();
    }
};


</script>


<template>
    <div class="bod">
        <div class="container">
            <div class="form-box">
                <!-- 注册 -->
                <div class="register-box hidden">
                    <h1>register</h1>
                    <input type="email" placeholder="邮箱" v-model.trim="user.email">
                    <input type="text" placeholder="用户名" v-model.trim="user.username">
                    <input :type='pwdFlag ? "password" : "text"' placeholder="密码" v-model.trim="user.password">
                    <input :type='pwdFlag ? "password" : "text"' placeholder="确认密码" v-model.trim="user.confirmPassword">
                    <input type="code" placeholder="验证码" v-model.trim="user.code">
                    <button @click="sendCode">发送验证码</button>
                    <button @click="register">注册</button>
                </div>
                <!-- 登录 -->
                <form class="login-box">
                    <h1>login</h1>
                    <!-- //自定义属性传值 -->
                    <input type="text" placeholder="用户名" v-model.trim="loginUser.username">
                    <input :type='pwdFlag ? "password" : "text"' placeholder="密码" v-model.trim="loginUser.password">

                    <img src="../../assets/img/1.png" @click="changge" class="logineye" v-if="pwdFlag">
                    <img src="../../assets/img/2.png" @click="changge" class="logineye" v-if="!pwdFlag">

                    <button @click="login" type='button'> 登录</button>
                    <button @click="reset" type='button'>重置</button>
                </form>
            </div>
            <div class="con-box left">
                <h2>欢迎来到<span>后台注册界面</span></h2>
                <!-- <p>快来领取你的专属<span>宠物</span>吧</p> -->
                <img src="@/assets/cat/1.png" alt="">
                <p>已有账号</p>
                <button id="login">去登录</button>
            </div>
            <div class="con-box right">
                <h2>欢迎来到<span>后台登录界面</span></h2>
                <!-- <p>快来看看你的可爱<span>宠物</span>吧</p> -->
                <img src="@/assets/cat/2.png" alt="">
                <p>没有账号？</p>
                <button id="register">去注册</button>
            </div>
        </div>
        <img src="@/assets/img/setting.png" alt="" class="setting">
    </div>
</template>



<style lang="less" scoped>
* {
    /* 初始化 */
    margin: 0;
    padding: 0;
}

.bod {
    position: relative;
    top: 0px;
    left: 0px;
    background-image: url('https://oss.qingmumu.xyz/Picture/25804cc2e4074cfb8275e0b54b0bce1e.jpg');
    width: 100%; //大小设置为100%
    height: 100%; //大小设置为100%
    position: fixed;
    background-size: 100% 100%;
}

body {
    /* 100%窗口高度 */
    height: 100vh;
    /* 弹性布局 水平+垂直居中 */
    // display: flex;
    // justify-content: center;
    // align-items: center;
    /* 渐变背景 */
    // background: linear-gradient(200deg,#f3e7e9,#e3eeff);
}

.container {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    // height: 100vh;
    // display: flex;
    // flex-direction: row;
    // justify-content: center;
    // align-items: center;
    width: 650px;
    height: 415px;
    border-radius: 5px;
    backdrop-filter: blur(5px);
    /* 阴影 */
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    /* 相对定位 */
}

.form-box {
    /* 绝对定位 */
    position: absolute;
    top: -10%;
    left: 5%;
    background-color: #d3b7d8;
    width: 320px;
    height: 500px;
    border-radius: 5px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    /* 动画过渡 加速后减速 */
    transition: 0.5s ease-in-out;
}

.register-box,
.login-box {
    /* 弹性布局 垂直排列 */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    span {
        font-size: 16px;
        color: #fff;
    }
}

.hidden {
    display: none;
    transition: 0.5s;
}

h1 {
    text-align: center;
    margin-bottom: 25px;
    /* 大写 */
    text-transform: uppercase;
    color: #fff;
    /* 字间距 */
    letter-spacing: 5px;
}

input {
    position: relative;
    background-color: transparent;
    width: 70%;
    color: #fff;
    border: none;
    /* 下边框样式 */
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    padding: 10px 0;
    text-indent: 10px;
    margin: 8px 0;
    font-size: 14px;
    letter-spacing: 2px;
}

.logineye {
    position: absolute;
    top: 225px;
    left: 250px;
    z-index: 3;
}

.registereye {
    position: absolute;
    top: 20px;
    left: 250px;
    z-index: 3;
}

input::placeholder {
    color: #fff;
}

input:focus {
    color: #a262ad;
    outline: none;
    border-bottom: 1px solid #a262ad80;
    transition: 0.5s;
}

input:focus::placeholder {
    opacity: 0;
}

.form-box button {
    width: 70%;
    margin-top: 35px;
    background-color: #f6f6f6;
    outline: none;
    border-radius: 8px;
    padding: 13px;
    color: #a262ad;
    letter-spacing: 2px;
    border: none;
    cursor: pointer;
}

.form-box button:hover {
    background-color: #a262ad;
    color: #f6f6f6;
    transition: background-color 0.5s ease;
}

.con-box {
    width: 50%;
    /* 弹性布局 垂直排列 居中 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* 绝对定位 居中 */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.con-box.left {
    left: -2%;
}

.con-box.right {
    right: -2%;
}

.con-box h2 {
    color: #8e9aaf;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 4px;
}

.con-box p {
    font-size: 12px;
    letter-spacing: 2px;
    color: black;
    text-align: center;
}

.con-box span {
    color: #d3b7d8;
}

.con-box img {
    width: 150px;
    height: 150px;
    opacity: 0.9;
    margin: 40px 0;
}

.con-box button {
    margin-top: 3%;
    background-color: #fff;
    color: #a262ad;
    border: 1px solid #d3b7d8;
    padding: 6px 10px;
    border-radius: 5px;
    letter-spacing: 1px;
    outline: none;
    cursor: pointer;
}

.con-box button:hover {
    background-color: #d3b7d8;
    color: #fff;
}

.setting {
    position: absolute;
    left: 1%;
    top: 1%;
}

.register-box {
    img {
        top: 50%
    }
}
</style>