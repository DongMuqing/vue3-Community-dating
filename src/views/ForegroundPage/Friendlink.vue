<template>
  <div class="main">
    <div class="icon">
      <div class="left">
        <h2>友人帐</h2>
      </div>
      <div class="right">
        <p @click="SubmitFriendlink">->提交友链</p>
      </div>
    </div>

    <div class="item" v-for="(friendlinks, index) in friendlink" :key="index">
      <div class="link_img">
        <a :href="friendlinks.url" target="_blank"><img :src="friendlinks.logo" alt=""></a>
      </div>

      <div class="name">

        <a :href="friendlinks.url" target="_blank">
          {{ friendlinks.name }}
        </a>
        <p>{{ friendlinks.intro }}</p>
      </div>
    </div>


  </div>
</template>

<script>
import friendlink from '@/api/open/friendlink'
export default {
  data() {
    return {
      friendlink: []
    }
  },
  methods: {
    fetchFriendLinks() {
      friendlink.getFriendlinks()
        .then(response => {
          // 处理接口返回的数据
          const data = response.data.data;
          this.friendlink = data;
        })
        .catch(error => {
          // 处理错误
        });
    },
    SubmitFriendlink() {
      this.$router.push('/subfriend')
    }
  },
  mounted() {
    this.fetchFriendLinks()
  }
}
</script>

<style lang="less" scoped>
.main {

  color: var(--pColor);
  line-height: 24px;
  margin: 50px 0px 15px;
  padding: 0px 40px;
  flex-grow: 1;
  /* 让box1在剩余空间内自动增长 */
  min-height: 0;
  /* 解决box1高度不能自动增长的问题 */
  overflow: hidden;

  .icon {

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 30px;
    .left {
      flex: 1;
    }
  }

  .item {
    float: left;
    width: 43%;
    height: 60px;
    background-color: var(--bgc--left);
    border-radius: 5px;
    box-shadow: var(--bgc) 0px 1.30732px 2.1244px 0px;
    color: var(--pColor);
    display: flex;
    line-height: 24px;
    padding: 5px 8px;
    margin: 0px 10px 10px;

    @media screen and (max-width: 600px) {
      width: 70vw;
    }

    .link_img {

      img {
        width: 60px;
        height: 60px;
      }
    }

    .name {
      margin-left: 10px;

      width: 160px;
      height: 29px;

      a {
        text-decoration: none;
        color: var(--pColor);
        font-size: 16px;
        height: 20px;
        text-align: center;
      }


      p {
        font-size: 12px;
        margin-top: 10px;
      }
    }

  }
}</style>@/api/friendlink/friendlink