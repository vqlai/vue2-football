<template>
  <div class="sidebar" v-show="showSidebar">
    <transition name="slide">
      <div class="wrapper" v-show="showSidebar">
        <i class="iconfont icon-close" @click="close"></i>
        <div class="top">
          <img src="../../common/images/logo.png">
        </div>
        <div class="content">
          <p>I'm cisco_lai</br>web and h5 coder</p>
          <h3>如果本项目对您有帮助，</br>您可以扫二维码打赏我哟，</br>感谢您的支持，谢谢！</h3>
        </div>
        <div class="code"><img src="../../common/images/code.jpg" alt=""></div>
      </div>
      </transition>
    <div class="mask" @click.stop="hideSidebar"></div>
  </div>
</template>

<script>
// 注意动画效果如果是组件内要搭配v-show，如果是在引用的组件包裹的transition则需要用v-if
// css动画的样式要写在transition标签里面的第一个元素下面
  export default {
    props: {
      showSidebar: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    methods: {
      hideSidebar() {
        // 只能通过$emit发送事件到父组件里改变showSidebar的值为false才能隐藏sidebar，在这里直接将showSidebar的值改为false的话不但没效果还报错。
        this.$emit('closeSidebar')
      },
      close() {
        this.$emit('closeSidebar')
      }
    },
  	mounted() {
      setTimeout(() => {
      },20)
  	}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .sidebar
    .mask
      position: fixed
      top: 0
      right: 0
      bottom: 0
      left: 0
      z-index: 30
      background: rgba(0,0,0,.6)
    .wrapper  
      width: 60%
      height: 100%
      position: fixed
      top: 0
      right: 0
      z-index: 40
      background: #2d3044
      color: #16b13a
      &.slide-enter-active, &.slide-leave-active
        transition: all 0.3s ease
      &.slide-enter, &.slide-leave-to
        transform: translate3d(50%, 0, 0)
      .icon-close
        position: absolute
        top: 0
        right: 0
        z-index: 42
        padding: .5rem
        font-size: 1.2rem
        color: #fff
      &:after
        content: 'X'
        position: absolute
        top: .5rem
        right: .5rem
        color: #fff
        font-size: 1.2rem
        display: none
      .top
        width: 5rem
        height: 5rem
        margin: 0 auto
        padding: 25% 0 4% 0
        img
          width: 100%
      .content
        p
          font-size: 1.2rem
          line-height: 1.4rem
          color: #fff
        h3
          padding-top: 8%
          color: rgba(244,210,32,1)
          font-size: 1.2rem
          line-height: 1.4rem
      .code
        margin: 0 auto
        padding: 12% 10%
        img
          width: 100%
</style>