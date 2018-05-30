<template>
    <div>
      <div class="orderDetail">
        <div class="top">
          <div class="title">订单管理 > 订单详情</div>
          <el-steps :active="tradeType" align-center  finish-status="success" >
            <el-step title="待付款"></el-step>
            <el-step title="已付款"></el-step>
            <el-step title="已发货"></el-step>
            <el-step title="确认收货"></el-step>
          </el-steps>
        </div>
        <div class="tradeList">
            <div class="top">
              <label>订单编号：{{tradeList.no}}</label>
            </div>
            <div class="orderInfo">
                  <div class="left">
                      <div>
                        <label><i>买家微信：</i>248773573799</label>
                        <label><i>买家手机号：</i>{{tradeList.mobile}}</label>
                      </div>
                      <div>
                        <label><i>收货人名：</i>{{tradeList.consignee}}</label>
                        <label><i>收货人手机号：</i>13566774466</label>
                      </div>
                      <div><i>收货地址：</i>{{tradeList.address_detail}}</div>
                      <div v-if="tradeType == 1 || tradeType > 1">
                        <label>
                          <i>快递公司：</i>
                          <el-select
                            v-if="isCompile"
                            v-model="transCompValue"
                            clearable>
                            <el-option
                              v-for="item in transComp"
                              :key="item"
                              :value="item"></el-option>
                          </el-select>
                          <label v-else>{{expressCompany}}</label>
                        </label>
                        <label>
                            <i>快递单号：</i>
                              <input v-if="isCompile" type="text"  v-model.trim="expressNo">
                              <label v-else>{{tradeList.express_no}}</label>
                        </label>
                        <el-button v-if="isCompile" @click="commitTrade" size="small" type="success">提交</el-button>
                      </div>
                  </div>
                  <div class="right">
                    <div>
                      <label><i>创建时间：</i>2018-08-22    12:33</label>
                      <label v-if="tradeType>1"><i>付款时间：</i>2018-08-22    12:35</label>
                    </div>
                    <div>
                      <label v-if="tradeType>2"><i>发货时间：</i>2018-08-23    10:38</label>
                      <label v-if="tradeType>3"><i>收货时间：</i>2018-08-27    20:17</label>
                    </div>
                  </div>

            </div>
            <div class="content" v-if="tradeList.items">
              <div>
                <div class="prolist" v-for="(item,index) in tradeList.items" :key="index">
                  <div class="proInfo">
                    <img :src="item.cover_url" alt="">
                    <div class="desc">{{item.name}}</div>
                  </div>
                  <div class="proNum">数量 x{{item.count}}</div>
                  <div class="price">
                    <label>￥</label>
                    <label>{{item.price | money }}</label>
                  </div>
                </div>
              </div>
              <div class="orderMon" :style="{height: tradeList.items.length * 80 + 'px'}">
                <label>
                  <label>运费：</label>
                  <label>{{tradeList.express_amount | money }}</label>
                </label>
                <label v-if="isPrice">￥{{tradeList.amount | money }}</label>
                <label v-else>￥<input type="tel" v-model.trim="inputPrice"></label>
                <label @click="changeCompile" v-if="isPrices">编辑订单</label>
                <div @click="changeSave" class="saveCompile" v-if="isSave">保存</div>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>
<script>
import {orderDetail, transComp, orderPrice, orderExpress} from '@/axios/api'
export default {
  data () {
    return {
      // 保存订单信息
      order: [],
      // 是否保存
      isSave: false,
      // 是否更改价格
      isPrice: true,
      isPrices: false,
      // 添加物流信息
      isCompile: false,
      // 订单状态
      tradeType: 2,
      // 快递公司
      transComp: {},
      transCompValue: '',
      // 订单详情
      tradeList: {}
    }
  },
  methods: {
    changeCompile () {
      this.isPrice = false
      this.isPrices = false
      this.isSave = true
    },
    // 点击保存
    changeSave () {
      this.isSave = false
      this.isPrice = true
      this.isPrices = true
      // 修改订单价格，参数： id  amount  express_amount
      orderPrice({
        id: this.$route.params.id,
        amount: this.tradeList.amount
      }).then(res => {
        console.log(res)
      })
    },
    // 提交快递信息
    commitTrade () {
      let params = {}
      params.id = this.tradeList.id
      // 拿到快递公司对应的键值
      let expressCode = ''
      for (let i in this.transComp) {
        if (this.transComp[i] == this.transCompValue) {
          expressCode = i
        }
      }
      params.express_code = expressCode
      params.express_no = this.expressNo
      if (params.express_no && params.express_code) {
        orderExpress(params).then(res => {
          console.log(res)
          if (res.status == 200) {
            // 提交快递信息成功，请求订单信息，改变可视状态
            orderDetail(this.$route.params.id).then(res => {
              this.tradeType = 2
              this.isCompile = false
              this.tradeList = res.data
            })
          }
        })
      } else {
        this.$message('请选择快递公司并输入订单号')
      }
    }
  },
  mounted () {
    // 请求订单信息
    orderDetail(this.$route.params.id).then(res => {
      console.log(this.$route.params.id)
      console.log(res.data)
      this.tradeList = res.data
      // 更新订单完成状态
      if (res.data.status == 200) { // 待付款
        this.tradeType = 0
        // 显示编辑订单按钮
        this.isPrices = true
      } else if (res.data.status > 200 && res.data.status < 305) { // 已付款
        this.tradeType = 1
        // 显示物流公司选择框，显示订单编号输入框
        this.isCompile = true
      } else if (res.data.status > 300 && res.data.status < 405) { // 已发货
        this.tradeType = 2
      } else if (res.data.status > 400) { // 已收货
        this.tradeType = 3
      }
      console.log(this.tradeType)
      // 如果订单状态不为待付款，即tradeType > 0,请求快递公司信息
      if (this.tradeType > 0) {
        transComp().then(res => {
          console.log(res)
          this.transComp = res.data
        })
      }
    })
  },
  computed: {
    inputPrice: {
      get () {
        return this.tradeList.amount / 100
      },
      set (value) {
        this.tradeList.amount = value * 100
      }
    },
    // 快递公司
    expressCompany () {
      return this.transComp[this.tradeList.express_code]
    }
  }
}
</script>
<style lang="less">
  .orderDetail {
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
  .orderInfo{
    padding:12px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #EFEFEF;
    border-left: 1px solid #EFEFEF;
    border-right: 1px solid #EFEFEF;
    .right{
      >div:last-child{
        margin-top: 30px;
      }
    }
    .left{
      border-right: 1px solid #EFEFEF;
      input{
        border: 1px solid #efefef;
        height: 25px;
        font-size: 12px;
        padding-left: 5px;
        /*width: 150px;*/
      }
      div.el-select{
        width: 133px;
        height: 27px;
      }
    }
    >div{
      width: 50%;
      box-sizing: border-box;
      div:nth-child(3){
        padding-left: 20px;
      }
      div:nth-child(4){
        margin-top: 20px;
      }
      >div{
        display: flex;
        margin-top: 10px;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #151515;
        i{
          color: #999999;
        }
        label:first-child{
          padding-left: 20px;
        }
        label{
          width: 50%;
          text-align: left;
          font-family: MicrosoftYaHei;
          font-size: 12px;
          color: #151515;
          i{
            color: #999999;
          }
        }
      }
    }
  }
  .orderDetail{
    margin: 0 20px 0 200px;
    padding-top: 20px;
    position: relative;
    min-width: 1000px;
    .top{
      background: #fff;
      padding:20px;
      margin-bottom: 20px;
      .title{
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #333333;
      }
    }
    .tradeList {
      padding:20px 20px 30px;
      background: #fff;
      .top {
        background: #EFEFEF;
        border: 1px solid #D5D5D5;
        height: 40px;
        display: flex;
        margin-bottom: 0;
        align-items: center;
        box-sizing: border-box;
        line-height: 40px;
        label {
          font-family: MicrosoftYaHei;
          font-size: 12px;
          color: #333333;
          margin-left: 80px;
        }
        label:first-child {
          margin-left: 20px;
        }
      }
      .content {
        display: flex;
        width: 100%;
        justify-content: flex-start;
        align-items: center;
        >div{
          width: 100%;
        }
        .desc {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #333333;
        }
        img {
          width: 60px;
          height: 60px;
          padding: 0 10px;
        }

        .proInfo {
          width: 50%;
          display: flex;
          height: 100%;
          justify-content: flex-start;
          align-items: center;
          border-right: 1px solid #efefef;
          border-right: 1px solid #efefef;
          border-left: 1px solid #efefef;
        }
        .prolist {
          height: 80px;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          /*border-right: 1px solid #efefef;*/
          border-bottom: 1px solid #efefef;
        }
        .orderMon, .orderResult {
          height: 100%;
          width: 210px;
          display: flex;
          text-align: center;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-right: 1px solid #efefef;
          border-bottom: 1px solid #efefef;
        }
        .orderMon,.price{
          input{
            border: 1px solid #efefef;
            width: 80px;
            height:20px;
            margin-left: 5px;
            padding-left: 10px;
            box-sizing: border-box;
          }
        }
        .orderResult {
          >label:first-child {
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #333333;
            text-align: center;
          }
          >label:last-child {
            width: 70px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            border: 1px solid #63A4FF;
            border-radius: 2px;
            color: #63A4FF;
            font-size: 12px;
            margin: 0 auto;
            margin-top: 10px;
          }
        }
        .orderMon {
          >label:nth-child(2) {
            margin-top: 5px;
            font-size: 12px;
            color: #DE5B67;
          }
          >label:first-child {
            ont-family: MicrosoftYaHei;
            font-size: 12px;
            color: #666666;
          }
          >label:nth-child(3) {
            width: 70px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            border: 1px solid #63A4FF;
            border-radius: 2px;
            color:#63A4FF;
            font-size: 12px;
            margin: 0 auto;
            margin-top: 5px;
          }
          .saveCompile{
            width:80px;
            line-height: 25px;
            font-size: 12px;
            color: #FFFFFF;
            text-align: center;
            background: #DE5B67;
            border-radius: 2px;
            margin-top: 5px;
          }
        }
        .proNum {
          width: 25%;
          height: 100%;
          line-height: 80px;
          font-family: MicrosoftYaHei;
          font-size: 12px;
          color: #666666;
          text-align: center;
          border-right: 1px solid #efefef;
        }
        .price {
          height: 100%;
          width: 25%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 1px solid #efefef;
          font-size: 12px;
          color: #333333;
          font-family: MicrosoftYaHei;
        }
      }
    }
  }
</style>
