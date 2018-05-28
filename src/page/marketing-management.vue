<template>
    <div class="marketing-management-object">
      <div class="marketing-management-content">
        <div class="marketing-management-state clear">
          <ul>
            <li :class="{'active':managementState==0}" @click="managementState=0">全部</li>
            <li :class="{'active':managementState==1}" @click="managementState=1">出售中</li>
            <li :class="{'active':managementState==2}" @click="managementState=2">已售罄</li>
            <li :class="{'active':managementState==3}" @click="managementState=3">已下架</li>
          </ul>
          <el-button @click="setRouter({name:'addMarketingActivity',params:{class:linkClass}})" type="primary" size="small" class="newly-build">新建</el-button>
        </div>
        <div class="active-goods-table">
          <el-table
            ref="multipleTable"
            :data="activeGoodsTableData"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange">
            <el-table-column
              label="排序"
              width="75">
              <template slot-scope="scope">
                <div>
                  <input class="sort-input" type="text" :value="scope.row.id" @input="sorting($event)">
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="商品"
              width="300">
              <template slot-scope="scope">
                <div class="goods-info-box">input
                  <span class="goods-img"><img :src="scope.row.goods.imgSrc" alt=""></span>
                  <div class="goods-info">
                    <p class="goods-info-name">{{scope.row.goods.name}}</p>
                    <div class="goods-info-price-category">
                      <span v-if="scope.row.goods.firstSpecific" class="goods-info-category">
                        {{showSpecific(scope.$index)}}
                      </span>
                      <span class="goods-info-price">￥{{scope.row.goods.price}}</span>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="访问量"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div>访问量：{{scope.row.amountAccess}}</div>
                <div>浏览量：{{scope.row.browsingVolume}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="stock"
              label="库存"
              width="80"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="totalSales"
              label="特价售出"
              width="80"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="开始时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="endTime"
              label="结束时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="state"
              label="状态"
              width="80"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div :style="[{'color':scope.row.state==0?'#DE5B67':(scope.row.state==1?'#6BA725':'#676767')}]">
                  {{getActivityState(scope.$index)}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="180">
              <template slot-scope="scope">
                <el-button v-if="scope.row.state!==2" type="text" class="edit-btn">编辑</el-button>
                <el-button v-if="scope.row.state!==2" @click="closingActivity(scope.row)" type="text" class="close-btn">关闭</el-button>
                <el-button v-if="scope.row.state!==1" @click="deleteActivity(scope.row)" type="text" class="delete-btn">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="paging-box clear">
          <el-pagination
            background
            prev-text="< 上一页"
            next-text="下一页 >"
            layout="prev, pager, next"
            :total="300">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      managementState: 0,
      activeGoodsTableData: [
        {
          id: 1,
          goods: {
            imgSrc: '/static/test/ceshi2.png',
            name: '阿萨德李开复请我诶人；安静；了会计师对方阿斯顿发生大违法水电费水电费爱上对方为二位发到付',
            price: 12312.36,
            firstSpecific: '食品',
            secondSpecific: '四川火锅',
            thirdSpecific: 'cxxxxxz'
          },
          amountAccess: 121,
          browsingVolume: 123211,
          stock: 222,
          totalSales: 23333,
          startTime: '2016-05-03 18:30',
          endTime: '2016-06-03 18:30',
          state: 0
        },
        {
          id: 2,
          goods: {
            imgSrc: '/static/test/ceshi.png',
            name: '阿萨德李开复请我诶人；安静；了会计师对方阿斯顿发生大违法水电费水电费爱上对方为二位发到付',
            price: 12312.36,
            firstSpecific: '食品',
            secondSpecific: '四川火锅'
          },
          amountAccess: 121,
          browsingVolume: 123211,
          stock: 222,
          totalSales: 23333,
          startTime: '2016-05-03 18:30',
          endTime: '2016-06-03 18:30',
          state: 1
        },
        {
          id: 3,
          goods: {
            imgSrc: '/static/test/ceshi.png',
            name: '阿萨德李开复请我诶人；安静；了会计师对方阿斯顿发生大违法水电费水电费爱上对方为二位发到付',
            price: 12312.36
          },
          amountAccess: 121,
          browsingVolume: 123211,
          stock: 222,
          totalSales: 23333,
          startTime: '2016-05-03 18:30',
          endTime: '2016-06-03 18:30',
          state: 1
        },
        {
          id: 4,
          goods: {
            imgSrc: '/static/test/ceshi3.png',
            name: '阿萨德李开复请我诶人；安静；了会计师对方阿斯顿发生大违法水电费水电费爱上对方为二位发到付',
            price: 12312.36,
            firstSpecific: '食品'
          },
          amountAccess: 121,
          browsingVolume: 123211,
          stock: 222,
          totalSales: 23333,
          startTime: '2016-05-03 18:30',
          endTime: '2016-06-03 18:30',
          state: 2
        }
      ],
      multipleSelection: '',
      linkClass: this.$route.params.class
    }
  },
  mounted () {
    // 推荐商品列表

  },
  methods: {
    ...mapMutations(['setMenuLeft']),
    closingActivity (data) {
      let _this = this
      this.$confirm(`是否关闭该活动`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.activeGoodsTableData.splice(data, 1)
        this.$message({
          type: 'success',
          message: `关闭成功`
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消`
        })
      })
    },
    deleteActivity (data) {
      let _this = this
      this.$confirm(`是否删除该活动`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.activeGoodsTableData.splice(data, 1)
        this.$message({
          type: 'success',
          message: `删除成功`
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消`
        })
      })
    },
    // input输入改变排序
    sorting (e) {
      console.log(e)
      console.log(this.activeGoodsTableData)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getActivityState (index) {
      let s = ''
      if (this.activeGoodsTableData[index].state === 0) {
        s = '未开始'
      } else if (this.activeGoodsTableData[index].state === 1) {
        s = '进行中'
      } else {
        s = '已结束'
      }
      return s
    },
    showSpecific (index) {
      let specificList = ''
      if (this.activeGoodsTableData[index].goods.firstSpecific) {
        specificList += this.activeGoodsTableData[index].goods.firstSpecific
        if (this.activeGoodsTableData[index].goods.secondSpecific) {
          specificList += '；' + this.activeGoodsTableData[index].goods.secondSpecific
          if (this.activeGoodsTableData[index].goods.thirdSpecific) {
            specificList += '；' + this.activeGoodsTableData[index].goods.thirdSpecific
          }
        }
      }
      return specificList
    },
    setRouter (link) {
      this.$router.push(link)
    }
  },
  computed: {
    ...mapState(['menuLeft'])
  }
}
</script>

<style scoped lang="less">
  .marketing-management-object {
    min-width: 1100px;
    margin-left: 200px;
    margin-right: 20px;
    padding-top: 20px;
    .marketing-management-content {
      background: #fff;
      padding-bottom: 30px;
      .marketing-management-state {
        border-bottom: 2px solid #fafafa;
        ul {
          border-bottom: 1px solid #EFEFEF;
          float: left;
          li {
            float: left;
            width: 140px;
            height: 40px;
            line-height: 40px;
            color: #333;
            font-size: 14px;
            text-align: center;
            border-right: 1px solid #f5f5f5;
            border-bottom: 1px solid #fff;
            cursor: pointer;
            &.active {
              border-bottom-color: #333;
              font-weight: bold;
              background: #EFEFEF;
            }
          }
        }
        .newly-build {
          float: right;
          margin-right: 20px;
          margin-top: 10px;
        }
      }
      .active-goods-table {
        text-align: center;
        padding: 20px;
        .el-table {
          color: #666;
          font-size: 12px;
          .sort-input{
            width: 27px;
            height: 23px;
            padding-left: 18px;
            background-color: transparent;
            border: 1px solid @bc;
          }
          .sort-btn {
            display: inline-block;
            vertical-align: middle;
            >div {
              display: block;
              font-size: 18px;
              color: #333;
              cursor: pointer;
            }
            .el-icon-caret-top {
              margin-top: -3px;
            }
            .el-icon-caret-bottom {
              margin-top: -9px;
            }
          }
        }
        .goods-info-box {
          text-align: left;
          font-size: 0;
          .goods-img {
            width: 60px;
            height: 60px;
            display: inline-block;
            vertical-align: middle;
            text-align: center;
            border: 1px solid #d5d5d5;
            img {
              width: auto;
              height: auto;
              max-width: 100%;
              max-height: 100%;
              position: relative;
              top: 50%;
              transform: translateY(-50%);
            }
          }
          .goods-info {
            display: inline-block;
            vertical-align: middle;
            text-align: left;
            font-size: 12px;
            padding-left: 15px;
            width: 216px;
            .goods-info-name {
              color: #333;
              font-size: 14px;
              line-height: 1.3;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
            }
            .goods-info-price-category {
              padding-top: 10px;
              line-height: 1.3;
              .goods-info-category {
                color: #999;
                padding-right: 15px;
              }
              .goods-info-price {
                color: #DE5B67;
                display: inline-block;
              }
            }
          }
        }
        .goods-state {
          color: #59A304;
        }
        .operation-paging {
          text-align: left;
          padding-top: 30px;
          div {
            display: inline-block;
            vertical-align: middle;
          }
        }
        .edit-btn {}
        .close-btn, .delete-btn {
          color: #333;
          border-color: #333;
          &:hover {
            color: #f56c6c;
            border-color: #f56c6c;
          }
        }
      }
      .paging-box {
        padding-top: 10px;
        padding-right: 20px;
      }
    }
    .el-button--small {
      width: 80px;
      height: 30px;
      padding: 0;
    }
  }
</style>
<style lang="less">
  .marketing-management-object {
    .el-table {
      th {
        color: #333;
        text-align: center;
        font-weight: normal;
        background: #efefef;
        border-color: #e4e4e4;
      }
      .el-button--text {
        padding: 4px 8px;
        border: 1px solid #63A4FF;
        font-size: 12px;
      }
    }
  }
</style>
