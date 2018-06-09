<template>
    <div class="pay-setting-object">
      <div class="pay-setting-content">
        <payment-info :busiInformation="busiInformation" :agreement-show="agreementShow" @changeSetting="configSetting"></payment-info>
      </div>
    </div>
</template>

<script>
import paymentInfo from '@/components/payment-info'
import {orderSetting, orderSettingPut} from '../axios/api'
export default {
  data () {
    return {
      agreementShow: false,
      busiInformation: {}
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
  },
  methods: {
    configSetting (value, type) {
      let params = this.busiInformation
      if (type == 1) {
        params.merchant_no = value
      } else if (type == 2) {
        params.merchant_key = value
      } else if (type == 3) {
        console.log(value)
        params.merchant_cert = value
      }
      orderSettingPut(params).then(res => {
        console.log(res)
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
