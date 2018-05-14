<template>
  <div>
    <first-setting-menu></first-setting-menu>
    <div class="first-setting-object">
      <div v-show="settingStep" class="setting-step">
        <el-steps :active="active" finish-status="success">
          <el-step title="主体信息"></el-step>
          <el-step title="店铺信息"></el-step>
          <el-step title="支付信息"></el-step>
        </el-steps>
      </div>
      <div v-show="!settingStep" class="authorized-small-program-object" :style="{height:authorizedHeight}">
        <div class="authorized-small-program-title ">
          <span>小程序授权</span>
        </div>
        <div class="authorized-small-program-body">
          <h2>授权小程序就能开店啦</h2>
          <p>点击下面授权按钮，用小程序管理员微信号扫描授权即可开店</p>
          <el-row>
            <el-button type="success" size="small">已有小程序，授权</el-button>
            <el-button size="small">未注册过小程序？注册小程序</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firstSettingMenu from '@/components/first-setting-menu'
export default {
  data () {
    return {
      settingStep: false,
      authorizedHeight: this.setAuthorizedHeight(),
      active: 3
    }
  },
  mounted () {
  },
  components: {
    firstSettingMenu
  },
  methods: {
    setAuthorizedHeight () {
      let wHeight = document.documentElement.clientHeight - 40 + 'px'
      return wHeight
    }
  }
}
</script>

<style scoped lang="less">
  .first-setting-object {
    margin-left: 200px;
    margin-right: 20px;
    padding-top: 20px;
    min-width: 1000px;
    .authorized-small-program-object {
      background: #fff;
      min-height: 600px;
      position: relative;
      padding: 0 15px;
      .authorized-small-program-title {
        padding: 20px 0;
        border-bottom: 2px solid #f5f5f5;
        span {
          font-size: 14px;
          line-height: 17px;
          color: #333;
          &::before {
            content: '';
            display: block;
            float: left;
            width: 3px;
            height: 14px;
            background: #999;
            margin: 5px 10px 0 5px;
          }
        }
      }
      .authorized-small-program-body {
        position: absolute;
        text-align: center;
        top: 40%;
        left: 50%;
        transform: translate(-50%);
        h2 {
          color: #333;
          font-size: 30px;
          font-weight: normal;
        }
        p {
          padding-top: 40px;
          padding-bottom: 20px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
</style>
