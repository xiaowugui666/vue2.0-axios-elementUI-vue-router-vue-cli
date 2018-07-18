<template>
  <div>
    <menu-left routeIndex="3-1"></menu-left>
    <div class="commodity-management-subject content-box">
      <div class="commodity-management-state-search">
        <ul class="commodity-management-state clear">
          <li :class="{'active':managementState==0}" @click="changeManagementState(0)">全部</li>
          <li :class="{'active':managementState==1}" @click="changeManagementState(1)">出售中</li>
          <li :class="{'active':managementState==3}" @click="changeManagementState(3)">已售罄</li>
          <li :class="{'active':managementState==2}" @click="changeManagementState(2)">已下架</li>
        </ul>
        <div class="commodity-management-search">
          <span class="name required">商品类目：</span>
          <el-cascader
            expand-trigger="hover"
            size="small"
            clearable
            class="select-state"
            :options="selectStateOptions"
            v-model.trim="selectedOptions"
            @change="categoryChange">
          </el-cascader>
          <span>商品名称：</span>
          <input type="text" @keyup.enter="changeManagementState(undefined)" v-model.trim="searchComName" maxlength="20" placeholder="请输入商品名称">
          <el-button type="success" size="small" class="search-commodity" @click="changeManagementState(undefined)">搜索</el-button>
        </div>
      </div>
      <div class="commodity-list">
        <div class="add-commodity-box clear">
          <div class="opera-btn-row">
            <el-row>
              <el-button @click="batchOperation(1)" :disabled="disabled[0] || disabledUpper" size="small">批量上架</el-button>
              <el-button @click="batchOperation(2)" :disabled="disabled[1] || disabledLower" size="small">批量下架</el-button>
              <el-button @click="batchOperation(3)" :disabled="disabled[2] || disabledDelete" size="small">批量删除</el-button>
            </el-row>
          </div>
          <el-button class="add-edit-goods addBtn" type="primary" size="small"    @click="setRouter('/add-edit-goods')">添加商品</el-button>
        </div>
        <div class="commodity-list-table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              align="left"
              header-align="center"
              width="75">
            </el-table-column>
            <el-table-column
              label="商品"
              show-overflow-tooltip
              min-width="300">
              <template slot-scope="scope">
                <div class="goods-info-box">
                  <span class="goods-img"><img :src="yiqixuanDomainUrl+scope.row.cover_url" alt=""></span>
                  <div class="goods-info">
                    <p class="goods-info-name">{{scope.row.name}}</p>
                    <div class="goods-info-price-category">
                      <span class="goods-info-price">￥{{renderingGoodsPrice(scope.row.price_low, scope.row.price_high)}}</span>
                      <span v-if="scope.row.category_name" class="goods-info-category">
                        类目：{{scope.row.category_name}}
                      </span>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="浏览量"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="browsing-volume">浏览量：{{scope.row.view_count?scope.row.view_count:0}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="stock_total"
              label="库存"
              width="80"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div :class="{'waring':scope.row.stock_total==0}">{{scope.row.stock_total}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="sales_count"
              label="总销量"
              min-width="80"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div :class="{'waring':scope.row.sales_count==0}">{{scope.row.sales_count}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="创建时间"
              min-width="160"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="state"
              label="状态"
              width="80"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div :class="{'safe':scope.row.status==1}">{{getGoodsState(scope.$index)}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="140">
              <template slot-scope="scope">
                <el-button @click="setRouter('/add-edit-goods?gid='+scope.row.id)" type="text" size="small">编辑</el-button>
                <el-button  :disabled="scope.row.status==3" @click="upperLowerFrame(scope.row)" type="text" size="small" class="black-btn">{{scope.row.status===1?'下架':'上架'}}</el-button>
                <!--<el-button type="text" size="small" class="black-btn">浏览</el-button>-->
                <!--<el-button type="text" size="small" class="black-btn">浏览</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <div class="operation-paging clear">
            <el-pagination
              v-if="page_count"
              background
              prev-text="< 上一页"
              next-text="下一页 >"
              layout="prev, pager, next"
              :current-page="page+1"
              @current-change="currentChange"
              :total="page_count*10">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
import {mapState} from 'vuex'
import {goodsList, goodsStatus, goodsDelete, goodsCategory} from '../axios/api.js'
export default {
  data () {
    return {
      managementState: 0, // 商品状态tab
      page: 0,
      cat_id: '',
      goods_name: '',
      searchComName: '',
      page_count: 0, // 总页数
      selectStateOptions: [],
      selectedOptions: [],
      tableData: [], // 商品列表数组
      multipleSelection: [],

      // 是否可用批量操作
      disabled: [false, false, false],
      disabledUpper: true,
      disabledLower: true,
      disabledDelete: true
    }
  },
  created () {
    this.getGoodsList()
    this.getGoodsCategory()
  },
  mounted () {
    // console.log(this.selectStateOptions)
  },
  computed: {
    ...mapState(['yiqixuanDomainUrl'])
  },
  methods: {
    // 获取商品列表
    getGoodsList (data = {
      category_id: this.cat_id,
      goods_name: this.goods_name,
      page: this.page,
      status: this.managementState !== 0 ? this.managementState : ''
    }) {
      goodsList(data).then(res => {
        this.tableData = []
        this.page_count = 0
        if (res.data.length > 0) {
          this.tableData = res.data
          this.page_count = res.headers.page_count
        }
      })
    },
    // 渲染商品价格
    renderingGoodsPrice (low, high) {
      let price = ''
      if (low && high) {
        if (low === high) {
          price = (low / 100).toFixed(2)
          return price
        } else {
          price = (low / 100).toFixed(2) + '~' + (high / 100).toFixed(2)
          return price
        }
      }
    },
    // 请求商品分类
    getGoodsCategory () {
      goodsCategory().then(res => {
        this.selectStateOptions = []
        for (let v of res.data) {
          let option = {
            label: v.name,
            value: v.id
          }
          if (v.children.length > 0) {
            option.children = []
            for (let w of v.children) {
              option.children.push({
                label: w.name,
                value: w.id
              })
            }
          }
          this.selectStateOptions.push(option)
        }
        // console.log(this.selectStateOptions)
      })
    },
    // tab-bar选择商品状态，请求商品列表
    changeManagementState (status) {
      if (typeof status !== 'undefined') {
        this.managementState = status
      }
      this.page = 0
      if (this.selectedOptions) {
        this.cat_id = this.selectedOptions[this.selectedOptions.length - 1]
      }
      this.goods_name = this.searchComName
      this.getGoodsList()
    },
    // 是否可以批量操作
    disabledGrounding () {
      // 初始化批量操作
      this.disabled = [false, false, false]
      this.disabledUpper = true
      this.disabledLower = true
      this.disabledDelete = true

      for (let v of this.multipleSelection) {
        if (v.status === 3) {
          this.$set(this.disabled, 0, true)
          this.$set(this.disabled, 1, true)
          this.disabledDelete = false
        } else if (v.status === 1) {
          this.$set(this.disabled, 2, true)
          this.disabledLower = false
        } else if (v.status === 2) {
          this.disabledUpper = false
          this.disabledDelete = false
        }
      }
    },
    // 执行批量操作
    batchOperation (status) {
      let _this = this
      this.$confirm(`是否批量${status === 1 ? '上架' : (status === 2 ? '下架' : '删除')}所选中的商品`, '确认操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let statusArr = []
        if (status !== 3) {
          for (let v of this.multipleSelection) {
            statusArr.push(v.id)
          }
          goodsStatus({'ids': statusArr, 'status': status}).then(res => {
            // console.log(res)
            for (let w of _this.tableData) {
              if (statusArr.indexOf(w.id) > -1) {
                w.status = status
              }
            }
            this.toggleSelection()
            this.$message({
              showClose: true,
              type: 'success',
              message: `批量${status === 1 ? '上架' : (status === 2 ? '下架' : '删除')}成功`
            })
          }).catch(err => {
            if (err.response.status === 404) {
              this.$message({
                showClose: true,
                type: 'error',
                message: err.response.data.message
              })
            }
          })
        } else {
          for (let v of this.multipleSelection) {
            statusArr.push(v.id)
          }
          goodsDelete({'ids': statusArr}).then(res => {
            this.getGoodsList()
            this.$message({
              showClose: true,
              type: 'success',
              message: `批量${status === 1 ? '上架' : (status === 2 ? '下架' : '删除')}成功`
            })
          }).catch(err => {
            if (err.response.status === 404) {
              this.$message({
                showClose: true,
                type: 'error',
                message: err.response.data.message
              })
            }
          })
        }
      }).catch(() => {
        this.$message({
          showClose: true,
          type: 'info',
          message: `已取消批量${status === 1 ? '上架' : (status === 2 ? '下架' : '删除')}`
        })
      })
    },
    // 渲染商品状态
    getGoodsState (index) {
      let s = ''
      if (this.tableData[index].status === 1) {
        s = '上架中'
      } else if (this.tableData[index].status === 2) {
        s = '已下架'
      } else {
        s = '已售罄'
      }
      return s
    },
    // 单个商品上下架
    upperLowerFrame (data) {
      let _this = this
      this.$confirm(`是否${data.status === 1 ? '下架' : '上架'}该商品`, '确认操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let s = data.status === 1 ? 2 : 1
        goodsStatus({'ids': [data.id],
          'status': s}).then(res => {
          for (let k of _this.tableData) {
            // console.log(k['id'])
            if (k['id'] === data['id']) {
              if (k['status'] === 1) {
                k['status'] = 2
              } else {
                k['status'] = 1
              }
            }
          }
          this.$message({
            showClose: true,
            type: 'success',
            message: `${data.status === 1 ? '上架' : '下架'}成功!`
          })
        }).catch(err => {
          // console.dir(err)
          if (err.response.status === 404) {
            this.$message({
              showClose: true,
              type: 'error',
              message: err.response.data.message
            })
          }
        })
      }).catch(() => {
        this.$message({
          showClose: true,
          type: 'info',
          message: `已取消${data.status === 1 ? '上架' : '下架'}`
        })
      })
    },
    // 初始化表格选中状态
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 选择商品触发
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.disabledGrounding()
    },
    // 点击分页数
    currentChange (page) {
      this.page = page - 1
      this.getGoodsList()
    },
    categoryChange (val) {
      // console.log(val)
    },
    setRouter (link) {
      this.$router.push({
        path: link
      })
    }
  },
  components: {
    menuLeft
  }
}
</script>

<style scoped lang="less">
  .commodity-management-subject {
    .commodity-management-state-search {
      background: #fff;
      margin-bottom: 20px;
      ul {
        border-bottom: 1px solid #EFEFEF;
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
            border-bottom:2px solid @mainC;
            font-weight: bold;
            color: @mainC;
            background: #fff;
          }
        }
      }
    }
    .commodity-management-search {
      padding: 30px 20px;
      font-size: 12px;
      color: #999;
      span {
        padding-right: 3px;
      }
      .select-state {
        border-radius: 0;
        width: 258px;
        margin-right: 15px;
      }
      input {
        display: inline-block;
        width: 236px;
        color: #333;
        border: 1px solid #d5d5d5;
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
        padding-right: 10px;
        margin-right: 30px;
        &::-webkit-input-placeholder {
          color: #b5b5b5;
        }
      }
      .search-commodity {
      }
    }
    .commodity-list {
      background: #fff;
      padding: 20px;
      .add-commodity-box {
        padding-bottom: 20px;
        .opera-btn-row {
          display: inline-block;
        }
        .add-edit-goods {
          float: right;
        }
      }
      .commodity-list-table {
        text-align: center;
        .el-table {
          color: #666;
          font-size: 12px;
        }
        .goods-info-box {
          text-align: left;
          font-size: 0;
          .goods-img {
            display: inline-block;
            vertical-align: middle;
            width: 60px;
            height: 60px;
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
            font-size: 12px;
            padding-left: 15px;
            display: inline-block;
            vertical-align: middle;
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
              line-height: 1.2;
              .goods-info-price {
                color: @mainC;
                padding-right: 15px;
              }
              .goods-info-category {
                color: #999;
              }
            }
          }
        }
        .browsing-volume {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .operation-paging {
          text-align: left;
          padding-top: 30px;
          padding-bottom: 10px;
        }
        .black-btn {
          color: #333;
          border-color: #333;
          &:disabled {
            .disabled()
          }
        }
      }
    }
    .el-button--small {
      width: 80px;
      height: 30px;
      padding: 0;
    }
    .el-button--default {
      color: #333;
      border-color: #333;
      background: #fff;
      &.is-disabled {
        border: 1px solid #B5B5B5;
        color: #999;
      }
    }
    .el-button--text {
      width: auto;
      padding: 0 7px;
      height: 24px;
      border: 1px solid #63A4FF;
      &:disabled {
        color: @b9;
        border-color: @b5b5;
      }
    }
  }
</style>
<style lang="less">
  .commodity-management-subject {
    .el-input__inner {
      border-radius: 0;
      color: #333;
      border-color: #d5d5d5;
    }
    .el-table{
      th {
        padding: 8px 0;
        color: #333;
        text-align: center;
        font-weight: normal;
        background: #efefef;
        border-color: #e4e4e4;
        .el-checkbox::after {
          content: '全选';
          color: #333;
          padding-left: 6px;
        }
      }
      td {
        padding: 10px 0;
        .waring {
          color: @mainC;
        }
        .safe {
          color: @green;
        }
      }
    }
  }
</style>
