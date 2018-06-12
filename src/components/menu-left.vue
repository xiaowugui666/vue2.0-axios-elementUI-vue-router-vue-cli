<template>
  <div class="menu-left" :style="{height: clientHeight}">
    <div class="mall-logo">
      <img src="../assets/logo.png" alt="">
      <span>一起选·商城</span>
    </div>
    <el-menu
      :default-active="routeIndex"
      @open="handleOpen"
      @close="handleClose"
      text-color="#666"
      active-text-color="#333"
      router
      >
      <el-menu-item index="1" route="/">
        <i class="icon-概况"></i>
        <span>概况</span>
      </el-menu-item>
      <el-menu-item index="2" route="/shop-profile">
        <i class="icon-店铺"></i>
        <span>店铺</span>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i class="icon-商品"></i>
          <span>商品</span>
        </template>
          <el-menu-item index="3-1" route="/commodity-management">商品管理</el-menu-item>
          <!--<el-menu-item index="/oneKeyIntroduction">一键导入</el-menu-item>-->
          <el-menu-item index="3-2" route="/category-management">类目管理</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="icon-订单"></i>
          <span>订单</span>
        </template>
          <el-menu-item index="4-1" route="/order-management">订单管理</el-menu-item>
          <el-menu-item index="4-2" route="/order-afterSale">订单售后</el-menu-item>
      </el-submenu>
      <el-menu-item index="5" route="/customer-management">
        <i class="icon-客户"></i>
        <span>客户</span>
      </el-menu-item>
      <el-menu-item index="6" route="/account">
        <i class="icon-账户"></i>
        <span>账户</span>
      </el-menu-item>
      <el-submenu index="7">
        <template slot="title">
          <i class="icon-营销"></i>
          <span>营销管理</span>
        </template>
          <el-menu-item index="7-1" :route="{name:'marketingManagement',params:{class:'special-offer'}}">特价</el-menu-item>
          <el-menu-item index="7-2" :route="{name:'marketingManagement',params:{class:'recommend'}}">推荐</el-menu-item>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <i class="icon-设置"></i>
          <span>设置</span>
        </template>
          <el-menu-item index="8-1" route="/information-setting">信息设置</el-menu-item>
          <el-menu-item index="8-2" route="/order-setting">订单设置</el-menu-item>
          <el-menu-item index="8-3" route="/pay-setting">支付设置</el-menu-item>
          <el-menu-item index="8-4" route="/mp-setting">小程序设置</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="menu-left-bottom-logo">- 虎赞科技 -</div>
    <!--<div><router-link :to="{name:'marketingManagement',params:{user:'recommend'}}">123123213213</router-link></div>-->
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      clientHeight: this.getClientHeight()
    }
  },
  props: ['routeIndex'],
  mounted () {
    // this.getRoutePath(this.menuLeft)
  },
  computed: {
    ...mapState(['menuLeft'])
  },
  methods: {
    ...mapMutations(['setMenuLeft']),
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    getClientHeight () {
      let height = document.documentElement.clientHeight + 'px'
      return height
    },
    getRoutePath (m) {
      if (m) {
        return m
      } else {
        let _this = this
        return _this.$route.path
      }
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
  overflow-y: auto;
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
  border-bottom: 2px solid #f5f5f5;

  img {
    vertical-align: middle;
    margin-left: -10px;
    margin-right: 10px;
    width: 34px;
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
