<template>
  <div>
    <menu-left routeIndex="4-2"></menu-left>
    <div class="orderRebate">
      <div class="title">
        <span>退款维权 > 处理退款</span>
        <el-steps :active="tradeType" v-if="tradeType < 3" align-center finish-status="success">
          <el-step title="买家申请退款"></el-step>
          <el-step title="商家处理退款"></el-step>
          <el-step title="退款完成"></el-step>
        </el-steps>
      </div>
      <div class="rebateDetail">
          <div class="content">
            <div style="flex: 1;">
              <div class="rebateInfo">
                <div><label>订单编号：</label><label>{{rebateDetail.order_no}}</label></div>
                <div><label>创建时间：</label><label>{{rebateDetail.created_at}}</label></div>
                <div v-if="rebateDetail.order"><label>付款时间：</label><label>{{rebateDetail.order.paid_at}}</label></div>
                <div><label>退款编号：</label><label>{{rebateDetail.no}}</label></div>
              </div>
              <div class="buyer" v-if="rebateDetail.order">
                <div><label>买家手机号：</label><label>{{rebateDetail.order.mobile}}</label></div>
                <div style="display: flex"><label style="display: inline-block;width: 80px;">商品名称：</label><label style="display: inline-block">{{rebateGoodsDetail}}</label></div>
              </div>
              <div class="buyer">
                <div><label>期望结果：</label><label>退货退款</label></div>
                <div><label>退款金额：</label><label>¥ {{rebateDetail.refund_amount}} （含运费）</label></div>
                <div><label>退款原因：</label><label>{{rebateDetail.reason}}</label></div>
              </div>
              <div class="trade">沟通记录</div>
              <div class="dialogue" v-for="(item,index) in rebateDetail.logs" :key="index" :style="{background: (index % 2 == 0 ? '#F4F4F4' : '#FFFFFF')}">
                <p class="user">
                  <label>{{index % 2 == 0 ? '卖家' : '买家'}}</label>
                  <label>{{item.created_at}}</label>
                </p>
                <div>
                  <label>操作行为：</label>
                  <label>发起退款  I  退货退款</label>
                </div>
                <div>
                  <label>退款金额：</label>
                  <label>¥ {{rebateDetail.refund_amount}}</label>
                </div>
                <div>
                  <label>留&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言：</label>
                  <label>{{item.remark}}</label>
                </div>
              </div>
            </div>
            <div class="right" v-if="tradeType < 3 ">
                <div class="top" v-if="tradeType == 0">
                  <label  class="agree" @click="editorDetail(3)">同意</label>
                  <label  class="disagree" @click="editorDetail(2)">拒绝</label>
                </div>
                <div class="tip" v-if="tradeType == 0">留言：</div>
                <textarea v-if="tradeType == 0" id="tips" v-model="resRemark" cols="30" rows="10">
                </textarea>
                <div v-else class="refund-step-end">
                  <img v-if="tradeType == 1" src="/static/icon/hourglass.png">
                  <i v-else class="icon-成功 green"></i>
                  <span :style="{color: (tradeType == 1 ? '#FFAC5A' : '#2CBA4A')}">{{tradeType == 1 ? '处理中' : '退款完成'}}</span>
                </div>
                <div class="money">
                  <label>退款金额：</label>
                  <label>￥999.00</label>
                </div>
                <div class="bank">
                  <label>退款至：</label>
                  <label>招商银行（银行卡）</label>
                </div>
                <div class="warn">
                  <label>友情提醒：</label>
                  <label>如通过：“微信支付-代销”付款订单，退款3个工作日到账。</label>
                  <label>如通过“微信支付-自有”付款订单，需要前往对应财付通帐号进行退款操作</label>
                </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {refundDetail, editorRefundDetail} from '../axios/api'
import menuLeft from '@/components/menu-left'
export default {
  data () {
    return {
      tradeType: 0,
      resRemark: '',
      rebateDetail: {}
    }
  },
  mounted () {
    this.setMenuLeft('/orderAfterSale')
    refundDetail(this.$route.query.id).then(res => {
      console.log(res)
      this.rebateDetail = res.data
      this.tradeType = res.data.status - 1
      console.log(this.tradeType)
    })
  },
  methods: {
    ...mapMutations(['setMenuLeft']),
    // 编辑售后订单信息，改变状态
    editorDetail (value) {
      let params = {}
      params.status = value
      params.remark = this.resRemark
      params.id = this.rebateDetail.id
      editorRefundDetail(params).then(res => {
        if (res.status == 200) {
          refundDetail(this.$route.query.id).then(res => {
            this.rebateDetail = res.data
            this.tradeType = value - 1
          })
        }
      })
    }
  },
  computed: {
    rebateGoodsDetail () {
      let name = ''
      if (this.rebateDetail.items.length == 1) {
        name = this.rebateDetail.items[0].name
      } else {
        let len = this.rebateDetail.items.length
        for (let i = 0; i < len - 1; i++) {
          name = this.rebateDetail.items[i].name + '/'
        }
        name += this.rebateDetail.items[len - 1]
      }
      return name
    }
  },
  components: {
    menuLeft
  }
}
</script>

<style lang="less">
  @import '../fonts/icomoon.css';
  .orderRebate {
    .el-steps--horizontal {
      white-space: nowrap;
      width: 60%;
      margin-top: 20px;
    }
    .el-input{
      width: 133px;
      height: 27px;
      .el-input__inner{
        width: 133px;
        height: 27px;
        border-radius: 0;
      }
    }
  }
</style>
<style scoped lang="less">
  .money{
    margin-top: 30px;
    label:nth-child(1){
      font-size: 12px;
      color: #999999;
    }
    label:nth-child(2){
      color: #DE5B67 ;
      font-size: 12px;
    }
  }
  .bank{
    margin-top: 10px;
    padding-bottom: 200px;
    border-bottom: 1px dashed #efefef;
    label:nth-child(1){
      font-size: 12px;
      color: #999999;
    }
    label:nth-child(2){
      color: #151515;
      font-size: 12px;
    }
  }
  .warn{
    margin-top: 25px;
    label{
      display: block;
      font-size: 12px;
      line-height: 16px;
      color: #999999;
    }
    label:nth-child(2){
      margin-top: 15px;
    }
  }
  .right{
    padding: 20px;
    width: 34%;
    .tip{
      margin-top: 30px;
      font-size: 12px;
      color: #999999;
    }
    #tips{
      display: block;
      width:100%;
      margin-top: 13px;
      resize:none;
      padding:5px;
      font-size: 12px;
      color: #333;
      line-height:16px;
      border: 1px solid #efefef;
    }
    .top{
      display: flex;
      justify-content: center;
      label:nth-child(1){
        margin-right: 30px;
        background: #63A4FF;
        width: 100px;
        height: 30px;
        border-radius: 2px;
        color:#fff;
        font-size: 12px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
      }
      label:nth-child(2){
        border:1px solid #333;
        font-size: 12px;
        box-sizing: border-box;
        width: 100px;
        height: 30px;
        border-radius: 2px;
        color:#333;
        line-height: 28px;
        text-align: center;
        cursor: pointer;
      }
    }
    .refund-step-end {
      display: flex;
      flex-direction: column;
      height: 256px;
      align-items: center;
      justify-content: center;
      i {
        font-size: 100px;
        padding-right: 10px;
        display: inline-block;
        vertical-align: middle;
      }
      i.yellow::before {
        color: rgba(44, 186, 74, 1.0);
      }
      i.green::before {
        color: rgba(44, 186, 74, 1.0)
      }
      span {
        font-size: 14px;
        margin-top: 10px;
        letter-spacing: 1px;
        font-weight: 600;
      }
    }
  }
  .dialogue{
    padding-left: 8px;
  }
  .dialogue p{
    padding-top:20px;
    font-size: 12px;
    color: #333333;
    padding-bottom: 10px;
    border-bottom: 1px solid #EFEFEF;
  }
  .dialogue div:last-child{
    padding-bottom:20px;
  }
  .dialogue div{
    font-size: 12px;
    color: #999999;
    margin-top: 10px;
    label:nth-child(2){
      color: #151515;
    }
  }
  .left{
    width:66%;
    padding-right: 10px;
    border-right: 1px solid #EFEFEF;
  }
  .orderRebate {
    margin: 0 20px 0 200px;
    position: relative;
    min-width: 1000px;
    .title{
      font-size: 12px;
      color: #333333;
      padding: 20px;
      margin-top: 20px;
      margin-bottom: 20px;
      background: #fff;
    }
    .rebateDetail{
      padding: 20px;
      background: #fff;
      box-sizing: border-box;
      .content{
        border: 1px solid #D5D5D5;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        width: 100%;
        .buyer , .rebateInfo{
          background:#EFEFEF;
          display: flex;
          flex-wrap:wrap;
          justify-content: flex-start;
          padding:0 10px 10px;
          div{
            width: 33%;
            margin-top: 10px;
            label:nth-child(1){
              font-family: MicrosoftYaHei;
              font-size: 12px;
              color: #999999;
            }
            label:nth-child(2){
              font-family: MicrosoftYaHei;
              font-size: 12px;
              color: #151515;
            }
          }
        }
        .trade{
          padding-left: 20px;
          position: relative;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #333333;
          margin-top:30px;
          padding-bottom: 20px;
          border-bottom:1px dashed #EFEFEF;
        }
        .trade::after{
          background: #999999;
          width: 3px;
          height: 13px;
          left:9px;
          top:4px;
          position: absolute;
          content: '';
          display:block;
        }
        .buyer{
          background:#fff;
          border-bottom: 1px solid #EFEFEF;
          div{
            width: 38%;
          }
        }
      }
    }
  }
</style>
