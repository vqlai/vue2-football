<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index }"></span>
    </div>
  </div>
</template>

<script>
  import {addClass} from 'common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    name: 'slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      // 屏幕放大兼容处理
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        // 调用BScroll的refresh方法，重新计算宽高
        this.slider.refresh()
      })
    },
    // activated() {
    //   if (this.autoPlay) {
    //     this._play()
    //   }
    // },
    // deactivated() {
    //   clearTimeout(this.timer)
    // },
    // beforeDestroy() {
    //   clearTimeout(this.timer)
    // },
    methods: {
      _setSliderWidth(isResize) {
        // 获取到slider的所有轮播页
        this.children = this.$refs.sliderGroup.children
        // 保存父元素的宽度
        let width = 0
        // 获取到屏幕宽度并且把宽度设置到slider上 
        let sliderWidth = this.$refs.slider.clientWidth
        // 计算轮播页的宽度和父元素的宽度，高度自己撑起无需计算
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        // 如果为无缝滚动，父元素则加多两个轮播页的宽度
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        // 通过ref给dom的css设置宽度
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      // 初始化slider
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        })

        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          // 减1是因为BScroll为了无缝滚动，会前后各复制一份slider，所以要减1获取真实的页数
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex

          // 通过滚动结束事件，如果autoPaly为true，则在调用_play方法，实现无限轮播
          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })

        // this.slider.on('beforeScrollStart', () => {
        //   if (this.autoPlay) {
        //     clearTimeout(this.timer)
        //   }
        // })
      },
      _initDots() {
        // new一个带长度空数组，循环这个数组等到dots
        this.dots = new Array(this.children.length)
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          // goToPage方法是BScroll封装的接口，0为X轴滚动，400为滚动间隔
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>