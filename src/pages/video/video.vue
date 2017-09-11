<template>
  <div class="video">
    <scroll ref="scroll" class="video-content" :data="videos" :pullup="true" v-on:scrollToEnd="_getMoreData">
      <div>
        <h2>最劲视频</h2>
        <ul>
          <router-link v-for="(item,index) in videos" :to="{ path: 'detail', query: {id: item.id}}" tag="li" :key="index">
            <div class="left">
              <img v-lazy="item.litpic">
            </div>
            <div class="right">
              <p>{{item.title}}</p>
              <span v-text="item.comments_total+'评论'"></span>
            </div>
          </router-link>
        </ul>
      </div>
      <loading v-show="!videos.length"></loading>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/scroll/scroll'
  import Loading from 'components/loading/loading'
  import {getVideos} from 'api/video.js'
  export default {
  	data() {
  		return {
        videos: [],
        page: 1
  		}
  	},
    mounted() {
      this.$nextTick(()=>{
        this._getVideos(this.page)
        this.$refs.scroll.refresh()
      })
    },
    methods: {
      _getVideos(page) {
        getVideos(page).then((res)=>{
          console.log(res.data.list.articles)
          if(res.statusText==="OK"){
            this.videos = [...this.videos, ...res.data.list.articles]  
          }
        })
      },
      _getMoreData(){
        this._getVideos(++this.page)
        this.$refs.scroll.refresh()
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
  .video
    position: fixed
    width: 100%
    top: 6rem
    bottom: 0
    .video-content
      height: 100%
      overflow: hidden
    h2
      padding: .8rem 0
      color: $color-g
      border-bottom: 1px solid #e9e9e9
    ul
      li
        display: flex
        padding: .5rem 0
        border-bottom: 1px solid #e9e9e9
        .left
          flex: 2
          padding-left: .5rem
          img
            width: auto
            height: 5rem
        .right
          flex: 5
          padding: 0 .5rem
          text-align: left
          font-size: .9rem
          position: relative
          p
            font-size: 1rem
            line-height: 1.5rem
          span
            position: absolute
            bottom: 0
            right: .5rem
</style>