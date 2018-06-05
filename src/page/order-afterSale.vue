<template>
  <div>
    <div class="orderAfterSale">
      <div class="header">
        <div class="selectInfo">
          <div>
            <label>订单编号</label>
            <el-input
              v-model="keyValue"
              clearable>
            </el-input>
          </div>
          <div class="block">
            <label>申请时间</label>
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
          <div :class="['timeRange', {'cur' : timeBtn1}]" data-id="0" @click="timeRange(7,$event)">最近7天</div>
          <div :class="['timeRange', {'cur' : timeBtn2}]" data-id="1" @click="timeRange(30,$event)">最近30天</div>
          <div :class="['timeRange', {'cur' : timeBtn3}]" data-id="2" @click="timeRange(90,$event)">最近90天</div>
        </div>
        <div class="proName">
          <div class="keyName">
            <label>退款编号</label>
            <el-input
              v-model="keyName"
              clearable>
            </el-input>
          </div>
          <div class="orderType">
            <label>退款方式</label>
            <el-select v-model="OrderType" placeholder="退款方式"  @change="changeType" >
              <el-option
                v-for="item in optionType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <button @click="searchOrder" class="search">搜索</button>
        </div>

      </div>
      <div class="tradeRecord">
        <el-tabs v-model="tradeType" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部" name="first"></el-tab-pane>
          <el-tab-pane  label="退款中"  name="second"></el-tab-pane>
          <el-tab-pane  label="退换货中"  name="third"></el-tab-pane>
          <el-tab-pane  label="退款成功"  name="fourth"></el-tab-pane>
          <el-tab-pane  label="退款关闭"  name="five"></el-tab-pane>
        </el-tabs>
        <div class="tradeList">
          <div class="top">
          <label>订单编号</label>
          <label>退款编号</label>
          <label>退款方式</label>
          <label>商品名称</label>
          <label>订单金额</label>
          <label>退款金额</label>
          <label>申请时间</label>
          <label>退款状态</label>
          <label>操作</label>
        </div>
          <div class="top">
            <label>H236642879997799264</label>
            <label>H236642287999779</label>
            <label>退货退款</label>
            <label>花王纸尿裤</label>
            <label>¥ 200.00</label>
            <label>¥ 190.00</label>
            <label>2018-12-12  12:30</label>
            <label>买家申请退款</label>
            <label>处理退款</label>
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
import {afterSaleGoods} from '../axios/api'
export default {
  data () {
    return {
      n: '1',
      // 点击索引，动态类名
      timeId: '0',
      // 搜索时间
      timeBtn1: false,
      timeBtn2: false,
      timeBtn3: false,
      // 搜索时间间隔
      keyTime: '',
      // 搜索类别
      keyValue: '',
      // 商品名称
      keyName: '',
      // 订单类型
      optionType: [{
        value: '1',
        label: '全部'
      }, {
        value: '2',
        label: '仅退款'
      }, {
        value: '3',
        label: '退货退款'
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
      tradeType: 'first'
    }
  },
  methods: {
    changeType () {
    },
    changeTime () {
    },
    searchOrder () {
    },
    timeRange (res, event) {
      let flag = event.target.dataset.id
      if (flag == '0') {
        this.timeBtn2 = false
        this.timeBtn1 = !this.timeBtn1
        if (this.timeBtn1) {
          this.keyTime = [(new Date().getTime() - res * 24 * 3600 * 1000), (new Date().getTime())]
        } else {
          this.keyTime = []
        }
      } else if (flag == '1') {
        this.timeBtn1 = false
        this.timeBtn2 = !this.timeBtn2
        if (this.timeBtn2) {
          this.keyTime = [(new Date().getTime() - res * 24 * 3600 * 1000), (new Date().getTime())]
        } else {
          this.keyTime = []
        }
      } else if (flag == '2') {
        this.timeBtn1 = false
        this.timeBtn2 = false
        this.timeBtn3 = !this.timeBtn3
        if (this.timeBtn3) {
          this.keyTime = [(new Date().getTime() - res * 24 * 3600 * 1000), (new Date().getTime())]
        } else {
          this.keyTime = []
        }
      }
    },
    handleClick (tab, event) {
      console.log(tab.index)
    }
  },
  mounted () {
    afterSaleGoods().then(res => {
      console.log(res)
    })
  }
}
</script>
<style lang="less">
  .orderAfterSale{
  .el-pagination.is-background .el-pager li {
    background-color: #fff;
  }
  .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next {
    padding: 0 15px;
  }
  .el-pagination span:not([class*=suffix]), .el-pagination button {
    display: inline-block;
    font-size: 13px;
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-pagination .btn-prev, .el-pagination .btn-next {
    background: center center no-repeat;
    background-size: 16px;
    background-color: #fff;
    height: 30px;
    line-height: 30px;
    padding:0 15px;
    cursor: pointer;
    margin: 0;
    color: #303133;
    border: 1px solid #d5d5d5;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #DE5B67;
    color: #fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active:hover {
    color: #fff;
  }
  .el-pager li {
    padding: 0;
    background: #fff;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    margin: 0;
    border: 1px solid #D5D5D5;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  .el-pager li.active + li {
    border-left: 1px solid #D5D5D5;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #DE5B67; }
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
      width: 256px;
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
  }
  }
</style>
<style scoped lang="less">
  .orderAfterSale{
    margin: 0 20px 0 200px;
    padding-top: 20px;
    position: relative;
    min-width: 1000px;
  }
  .tradeRecord {
    background: #fff;
    padding:30px 20px 20px;
    .tradeList {
      padding-bottom: 30px;
      .top:first-child{
        background: #EFEFEF;
        line-height: 40px;
        height: 40px;
      }
      .top:last-child{
        border-bottom:1px solid #D5D5D5;
      }
      .top{
        border-top: 1px solid #D5D5D5;
        border-left: 1px solid #D5D5D5;
        height: 50px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        line-height: 50px;
        label {
          font-size: 12px;
          color: #333333;
          text-align: center;
          border-right: 1px solid #D5D5D5;
        }
        label:first-child,label:nth-child(2),label:nth-child(7),label:nth-child(4) {
          width: 14%;
        }
        label:nth-child(3),label:nth-child(8){
          width:10%;
        }
        label:nth-child(5),label:nth-child(6),label:nth-child(9) {
          width:8%;
        }
      }
      .content {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        label {
          display: block;
          text-align: center;
        }
      }
    }
    }
  .header{
    background: #fff;
    padding: 20px;
    margin-bottom: 20px;
    label{
      margin-right: 10px;
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
      >div{
        float: left;
      }
      .timeRange{
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
      overflow: hidden;
      margin-top: 20px;
      >div{
        float: left;
      }
      .search{
        line-height: 30px;
        width: 80px;
        background: #DE5B67;
        color:#fff;
        text-align: center;
        line-height: 30px;
        border-radius: 2px;
      }
      .orderType{
        margin-left: 20px;
        margin-right: 30px;
      }
    }
  }
</style>
