<template>
    <div class="account-object">
      <div class="account-content">
        <div class="income-display">
          <div class="cumulative-income">
            <div class="mt-5">
              <i class="icon-收入"></i>
              <div class="info">
                <div class="txt">累计收入</div>
                <div class="num">￥{{cumulativeIncomeShow?cumulativeIncome:'*****'}}</div>
              </div>
              <i @click="cumulativeIncomeShow=!cumulativeIncomeShow" :class="[{'icon-查看':cumulativeIncomeShow},{'icon-隐藏':!cumulativeIncomeShow}]"></i>
            </div>
          </div>
          <div class="seven-day-income">
            <div class="mt-5">
              <i class="icon-收入"></i>
              <div class="info">
                <div class="txt">七日收入</div>
                <div class="num">￥{{sevenDayIncomeShow?sevenDayIncome:'*****'}}</div>
              </div>
              <i @click="sevenDayIncomeShow=!sevenDayIncomeShow" :class="[{'icon-查看':sevenDayIncomeShow},{'icon-隐藏':!sevenDayIncomeShow}]"></i>
            </div>
          </div>
        </div>
        <div class="income-expenditure-inner">
          <div class="income-expenditure-title">
            <span>收支明细</span>
          </div>
          <div class="income-expenditure-table">
            <el-table
              :data="incomeExpenditureData"
              border
              show-overflow-tooltip
              style="width: 100%">
              <el-table-column
                prop="end_at"
                label="结算时间">
              </el-table-column>
              <el-table-column
                prop="title"
                label="商铺名称">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="盈利金额（￥）">
                <template slot-scope="scope">
                  <div :class="[{'profit':scope.row.amount>=0},{'loss':scope.row.amount<0}]">{{scope.row.amount>0?'+'+scope.row.amount:scope.row.amount}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button @click="detailsLink(scope.row.id)" type="text" size="small">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="paging-box clear">
              <el-pagination
                background
                prev-text="< 上一页"
                :page-size="15"
                next-text="下一页 >"
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
import { settlement, incomeInfo } from '@/axios/api'
export default {
  data () {
    return {
      pages: 0,
      totalPage: 15,
      cumulativeIncome: '',
      cumulativeIncomeShow: true,
      sevenDayIncome: '',
      sevenDayIncomeShow: true,
      incomeExpenditureData: [
      ]
    }
  },
  mounted () {
    this.getInfo()
    this.getMoney()
  },
  methods: {
    getMoney () {
      incomeInfo().then(
        res => {
          this.cumulativeIncome = parseFloat(res.data.total_income).toFixed(2)
          this.sevenDayIncome = parseFloat(res.data.week_income).toFixed(2)
        }
      )
    },
    getInfo () {
      settlement({
        page: this.pages
      }).then(
        res => {
          let datas = []
          console.log(res)
          this.pages = res.headers.page_count * 15
          res.data.forEach(function (v, i) {
            v.end_at = v.end_at.substring(0, 11)
            datas.push(v)
          })
          this.incomeExpenditureData = datas
        }
      )
    },
    changePage (val) {
      this.pages = val
      this.getInfo()
    },
    detailsLink (link) {
      this.$router.push({
        name: 'accountDetails', params: { id: link }
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "../fonts/icomoon.css";
  .account-object {
    margin-left: 200px;
    margin-right: 20px;
    padding-top: 20px;
    min-width: 1100px;
    .account-content {
      .income-display {
        background: #fff;
        padding: 20px 0;
        height: 60px;
        >div {
          display: inline-block;
          vertical-align: middle;
          padding: 0 60px;
          height: 40px;
          margin-top: 10px;
          .mt-5 {
            margin-top: -5px;
            i {
              display: inline-block;
              vertical-align: middle;
            }
          }
          .info {
            display: inline-block;
            vertical-align: middle;
            padding-left: 15px;
            padding-right: 40px;
          }
          .icon-收入 {
            font-size: 33px;
          }
          .icon-查看, .icon-隐藏 {
            font-size: 22px;
            color: #B5B5B5;
          }
          .txt {
            color: #666;
            font-size: 12px;
          }
          .num {
            padding-top: 10px;
            font-size: 22px;
            font-weight: bold;
          }
        }
        .cumulative-income {
          border-right: 2px solid #eee;
          .icon-收入 {
            &::before {
              color: rgba(255, 117, 129, 0.83);
            }
          }
          .info {
            .num {
              color: rgba(255, 117, 129, 0.83);
            }
          }
        }
        .seven-day-income {
          .num {
            color: rgba(255,173,113,0.93);
          }
        }
      }
      .income-expenditure-inner {
        background: #fff;
        padding: 0 20px 30px;
        margin-top: 20px;
        .income-expenditure-title {
          padding: 20px 0;
          font-size: 14px;
          color: #333333;
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
  .account-object {
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
