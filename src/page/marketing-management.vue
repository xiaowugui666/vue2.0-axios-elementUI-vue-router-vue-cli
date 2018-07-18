<template>
  <div>
    <menu-left :routeIndex="menuLeftIndex"></menu-left>
    <div class="marketing-management-object">
      <div class="marketing-management-content">
        <div class="marketing-management-state clear">
          <ul>
            <li :class="{'active':managementState==1}" @click="changState(1)">全部</li>
            <li :class="{'active':managementState==2}" @click="changState(2)">未开始</li>
            <li :class="{'active':managementState==3}" @click="changState(3)">进行中</li>
            <li :class="{'active':managementState==4}" @click="changState(4)">已结束</li>
          </ul>
          <el-button @click="setRouter({name:'addMarketingActivity',params:{class:linkClass}})" type="primary" size="small" class="newly-build">新建</el-button>
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
              label="排序"
              width="75">
              <template slot-scope="scope">
                <div>
                  <!--<input class="sort-input" type="text" :value="scope.$index + 1" @input="sorting($event)">-->
                  <span>{{scope.$index + 1}}</span>
                  <div class="sort-btn">
                    <div :class="{'enable': scope.$index == 0,'el-icon-caret-top': true}" @click="handleClick(scope.$index,1)"></div>
                    <div :class="{'enable': scope.$index == goodsList.length - 1,'el-icon-caret-bottom': true}" @click="handleClick(scope.$index,2)"></div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="商品"
              min-width="250"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="goods-info-box" v-if="scope.row.goods">
                  <span class="goods-img"><img :src="(scope.row.goods_sku && scope.row.goods_sku.cover_url) ? yiqixuanDomainUrl + scope.row.goods_sku.cover_url : yiqixuanDomainUrl + scope.row.goods.cover_url" alt=""></span>
                  <div class="goods-info">
                    <p class="goods-info-name">{{scope.row.goods.name}}</p>
                    <div class="goods-info-price-category">
                      <span v-if="linkClass == 'special-offer' && scope.row.goods_sku && (scope.row.goods_sku.property_a || scope.row.goods_sku.property_b || scope.row.goods_sku.property_c)" class="goods-info-category">
                        {{showSpecific(scope.$index)}}
                      </span>
                      <span class="goods-info-price">￥{{(linkClass == 'recommend' ? scope.row.goods.price : scope.row.price) | money}}</span>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="linkClass == 'recommend'"
              prop="goods.stock_count"
              label="库存"
              width="80"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              v-else
              prop="stock_count"
              label="库存"
              width="80"
              show-overflow-tooltip>
            </el-table-column>
            <!--<el-table-column-->
              <!--prop="goods_sku.sales_count"-->
              <!--label="特价售出"-->
              <!--v-if="linkClass == 'special-offer'"-->
              <!--width="80"-->
              <!--show-overflow-tooltip>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="goods.sales_count"-->
              <!--label="推荐售出"-->
              <!--v-else-->
              <!--width="80"-->
              <!--show-overflow-tooltip>-->
            <!--</el-table-column>-->
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
              prop="status"
              label="状态"
              width="80"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="goodsList.length" :style="[{'color':getActivityState(scope.$index)=='未开始'?'#DE5B67':(getActivityState(scope.$index)=='进行中'?'#6BA725':'#676767')}]">
                  {{getActivityState(scope.$index)}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="180">
              <template slot-scope="scope">
                <el-button type="text" :disabled="getActivityState(scope.$index) !== '未开始' || scope.row.status == 2" @click="editor(scope.row)" class="edit-btn">编辑</el-button>
                <el-button :disabled="getActivityState(scope.$index) == '已结束' || scope.row.status == 2" @click="closingActivity(scope.row)" type="text" class="close-btn">关闭</el-button>
                <el-button :disabled="getActivityState(scope.$index) == '进行中' && scope.row.status == 1" @click="deleteActivity(scope.row)" type="text" class="delete-btn">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--<div class="paging-box clear">-->
          <!--<el-pagination-->
            <!--background-->
            <!--v-if="goodsList.length"-->
            <!--:currentPage="curPage"-->
            <!--:page-size="5"-->
            <!--@current-change="currentChange($event)"-->
            <!--prev-text="< 上一页"-->
            <!--next-text="下一页 >"-->
            <!--layout="prev, pager, next"-->
            <!--:total="totalPagina * 5">-->
          <!--</el-pagination>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import menuLeft from '@/components/menu-left'
import {marketingGoods, closeGoods, deleteSpecial, deleteRecommend, closeRecommendGood, changeSort} from '../axios/api'
export default {
  data () {
    return {
      managementState: 1,
      goodsList: [],
      multipleSelection: '',
      linkClass: this.$route.params.class,
      timeStamp: '',
      // 左侧菜单栏选中的菜单index
      menuLeftIndex: ''
    }
  },
  mounted () {
    this.request()
    this.setMenuLeftIndex()
  },
  watch: {
    '$route' () {
      this.linkClass = this.$route.params.class
      this.managementState = 1
      this.request()
    }
  },
  methods: {
    // 点击改变排序状态
    handleClick (value, val) {
      let nextInd = val == 1 ? value - 1 : value + 1
      if (nextInd > -1 && nextInd < this.goodsList.length) {
        let route = ''
        let params = {}
        params.from_id = this.goodsList[value].id
        params.to_id = this.goodsList[nextInd].id
        if (this.linkClass == 'recommend') {
          route = 'recommend_goods'
        } else {
          route = 'special_goods'
        }
        changeSort(route, params).then(res => {
          if (res.status == 200) {
            // 改变goodsList数据，刷新视图层
            let temp = this.goodsList.splice(value, 1)
            this.goodsList.splice(nextInd, 0, temp[0])
          } else {
            this.$message({
              message: '修改顺序失败，请稍后重试',
              type: 'error'
            })
          }
        })
      }
    },
    // 通过url上带的参数选择菜单栏选中状态
    setMenuLeftIndex () {
      if (this.linkClass === 'special-offer') {
        this.menuLeftIndex = '7-1'
      } else if (this.linkClass === 'recommend') {
        this.menuLeftIndex = '7-2'
      }
    },
    // 页面初始数据加载
    request (curPage) {
      // 路由判定
      let router = 'special-offer'
      if (this.linkClass == 'special-offer') {
        router = 'special_goods'
      } else if (this.linkClass == 'recommend') {
        router = 'recommend_goods'
      }
      // 获取商品列表
      marketingGoods(router, {
        type: this.managementState
      }).then(res => {
        this.goodsList = res.data
        this.timeStamp = res.headers.time
      })
    },
    // 点击排序状态
    changState (value) {
      this.managementState = value
      this.request()
    },
    // 点击分页
    // currentChange (value) {
    //   console.log(value)
    //   this.request()
    // },
    // 关闭活动
    closingActivity (data) {
      let _this = this
      this.$confirm(`是否关闭该活动`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 特价商品路由，关闭特价商品活动
        if (this.$route.params.class == 'special-offer') {
          closeGoods({
            id: data.id,
            status: 2
          }).then(res => {
            _this.request()
            _this.$message({
              type: 'success',
              message: `关闭成功`
            })
          })
        } else if (this.$route.params.class == 'recommend') {
          // 推荐商品路由，关闭该推荐商品
          closeRecommendGood({
            id: data.id,
            status: 2
          }).then(res => {
            _this.request()
            _this.$message({
              type: 'success',
              message: `关闭成功`
            })
          })
        }
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
        // 特价商品路由，删除特价商品
        if (this.$route.params.class == 'special-offer') {
          deleteSpecial(data.id).then(res => {
            this.request().done(() => {
              this.$message({
                type: 'success',
                message: `删除成功`
              })
            })
          })
        } else if (this.$route.params.class == 'recommend') {
        // 推荐商品路由，删除推荐商品
          deleteRecommend(data.id).then(res => {
            this.request()
            this.$message({
              type: 'success',
              message: `删除成功`
            })
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消`
        })
      })
    },
    // input输入改变排序
    sorting (e) {
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getActivityState (index) {
      let s = ''
      let date = this.timeStamp
      if (this.goodsList[index].begin_at > date && this.goodsList[index].status == 1) {
        s = '未开始'
      } else if (this.goodsList[index].begin_at < date && this.goodsList[index].end_at > date && this.goodsList[index].status == 1) {
        s = '进行中'
      } else {
        s = '已结束'
      }
      return s
    },
    // 商品规格
    showSpecific (index) {
      let specificList = ''
      if (this.goodsList[index].goods_sku.property_a) {
        specificList += this.goodsList[index].goods_sku.property_a
        if (this.goodsList[index].goods_sku.property_b) {
          specificList += '；' + this.goodsList[index].goods_sku.property_b
          if (this.goodsList[index].goods_sku.property_c) {
            specificList += '；' + this.goodsList[index].goods_sku.property_c
          }
        }
      }
      return specificList
    },
    setRouter (link) {
      this.$router.push(link)
    },
    // 编辑操作
    editor (value) {
      // 活动进行状态
      let activeStatu = value.status
      if (activeStatu === 1) {
        this.$router.push({name: 'addMarketingActivity', query: {class: this.$route.params.class, id: value.id}})
      }
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
