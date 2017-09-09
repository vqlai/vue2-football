<template>
  <div class="tab">
    <ul>
    	<router-link to="/news" tag="li">资讯</router-link>
    	<router-link to="/race" tag="li">赛程</router-link>
    	<router-link to="/video" tag="li">视频</router-link>
    	<router-link to="/data" tag="li">数据</router-link>
    </ul>
  </div>
</template>

<script>
  export default {
  	date() {
  		return {
  		}
  	},
  	mounted() {
      setTimeout(() => {
      },20)
  	}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
	.tab
		ul
			display: flex
			justify-content: center
			width: 100%
			height: 2.8rem
			line-height: 2.8rem
			font-size: 1.1rem
			li
				flex: 1    
				border-bottom: 1px solid $color-border    
			  & .router-link-active
				  color: $color-g
				  border-bottom:1px solid $color-g
</style>