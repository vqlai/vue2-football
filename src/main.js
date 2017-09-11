// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

// 将fastclick挂载到body上，解决所有元素的点击事件的300ms延迟问题
fastclick.attach(document.body)

// 延迟加载
Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: require('common/images/lazyload.png'),
	loading: require('common/images/lazyload.png'),
	attempt: 1
})

// 导入默认样式
import 'common/stylus/index.styl'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})