<template>
  <div id="app">
    <menu-left></menu-left>
    <router-view/>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
export default {
  name: 'App',
  components: {
    menuLeft
  }
}
</script>

<style lang="less">
@import "style/common.less";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background: #fafafa;
}
</style>
