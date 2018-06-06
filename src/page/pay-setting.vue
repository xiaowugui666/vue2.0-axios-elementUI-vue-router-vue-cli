<template>
    <div class="pay-setting-object">
      <div class="pay-setting-content">
        <payment-info :busiInformation="busiInformation" :token="token" :agreement-show="agreementShow" @changeSetting="configSetting"></payment-info>
      </div>
    </div>
</template>

<script>
import paymentInfo from '@/components/payment-info'
import {orderSetting, orderSettingPut, getQnToken} from '../axios/api'
export default {
  data () {
    return {
      agreementShow: false,
      busiInformation: {},
      token: ''
    }
  },
  components: {
    paymentInfo
  },
  mounted () {
    orderSetting().then(res => {
      console.log(res)
      this.busiInformation = res.data
    })
    this.getToken()
  },
  methods: {
    configSetting (value, type) {
      console.log(value)
      console.log(type)
      let params = this.busiInformation
      if (type == 1) {
        params.merchant_cert = value
      } else if (type == 2) {
        params.merchant_key = value
      } else {
        params.merchant_no = value
      }
      orderSettingPut(params).then(res => {
        console.log(res)
      })
    },
    getToken () {
      getQnToken('document').then(res => {
        console.log(res)
        this.token = res.data
      })
    }
  }
}
</script>

<style scoped lang="less">
  .pay-setting-object {
    margin-left: 200px;
    margin-right: 20px;
    padding-top: 20px;
    min-width: 1100px;
    .pay-setting-content {
      background: #fff;
      padding-left: 20PX;
      padding-bottom: 20PX;
    }
  }
</style>
