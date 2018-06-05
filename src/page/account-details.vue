<template>
  <div class="account-details-object">
    <div class="account-details-content">
      <div class="bread-bar">
        <div class="cumulative-income">
          账户 > 账单详情
        </div>
      </div>
      <div class="income-expenditure-inner">
        <div class="income-expenditure-title">
          <span>店铺信息</span>
        </div>
        <div class="income-expenditure-table">
          <div class="info-overview">
            <span>
              <span>结算日期：</span>
              <span class="date-of-settlement">{{settlementDate}}</span>
            </span>
            <span>
              <span>收益金额：</span>
              <span class="total-income">￥{{totalIncome}}</span>
            </span>
          </div>
          <el-table
            :data="incomeExpenditureData"
            border
            show-overflow-tooltip
            style="width: 100%">
            <el-table-column
              prop="created_at"
              label="订单生成时间">
            </el-table-column>
            <el-table-column
              prop="paid_at"
              label="支付时间">
            </el-table-column>
            <el-table-column
              prop="order_no"
              label="订单编号">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="盈利金额（￥）">
              <template slot-scope="scope">
                <div :class="[{'profit':scope.row.amount>=0},{'loss':scope.row.amount<0}]">{{scope.row.amount>=0?'+'+scope.row.amount:scope.row.amount}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button @click="toOrderDetail(scope.row.id)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="paging-box clear">
            <el-pagination
              background
              prev-text="< 上一页"
              next-text="下一页 >"
              :page-size="15"
              @current-change="changePage"
              layout="prev, pager, next"
              :total="totalPage">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import { settlement } from '@/axios/api'
export default {
  data () {
    return {
      id: '',
      pages: 0,
      totalPage: 15,
      settlementDate: '2018-05-22',
      totalIncome: 2368993.12,
      incomeExpenditureData: [
        {
          id: 1,
          orderGenerationTime: '2018-05-22 10:20:39',
          paymentTime: '2018-05-22 10:30:39',
          orderNum: '321344654654354',
          money: 222333.22
        },
        {
          id: 1,
          orderGenerationTime: '2018-05-22 10:20:39',
          paymentTime: '2018-05-22 10:30:39',
          orderNum: '321344654654354',
          money: 222333.22
        },
        {
          id: 1,
          orderGenerationTime: '2018-05-22 10:20:39',
          paymentTime: '2018-05-22 10:30:39',
          orderNum: '321344654654354',
          money: 222333.22
        }
      ]
    }
  },
  mounted () {
    this.setMenuLeft('/account')
    this.id = this.$route.params.id
    this.getData()
    this.getMoney()
  },
  methods: {
    ...mapMutations(['setMenuLeft']),
    toOrderDetail (id) {
      this.$router.push({path: '/orderDetail/' + this.incomeExpenditureData[id].no})
    },
    getMoney () {
      this.$http({
        url: 'http://homestead.yqx.com:8000/management/settlement/' + this.id,
        method: 'get'
      }).then(
        res => {
          this.totalIncome = res.data.amount
          this.settlementDate = res.data.end_at.substring(0, 10)
        }
      )
    },
    getData () {
      this.$http({
        url: 'http://172.81.209.201:8300/management/settlement/' + this.id + '/payment',
        method: 'get',
        params: {
          page: this.pages
        }
      }).then(
        res => {
          this.incomeExpenditureData = res.data
          this.totalPage = parseInt(res.headers.page_count) * 15
        }
      )
    },
    changePage (val) {
      this.pages = val
      this.getData()
    }
  },
  computed: {
    ...mapState(['menuLeft'])
  }
}
</script>

<style scoped lang="less">
  .account-details-object {
    margin-left: 200px;
    margin-right: 20px;
    padding-top: 20px;
    min-width: 1100px;
    .account-details-content {
      .cumulative-income {
        background: #fff;
        padding: 20px;
        font-size: 12px;
        color: #333333;
      }
      .income-expenditure-inner {
        background: #fff;
        padding: 0 20px 30px;
        margin-top: 20px;
        .income-expenditure-title {
          padding: 20px 0;
          font-size: 14px;
          color: #333333;
          border-bottom: 2px solid #EFEFEF;
          span {
            display: inline-block;
            vertical-align: middle;
            &::before {
              content: '';
              width: 3px;
              height: 13px;
              background: #999;
              display: inline-block;
              vertical-align: middle;
              margin-top: -1px;
              margin-right: 10px;
            }
          }
        }
        .income-expenditure-table {
          .info-overview {
            padding: 20px 0;
            font-size: 12px;
            color: #999999;
            .date-of-settlement {
              color: #333;
              padding-right: 30px;
            }
            .total-income {
              color: #DE5B67;
            }
          }
          .el-table {
            font-size: 12px;
            text-align: center;
            color: #666;
            .profit {
              color: #DE5B67;
            }
            .loss {
              color: #6BA725;
            }
          }
          .paging-box {
            padding-top: 30px;
          }
        }
      }
    }
  }
</style>
<style lang="less">
  .account-details-object {
    .el-table {
      th {
        color: #333;
        font-size: 14px;
        text-align: center;
        font-weight: normal;
        background: #efefef;
        border-color: #e4e4e4;
      }
      td {
        .el-button--text {
          border: 1px solid #63A4FF;
          padding: 4px 8px;
        }
      }
    }
  }
</style>
