import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

//vuex日志输入插件,状态提交时会在控制台输入信息
import createLogger from 'vuex/dist/logger'

// 应用层级的状态应该集中到单个 store 对象中。
// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
// 异步逻辑以及提交多个mutation都应该封装到 action 里面。
// mutation在组件用commit触发，action在组件用dispatch触发
Vue.use(Vuex)

// 日志配置
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	// 日志配置
	strict: debug,
	plugins: debug ? [createLogger()] : []
}) 

export default store