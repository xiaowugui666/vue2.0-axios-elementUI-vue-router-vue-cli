<template>
  <div class="cus-order-container">
    <div class="home-content">
      <div class="header">
        <div class="selectInfo">
          <div class="order-number">
            <label>下单时间</label>
            <el-input
              placeholder="订单号/退款单号/支付流水号"
              v-model="keyValue"
              clearable>
            </el-input>
          </div>
          <div class="block">
            <label>下单时间</label>
            <el-date-picker
              @change="changeTime"
              v-model="keyTime"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="timeRange cur" @click="timeRange(7,$event)">最近7天</div>
          <div class="timeRange" @click="timeRange(30,$event)">最近30天</div>
        </div>
        <div class="proName">
          <div class="keyName">
            <label>商品名称</label>
            <el-input
              placeholder="请输入商品名称"
              v-model="keyName"
              clearable>
            </el-input>
          </div>
          <div class="orderType">
            <label>订单类型</label>
            <el-select v-model="OrderType" placeholder="普通订单"  @change="changeType" >
              <el-option
                v-for="item in optionType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div @click="searchOrder" class="search">
            <el-button
            type="success"
            size="small">搜索</el-button>
          </div>
        </div>

      </div>
      <div class="tradeRecord">
        <div class="tradeList">
          <div class="top">
            <label>下单时间：2019-23-3 12：23：12</label>
            <label>订单编号：hz1234124883612</label>
            <label>商铺名称：金桔小店</label>
            <label>客户手机：18923821231</label>
          </div>
          <div class="content" v-for="(item,index) in tradeList"  :key="index">
            <div>
              <div class="prolist"  v-for="(items,id) in item.list"  :key="id">
                <div class="proInfo">
                  <img :src="items.img" alt="">
                  <div class="desc">{{items.desc}}</div>
                </div>
                <div class="proNum">数量 x{{items.num}}</div>
                <div class="price">
                  <label>￥{{items.prePrice}}</label>
                  <label>￥{{items.nowPrice}}</label>
                </div>
              </div>
            </div>
            <div class="orderMon" :style="{height:item.list.length*80+'px'}">
              <label>￥{{item.totalPrice}}</label>
              <label>运费：23933</label>
            </div>
            <div class="orderResult"  :style="{height:item.list.length*80+'px'}">
              <label>交易完成</label>
              <label>订单详情</label>
            </div>
          </div>
        </div>
        <el-pagination
          background
          :page-size="20"
          :page-count="6"
          prev-text="< 上一页"
          next-text="下一页 >"
          layout="prev, pager, next"
          current-change="currentIndex"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      n: '1',
      // 搜索时间间隔
      keyTime: '',
      // 搜索类别
      keyValue: '',
      // 商品名称
      keyName: '',
      // 订单类型
      optionType: [{
        value: '1',
        label: '普通订单'
      }, {
        value: '2',
        label: '外部订单'
      }],

      // 搜索类型
      options: [{
        value: '1',
        label: '订单号'
      }, {
        value: '2',
        label: '外部订单'
      }, {
        value: '3',
        label: '收货人姓名'
      }, {
        value: '4',
        label: '收货人手机号'
      }],
      // 搜索类型
      value: '1',
      // 订单类型
      OrderType: '1',
      // 交易类型
      tradeType: 'first',
      tradeList: [
        {
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
        },
        {
          list: [
            {
              img: '/static/test/ceshi.png',
              desc: '这真是一个开心的故事',
              num: 2,
              prePrice: 996,
              nowPrice: 429
            }
          ],
          totalPrice: 1323,
          yfPrice: 0
        }
      ]
    }
  },
  mounted () {
    this.setMenuLeft('/customer')
  },
  computed: {
  },
  methods: {
    ...mapMutations(['setMenuLeft']),
    changeType () {
    },
    changeTime () {
    },
    searchOrder () {
    },
    timeRange (res, event) {
      let flag = event.target.dataset.id
      if (flag === '0') {
        this.timeBtn = false
      } else {
        this.timeBtn = true
      }
      this.keyTime = [(new Date().getTime() - res * 24 * 3600 * 1000), (new Date().getTime())]
    },
    handleClick (tab, event) {
      console.log(tab.index)
    }
  }
}
</script>
<style lang="less">
  .cus-order-container{
    .el-tabs__item.is-active {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      text-align: center;
    }
    .el-tabs--top.el-tabs--card .el-tabs__item{
      text-align: center;
    }
    .el-tabs--top.el-tabs--card .is-active{
      box-sizing: border-box;
      background: #EFEFEF;
      font-family: MicrosoftYaHei-Bold;
      font-size: 14px;
      color: #333333;
      font-weight: 500;
      border-bottom: 1px solid #F5F5F5;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      border-bottom-color:  #333;
    }
    .el-tabs--top.el-tabs--card .el-tabs__item:last-child{
      padding-right: 0px;
    }
    .el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2){
      padding-left: 0px;
    }
    .el-tabs__item {
      width: 140px;
      height: 40px;
      padding: 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      line-height: 40px;
      display: inline-block;
      list-style: none;
      font-size: 14px;
      font-weight: 500;
      color: #303133;
      position: relative;
    }
    .header{
      .el-date-editor .el-range__icon {
        display: none;
      }
      .el-input--suffix:nth-child(1){
        width: 128px;
      }
      .el-input--suffix:nth-child(2){
        width: 180px;
      }
      .el-pagination{
        text-align: right;
      }
      .el-date-editor--daterange.el-input__inner{
        width: 230px;
      }
      .el-date-editor .el-range__close-icon {
        line-height: 23px;
      }
      .el-select .el-input .el-select__caret {
        line-height: 30px;
      }
      .el-date-editor .el-range-input{
        width: 43%;
      }
      .block{
        margin-left:20px;
      }
      .el-input__inner{
        height: 30px;
        line-height: 30px;
        border-radius: 0;
      }
      .el-input--suffix .el-input__inner {
        padding:0 12px;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #B5B5B5;
        line-height: 15px;
      }
      .el-date-editor .el-range__icon {
        font-size: 14px;
        margin-left: -5px;
        color: #c0c4cc;
        float: left;
        line-height: 23px;
      }
      .el-date-editor .el-range-separator {
        line-height: 23px;
      }
      .el-select{
        margin-right: 10px;
      }
      .el-button--small {
        width: 80px;
        height: 30px;
        padding: 0;
      }
    }
  }
</style>
<style scoped lang="less">
  .cus-order-container{
    .home-content {
      margin: 0 20px 0 200px;
      padding-top: 20px;
      position: relative;
      min-width: 1000px;
      .header{
        label{
          margin-right: 10px;
        }
      }
    }

    .tradeRecord {
      background: #fff;
      padding:0 20px 20px;
      overflow: hidden;
      .tradeList{
        padding-bottom: 30px;
        .top{
          background: #EFEFEF;
          border: 1px solid #D5D5D5;
          height: 40px;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          line-height: 40px;
          label{
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #333333;
            margin-left: 80px;
          }
          label:first-child{
            margin-left: 20px;
          }
        }
        .content{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          >div{
            width: 66%;
          }
          .desc{
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #333333;
          }
          img{
            width: 60px;
            height: 60px;
            padding:0 10px;
          }
          label{
            display: block;
            text-align: center;
          }
          .proInfo{
            width: 60%;
            display: flex;
            height: 100%;
            justify-content: flex-start;
            align-items: center;
            border-right: 1px solid #efefef;
            border-right: 1px solid #efefef;
            border-left: 1px solid #efefef;
          }
          .prolist{
            height: 80px;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            /*border-right: 1px solid #efefef;*/
            border-bottom: 1px solid #efefef;
          }
          .orderMon,.orderResult{
            height: 100%;
            width: 17%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-right: 1px solid #efefef;
            border-bottom: 1px solid #efefef;
          }
          .orderResult{
            label:first-child{
              font-family: MicrosoftYaHei;
              font-size: 12px;
              color: #333333;
              text-align: center;
            }
            label:last-child{
              width: 70px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              border: 1px solid #63A4FF;
              border-radius: 2px;
              color:#63A4FF;
              font-size: 12px;
              margin: 0 auto;
              margin-top: 10px;
            }
          }
          .orderMon{
            label:first-child{
              font-family: MicrosoftYaHei;
              font-size: 12px;
              color: #DE5B67;
            }
            label:last-child{
              ont-family: MicrosoftYaHei;
              font-size: 12px;
              color: #666666;
              margin-top: 5px;
            }
          }
          .proNum{
            width: 20%;
            height: 100%;
            line-height: 80px;
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #666666;
            text-align: center;
            border-right: 1px solid #efefef;
          }
          .price{
            height: 100%;
            width: 20%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-right: 1px solid #efefef;
            label:first-child{
              font-family: MicrosoftYaHei;
              font-size: 12px;
              color: #999999;
              text-decoration: line-through;
            }
            label:last-child{
              font-size: 12px;
              color: #333333;
              font-family: MicrosoftYaHei;
              margin-top: 5px;
            }
          }
        }
      }
    }
    .tradeRecord .title{
      padding: 20px 0 20px 10px;
      position: relative;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
    }
    .tradeRecord .title::after{
      position: absolute;
      top:24px;
      left:0;
      content:'';
      width: 3px;
      height: 13px;
      background: #999;
    }
    .header{
      background: #fff;
      padding: 20px;
      position: relative;
      margin-bottom: 20px;
      label{
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #999999;
        line-height: 15px;
      }
      .el-input__inner{
        height: 30px;
        line-height: 30px;
      }
      .el-input--suffix{
        height: 30px;
      }
      .selectInfo{
        align-items: center;
        justify-content:flex-start;
        overflow: hidden;
        .order-number{
          float: left;
        }
        .block{
          float: left;
        }
        .timeRange{
          float:left;
          line-height: 28px;
          padding: 0 16px;
          font-size: 12px;
          border: 1px solid #eeeeee;
          color:#B5B5B5;
          margin-left: 20px;
        }
        .cur{
          border: 1px solid #DE5B67;
          color:#DE5B67;
        }

      }
      .proName{
        align-items: center;
        justify-content:space-between;
        margin-top: 20px;
        overflow: hidden;
        .keyName{
          float: left;
        }
        .search{
          position: absolute;
          top: 45px;
          right: 20px;
        }
        .orderType{
          margin-left: 20px;
          float: left;
        }
      }
    }
  }
</style>
