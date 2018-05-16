<template>
    <div>
      <div class="home-content">
        <div class="top">
          <div class="title">订单管理 > 订单详情</div>
          <el-steps :active="1" align-center  finish-status="success" >
            <el-step title="待付款"></el-step>
            <el-step title="已付款"></el-step>
            <el-step title="已发货"></el-step>
            <el-step title="确认收货"></el-step>
          </el-steps>
            <div @click="saveCompile" class="saveCompile" v-if="!isCompile">保存</div>
        </div>
        <div class="tradeList">
            <div class="top">
              <label>订单编号：hz1234124883612</label>
              <label>商铺名称：金桔小店</label>
            </div>
            <div class="orderInfo">
                  <div class="left">
                      <div>
                        <label><i>卖家微信：</i>248773573799</label>
                        <label><i>买家手机号：</i>13566774466</label>
                      </div>
                      <div>
                        <label><i>收货人名：</i>248773573799</label>
                        <label><i>收货人手机号：</i>13566774466</label>
                      </div>
                      <div><i>收货地址：</i>上海市卢湾区泰康路999弄99号909室</div>
                      <div>
                        <label><i>快递公司：</i>顺丰</label>
                        <label><i>快递单号：</i>1323454657567575</label>
                      </div>
                  </div>
                  <div class="right">
                    <div>
                      <label><i>创建时间：</i>2018-08-22    12:33</label>
                      <label><i>付款时间：</i>2018-08-22    12:35</label>
                    </div>
                    <div>
                      <label><i>发货时间：</i>2018-08-23    10:38</label>
                      <label><i>收货时间：</i>2018-08-27    20:17</label>
                    </div>
                  </div>

            </div>
            <div class="content">
              <div>
                <div class="prolist" v-for="(items,index) in tradeList.list" :key="index">
                  <div class="proInfo">
                    <img :src="items.img" alt="">
                    <div class="desc">{{items.desc}}</div>
                  </div>
                  <div class="proNum">数量 x{{items.num}}</div>
                  <div class="price">
                    <label>￥</label>
                    <label v-if="isCompile">{{items.nowPrice}}</label>
                    <input v-if="!isCompile" type="tel"  v-model="items.nowPrice">
                  </div>
                </div>
              </div>
              <div class="orderMon" :style="{height: tradeList.list.length*80+'px'}">
                <label>￥{{tradeList.totalPrice}}</label>
                <label>
                  <label>运费：</label>
                  <label v-if="isCompile">{{tradeList.yfPrice}}</label>
                  <input v-if="!isCompile" type="tel" v-model="tradeList.yfPrice">
                </label>
                <label @click="changeCompile" v-if="isCompile">编辑订单</label>
              </div>
            </div>
          </div>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isCompile: true,
      tradeList: {
        list: [
          {
            img: '/static/test/ceshi.png',
            desc: '这真是一个伤心的故事',
            num: 1,
            prePrice: '12323',
            nowPrice: '123'
          },
          {
            img: '/static/test/ceshi.png',
            desc: '这真是一个开心的故事',
            num: 2,
            prePrice: 996,
            nowPrice: 429
          }
        ],
        totalPrice: 12323,
        yfPrice: 10
      }
    }
  },
  methods: {
    changeCompile () {
      this.isCompile = false
    },
    saveCompile () {
      this.isCompile = true
    }
  }
}
</script>
<style lang="less">
  .el-steps--horizontal {
    white-space: nowrap;
    width: 60%;
    margin-top:20px;
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
  .home-content {
    margin: 0 20px 0 200px;
    padding-top: 20px;
    padding-right: 20px;
    position: relative;
    min-width: 1000px;
    background: #fff;
    .top{
      background: #fff;
      padding: 20px;
      position: relative;
      .saveCompile{
        position: absolute;
        right: 0;
        top:40px;
        width:80px;
        color: #fff;
        font-family: MicrosoftYaHei;
        line-height: 30px;
        font-size: 12px;
        color: #FFFFFF;
        text-align: center;
        height: 30px;
        background: #DE5B67;
        border-radius: 2px;
      }
      .title{
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #333333;
      }
    }
    .tradeList {
      padding-bottom: 30px;
      background: #fff;
      .top {
        background: #EFEFEF;
        border: 1px solid #D5D5D5;
        height: 40px;
        display: flex;
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
        justify-content: flex-start;
        align-items: center;
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
          width: 440px;
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
          justify-content: center;
          border-right: 1px solid #efefef;
          border-bottom: 1px solid #efefef;
        }
        .orderMon,.price{
          input{
            border: 1px solid #efefef;
            width: 100px;
            height:30px;
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
          >label:first-child {
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #DE5B67;
          }
          >label:nth-child(2) {
            ont-family: MicrosoftYaHei;
            font-size: 12px;
            color: #666666;
            margin-top: 5px;
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
        }
        .proNum {
          width: 240px;
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
          width: 240px;
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
