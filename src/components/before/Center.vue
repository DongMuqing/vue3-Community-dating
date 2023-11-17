<script setup>
import { ref } from 'vue'
const isCollapses = ref(false)
const checkDeviceSize = () => {
  // 获取设备宽度
  const deviceWidth = window.innerWidth || document.documentElement.clientWidth;
  // 判断设备宽度是否大于某个阈值（这里假设大于 768px 为大设备）
  if (deviceWidth < 768) {
    isCollapses.value = false
  } else {
    isCollapses.value = true
  }
}
checkDeviceSize()

window.addEventListener('resize', checkDeviceSize());
// 在组件销毁前移除窗口大小变化的监听
window.removeEventListener('resize', checkDeviceSize());
</script>

<template>
  <div class="center">
    <div class="search">
      <a><img src="../../assets/img/更多.png" alt="" @click="sendMsg"></a>
      <!-- <el-button style="margin-right: 20px" @click="sendMsg" icon="el-icon-menu" size="mini"></el-button> -->
      <input type="text" placeholder="文章 | Search">
    </div>

    <div class="individual">
      <img src="https://oss.qingmumu.xyz/Blog/Backdrop/e47d3e664df3b2a0e975e15d6b845e38104346114.jpg" alt="">
    </div>

    <router-view class="information" v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
   
    <div class="record-author-info">
      <div>
        <a href="https://beian.miit.gov.cn">
          渝ICP备2023006053号-1
        </a>
      </div>
      <div>
        <a href="https://qingmumu.xyz">
          Copyright @ Dongmuqing 2023
        </a>
      </div>
    </div>

  </div>
</template>


<style lang="less" scoped>
.center {
  width: 595px;
  height: 100vh;
  background-color: var(--bgc--center);
  overflow-y: auto;


  @media screen and (max-width: 600px) {
    width: 100vw;
  }

  .search {
    height: 72px;

    a {
      float: left;

      img {
        margin: 20px 20px;
      }
    }

    input {
      margin: 20px 5px;
      border-radius: 20px;
      color: var(--bgc--center);
      font-family: eafont;
      font-size: 13px;
      line-height: 19.5px;
      padding: 5px 15px 5px 52px;

    }
  }



  .individual {
    position: relative;
    top: 0;
    height: 200px;

    img {
      width: 100%;
      height: 300px;

      @media screen and (max-width: 600px) {
        height: 250px;
      }
    }

    .nav {
      position: absolute;
      width: 100%;
      height: 53px;
      background-color: var(--bgc--center);
      z-index: 9999;
      border-top: 2px solid black;

      div {
        width: 100px;
        float: left;
        margin-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        @media screen and (max-width: 600px) {
          width: 60px;
          margin-left: 5px;
        }

        i {
          float: left;
          color: var(--pColor);
        }

        p {
          color: var(--pColor);
        }
      }
    }



    li {
      list-style: none;

      img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        /* 图片适应容器的尺寸，并保持比例 */
      }
    }
  }

  .information {
    margin-top: 120px;

    @media screen and (max-width: 600px) {
      margin-top: 70px;
    }
  }

  .record-author-info {

    height: 200px;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;

      a {
        text-decoration: none;
        display: inline-block;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: var(--pColor);
      }
    }

  }
}

/*overflow-y: auto;
可以实现部分组件滚动并隐藏滚动轴
*/
.center::-webkit-scrollbar {
  display: none;
}</style>