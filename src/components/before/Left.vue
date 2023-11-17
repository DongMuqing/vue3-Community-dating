<script setup>
import { watch,ref, onMounted,onBeforeUnmount } from 'vue'
import menus from "@/api/open/menu";
import statistic from '@/api/open/statistics'
import { useRouter } from "vue-router"
import { menuStore } from '@/store/menu';


const menuStores = menuStore()
const isCollapses = ref()
// 监听 pinia中menuFlag 的变化
watch(() => menuStores.getMenuFlag(), (newVal) => {
  isCollapses.value = newVal;
});
//列表数据
const menuData = ref()
//站点信息
const statistics = ref([])
//路由
const router = useRouter();
onMounted(() => {
  isCollapses.value = menuStores.getMenuFlag()
})
//去登陆
const goLogin = () => {
  router.push('/login')
}
const goBackstage = () => {
  router.push('/main')
}
const fetchMenus = () => {
  menus.getMenus()
    .then(response => {
      // 处理接口返回的数据
      menuData.value = response.data.data;
    })
    .catch(error => {
      // 处理错误
    });
}
fetchMenus()

const fetchStatistics = () => {
  statistic.getStatistics()
    .then(response => {
      // 处理接口返回的数据
      statistics.value = response.data.data;
    })
    .catch(error => {
      // 处理错误
    });
}
fetchStatistics()

//切换主题
const changetheme = (th) => {
  //在index.html获取此值
  const themeEl = document.querySelector('.theme')
  themeEl?.setAttribute('href', `../theme/${th}.css`)
}
const clickMenu = (path) => {
  // 当页面的路由与跳转的路由不一致才允许跳转
  //  if (this.$route.path !== chan.path && !(this.$route.path === '/home' && (chan.path === '/'))) {
  router.push('/home' + path)
  // }
}
const checkDeviceSize = () => {
  // 获取设备宽度
  const deviceWidth = window.innerWidth || document.documentElement.clientWidth;
  // 判断设备宽度是否大于某个阈值（这里假设大于 768px 为大设备）
  if (deviceWidth < 768) {
    menuStores.setMenuFlag(false)
  } else {
    menuStores.setMenuFlag(true)
  }
}

 // 添加 resize 事件监听器
 window.addEventListener('resize', checkDeviceSize);

// 在组件卸载时移除事件监听器，以防止内存泄漏
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkDeviceSize);
});

</script>


<template>
  <div class="left" v-show="isCollapses">
    <!-- 菜单 -->
    <div class="nav">
      <el-row class="tac">
        <el-col :span="28" v-for="(data, index) in menuData">
          <el-menu default-active="2" class="el-menu-vertical-demo" active-text-color="none"
            @click="clickMenu(data.path)">
            <el-menu-item index="data.id" :key="data.id">
              <!-- <component> 标签在 Vue.js 中用于动态地渲染组件。这是一个抽象的组件，它根据提供的 :is 属性的值来渲染相应的组件。 -->
              <!-- <location />  渲染为这样的-->
              <el-icon>
                <component :is="data.icon" />
              </el-icon>
              <span>{{ data.label }}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>

    <div class="theme">
      <h2>主题切换</h2>
      <el-button @click="changetheme('dark')">暗夜</el-button>
      <el-button @click="changetheme('light')">亮白</el-button>
      <el-button @click="changetheme('Freshgreen')">清新绿</el-button>
    </div>

    <div class="goto">
      <h2>去往</h2>
      <el-button @click="goLogin">去登陆/注册</el-button>
      <el-button @click="goBackstage">去后台</el-button>
    </div>

    <div class="site">
      <h2>站点信息</h2>
      <li>
        <span>动态</span>
        <small>{{ statistics[1] }}</small>
      </li>
      <li>
        <span>浏览</span>
        <small>{{ statistics[0] }}</small>
      </li>
    </div>

    <div class="connection">
      <h2>联系站长</h2>
      <a href="https://oss.qingmumu.xyz/Blog/QQandWeChat/qrcode_1690562973980.jpg"><img src="../../assets/img/qq.png"
          alt=""></a>
      <a href="https://oss.qingmumu.xyz/Blog/QQandWeChat/mmqrcode1690562985319.png"><img src="../../assets/img/wechat.png"
          alt=""></a>
      <a href="https://github.com/DongMuqing"><img src="../../assets/img/github.png" alt=""></a>
      <a href="https://space.bilibili.com/82114367"><img src="../../assets/img/bilibili.png" alt=""></a>
    </div>


  </div>
</template>




<style lang="less" scoped>
.left {
  width: 295px;
  height: 100vh;
  background-color: var(--bgc--left);

  @media screen and (max-width: 600px) {
    width: 300vw;
  }

  .logo {

    height: 78px;
    padding-left: 70px;

    img {
      width: 70px;
      height: 70px;
      border-radius: 2px;
      margin: 10px 50px;
    }
  }

  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 285px;
    line-height: 24px;
    margin: 20px 0px;
    padding: 0px 40px 20px;

    .el-row {
      display: block;

      .el-col {
        .el-menu {
          background-color: var(--bgc--left);
          border-right: none;
        }
      }
    }
  }

  .theme {
    margin-left: 30px;

    h2 {
      color:
        #9098a7;
      font-size:
        14px;
      font-weight:
        600;
      line-height:
        21px;
      margin:
        0px 0px 15px;
    }

    .el-button {
      display: inline-block;
      /* 将按钮变为块级元素以设置宽度 */
      text-align: center;
      /* 文本居中 */
      margin: 10px 15px;
      background-color: var(--bgc);
      color: var(--span);
    }
  }

  .goto {
    margin-left: 30px;

    h2 {
      color: #9098a7;
      font-size: 14px;
      font-weight: 600;
      line-height: 21px;
      margin: 0px 0px 15px;
    }

    .el-button {
      display: inline-block;
      /* 将按钮变为块级元素以设置宽度 */
      text-align: center;
      /* 文本居中 */
      margin: 10px 15px;
      background-color: var(--bgc);
      color: var(--span);
    }
  }

  .site {
    margin: 50px 0px 130px 30px;


    h2 {
      color: #9098a7;
      font-size: 14px;
      font-weight: 600;
      line-height: 21px;
      margin: 0px 0px 15px;
    }

    li {
      float: left;
      width: 100px;
      height: 55px;
      align-items: flex-start;
      background-image: linear-gradient(90deg, var(--pColor), #816bff00);
      border-radius: 5px;
      color: #404040;
      display: flex;
      flex-direction: column;
      line-height: 24px;
      margin: 0px 2px 10px;
      padding: 8px 12px 5px;
      text-align: left;

      span {
        color: var(--site);
        line-height: 21px;
        text-align: left;
      }

      small {
        color: var(--small);
        font-size: 16px;
        font-weight: 600;
        line-height: 21px;
        text-align: left;
      }
    }
  }

  .connection {
    margin-top: 100px;
    margin-left: 30px;

    h2 {
      color: #9098a7;
      font-size: 14px;
      font-weight: 600;
      line-height: 21px;
      margin: 0px 0px 15px;
    }

    a {
      img {
        padding: 5px 30px 12px 0px;
      }
    }
  }

  .about {
    margin: 50px 0px 0px 30px;

    h2 {
      color: #9098a7;
      font-size: 14px;
      font-weight: 600;
      line-height: 21px;
      margin: 0px 0px 15px;
    }
  }
}
</style>>