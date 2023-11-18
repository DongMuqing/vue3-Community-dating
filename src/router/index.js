import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import tokens from '../api/open/token'
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  //   "history": createWebHistory()
  // "hash": createWebHashHistory()
  // "abstract": createMemoryHistory()
  //新版写法
  history: createWebHistory(),
  routes: [
    { path: '', redirect: '/home' },
    {
      path: '/home',
      // 父路由已经有子路由了  父路由要给子路由一个默认的路由 ， 使用name跳转路由时
      // 不会触发子路由 所以删掉父路由中的name
      // name: 'home',
      component: () => import('../views/ForegroundPage/Home.vue'),
      children: [
        { path: '', component: () => import('../views/ForegroundPage/Post.vue'), meta: { keepAlive: true } },
        { path: 'post', component: () => import('../views/ForegroundPage/Post.vue'), meta: { keepAlive: true } },
        { path: 'article', component: () => import('../views/ForegroundPage/Article.vue'), meta: { keepAlive: true } },
        { path: 'articles/:id', name: 'articles', component: () => import('../views/ForegroundPage/ArticleContent.vue'), props: true },
        { path: 'friendlink', component: () => import('../views/ForegroundPage/Friendlink.vue'), meta: { keepAlive: true } },
        { path: 'leavemessage', component: () => import('../views/ForegroundPage/Leavemessage.vue'), meta: { keepAlive: true } },
        { path: '/subfriend', component: () => import('../views/ForegroundPage/SubmitFriendlink.vue'), meta: { keepAlive: true } },
      ]
    },
    { path: '/login', component: () => import('../views/BackgroundPage/Login.vue') },
    {
      path: '/main', component: () => import('../views/BackgroundPage/Main.vue'),
      children: [
        { path: '', component: () => import('../views/BackgroundPage/Home.vue') , meta: { keepAlive: true }},
        { path: 'home', component: () => import('../views/BackgroundPage/Home.vue') , meta: { keepAlive: true }},
        { path: 'post', component: () => import('../views/BackgroundPage/Post.vue') , meta: { keepAlive: true }},
        { path: 'article', component: () => import('../views/BackgroundPage/Article.vue') , meta: { keepAlive: true }},
        { path: 'publish', component: () => import('../views/BackgroundPage/Publish.vue') , meta: { keepAlive: true }},
        { path: 'user', component: () => import('../views/BackgroundPage/User.vue') , meta: { keepAlive: true }},
        { path: 'visitorInfo', component: () => import('../views/BackgroundPage/VisitorInfo.vue') , meta: { keepAlive: true }},
        { path: 'comment', component: () => import('../views/BackgroundPage/Comment.vue') , meta: { keepAlive: true }},
        { path: 'upload',component: () => import('../views/BackgroundPage/Upload.vue') , meta: { keepAlive: true }},
      ]
    },
     //做404跳转 需要放到路由的最后面
     { path: '/404', component: () => import('../views/ForegroundPage/404.vue') },
    //没有匹配道则重定向到404页面 需要放到路由的最后面
    { path: "/:pathMatch(.*)", redirect: "/404", name: "notMatch", hidden: true },
  ]
})

// 全局前置守卫
router.beforeEach(function (to, from, next) {
  //所有子页面都需要在这
  // const satoken = localStorage.getItem("satoken")
  const pathArr = ['/main', '/main/home', '/main/dynamic', '/main/user', '/main/attract', 'main/publish', '/main/VisitorInfo', '/main/comment', '/main/upload']
  if (pathArr.indexOf(to.path) != -1) {
    tokens.getToken()
      .then(response => {
        //已经登录则放行
        if (response.data.code == 20041) {
          next()
        } else {
          // token无效清除token  跳转登录页面
          localStorage.removeItem('satoken')
          next('/login')
          ElMessage({
            message: "请先登录！",
            type: 'warning'
          });
        }
      })
  } else {
    //不是后台主页 放行404页面
    next()
  }
})
export default router
