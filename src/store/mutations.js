import * as types from './mutation-types'

// 为什么要加大括号，因为使用了ES6风格的计算属性命名功能来使用一个常量作为函数名，ES6 允许字面量定义对象时，用（表达式）作为对象的属性名，即把表达式放在方括号内。
// mutations.js 更新同步状态，组件里通过store.commit进行同步更新
// 第一个参数是状态state，第二个参数是组件传递过来需要更新的信息
const mutations = {
	[types.SET_ID](state, id) {
		state.id = id
	},
	[types.SET_NAME](state, name){
		state.name = name
	},
	[types.SET_SEX](state, sex){
		state.sex = sex
	},
	[types.SET_MODE](state, mode){
		state.mode = mode
	},
	[types.SET_INFO](state, info){
		state.info = info
	}
}

export default mutations