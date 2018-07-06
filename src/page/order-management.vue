<template>
  <div>
    <menu-left routeIndex="4-1"></menu-left>
    <div class="orderManager">
        <div class="header">
          <div class="selectInfo">
            <el-select v-model.trim="value" placeholder="订单号"  @change="changeType" >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input
              placeholder="订单号"
              v-model.trim="keyValue"
              maxlength="50"
              v-validate="'decimal'"
              name="orderNumber"
              clearable>
            </el-input>
            <div class="block">
              <label>下单时间</label>
              <el-date-picker
                @change="changeTime"
                v-model.trim="keyTime"
                type="daterange"
                align="right"
                unlink-panels
                value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="timeRange" data-id="0"  :class="{ cur : timeBtn1 }" @click="timeRange(7,$event)">最近7天</div>
            <div class="timeRange" data-id="1" :class="{ cur : timeBtn2 }" @click="timeRange(30,$event)">最近30天</div>
          </div>
            <div class="proName">
              <div class="keyName">
                <label>商品名称</label>
                <el-input
                  placeholder="请输入商品名称"
                  v-model.trim="keyName"
                  maxlength="20"
                  clearable>
                </el-input>
              </div>
              <button @click="searchOrder" class="search">搜索</button>
            </div>
        </div>
        <div class="tradeRecord">
          <el-tabs v-model.trim="tradeType" type="card" @tab-click="handleClick">
            <el-tab-pane label="全部" name="first"></el-tab-pane>
            <el-tab-pane  label="待付款" name="second"></el-tab-pane>
            <el-tab-pane  label="待发货" name="third"></el-tab-pane>
            <el-tab-pane  label="已发货" name="fourth"></el-tab-pane>
            <el-tab-pane  label="已完成" name="five"></el-tab-pane>
            <el-tab-pane  label="已取消" name="six"></el-tab-pane>
          </el-tabs>
          <el-button @click="excelExportClick" :loading="excelExportLoading" class="excel-export-btn" type="success" size="small">Excel导出</el-button>
          <div class="tradeList" v-for="(item,index) in ordersDetail" :key="index">
            <div class="top">
              <label>下单时间：{{item.created_at}}</label>
              <label>订单编号：{{item.no}}</label>
              <label>客户手机：{{item.mobile}}</label>
            </div>
            <div class="content">
                <div>
                    <div class="prolist"  v-for="(i,id) in item.items"  :key="id">
                      <div class="proInfo">
                        <img :src="orderImageUrl(i.cover_url)" alt="">
                        <div class="desc">{{i.name}}</div>
                      </div>
                      <div class="proNum">数量 x {{i.count}}</div>
                      <div class="price">
                        <label>￥{{i.price | money}}</label>
                      </div>
                    </div>
                </div>
              <div class="orderMon" :style="{height:item.items.length*80+'px'}">
                <label>￥{{item.amount | money}}</label>
                <label>运费：{{item.express_amount | money}}</label>
              </div>
              <div class="orderResult"  :style="{height:item.items.length*80+'px'}">
                  <label>{{orderMessage(item.status)}}</label>
                <router-link :to="{ name:'orderDetail',params:{id:item.id }}" tag="label">订单详情</router-link>
              </div>
            </div>
          </div>
          <div v-if="ordersDetail.length<=0" class="no-data">暂无数据</div>
          <el-pagination
            v-if="totalPagina != 0"
            background
            :page-size="15"
            :page-count="6"
            :current-page="currentPage"
            style="padding-top: 20px;"
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
import {order, excelExport} from '@/axios/api'
import menuLeft from '@/components/menu-left'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      num: 1,
      n: '1',
      timeStart: '',
      timeEnd: '',
      // 分页总页数
      totalPagina: 0,
      // 当前页数
      currentPage: 0,
      // 订单请求数据
      ordersDetail: [],
      // 时间按钮
      timeBtn1: false,
      timeBtn2: false,
      // 搜索时间间隔
      keyTime: [],
      // 搜索类别
      keyValue: '',
      // 商品名称
      keyName: '',
      // 搜索类型
      options: [{
        value: '1',
        label: '订单号'
      }, {
        value: '2',
        label: '收货人姓名'
      }, {
        value: '3',
        label: '收货人手机号'
      }],
      // 搜索类型
      value: '1',
      // 订单类型
      OrderType: '1',
      // 交易类型
      tradeType: 'first',
      tradeList: [],
      // 标记当前所处订单分类
      statu: '',
      excelExportLoading: false,
      // flagObj：是否已点击搜索
      flag: false
    }
  },
  computed: {
    ...mapState(['yiqixuanDomainUrl'])
  },
  methods: {
    orderImageUrl (value) {
      return this.yiqixuanDomainUrl + value
    },
    changeType () {
    },
    changeTime (res) {
      this.timeBtn1 = false
      this.timeBtn2 = false
    },
    // 导出excel
    excelExportClick () {
      // 若订单编号有输入，则判断
      if (this.keyValue != '' && this.keyValue.length != 32 && this.value == 1) {
        this.$message({
          showClose: true,
          message: '请输入正确的订单编号',
          type: 'warning'
        })
        return false
      }
      if (this.keyValue != '' && this.keyValue.length != 11 && this.value == 3) {
        this.$message({
          showClose: true,
          message: '请输入正确的手机号',
          type: 'warning'
        })
        return false
      }
      // 参数
      let params = {}
      params.status = this.statu
      if (this.keyValue !== '') {
        if (this.value == 1) {
          params.no = this.keyValue
        } else if (this.value == 2) {
          params.consignee = this.keyValue
        } else if (this.value == 3) {
          params.mobile = this.keyValue
        }
      }
      if (this.keyName !== '') {
        params.name = this.keyName
      }
      if (this.keyTime && this.keyTime.length > 0) {
        let dateBegin = new Date(this.keyTime[0])
        let dateEnd = new Date(this.keyTime[1])
        params.begin_at = dateBegin.getFullYear() + '-' + (dateBegin.getMonth() + 1) + '-' + dateBegin.getDate()
        params.end_at = dateEnd.getFullYear() + '-' + (dateEnd.getMonth() + 1) + '-' + dateEnd.getDate()
      }
      this.excelExportLoading = true
      excelExport(params).then(res => {
        if (res.data) {
          window.open(res.data)
        } else {
          this.$message({
            showClose: true,
            message: '非常抱歉，您的搜索结果为空，无法导出数据哦！',
            type: 'error'
          })
        }
        this.excelExportLoading = false
      }).catch(() => {
        this.excelExportLoading = false
      })
    },
    // 订单状态
    orderMessage (status) {
      if (status == 200) { // 待付款
        return '待付款'
      } else if (status == 205) { // 待发货
        return '待发货'
      } else if (status == 400) { // 已发货
        return '已发货'
      } else if (status == 405) { // 已完成
        return '订单已完成'
      } else if (status == 207) {
        return '已取消'
      }
    },
    // 点击搜索
    searchOrder () {
      this.currentPage = 0
      // 若订单编号有输入，则判断
      if (this.keyValue != '' && this.keyValue.length != 32 && this.value == 1) {
        this.$message({
          message: '请输入正确的订单编号',
          type: 'warning'
        })
      } else if (this.keyValue != '' && this.keyValue.length != 11 && this.value == 3) {
        this.$message({
          message: '请输入正确的手机号',
          type: 'warning'
        })
      } else {
        // 参数
        let params = {}
        params.status = this.statu
        this.flag = true
        if (this.keyValue !== '') {
          if (this.value == 1) {
            params.no = this.keyValue
          } else if (this.value == 2) {
            params.consignee = this.keyValue
          } else if (this.value == 3) {
            params.mobile = this.keyValue
          }
        }
        if (this.keyName !== '') {
          params.name = this.keyName
        }
        if (this.keyTime && this.keyTime.length) {
          let dateBegin = new Date(this.keyTime[0])
          let dateEnd = new Date(this.keyTime[1])
          params.begin_at = dateBegin.getFullYear() + '-' + (dateBegin.getMonth() + 1) + '-' + dateBegin.getDate()
          params.end_at = dateEnd.getFullYear() + '-' + (dateEnd.getMonth() + 1) + '-' + dateEnd.getDate()
        }
        params.page = 0
        params.per_page = 15
        order(params).then(res => {
          // console.log(res)
          this.totalPagina = res.headers.page_count
          this.ordersDetail = res.data
          if (!res.data) {
            this.$message('没有此类订单！')
          }
        })
      }
    },
    // 改变时间段
    timeRange (res, event) {
      let flag = event.target.dataset.id
      if (flag === '0') {
        this.timeBtn2 = false
        this.timeBtn1 = !this.timeBtn1
        if (this.timeBtn1) {
          this.keyTime = [(new Date().getTime() - res * 24 * 3600 * 1000), (new Date().getTime())]
        } else {
          this.keyTime = []
        }
      } else {
        this.timeBtn1 = false
        this.timeBtn2 = !this.timeBtn2
        if (this.timeBtn2) {
          this.keyTime = [(new Date().getTime() - res * 24 * 3600 * 1000), (new Date().getTime())]
        } else {
          this.keyTime = []
        }
      }
      // console.log(this.keyTime)
    },
    // 订单分类状态更改
    setStatu (index) {
      if (index == 1) {
        this.statu = 200
      } else if (index == 2) {
        this.statu = 205
      } else if (index == 3) {
        this.statu = 400
      } else if (index == 4) {
        this.statu = 405
      } else if (index == 5) {
        this.statu = 207
      } else {
        this.statu = ''
      }
    },
    // 订单分类状态点击
    handleClick (tab) {
      // console.log(tab.index)
      this.currentPage = 1
      let params = {}
      if (this.flag) {
        if (this.keyValue !== '') {
          if (this.value == 1) {
            params.no = this.keyValue
          } else if (this.value == 2) {
            params.consignee = this.keyValue
          } else if (this.value == 3) {
            params.mobile = this.keyValue
          }
        }
        if (this.keyName !== '') {
          params.name = this.keyName
        }
        if (this.keyTime.length) {
          let dateBegin = new Date(this.keyTime[0])
          let dateEnd = new Date(this.keyTime[1])
          params.begin_at = dateBegin.getFullYear() + '-' + (dateBegin.getMonth() + 1) + '-' + dateBegin.getDate()
          params.end_at = dateEnd.getFullYear() + '-' + (dateEnd.getMonth() + 1) + '-' + dateEnd.getDate()
        }
      }
      this.setStatu(tab.index)
      params.status = this.statu
      order(params).then(res => {
        // console.log(res)
        this.totalPagina = res.headers.page_count
        this.ordersDetail = res.data
        if (res.data == '') {
          this.$message('没有此类订单！')
        }
      })
    },
    // 分页点击
    currentIndex (val) {
      let params = {}
      if (this.flag) {
        if (this.keyValue !== '') {
          if (this.value == 1) {
            params.no = this.keyValue
          } else if (this.value == 2) {
            params.consignee = this.keyValue
          } else if (this.value == 3) {
            params.mobile = this.keyValue
          }
        }
        if (this.keyName !== '') {
          params.name = this.keyName
        }
        if (this.keyTime.length) {
          let dateBegin = new Date(this.keyTime[0])
          let dateEnd = new Date(this.keyTime[1])
          params.begin_at = dateBegin.getFullYear() + '-' + (dateBegin.getMonth() + 1) + '-' + dateBegin.getDate()
          params.end_at = dateEnd.getFullYear() + '-' + (dateEnd.getMonth() + 1) + '-' + dateEnd.getDate()
        }
      }
      params.page = val - 1
      params.status = this.statu
      this.currentPage = val
      order(params).then(res => {
        this.totalPagina = res.headers.page_count
        this.ordersDetail = res.data
      })
    }
  },
  created () {
    order({
      page: 0
    }).then(res => {
      this.totalPagina = res.headers.page_count
      this.ordersDetail = res.data
    })
  },
  components: {
    menuLeft
  }
}
</script>
<style lang="less">
  .orderManager{
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
    .keyName {
      .el-input--suffix:nth-child(2){
        width: 258px;
      }
      .el-input__inner {
        width: 258px;
      }
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
      font-size: 12px;
      color: @b3;
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
  .orderManager {
    margin: 0 20px 0 200px;
    padding-top: 20px;
    position: relative;
    min-width: 1000px;
  }

  .tradeRecord {
    background: #fff;
    padding:20px;
    position: relative;
    .excel-export-btn {
      width: 80px;
      height: 30px;
      padding: 0;
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .no-data {
      color: @b9;
      font-size: 12px;
      text-align: center;
      padding: 30px 0 20px;
    }
    .tradeList{
          padding-top: 15px;
          display: block;
          width: 100%;
          .top{
            background: #EFEFEF;
            border: 1px solid #D5D5D5;
            height: 40px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            line-height: 40px;
            label{
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
              padding-right: 5px;
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
              align-items: center;
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
                cursor: pointer;
                border-radius: 4px;
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
  .header{
      background: #fff;
      padding: 20px;
      margin-bottom: 20px;
      label{
        font-size: 12px;
        color: #999999;
        line-height: 15px;
        margin-right: 10px;
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
         user-select: none;
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
      >div{
        float: left;
      }
      .keyName{
        margin-right: 20px;
        .el-input__inner {
          width: 256px;
        }
      }
      .search{
        line-height: 30px;
        width: 80px;
        background: @mainC;
        color:#fff;
        text-align: center;
        border-radius: 2px;
      }
      .orderType{
        margin-left: 20px;
        margin-right: 30px;
      }
    }
   }
</style>
