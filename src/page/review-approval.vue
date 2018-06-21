<template>
  <div>
    <menu-left routeIndex="9-2"></menu-left>
    <div class="review-content">我是评论审批</div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
    menuLeft
  }
}
</script>

<style scoped lang="less">
.review-content {
  min-width: 1000px;
  margin: 0 20px 0 200px;
  padding-top: 20px;
  position: relative;
}
</style>
