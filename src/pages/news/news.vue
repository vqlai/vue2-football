<template>
  <div class="news">
    <scroll ref="scroll" class="news-content" :data="newsList" :pullup="true" v-on:scrollToEnd="_getMoreData">
      <div>
        <div v-if="ads.length" class="slider-wrapper" ref="sliderWrapper">
          <slider :interval="2000" :autoPlay="true" :loop="true">
            <div v-for="item in ads">
              <a :href="item.linkUrl" target="_blank">
                <!-- 使用css类needsclick，解决fackclick与better-scroll点击事件冲突问题,@load="loadImage"解决轮播图异步加载，scroll无法计算该部分的大小，导致无法滚动到最底部 -->
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <h2>最新资讯</h2>
        <ul class="title">
          <router-link v-for="(item,index) in newsList" :to="{ path: 'detail', query: {id: item.id}}"   tag="li" :key="item.id" :id="item.id">
            <div class="left"><img v-lazy="item.litpic"></div>
            <div class="right">
              <h3 v-text="item.title"></h3>
              <p v-text="item.description"></p>
            </div>
            <span v-html="item.comments_total+'评论'"></span>
          </router-link>
        </ul>
      </div>
      <loading v-show="!newsList.length"></loading>
    </scroll>
  </div>
</template>

<script>
import Slider from 'components/slider/slider'
import Scroll from 'components/scroll/scroll'
import Loading from 'components/loading/loading'
import {getNews} from 'api/news'
  export default {
  	data() {
  		return {
        ads: [{
         linkUrl: 'https://github.com/vqlai',
         picUrl: require('common/images/1.jpg')
        },{
         linkUrl: 'https://github.com/vqlai',
         picUrl: require('common/images/2.jpg') 
        },{
         linkUrl: 'https://github.com/vqlai',
         picUrl: require('common/images/3.jpg')
        },{
         linkUrl: 'https://github.com/vqlai',
         picUrl: require('common/images/4.jpg')
        }],
        newsList: [],
        curPage: 1 // 当前页
  		}
  	},
  	created() {
      this._getNews(this.curPage)
  	},
  	mounted() {
      setTimeout(() => {
      },20)
  	},
  	methods: {
      _getMoreData() {
        this._getNews(++this.curPage)
      },
      loadImage() {
        // 因为图片是异步加载的，div的大小是通过图片撑起的，所以一开始scroll无法计算出图片的大小，
        if (!this.checkloaded) {
          this.checkloaded = true
          // 需要等图片异步加载完后调用scroll的refresh方法重新计算滚动区域的大小
          this.$refs.scroll.refresh()
        }
      },
      _getNews(page) {
        getNews(page).then((res) => {
          console.log(res)
          if(res.statusText === 'OK') {
            this.newsList = this.newsList.concat(res.data.list.articles)
            this.curPage = res.data.page
          }
        })
      }
  	},
  	computed: {

  	},
  	watch: {

  	},
    components: {
      Slider,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.news
  position: fixed
  width: 100%
  top: 6rem
  bottom: 0
  .news-content
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
    h2
      padding: .8rem 0
      color: $color-g
      border-top: 1px solid $color-border
      border-bottom: 1px solid $color-border
    ul.title
      li
        display: flex
        justify-content: center
        align-items: center
        padding: .5rem 0  
        border-bottom: 1px solid $color-border
        position: relative
        .left
          flex: 2
          margin-left: .5rem
          img
            width: auto
            height: 5rem
        .right
          flex: 5
          padding: 0 .5rem
          text-align: left
          h3
            font-size: 1rem
            line-height: 1.5rem
          p
            font-size: .6rem
            line-height: 1rem
            color: #8a8787
        span
          position: absolute
          bottom: 5px
          right: 5px
          font-size: .6rem
          color: #8a8787
      li:hover
        color: $color-g
</style>