<template>
  <div class="page-404">
    <error></error>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import error from '../components/error'
export default {
  data () {
    return {}
  },
  created () {
  },
  methods: {
  },
  computed: {
    ...mapState(['menuShow'])
  },
  components: {
    error
  }
}
</script>

<style scoped lang="less">
.page-404 {
}
</style>
