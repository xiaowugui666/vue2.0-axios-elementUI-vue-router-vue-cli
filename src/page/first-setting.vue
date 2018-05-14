<template>
    <div>
      <first-setting-menu></first-setting-menu>
      <div class="first-setting-object">
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
      </div>
    </div>
</template>

<script>
import firstSettingMenu from '@/components/first-setting-menu'
export default {
  data () {
    return {
      active: 2
    }
  },
  components: {
    firstSettingMenu
  }
}
</script>

<style scoped lang="less">
.first-setting-object {
  margin-left: 200px;
  margin-right: 20px;
  padding-top: 20px;
}
</style>
