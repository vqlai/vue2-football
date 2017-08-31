import axios from 'common/js/http'

// 获取视频列表
export function getVideos(page) {
	const url = 'mobile/tab/43/archives'
	return axios.get(url,{params: {page:page}}).then((res)=>{
		return Promise.resolve(res)
	})
}