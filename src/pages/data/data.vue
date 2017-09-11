<template>
  <div class="data">
    <ul>
    	<li v-for="(item, index) in leagues" v-text="item.title" :class="curLeaguesIndex===index ? activeClass :''" @click="onCurrentLeague(item, index)"></li>
    </ul>
    <ol>
      <li v-for="(item,index) in types" v-text="item.title" :class="curType===index ? activeClass : ''" @click="onRank(item,index)"></li>
    </ol>
    <div class="rank">
      <scroll ref="scroll" class="rank-content" :data="datas">
        <div>
          <score :score="datas" v-if="0==curType && datas.length" @updateScroll="freshScroll"></score>
          <shooter :shooter="datas" v-if="1==curType && datas.length" @updateScroll="freshScroll"/>
          <assist :assist="datas" v-if="2==curType && datas.length" @updateScroll="freshScroll"/>
          <schedule :schedule="datas" v-if="3==curType && datas.length" @updateScroll="freshScroll"/>
        </div>
        <loading v-if="!datas.length"></loading>
      </scroll>
    </div>
  </div>
</template>

<script>
  import Loading from 'components/loading/loading'
  import Scroll from 'components/scroll/scroll'
  import Score from 'pages/rank/score'
  import Shooter from 'pages/rank/shooter'
  import Assist from 'pages/rank/assist'
  import Schedule from 'pages/rank/schedule'
  import {getRank} from 'api/rank'
  export default {
    data() {
      return {
        leagues: [{title:'中超',league:51,id: 39713,gameweek: 30},{title:'英超',league:8, id:41547,gameweek: 38},{title:'意甲',league:13,id: 42011,gameweek: 38},{title:'西甲',league:7,id: 41509,gameweek: 38},{title:'德甲',league:9,id:41485,gameweek: 38},{title:'中甲',league:148,id:39175,gameweek: 30}],
        types: [{title:'积分榜',type:'team_ranking'},{title:'射手榜',type:'goal_ranking'},{title:'助攻榜',type:'assist_ranking'},{title:'赛程榜',type:'schedule'}],
        curLeague: {title:'中超',league:51,id: 39713,gameweek: 30},
        curLeaguesIndex: 0,
        curType: 0,
        activeClass: 'on',
        scores: [],
        shooters: [],
        assists: [],
        schedules: []
      }
    },
    computed: {
      datas() {
        let obj = {
          0: this.scores,
          1: this.shooters,
          2: this.assists,
          3: this.schedules
        }
        return obj[this.curType]
      }
    },
    created() {
      this._getRank('team_ranking', this.curLeague)
    },
    methods: {
      // DOM渲染刷新滚动区域
      freshScroll() {
        this.$refs.scroll.refresh()
      },
      // 获取当前的联赛
      onCurrentLeague(item,index) {
        this._clearRank()
        this.curLeaguesIndex = index
        this.curLeague = item
        this.curType = 0
        this._getRank('team_ranking', item)
      },
      // 获取排行榜
      onRank(item,index){
        this._clearRank()
        this.curType = index
        this._getRank(item.type, this.curLeague)
      },
      // 根据联赛类型和榜单类型进行数据加载
      _getRank(type ,league) {
        getRank(type,league).then((res)=>{
          console.log(res)
          if(res.statusText === 'OK'){
            let obj = {
              'team_ranking':() => {
                this.scores = res.data[0].rankings
              },
              'goal_ranking':() => {
                this.shooters = res.data
              },
              'assist_ranking':() => {
                this.assists = res.data
              },
              'schedule':() => {
                this.schedules = res.data.matches
              }
            }
            if (typeof obj[type] !== 'function') {
               throw new Error('Invalid type.');
             }
            obj[type]()
          }
        })
      },
      // 清除各个排行榜数据
      _clearRank(){
        this.scores = []
        this.shooters = []
        this.assists = []
        this.schedules = []
      }
    },
    components: {
      Score,
      Shooter,
      Assist,
      Schedule,
      Loading,
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.data
  ul
  	display: flex
  	font-size: 1rem
  	background: #eee
  	color: $color-g
  	li
      flex: 1
      height: 2.5rem
      line-height: 2.5rem
      box-sizing: border-box
    .on
      border-bottom: 1px solid $color-g
  ol 
    display:flex
    background: #3c3b3b
    font-size: 1rem
    color: #ffffff
    box-sizing: border-box
    li
      flex: 1 
      height: 2.5rem
      line-height: 2.5rem 
      box-sizing: border-box
    .on
      border-bottom: 1px solid $color-g
  .rank
    position: fixed
    width: 100%
    top: 11rem
    bottom: 0
    .rank-content
      height: 100%
      overflow: hidden
</style>