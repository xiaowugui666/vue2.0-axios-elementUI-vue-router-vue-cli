<template>
  <div id="app">
    <menu-left v-if="menuShow"></menu-left>
    <router-view/>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'App',
  components: {
    menuLeft
  },
  beforeUpdate () {
    this.setMenuLeft('')
  },
  methods: {
    ...mapMutations(['setMenuLeft', 'setMenuShow'])
  },
  computed: {
    ...mapState(['menuShow'])
  }
}
</script>

<style lang="less">
</style>
