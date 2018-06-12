<template>
    <div class="pay-setting-object">
      <div class="pay-setting-content">
        <payment-info></payment-info>
      </div>
    </div>
</template>

<script>
import paymentInfo from '@/components/payment-info'
export default {
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
  },
  components: {
    paymentInfo
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
