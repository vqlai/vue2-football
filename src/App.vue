<template>
  <div id="app">
    <top></top>
    <tab></tab>
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Top from 'components/top/top'
import Tab from 'components/tab/tab'
export default {
  name: 'app',
  data() {
    return{
    }
  },
  methods: {
  },
  components: {
    Top,
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#app
  text-align: center
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
