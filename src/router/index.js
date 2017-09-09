import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const News = (resolve) => {
//   import('pages/news/news.vue').then((module) => {
//     resolve(module)
//   })
// }

const News = () => import('pages/news/news.vue')
const Detail = () => import('pages/detail/detail.vue')
const Race = () => import('pages/race/race.vue')
const Data = () => import('pages/data/data.vue')
const Video = () => import('pages/video/video.vue')
const Team = () => import('pages/team/team.vue')

const Assist = () => import('pages/child/assist.vue')
const Score = () => import('pages/child/score.vue')
const Shooter = () => import('pages/child/shooter.vue')
const Schedule = () => import('pages/child/schedule.vue')

const Test = () => import('pages/demo/test.vue')

const router = new Router({
  // routes配置最好加上name，用于参数传递
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
      path: '/team',
      component: Team,
      // 配置子路由，path不能/开头会被当作根路径，router-link的to路径要写全，即/父path/子path
      children:[
        {path: 'assist', component: Assist},
        {path: 'score', component: Score},
        {path: 'shooter', component: Shooter},
        {path: 'schedule', component: Schedule}
      ]
    },
    {
      path: '/test',
      component: Test
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
  // console.log(to.matched.length)
  if (to.matched.length >= 1) {
    next()
  } else {
    next({path: '/news'})
  }
  // if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
  //   if (localStorage.jwt_token && localStorage.jwt_token_time< localStorage.refresh_token_time) {  // 获取当前的token是否存在
  //     next()
  //   }
  //   else {
  //       next({
  //           path: '/login',
  //           query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
  //       })
  //   }
  // } else {
  //   // 没有匹配成功的路由，跳转到index页面
  //   if (to.matched.length === 1) {
  //       next()
  //     } else {
  //       next({path: '/index'})
  //     }
  // }
})

export default router