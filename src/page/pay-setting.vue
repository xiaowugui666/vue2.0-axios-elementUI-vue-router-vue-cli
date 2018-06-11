<template>
    <div class="pay-setting-object">
      <div class="pay-setting-content">
        <payment-info :agreement-show="agreementShow"></payment-info>
      </div>
    </div>
</template>

<script>
import paymentInfo from '@/components/payment-info'
export default {
  data () {
    return {
      agreementShow: false
    }
  },
  components: {
    paymentInfo
  },
  mounted () {
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
