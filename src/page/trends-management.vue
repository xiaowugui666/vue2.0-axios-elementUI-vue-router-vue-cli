<template>
  <div>
    <menu-left routeIndex="9-1"></menu-left>
    <div class="trends-content">
      <div class="trends-header">
        <div>
          <span>关键字</span>
          <el-input
            size="small">
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
export default {
  data () {
    return {}
  },
  computed: {
  },
  components: {
    menuLeft
  }
}
</script>

<style scoped lang="less">
.trends-content {
  min-width: 1000px;
  margin: 0 20px 0 200px;
  padding-top: 20px;
  position: relative;
}
</style>
