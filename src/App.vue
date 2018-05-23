<template>
  <div id="app">
    <menu-left v-if="menuShow"></menu-left>
    <router-view/>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
import {mapState} from 'vuex'
export default {
  name: 'App',
  components: {
    menuLeft
  },
  computed: {
    ...mapState(['menuShow'])
  }
}
</script>

<style lang="less">
@import "style/common.less";
body {
  background: #F7F7F7;
}
</style>
