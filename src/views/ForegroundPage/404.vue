<template>
    <div class="content">
        <div class="page-404">
            <h1>404</h1>
            <p> 抱歉并没有找到此页面</p>
            <p class="info">
              欢迎访问其他页面
            </p>
            <button class="go-home btn" @click="goHome">GO HOME</button>
            <button class="back btn" @click="goBack">BACK</button>
        </div>
        <div class="astronaut">
            <img src="../../assets/img/astronaut.png" class="astronaut-img" alt="">
        </div>
    </div>
</template>

<script>
export default {
methods:{
    goHome(){
        this.$router.push('/home')
    },
    goBack(){
        this.$router.go(-1)
    }
}
}
</script>

<style lang="less" scoped>


  
  .content {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-image: url('https://oss.qingmumu.xyz/Picture/404.png');
    background-repeat:no-repeat center center;
    background-size: 100% 100%;
  }
  .content .astronaut {
    transform: rotate(0deg) translate(0, -18%);
    animation-name: PAnimation;
    animation-direction: alternate;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-duration: 3s;
  }
  .content .page-404 {
    width: 40vw;
    font-family: dogica;
    z-index: 1;
  }
  .content .page-404 h1 {
    font-size: 5vw;
    margin-bottom: 30px;
  }
  .content .page-404 p {
    font-size: 1vw;
    margin: 10px 0;
    line-height: 2vw;
  }
  .content .page-404 .btn {
    width: 10vw;
    height: 50px;
    border-radius: 30px;
    margin-top: 10px;
    cursor: pointer;
    transition: 0.3s;
    background-color: #fff;
    color: #000;
    border: 2px solid #000;
    font-size: 1vw;
  }
  .content .page-404 .btn:hover {
    background-color: #000;
    color: #fff;
  }
  
  @media (min-width: 1024px) {
    .content {
      position: relative;
      display: flex;
    }
    .content .astronaut {
      position: absolute;
      left: 50%;
      top: 50%;
    }
    .content .page-404 {
      width: 40vw;
      position: absolute;
      left: 10%;
      top: 40%;
      transform: translateY(-50%);
    }
  }
  @media (max-width: 1024px) {
    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .content .page-404 {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 10vh;
    }
    .content .page-404 h1 {
      font-size: 10vw;
      margin-bottom: 30px;
    }
    .content .page-404 p {
      font-size: 3vw;
      line-height: 6vw;
    }
    .content .page-404 .info {
      display: none;
    }
    .content .page-404 .btn {
      width: 30vw;
    }
    .astronaut {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .astronaut .astronaut-img {
      width: 70%;
      height: 80%;
      transform: translateY(40%);
    }
  }
  @keyframes PAnimation {
    0% {
      transform: rotate(0deg) translate(0, -15%);
    }
    100% {
      transform: rotate(10deg) translate(0, -18%);
    }
  }
</style>