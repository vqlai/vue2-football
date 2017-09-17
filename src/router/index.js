import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const News = () => import('pages/news/news.vue')
const Detail = () => import('pages/detail/detail.vue')
const Race = () => import('pages/race/race.vue')
const Data = () => import('pages/data/data.vue')
const Video = () => import('pages/video/video.vue')

const router = new Router({
  // routes配置最好加上name属性，用于参数传递
  routes: [
   {
      path: '/',
      redirect: '/news'
    },
    {
      path: '/news',
      component: News
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path: '/race',
      component: Race
    },
    {
      path: '/video',
      component: Video
    },
    {
      path: '/data',
      component: Data
    },
    // 设置404错误页面
    // {
    //    path:'*',
    //    component:Error
    // }
  ]
})

// 路由拦截
router.beforeEach((to, from, next) => {
  // 没有匹配成功的路由，跳转到index页面,to.matched.length一级路由返回1，二级路由返回2，以此类推
  if (to.matched.length >= 1) {
    next()
  } else {
    next({path: '/news'})
  }
})

export default router