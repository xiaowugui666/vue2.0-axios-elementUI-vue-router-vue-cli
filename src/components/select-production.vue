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
            <input type="text" v-model="productionKey">
            <el-button class="search" type="success" @click="diaSearch" size="small">搜索</el-button>
          </div>
          <div class="select-goods-table">
            <el-table
              ref="multipleTable"
              :data="newGoods"
              tooltip-effect="dark"
              style="width: 100%"
              border
              @selection-change="handleSelectionChange">
              <el-table-column
                label="商品"
                width="400">
                <template slot-scope="scope">
                  <div class="goods-info-box">
                    <span class="goods-img"><img :src="qiniuDomainUrl + scope.row.cover_url" alt=""></span>
                    <div class="goods-info">
                      <p class="goods-info-name">{{compGoodsName(scope.row)}}</p>
                      <div class="goods-info-price-category">
                      <span v-if="specVisible(scope.row)" class="goods-info-category">
                        {{showSpecific(scope.$index)}}
                      </span>
                        <span class="goods-info-price">￥{{scope.row.price | money}}</span>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="goods_status"
                label="状态"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <div :style="[{'color': (scope.row.status == 1 || scope.row.goods.status == 1) ? '#6BA725' :((scope.row.status == 2 || scope.row.goods.status == 2) ?'#676767':'#DE5B67')}]">
                    {{getActivityState(scope.$index)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="selectThisGoods(scope.row)" type="text">选择</el-button>
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
              :total="newGoods.totalPagina * 15">
            </el-pagination>
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      productionKey: '',
      multipleSelection: '',
      goods: this.newGoods
    }
  },
  props: ['goodsDialogVisible', 'newGoods', 'qiniuDomainUrl'],
  mounted () {
    this.goods = this.newGoods
  },
  methods: {
    // 选择当前商品
    selectThisGoods (value) {
      this.$emit('goodsId', value)
      this.upHandleClose()
    },
    // 点击搜索
    diaSearch () {
      if (this.productionKey !== '') {
        this.$emit('modalSearch', this.productionKey)
      } else {
        this.$message({
          message: '请输入要搜索的商品名称',
          type: 'warning'
        })
      }
    },
    // 点击分页,通知父组件改变状态
    currentChange (e) {
      this.$emit('paginaNum', e)
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
        if (this.newGoods[index].goods.status == 1) {
          s = '上架中'
        } else if (this.newGoods[index].goods.status == 2) {
          s = '已下架'
        } else {
          s = '已售罄'
        }
      } else {
        if (this.newGoods[index].status == 1) {
          s = '上架中'
        } else if (this.newGoods[index].status == 2) {
          s = '已下架'
        } else {
          s = '已售罄'
        }
      }
      return s
    },
    showSpecific (index) {
      let specificList = ''
      if (this.newGoods[index].spec_a) {
        specificList += this.newGoods[index].spec_a
        if (this.newGoods[index].spec_b) {
          specificList += '；' + this.newGoods[index].spec_b
          if (this.newGoods[index].spec_c) {
            specificList += '；' + this.newGoods[index].spec_c
          }
        }
      }
      return specificList
    },
    compGoodsName (scope) {
      if (this.$route.params.class == 'recommend') {
        return scope.name
      } else {
        return scope.goods.name
      }
    },
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
  .state{
    width: 20%;
    box-sizing: border-box;
    text-align: center;
    height: 80px;
    line-height: 80px;
    border-right: 1px solid #d5d5d5;
    font-size: 14px;
    color: #333;
  }
  .toSelect{
    box-sizing: border-box;
    text-align: center;
    width: 20%;
    height: 80px;
    line-height: 80px;
    font-size:14px;
    border-right: 1px solid #d5d5d5;
    color:#63A4FF;
  }
  .list{
    height: 80px;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items: center;
    border-left:1px solid  #d5d5d5;
    border-bottom: 1px solid  #d5d5d5;
    img{
      width: 60px;
      height: 60px;
      padding: 10px;
    }
  }
  .listHeader{
    background: #EFEFEF;
    height: 40px;
    line-height: 40px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid #d5d5d5;
    label{
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #333333;
      display: block;
    }
    label:nth-child(1){
      width: 60%;
      box-sizing: border-box;
      padding-left: 20px;
      border-right: 1px solid  #D5D5D5;
    }
    label:nth-child(2){
      width: 20%;
      text-align: center;
      border-right: 1px solid  #D5D5D5;
    }
    label:nth-child(3){
      width: 20%;
      text-align: center;
    }
  }
  .title{
    font-family: MicrosoftYaHei-Bold;
    font-size: 14px;
    color: #333333;
    font-weight: bold;
  }
  .searchBox{
    margin-top: 39px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    label{
      font-family: MicrosoftYaHei;
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
      padding-left: 7px;
      box-sizing: border-box;
      margin-right: 150px;
    }
    .search{
      background: #DE5B67;
      border-radius: 2px;
      width: 80px;
      height: 30px;
      line-height: 30px;
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #FFFFFF;
      text-align: center;
    }
  }
  .addProduction{
    background: rgba(51,51,51,0.60);
    position: fixed;
    width:100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  .content{
    padding:20px;
    background: #FFFFFF;
    border: 1px solid #979797;
    border-radius: 7px;
    width: 600px;
    box-sizing: border-box;
    .productionList{
      width: 100%;
      margin-top: 30px;
    }
  }
  .top{
    padding-left: 5px;
  }
</style>
