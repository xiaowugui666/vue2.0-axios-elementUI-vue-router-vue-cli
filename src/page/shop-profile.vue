<template>
    <div>
      <menu-left-com></menu-left-com>
      <div style="margin-left: 200px;">店铺概况</div>
    </div>
</template>

<script>
import menuLeftCom from '@/components/menu-left'
import echarts from '@/components/echarts'
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
    }
  },
  components: {
    echarts,
    menuLeftCom
  },
  computed: {
    ...mapState(['menuLeft'])
  },
  methods: {
    ...mapMutations(['setMenuLeft'])
  }
}
</script>

<style scoped>

</style>
