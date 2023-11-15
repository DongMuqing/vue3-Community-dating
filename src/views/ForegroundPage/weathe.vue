<script setup>
import { ref } from 'vue'
import weathers from '@/api/open/weather';
import address from '@/api/open/visitorInfo';


const city = ref('')
const weather = ref([])
// 预报发布时间
const reporttime = ref('')
const livesWeather = ref([])
//预报天气
const forecast = ref(false)
//实况天气
const realTime = ref(true)

const fetchWeather = () => {
    //预报天气
    weathers.getWeather()
        .then(response => {
            // 处理接口返回的数据
            const city = response.data.data.forecasts[0].city;
            if (city===undefined) {
                //未获取到天气信息
                weather.value=null
            } else {
                city.value = city
                const data = response.data.data.forecasts[0].casts;
                weather.value = data;
                const reporttime = response.data.data.forecasts[0].reporttime;
                reporttime.value = reporttime;
            }

        })
        .catch(error => {
            // 处理错误
        });
}
fetchWeather()
//实况天气
const fetchActualWeather = () => {
    weathers.getActualWeather()
        .then(res => {
            const { lives } = res.data.data
            const data = lives[0]
            if (data === undefined) {
                   //未获取到天气信息
                livesWeather = []
            } else {
                livesWeather.value = data;
            }
        })
        .catch(error => {

        })
}
fetchActualWeather()
//访客信息
const fetchVisitorInfo = () => {
    address.getVisitorInfo()
        .then(response => {

        })
        .catch(error => {
            // 处理错误
        });
}
fetchVisitorInfo()
//切换查看天气
const changweather = () => {
    realTime.value = !realTime.value
    forecast.value = !forecast.value
}

</script>


<template>
    <div class="weather">
        <div id="loading"></div>
        <div class="cont">
            <div class="one">
                <h1>🌦️Weather☔️</h1>
            </div>
        </div>
        <!-- //实时天气 默认显示天气 -->
        <div class="two" v-if="realTime">
            <div class="card" v-if="livesWeather!=''">
                <h2>weathe in {{ livesWeather.province }}</h2>
                <div class="weather">
                    <p>天气:{{ livesWeather.weather }}</p>
                    <p>温度:{{ livesWeather.temperature_float }}°C</p>
                    <p>空气湿度:{{ livesWeather.humidity }}</p>
                    <p>风力:{{ livesWeather.windpower }}</p>
                    <p>风向:{{ livesWeather.winddirection }}</p>
                </div>
                <h3>预报发布时间:<br>{{ livesWeather.reporttime }}</h3>
            </div>
            <div  class="card" v-if="livesWeather!=''">
                <h2>暂未获取到天气！</h2>
            </div>
        </div>
        <!-- //预报天气 -->
        <div class="two" v-if="forecast">
            <div class="card" v-if="weather!=''">
                <h2>weathe in {{ city }}</h2>
                <div class="weather" v-for="(weather, index) in  weather" :key="index">
                    <p>日期:{{ weather.date }}</p>
                    <p> 星期:{{ weather.week }}</p>
                    <p>白天:{{ weather.dayweather }} 温度:{{ weather.daytemp }}°C </p>
                    <p>晚上:{{ weather.nightweather }} 温度:{{ weather.nighttemp }}°C </p>
                </div>
                <h3>预报发布时间:<br>{{ reporttime }}</h3>
            </div>
            <div  class="card" v-if="weather=''">
                <h2>暂未获取到天气！</h2>
            </div>
        </div>
        <div>
            <el-row>
                <el-button round @click="changweather">查看预报天气</el-button>
                <el-button round @click="changweather">查看实况天气</el-button>
            </el-row>
        </div>
    </div>
</template>


<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}

.weather {
    height: 80px;
    margin: 10px auto 40px auto;
    font-size: 16px;

    ::-webkit-scrollbar {
        display: none;
    }



    #loading {
        position: fixed;

        /*background: #fff url("../assets//img/loading.svg") no-repeat center;*/
        z-index: 99999;
    }

    .cont {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    .one {
        margin-top: 1.5em;
        padding: 15px;
        display: inline-block;
        font-size: 18px;
        box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.8);
        overflow: hidden;
        border-radius: 25px;
        border-top: 2px solid rgba(255, 255, 255, 0.5);
        border-left: 2px solid rgba(255, 255, 255, 0.5);
        background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
        text-align: center;
        opacity: 0.9;
    }

    @media only screen and (max-width: 768px) {
        .one {
            width: auto;
        }
    }

    .two {
        display: flex;
        top: 10%;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    .card {
        position: relative;
        text-align: none;
        box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.7);
        overflow: hidden;
        border-radius: 25px;
        background: rgba(255, 252, 153, 0.5);
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        border-left: 1px solid rgba(255, 255, 255, 0.5);
        color: black;
        padding: 2em;
        width: 100%;
        max-width: 420px;
        transform-style: preserve-3d;
        perspective: 1000px;
        margin: 1em;
        backdrop-filter: blur(5px);
    }

    .search {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        transform: translateZ(30px);
    }

    .icon {
        animation: rotates 2.5s linear infinite alternate;
    }

    @keyframes rotates {
        from {
            transform: translate(-0.4em);
        }

        to {
            transform: translate(0.4em);
        }
    }



    input.search-bar {
        border: none;
        outline: none;
        padding: 0.5em 1em;
        border-radius: 24px;
        background: black;
        color: black;
        font-family: inherit;
        font-size: 120%;
        width: calc(70%);
        background: rgba(0, 0, 0, 0.1);
        transform: translateZ(30px);
        border-top: 1px solid rgba(255, 255, 255, 0.8);
        border-left: 1px solid rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(3px);
    }

    ::placeholder {
        color: black;
        opacity: 0.7;
    }

    button:hover {
        border: white 0.2em solid;
        transition: 0.2s ease-in-out;
    }

    .card:after {
        content: "";
        display: block;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 11;
        transform: translate3d(0, 0, 0);
    }

    @keyframes drift {
        from {
            transform: rotate(0deg);
        }

        from {
            transform: rotate(360deg);
        }
    }

    h2.city {
        margin-top: 0.5em;
        text-align: center;
        font-size: 1.5em;
        transform: translateZ(30px);
    }

    h1.temp {
        margin: 0;
        font-size: 2em;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-left: 0.1em;
        transform: translateZ(30px);
    }

    .description {
        text-transform: capitalize;
        margin-left: 8px;
    }

    .flex {
        display: flex;
        justify-content: left;
    }

    .other {
        font-size: 1.2em;
        font-weight: 500;
        transform: translateZ(30px);
    }

    .weather.loading {
        visibility: hidden;
        max-height: 20px;
        position: relative;
        align-items: center;
    }

    .weather.loading:after {
        visibility: visible;
        content: "Loading...";
        color: white;
        position: absolute;
        top: 0;
        left: 20px;
    }

    .three {
        display: flex;
        text-align: center;
        align-items: flex-end;
        justify-content: right;
        box-sizing: border-box;
        position: relative;
    }

    a {
        text-decoration-color: blueviolet;
        color: black;
    }

    .name {
        text-decoration: none;
        color: black;
        margin-left: auto;
        font-weight: 700;
        font-size: 1em;
        padding: 15px;
        overflow: hidden;
        border-radius: 15px;
        width: 15em;
        background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
        opacity: 0.9;
    }
}
</style>@/api/weather/weather@/api/address/visitorInfo