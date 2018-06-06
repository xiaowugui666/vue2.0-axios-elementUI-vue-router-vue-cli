<template>
    <div class="binding-mp-object">
      <div class="authorized-small-program-object">
        <div class="authorized-small-program-body ctt">
          <h2>授权小程序就能开店啦</h2>
          <p>点击下面授权按钮，用小程序管理员微信号扫描授权即可开店</p>
          <el-row>
            <el-button type="success" @click="authorizationMp" size="small">已有小程序，授权</el-button>
            <el-button size="small" @click="openRegisterMp">未注册过小程序？注册小程序</el-button>
          </el-row>
        </div>
      </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {bindingMp} from '../axios/api'
export default {
  data () {
    return {
    }
  },
  created () {
    this.setMenuShow(false)
  },
  methods: {
    ...mapMutations(['setMenuShow']),
    openRegisterMp () {
      window.open('https://mp.weixin.qq.com/')
    },
    authorizationMp () {
      bindingMp().then(res => {
        console.log(res.data)
        // location.href = res.data.auth_url
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    ...mapState(['menuShow'])
  }
}
</script>

<style scoped lang="less">
.binding-mp-object {
  .authorized-small-program-object {
    background: #fff;
    min-height: 600px;
    position: relative;
    padding: 0 15px;
    height: 100vh;
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
      text-align: center;
      top: 40%;
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
