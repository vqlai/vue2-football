/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
// import { Loading, Message } from 'element-ui'
// import {commonParams} from './config'
// 超时时间
axios.defaults.timeout = 10000
axios.defaults.baseURL = '/v1'
// axios.defaults.headers.common['X-Authorization'] = 'Bearer ' + localStorage.jwt_token
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
	// token存在增加请求头配置
 // if(localStorage.jwt_token){
	// // config.timeout = 5000
	// // config.baseURL = '/proxy'
	// config.headers['X-Authorization'] = 'Bearer ' + localStorage.jwt_token
 // }	
	// // element ui Loading方法
	// loadinginstace = Loading.service({ fullscreen: true })
	// console.log('req...')
	return config
}, error => {
	// loadinginstace.close() // 请求失败关闭loading
	// Message.error({
	// message: '加载超时,请重新连接'
 // })
 	console.log('req error')
	return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
	// loadinginstace.close() // 响应成功关闭loading
	// console.log('res...')
	return data
}, error => {
	// let msg= (error.response.status == 401) ? '未授权':'加载失败，请重新连接';
	// loadinginstace.close() // 响应成功关闭loading
	// Message.error({
	// message: msg
 // })
 	console.log('res error...')
	return Promise.reject(error)
})

export default axios