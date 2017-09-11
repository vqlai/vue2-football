<template>
  <div class="schedule">
  	<dl>
  		<dt>
  		  <div class="type3">比赛时间</div>
  			<div class="type1">主队</div>
  			<div class="type1">客队</div>
  		</dt>
  		<dd v-for="(item, index) in schedule">
  			<div class="type3" v-text="item.date_utc"></div>
  			<div class="type1">
  				<img :src="'//img.dongqiudi.com/data/pic/'+item.team_A_id+'.png'"/>
  				<span v-html="item.team_A_name"></span>
  			</div>
  			<div class="type1">
  				<img :src="'//img.dongqiudi.com/data/pic/'+item.team_B_id+'.png'"/>
  				<span v-html="item.team_B_name"></span>
  			</div>
  		</dd>
  	</dl>
  </div>
</template>

<script>
  export default {
  	props: {
  	  schedule: {
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
.schedule
  h3
  	text-align: left
  p
  	text-align: left
  dl
  	background: #e2e2e2
  	font-size: 1rem
	dt 
    display: flex 
    padding: .5rem 0 
    border-bottom: 1px solid #d0cece
	  .type1
	  	flex: 4
	  	text-align: center
	  .type3
	  	flex: 2
	dd
	  display: flex
	  border-bottom: 1px solid #d0cece
	  padding: 1.6rem 0
	  font-size: 1rem
	  .type1 
      position: relative 
      flex: 4
      text-align: center
	  	img
	  	  width: 1.4rem
	  	  position: absolute
	  	  top: 0
	  	  left: .8rem
	  .type3
	  	flex: 2
</style>