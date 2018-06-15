<template>
  <div>
    <menu-left routeIndex="4-2"></menu-left>
    <div class="orderAfterSale">
      <div class="header">
        <div class="selectInfo">
          <div>
            <label>订单编号</label>
            <el-input
              v-model="keyValue"
              maxlength="50"
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
              maxlength="50"
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
          <el-table
            :data="refunds"
            border>
            <el-table-column
              prop="order_no"
              label="订单编号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="no"
              label="退款编号"
              width="180">
            </el-table-column>
            <el-table-column
              label="退款方式">
              <template slot-scope="scope">
                <div>退货退款</div>
              </template>
            </el-table-column>
            <el-table-column
              props="items"
              show-overflow-tooltip
              label="商品名称">
              <template slot-scope="scope">
                <div class="goodsName" v-for="(item,index) in scope.row.items" :key="index">{{item.name}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="order_amount"
              label="订单金额">
              <template slot-scope="scope">
                <div>{{scope.row.order_amount | money}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="refund_amount"
              label="退款金额">
              <template slot-scope="scope">
                <div>{{scope.row.refund_amount | money}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="created_at"
              show-overflow-tooltip
              label="申请时间">
            </el-table-column>
            <el-table-column
              prop="status"
              label="退款状态">
              <template slot-scope="scope">
                <div>{{refundStatu(scope.row.status)}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              width="168"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="refundsDetails(scope.row.id)">订单详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          v-if="totalPagina !== 0"
          :page-size="15"
          :current-page="page"
          prev-text="< 上一页"
          next-text="下一页 >"
          layout="prev, pager, next"
          @current-change="currentIndex"
          :total="totalPagina * 15">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {afterSaleGoods} from '../axios/api'
import menuLeft from '@/components/menu-left'
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
      tradeType: 'first',
      // 订单详情
      refunds: [],
      // 总页数
      totalPagina: 0,
      // 标记当前分类状态
      statu: 0,
      // 当前页
      page: 1,
      // flag: 是否已点击搜索
      flag: false
    }
  },
  methods: {
    refundsDetails (value) {
      this.$router.push({path: '/order-rebate', query: {id: value}})
    },
    changeType () {
    },
    changeTime () {
    },
    // 点击搜索
    searchOrder () {
      this.flag = true
      let params = {}
      if (this.keyValue != '') {
        params.order_no = this.keyValue
      }
      if (this.keyName != '') {
        params.no = this.keyName
      }
      if (this.keyTime.length !== 0) {
        params.begin_at = new Date(new Date(this.keyTime[0]).getTime() + 8 * 3600 * 1000)
        params.end_at = new Date(new Date(this.keyTime[1]).getTime() + 8 * 3600 * 1000)
      }
      afterSaleGoods(params).then(res => {
        console.log(res)
        this.totalPagina = parseInt(res.headers.page_count)
        this.refunds = res.data
        this.page = 1
      })
    },
    // 分页点击
    currentIndex (val) {
      let params = {}
      // 如果已点击搜索
      if (this.flag) {
        if (this.keyValue != '') {
          params.order_no = this.keyValue
        }
        if (this.keyName != '') {
          params.no = this.keyName
        }
        if (this.keyTime.length !== 0) {
          params.begin_at = new Date(new Date(this.keyTime[0]).getTime() + 8 * 3600 * 1000)
          params.end_at = new Date(new Date(this.keyTime[1]).getTime() + 8 * 3600 * 1000)
        }
      }
      this.page = val
      params.status = this.statu
      params.page = val - 1
      afterSaleGoods(params).then(res => {
        this.totalPagina = parseInt(res.headers.page_count)
        this.refunds = res.data
      })
    },
    // 时间段
    timeRange (res, event) {
      let flag = event.target.dataset.id
      if (flag == '0') {
        this.timeBtn3 = false
        this.timeBtn2 = false
        this.timeBtn1 = !this.timeBtn1
        if (this.timeBtn1) {
          this.keyTime = [(new Date().getTime() - res * 24 * 3600 * 1000), (new Date().getTime())]
        } else {
          this.keyTime = []
        }
      } else if (flag == '1') {
        this.timeBtn1 = false
        this.timeBtn3 = false
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
    // 点击选择不同订单状态分类
    handleClick (tab) {
      this.statu = tab.index
      let params = {}
      // 如果已点击搜索
      if (this.flag) {
        if (this.keyValue != '') {
          params.order_no = this.keyValue
        }
        if (this.keyName != '') {
          params.no = this.keyName
        }
        if (this.keyTime.length !== 0) {
          params.begin_at = new Date(new Date(this.keyTime[0]).getTime() + 8 * 3600 * 1000)
          params.end_at = new Date(new Date(this.keyTime[1]).getTime() + 8 * 3600 * 1000)
        }
      }
      params.status = tab.index
      afterSaleGoods(params).then(res => {
        console.log(res)
        this.totalPagina = parseInt(res.headers.page_count)
        this.refunds = res.data
        if (res.data.length == 0) {
          this.$message({
            message: '没有此类订单!',
            type: 'info'
          })
        }
      })
    },
    // 售后状态
    refundStatu (value) {
      if (value == 1) {
        return '待处理'
      } else if (value == 2) {
        return '处理中'
      } else if (value == 3) {
        return '处理完毕'
      } else if (value == 4) {
        return '取消退货'
      }
    }
  },
  mounted () {
    afterSaleGoods().then(res => {
      console.log(res)
      this.totalPagina = parseInt(res.headers.page_count)
      this.refunds = res.data
    })
  },
  components: {
    menuLeft
  }
}
</script>
<style lang="less">
.orderAfterSale{
  .el-table{
    font-size: 12px;
    color: #666666;
    .el-button{
      font-size: 12px;
    }
  }
  .el-table__header-wrapper thead{
    color: #333333;
  }
  .el-table::before{
    background-color: #D5D5D5;
  }
  .el-table--border::after{
    background-color: #D5D5D5;
  }
  .el-table__header-wrapper thead tr th{
    background: #EFEFEF;
  }
  .el-table__body-wrapper,.el-table__header-wrapper tr th div{
    text-align: center;
  }
  .el-table--group, .el-table--border {
    border: 1px solid #D5D5D5;
  }
  .el-table--border {
    border-right: none;
    border-bottom: none;
  }
  .el-table th.is-leaf, .el-table td {
    border-bottom: 1px solid #D5D5D5;
  }
  .el-table--border th, .el-table--border td {
    border-right: 1px solid #D5D5D5;
  }
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
  .el-table__body-wrapper tr td .el-button--text{
    border: 1px solid #63A4FF;
    padding: 4px 8px;
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
      color: #151515;
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
      .goodsName{
        height: 50px;
        line-height: 50px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
        cursor: pointer;
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
