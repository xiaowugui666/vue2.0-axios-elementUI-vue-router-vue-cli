<template>
    <div>
      <menu-left routeIndex="8-2"></menu-left>
      <div class="time-setting-subject">
        <div class="order-cancellation-time plate">
          <div class="plate-top">
            <span>待付款订单取消时间设置</span>
          </div>
          <div class="order-cancellation-set plate-inner">
            <div>
              <span>拍下未付款订单</span>
              <input v-model="cancellationTime" :disabled="!editState" type="tel" @blur="limitInput(1)" maxlength="4" onkeyup="value=value.replace(/[^\d]/g,'')" min="20" max="1440">
              <span>分钟内未付款，自动取消订单</span>
            </div>
            <p>订单取消时间必须在20-1440分钟之间</p>
          </div>
        </div>
        <div class="confirmation-receipt-time plate">
          <div class="plate-top">
            <span>发货后自动确认收货时间设置</span>
          </div>
          <div class="confirmation-receipt-time-set plate-inner">
            <div>
              <span>发货后</span>
              <input v-model.trim="receiptTime" :disabled="!editState" type="tel" maxlength="2" @blur="limitInput(2)" onkeyup="value=value.replace(/[^\d]/g,'')" min="20" max="1440">
              <span>天，自动确认收货</span>
            </div>
            <p>自动确认收货时间必须在7-30天之间</p>
          </div>
        </div>
        <div class="edit-btn">
          <el-button v-show="!editState" type="primary" size="small" @click="editClick" style="padding-left: 25px;padding-right: 25px;">编辑</el-button>
          <el-button v-show="editState" type="success" size="small" @click="saveClick" style="padding-left: 25px;padding-right: 25px;">保存</el-button>
        </div>
      </div>
    </div>
</template>

<script>
import {initialSetData} from '../axios/api'
import menuLeft from '@/components/menu-left'
export default {
  data () {
    return {
      editState: false,
      cancellationTime: '',
      receiptTime: ''
    }
  },
  components: {
    menuLeft
  },
  methods: {
    // 限制输入
    limitInput (val) {
      if (val == 1) {
        this.cancellationTime = this.watchInput(this.cancellationTime, 20, 1440)
      } else if (val == 2) {
        this.receiptTime = this.watchInput(this.receiptTime, 7, 30)
      }
    },
    editClick () {
      this.editState = !this.editState
    },
    saveClick () {
      let data = {
        order_expire_time: parseInt(this.cancellationTime) * 60,
        confirm_goods_time: parseInt(this.receiptTime)
      }
      initialSetData('put', data).then(res => {
        this.editState = !this.editState
      }).catch(err => {
        this.$message.error(err.response.data.message)
      })
    },
    watchInput (s, mix, max) {
      if (s < mix) {
        s = mix
      } else if (s > max) {
        s = max
      }
      return s
    }
  },
  created () {
    initialSetData('get').then(res => {
      console.log(res.data)
      this.cancellationTime = res.data.order_expire_time ? res.data.order_expire_time / 60 : res.data.order_expire_time
      this.receiptTime = res.data.order_auto_confirm_days
    })
  }
}
</script>

<style scoped lang="less">
  @import "../fonts/icomoon.css";
  .time-setting-subject {
    min-width: 1000px;
    padding-top: 20px;
    margin: 0 20px 0 200px;
    input {
      color: #333;
      border: 1px solid #d5d5d5;
      display: inline-block;
      width: 60px;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      padding-right: 10px;
      text-align: center;
      margin: 0 10px;
      &::-webkit-input-placeholder {
        color: #b5b5b5;
      }
    }
  }
  .plate {
    padding: 20px 15px;
    margin-bottom: 20px;
    background: #fff;
    color: #333;
    font-size: 12px;
    line-height: 15px;
    .plate-top {
      font-size: 14px;
      border-bottom: 2px solid #f5f5f5;
      padding-bottom: 20px;
      padding-left: 5px;
      &::before {
        content: '';
        display: block;
        float: left;
        width: 3px;
        height: 14px;
        margin-top: 1px;
        margin-right: 10px;
        background: #999;
      }
    }
    .plate-inner {
      color: #666;
      font-size: 12px;
      padding: 20px 10px 0;
      p {
        color: rgba(238,145,77,0.93);
        padding-top: 20px;
      }
    }
  }
  .edit-btn {
    position: fixed;
    top: 32px;
    right: 40px;
  }
</style>
