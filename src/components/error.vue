<template>
  <div class="error-object ctt">
    <label class="error-img"><img src="../assets/error-img.png" alt=""></label>
    <div class="error-info">
      <h2 class="err-num">404</h2>
      <p class="err-txt">很抱歉，页面出错了，程序猿小哥哥正在疯狂</p>
      <el-button @click="goBack" class="go-back" type="success" size="small">返回上一页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    goBack () {
      window.history.back()
    }
  }
}
</script>

<style scoped lang="less">
  .error-object {
    top: 40%;
    font-size: 0;
    .error-img {
      display: inline-block;
      vertical-align: middle;
      width: 267px;
      height: 184px;
      margin-right: 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .error-info {
      display: inline-block;
      vertical-align: top;
      height: 184px;
      font-size: 12px;
      position: relative;
      .err-num {
        font-size: 62px;
        color: @mainC;
        line-height: 53px;
        font-weight: normal;
        padding-top: 8px;
      }
      .err-txt {
        font-size: 12px;
        color: @b6;
        line-height: 20px;
        padding-top: 15px;
      }
      .go-back {
        width: 120px;
        height: 30px;
        padding: 0;
        position: absolute;
        bottom: 5px;
        left: 0;
      }
    }
  }
</style>
