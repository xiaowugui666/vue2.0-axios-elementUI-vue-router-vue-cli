<template>
  <div>
    <menu-left :routeIndex="menuLeftIndex"></menu-left>
    <div class="marketing-management-object">
      <div class="marketing-management-content">
        <div class="marketing-management-state clear">
          <ul>
            <li :class="{'active':managementState==0}" @click="changState(0)">全部</li>
            <li :class="{'active':managementState==1}" @click="changState(1)">未开始</li>
            <li :class="{'active':managementState==2}" @click="changState(2)">进行中</li>
            <li :class="{'active':managementState==3}" @click="changState(3)">已结束</li>
          </ul>
          <el-button @click="setRouter()"  size="small" class="newly-build addBtn">新建</el-button>
        </div>
        <div class="active-goods-table">
          <el-table
            ref="multipleTable"
            :data="goodsList"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange">
            <el-table-column
              label="商品"
              min-width="230"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="goods-info-box" v-if="scope.row.goods">
                  <span class="goods-img"><img :src="(scope.row.goods_sku && scope.row.goods_sku.cover_url) ? yiqixuanDomainUrl + scope.row.goods_sku.cover_url : yiqixuanDomainUrl + scope.row.goods.cover_url" alt=""></span>
                  <div class="goods-info">
                    <p class="goods-info-name">{{scope.row.goods.name}}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="min_join_count"
              label="开团人数"
              width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="begin_at"
              label="开始时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="end_at"
              label="结束时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="创建时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="120"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="goodsList.length" :style="[{'color':getActivityState(scope.$index)=='未开始'?'#FA505D':(getActivityState(scope.$index)=='进行中'?'#2cBA4A':'#676767')}]">
                  {{getActivityState(scope.$index)}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="180">
              <template slot-scope="scope">
                <el-button type="text" :disabled="scope.row.status == 2" @click="editor(scope.row)" class="edit-btn">编辑</el-button>
                <el-button :disabled="scope.row.status == 1 || scope.row.status == 3 || scope.row.status == 4" @click="closingActivity(scope.row)" type="text" class="close-btn">关闭</el-button>
                <el-button :disabled="scope.row.status ==2" @click="deleteActivity(scope.row)" type="text" class="delete-btn">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="paging-box clear">
        <el-pagination
        background
        :page-size="15"
        @current-change="currentChange($event)"
        prev-text="< 上一页"
        next-text="下一页 >"
        layout="prev, pager, next"
        :total="totalPagina * 15">
        </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import menuLeft from '@/components/menu-left'
import {groupList, deleteGroupList, closeGroupList} from '../axios/api'
export default {
  data () {
    return {
      managementState: 0,
      goodsList: [],
      multipleSelection: '',
      linkClass: this.$route.params.class,
      timeStamp: '',
      // 左侧菜单栏选中的菜单index
      menuLeftIndex: '7-3',
      page: 0,
      totalPagina: 0
    }
  },
  mounted () {
    this.request()
  },
  methods: {
    // 点击改变排序状态
    // handleClick (value, val) {
    //   let nextInd = val == 1 ? value - 1 : value + 1
    //   if (nextInd > -1 && nextInd < this.goodsList.length) {
    //     let route = ''
    //     let params = {}
    //     params.from_id = this.goodsList[value].id
    //     params.to_id = this.goodsList[nextInd].id
    //     if (this.linkClass == 'recommend') {
    //       route = 'recommend_goods'
    //     } else {
    //       route = 'special_goods'
    //     }
    //     changeSort(route, params).then(res => {
    //       if (res.status == 200) {
    //         // 改变goodsList数据，刷新视图层
    //         let temp = this.goodsList.splice(value, 1)
    //         this.goodsList.splice(nextInd, 0, temp[0])
    //       } else {
    //         this.$message({
    //           message: '修改顺序失败，请稍后重试',
    //           type: 'error'
    //         })
    //       }
    //     })
    //   }
    // },
    // 页面初始数据加载
    request () {
      // 获取商品列表
      groupList({
        status: this.managementState,
        page: this.page
      }).then(res => {
        this.goodsList = res.data.data
        this.totalPagina = res.data.pageCount + 1
      })
    },
    // 点击排序状态
    changState (value) {
      this.managementState = value
      this.request()
    },
    // 关闭活动
    closingActivity (data) {
      this.$confirm(`是否关闭该活动`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        closeGroupList(data.id).then(res => {
          this.request()
          this.$message({
            type: 'success',
            message: '关闭成功'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消`
        })
      })
    },
    // 删除商品
    deleteActivity (data) {
      this.$confirm(`是否删除该活动`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGroupList(data.id).then(res => {
          this.request()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消`
        })
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 团购状态
    getActivityState (index) {
      let s = ''
      if (this.goodsList[index].status == 1) {
        s = '未开始'
      } else if (this.goodsList[index].status == 2) {
        s = '进行中'
      } else if (this.goodsList[index].status == 3 || this.goodsList[index].status == 4) {
        s = '已结束'
      }
      return s
    },
    // 商品规格
    // showSpecific (index) {
    //   let specificList = ''
    //   if (this.goodsList[index].goods_sku.property_a) {
    //     specificList += this.goodsList[index].goods_sku.property_a
    //     if (this.goodsList[index].goods_sku.property_b) {
    //       specificList += '；' + this.goodsList[index].goods_sku.property_b
    //       if (this.goodsList[index].goods_sku.property_c) {
    //         specificList += '；' + this.goodsList[index].goods_sku.property_c
    //       }
    //     }
    //   }
    //   return specificList
    // },
    setRouter () {
      this.$router.push({name: 'addGroupBuy', params: { id: 'newCreat' }})
    },
    // 编辑操作
    editor (value) {
      // 活动进行状态
      this.$router.push({name: 'addGroupBuy', params: { id: value.id }})
    }
  },
  computed: {
    ...mapState(['yiqixuanDomainUrl'])
  },
  components: {
    menuLeft
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
      .close-btn, .delete-btn {
        color: #333;
        border-color: #333;
        /*&:hover {*/
          /*color: #f56c6c;*/
          /*border-color: #f56c6c;*/
        /*}*/
      }
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
              border-bottom:3px solid #FA505D;
              font-weight: bold;
              color: #FA505D;
              background: #fff;
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
          /*.sort-input{
            width: 27px;
            height: 23px;
            padding-left: 18px;
            background-color: transparent;
            border: 1px solid @bc;
          }*/
          .sort-btn {
            display: inline-block;
            vertical-align: middle;
            >div {
              display: block;
              font-size: 18px;
              color: #333;
              cursor: pointer;
            }
            div.enable {
              cursor: default;
              color: #D5D5D5;
            }
            .el-icon-caret-top {
              font-size: 12px;
            }
            .el-icon-caret-bottom {
              margin-top: -2px;
              font-size: 12px;
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
            width:calc(100% - 65px);
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
        &:disabled {
          .disabled()
        }
      }
    }
  }
</style>
