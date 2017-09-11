import axios from 'common/js/http'

//  var qs = require('qs') // 使用qs自动将请求头的Content-Type设置为application/x-www-form-urlencoded
// get方法传参用params:{},post方法传参用data:{}，如post方法要以form data方式传参则要使用qs
var qs = require('qs')

// 获取最新咨询列表
export function getNews(curPage) {
  let url = ''
  if(curPage===1){
  	url = '/mobile/tab/1/archives'
  }else{
  	url = `/mobile/tab/1/archives?page=${curPage}`
  }
  return axios.get(url).then((res) => {
  	return Promise.resolve(res)
  })
}