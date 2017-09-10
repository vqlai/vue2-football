<template>
	<div class="loading">
		<img :src="loading" alt="正在加载中">
	</div>
</template>

<script>
export default {
  data() {
  	let loadImg = require("common/images/loading.gif")
  	return {
      loading: loadImg
  	}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .loading 
   width: 100%
   height: auto
   padding: 30% 0
   img
   	width: 2rem
   	height: 2rem
</style>