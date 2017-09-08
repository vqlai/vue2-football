// actions.js  Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作,也可以批量提交mutation。action 内部执行异步操作,通过 store.dispatch 方法触发

import * as types from './mutation-types'

/*
 *参数commit用于vuex的mutation的提交，state用于获取vuex的状态
 */
export const updateInfo = function({commit,state}) {
	commit(types.SET_ID, '1008')
	commit(types.SET_NAME, 'VQLAI')
	commit(types.SET_SEX, 1)
	commit(types.SET_MODE, true)
	commit(types.SET_INFO, [{address:'深圳罗湖太白路',phone: '177...'},{address: '梅州五华水寨',phone: '136...'}])
	console.log(state.id)
}