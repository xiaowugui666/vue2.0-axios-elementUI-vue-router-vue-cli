<template>
    <div class="add-production">
      <el-dialog
        title="选择商品"
        :visible.sync="goodsDialogVisible"
        width="50%"
        :before-close="upHandleClose">
        <div class="add-production-content">
          <div class="search-box clear">
            <label>商品名称</label>
            <input type="text" v-model="productionKey" maxlength="20">
            <el-button class="search" type="success" @click="diaSearch" size="small">搜索</el-button>
          </div>
          <div class="select-goods-table">
            <el-table
              ref="multipleTable"
              :data="goods"
              tooltip-effect="dark"
              style="width: 100%"
              border
              @selection-change="handleSelectionChange">
              <el-table-column
                label="商品"
                width="400"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="goods-info-box">
                    <span class="goods-img"><img :src="yiqixuanDomainUrl + scope.row.cover_url" alt=""></span>
                    <div class="goods-info">
                      <p class="goods-info-name">{{scope.row.name}}</p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="goods_status"
                label="售价"
                width="300"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.price_low == scope.row.price_high" class="goods-info-price">￥{{scope.row.price_high | money}}</span>
                  <span v-else-if="scope.row.price_low != scope.row.price_high" class="goods-info-price">￥{{scope.row.price_low | money}} - {{scope.row.price_high | money}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="selectThisGoods(scope.row)"   type="text">选择</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="clear pagination">
            <el-pagination
              background
              @current-change="currentChange($event)"
              :page-size="15"
              :page-count="1"
              prev-text="< 上一页"
              next-text="下一页 >"
              layout="prev, pager, next"
              current-change="currentIndex"
              :total="totalPagina * 15">
            </el-pagination>
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { goodsList } from '@/axios/api'
export default {
  data () {
    return {
      productionKey: '',
      multipleSelection: '',
      goods: [],
      totalPagina: ''
    }
  },
  props: ['goodsDialogVisible', 'yiqixuanDomainUrl'],
  mounted () {
    this.getGoodsList()
  },
  methods: {
    // 选择当前商品
    selectThisGoods (value) {
      this.$emit('goodsId', value.id)
      this.upHandleClose()
    },
    getGoodsList () {
      goodsList({status: 1}).then(res => {
        if (res.status == 200) {
          this.goods = res.data
          this.totalPagina = res.headers.page_count
        }
      })
    },
    // 点击搜索
    diaSearch () {
      goodsList({status: 1, goods_name: this.productionKey}).then(res => {
        this.goods = res.data
        this.totalPagina = res.headers.page_count
      })
    },
    // 点击分页,通知父组件改变状态
    currentChange (e) {
      this.$emit('paginaNum', e - 1)
    },
    upHandleClose () {
      this.$emit('handleClose', false)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getActivityState (index) {
      let s = ''
      if (this.$route.params.class == 'special-offer') {
        if (this.goods[index].goods.status == 1) {
          s = '上架中'
        } else if (this.goods[index].goods.status == 2) {
          s = '已下架'
        } else {
          s = '已售罄'
        }
      } else {
        if (this.goods[index].status == 1) {
          s = '上架中'
        } else if (this.goods[index].status == 2) {
          s = '已下架'
        } else {
          s = '已售罄'
        }
      }
      return s
    },
    showSpecific (index) {
      let specificList = ''
      if (this.goods[index].property_a) {
        specificList += this.goods[index].property_a
        if (this.goods[index].property_b) {
          specificList += '；' + this.goods[index].property_b
          if (this.goods[index].property_c) {
            specificList += '；' + this.goods[index].property_c
          }
        }
      }
      return specificList
    },
    // compGoodsName (scope) {
    //   if (this.$route.params.class == 'recommend') {
    //     return scope.name
    //   } else {
    //     return scope.goods.name
    //   }
    // },
    specVisible (scope) {
      if (this.$route.params.class == 'recommend') {
        return false
      } else if (scope.spec_a || scope.spec_b || scope.spec_c) {
        return true
      }
    }
  },
  computed: {
  }
}
</script>
<style scoped lang="less">
  .add-production {
    .add-production-content{
      background: #FFFFFF;
      box-sizing: border-box;
      .productionList{
        width: 100%;
        margin-top: 30px;
      }
      .pagination {
        padding-top: 30px;
      }
      .search-box{
        label{
          font-size: 12px;
          color: #999999;
          text-align: right;
          line-height: 15px;
        }
        input{
          border: 1px solid #D5D5D5;
          border-radius: 2px;
          width: 256px;
          height: 30px;
          line-height: 30px;
          padding-left: 10px;
          box-sizing: border-box;
          margin-left: 10px;
        }
        .search{
          width: 80px;
          height: 30px;
          padding: 0;
          float: right;
        }
      }
      .select-goods-table {
        text-align: center;
        padding-top: 30px;
        .el-table {
          color: #666;
          font-size: 12px;
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
            width: 316px;
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
    }
  }
</style>
<style lang="less">
  .add-production {
    .el-dialog__title {
      font-size: 14px;
      color: #333;
      font-weight: bold;
    }
    .el-table {
      th {
        color: #333;
        text-align: center;
        font-weight: normal;
        background: #efefef;
        border-color: #e4e4e4;
      }
    }
  }
</style>
