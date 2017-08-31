import axios from 'common/js/http'
import {formatDate} from 'common/js/util'

// 获取赛事
export function getRace() {
	const url = '/data/tab/important'
	let currentTime = formatDate(new Date(), 1)+' 16:00:00'
	return axios.get(url, {
	  params: {
		start: currentTime
	  }
	}).then((res) => {
      return Promise.resolve(res)
	})
}