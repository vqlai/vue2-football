<template>
  <div class="race">
    <scroll ref="scroll" class="race-content" :data="races">
	    <div>
	        <h2>最火比赛</h2>
		    <div class="time-panel" v-for="itemAll in races">
		        <h3 v-text="itemAll.title"></h3>
		    	<div class="row" v-for="(item,index) in itemAll.item" :key="index">
		    		<div class="team">
		    			<div><img v-lazy="item.team_A_logo" alt="球队logo"></div>
		    			<p v-text="item.team_A_name"></p>
		    		</div>
		    		<div class="content">
		    			<p><span v-text="item.time_utc"></span> <span v-text="item.competition_name"></span> <span v-if="item.gameweek" v-text="'第'+item.gameweek+'轮'"></span></p>
		    			<p v-text="item.TVList"></p>
		    			<h4 v-text="item.fs_A+' - '+item.fs_B"  v-if="item.fs_B || item.fs_A"></h4>
		    			<h4 v-text="notStart" v-else></h4>
		    		</div>
		    		<div class="team">
		    			<div><img v-lazy="item.team_B_logo" alt=""></div>
		    			<p v-text="item.team_B_name"></p>
		    		</div>
		    	</div>
		    </div>
	    </div>
	    <loading v-if="!races.length"></loading>
	</scroll>
  </div>
</template>

<script>
  import Loading from 'components/loading/loading'
  import Scroll from 'components/scroll/scroll'
  import {getRace} from 'api/race'
  import {formatTimes, getLocalDate, getLocalHour} from 'common/js/util'
  export default {
  	data() {
  		return {
  			races: [],
  			notStart: '未开始'
  		}
  	},
  	created() {
      this._getRace()
  	},
  	methods: {
  	  _getRace() {
  	  	getRace().then((res) => {
  	  	  if(res.statusText === 'OK'){
  	  	  	// 声明一个不受data监控的全局变量
            this.obj = {}
            res.data.list.forEach((item,index) => {
              let timeArr = item.time_utc.split(':')
              //计算+8小时的毫秒数
              let timeMs = parseInt(timeArr[0])*60*60 + parseInt(timeArr[1])*60 + parseInt(timeArr[2]) + 28800
              if(item.relate_type === 'program'){
              	return false
              }else if(timeMs < 86400){
              	let key = item.date_utc
	            this._getFilterData(key)
  	            item.time_utc = getLocalHour(item.time_utc)
  	            this.obj[key].item.push(item)
              }else{
              	let key = formatTimes((item.sort_timestamp+28800)*1000,'yyyy-MM-dd')
	            this._getFilterData(key)
	            item.time_utc = getLocalHour(item.time_utc)
	            this.obj[key].item.push(item)
              }
            })
            // 将对象变为数组
            for(let i in this.obj){
            	this.races.push(this.obj[i])
            }
            console.log(this.races)
  	  	  }
  	  	})
  	  },
  	  _getFilterData(key) {
        if(!this.obj[key]){
          this.obj[key]={
            title: getLocalDate(key),
            item: []
          }
        }
  	  }
  	},
  	components: {
  	  Loading,
  	  Scroll
  	}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.race
  position: fixed
  width: 100%
  top: 6rem
  bottom: 0
  .race-content
    height: 100%
    overflow: hidden
  h2
    padding: .8rem 0
    color: $color-g
    border-bottom: 1px solid #e9e9e9
  .time-panel
    h3
      padding: .4rem 0
      font-size: .8rem
      background: #e6e6e6
      text-align: left
      text-indent: 1rem
    .row
      display: flex
      justify-content: center
      align-items: center
      border-bottom: 1px solid $color-border
      .team
      	flex: 2
      	padding: .8rem 0
      	img
      	  height: 3rem
      	p
      	  font-size: .8rem
      	  line-height: 1rem
      .content
      	flex: 3
      	p 
      	  font-size: .8rem
      	  line-height: 1.2rem
      	h4
      	 font-size: 1.2rem
      	 line-height: 1.5rem
      	 color: $color-g
</style>