<template>
  <div class="menu-left" :style="{height: clientHeight}">
    <div class="mall-logo">
      <img src="../assets/logo.png" alt="">
      <span>一起选·商城</span>
    </div>
    <el-menu
      default-active="1"
      text-color="#666"
      active-text-color="#333">
      <el-menu-item index="1">
        <i class="icon-设置"></i>
        <span>设置</span>
      </el-menu-item>
    </el-menu>
    <div class="menu-left-bottom-logo">- 虎赞科技 -</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      clientHeight: this.getClientHeight()
    }
  },
  methods: {
    getClientHeight () {
      let height = document.documentElement.clientHeight + 'px'
      return height
    }
  }
}
</script>

<style scoped lang="less">
  @import '../fonts/icomoon.css';
  .menu-left {
    top: 0;
    left: 0;
    z-index: 99;
    width: 180px;
    min-height: 600px;
    background: #fff;
    position: fixed;
    box-shadow: 3px 0 2px #eee;
  }
  .el-submenu .el-menu-item {
    min-width: auto;
    padding-left: 60px;
  }
  .mall-logo {
    height: 76px;
    line-height: 76px;
    text-align: center;
    img {
      vertical-align: middle;
      margin-left: -10px;
    }
    span {
      vertical-align: middle;
      color: #666;
    }
  }
  .el-menu {
    border-right: none;

    i {
      font-size: 18px;
      padding-right: 5px;
    }
  }
  .el-menu-item {
    height: 40px;
    line-height: 40px;

    &.is-active {
      background: #EFEFEF;
    }
    &.is-active::before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background: #DA3A48;
    }
  }
  .menu-left-bottom-logo {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #888;
    z-index: -1;
  }
</style>
<style>
  .el-submenu__title {
    height: 40px;
    line-height: 40px;
  }
  .el-menu-item-group__title {
    height: 0;
    padding: 0;
    display: none;
  }
</style>
