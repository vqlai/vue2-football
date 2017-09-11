<template>
  <div class="assist">
  	<dl>
  		<dt>
  		  <div class="type3">排名</div>
  			<div class="type1">球员</div>
  			<div class="type1">球队</div>
  			<div class="type3">助攻数</div>
  		</dt>
  		<dd v-for="(item, index) in assist">
  			<div class="type3" v-text="index+1"></div>
  			<div class="type1" v-text="item.name"></div>
  			<div class="type1">
  				<img :src="'//img.dongqiudi.com/data/pic/'+item.team_id+'.png'"/>
  				<span v-html="item.team_name"></span>
  			</div>
  			<div class="type3" v-text="item.count"></div>
  		</dd>
  	</dl>
  </div>
</template>

<script>
  export default {
  	props: {
  	  assist: {
  		type: Array,
  		required: true
  	  }
  	},
  	mounted() {
      setTimeout(() => {
      	this.$emit('updateScroll')
      },20)
  	}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.assist
  h3
  	text-align: left
  p
  	text-align: left
  dl
  	background: #e2e2e2
  	font-size: 1rem
	dt 
    display: flex 
    border-bottom: 1px solid #d0cece 
    padding: .5rem 0
	  .type1
	  	flex: 4
	  	text-align: center
	  .type3
	  	flex: 2
	dd
	  display: flex
	  border-bottom: 1px solid #d0cece
	  padding: 1rem 0
	  font-size: 1rem
	  position: relative
	  .type1
	  	flex: 4
	  	text-align: center
	  	img
	  	  width: 1.4rem
	  	  position: absolute
	  	  top: 1rem
	  	  left: 3.5rem
	  .type3
	  	flex: 2
</style>
