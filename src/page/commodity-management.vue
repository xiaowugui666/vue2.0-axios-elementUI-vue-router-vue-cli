<template>
  <div>
    <div class="commodity-management-subject">
      <div class="commodity-management-state-search">
        <ul class="commodity-management-state clear">
          <li :class="{'active':managementState==0}" @click="managementState=0">全部</li>
          <li :class="{'active':managementState==1}" @click="managementState=1">出售中</li>
          <li :class="{'active':managementState==2}" @click="managementState=2">已售罄</li>
          <li :class="{'active':managementState==3}" @click="managementState=3">已下架</li>
        </ul>
        <div class="commodity-management-search">
          <span class="name required">商品类目：</span>
          <el-select v-model="value" size="small" class="select-state">
            <el-option
              v-for="item in selectStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>商品名称：</span>
          <input type="text" placeholder="请输入商品名称" v-model="searchComName">
          <el-button type="success" size="small" class="search-commodity">搜索</el-button>
        </div>
      </div>
      <div class="commodity-list">
        <div class="add-commodity-box">
          <el-button type="primary" size="small" @click="setRouter('/addEditGoods')">添加商品</el-button>
        </div>
        <div class="commodity-list-table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
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
              width="300">
              <template slot-scope="scope">
                <div class="goods-info-box">
                  <span class="goods-img"><img :src="scope.row.goods.imgSrc" alt=""></span>
                  <div class="goods-info">
                    <p class="goods-info-name">{{scope.row.goods.name}}</p>
                    <div class="goods-info-price-category">
                      <span class="goods-info-price">￥{{scope.row.goods.price}}</span>
                      <span class="goods-info-category">
                        类目：{{scope.row.goods.firstCategory}}-{{scope.row.goods.secondCategory}}
                      </span>
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
              label="总销量"
              width="80"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="creationTime"
              label="创建时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="state"
              label="状态"
              width="80"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div :class="{'goods-state':scope.row.state}" @click="upperLowerFrame">{{scope.row.state?'已上架':'已下架'}}</div>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.state?'下架':'上架'}}</el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">浏览</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="operation-paging clear">
            <div class="opera-btn-row left">
              <el-row>
                <el-button size="small">上架</el-button>
                <el-button disabled size="small">下架</el-button>
                <el-button disabled size="small">删除</el-button>
              </el-row>
            </div>
            <div class="right">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="300">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
export default {
  data () {
    return {
      managementState: 0,
      searchComName: '',
      selectStateOptions: [{
        value: '1',
        label: '食品'
      }, {
        value: '2',
        label: '数码家电'
      }, {
        value: '3',
        label: '女装'
      }, {
        value: '4',
        label: '美妆'
      }, {
        value: '5',
        label: '日用百货'
      }],
      value: '食品',
      tableData: [{
        id: 1,
        goods: {
          imgSrc: '/static/test/ceshi2.png',
          name: '阿萨德李开复请我诶人；安静；了会计师对方阿斯顿发生大违法水电费水电费爱上对方为二位发到付',
          price: 12312.36,
          firstCategory: '食品',
          secondCategory: '四川火锅'
        },
        amountAccess: 121,
        browsingVolume: 123211,
        stock: 222,
        totalSales: 23333,
        creationTime: '2016-05-03 18:30',
        state: true
      }, {
        id: 2,
        goods: {
          imgSrc: '/static/test/ceshi3.png',
          name: 'asdlkjfhlkwehrfiuwasssadsadssadsdaswqweqqweqweqweh',
          price: '999.36',
          firstCategory: '食品',
          secondCategory: '四川火锅'
        },
        amountAccess: 14321,
        browsingVolume: 123211,
        stock: 222,
        totalSales: 23333,
        creationTime: '2016-05-03 18:30',
        state: true
      }, {
        id: 3,
        goods: {
          imgSrc: '/static/test/ceshi.png',
          name: 'asdlkjfhlkwehrfiuwh',
          price: '999.36',
          firstCategory: '食品',
          secondCategory: '四川火锅'
        },
        amountAccess: 14321,
        browsingVolume: 123211,
        stock: 222,
        totalSales: 23333,
        creationTime: '2016-05-03 18:30',
        state: false
      }, {
        id: 4,
        goods: {
          imgSrc: '/static/test/ceshi.png',
          name: 'asdlkjfhlkwehrfiuwh',
          price: '999.36',
          firstCategory: '食品',
          secondCategory: '四川火锅'
        },
        amountAccess: 14321,
        browsingVolume: 123211,
        stock: 222,
        totalSales: 23333,
        creationTime: '2016-05-03 18:30',
        state: true
      }],
      multipleSelection: []
    }
  },
  components: {
    menuLeft
  },
  methods: {
    handleClick (row) {
      // console.log(row)
      this.upperLowerFrame(row)
    },
    upperLowerFrame (data) {
      let _this = this
      this.$confirm(`是否${data.state ? '下架' : '上架'}该商品`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let k of _this.tableData) {
          // console.log(k['id'])
          if (k['id'] === data['id']) {
            k['state'] = !data['state']
          }
        }
        this.$message({
          type: 'success',
          message: `${data.state ? '上架' : '下架'}成功!`
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消${data.state ? '上架' : '下架'}`
        })
      })
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    setRouter (link) {
      this.$router.push({
        path: link
      })
    }
  }
}
</script>

<style scoped lang="less">
  .commodity-management-subject {
    min-width: 1100px;
    margin-left: 200px;
    margin-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
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
            border-bottom-color: #333;
            font-weight: bold;
            background: #EFEFEF;
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
        padding-top: 40px;
        padding-bottom: 20px;
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
              line-height: 1.2;
              .goods-info-price {
                color: #DE5B67;
                padding-right: 15px;
              }
              .goods-info-category {
                color: #999;
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
      padding: 0 5px;
      height: 24px;
      border: 1px solid #63A4FF;
    }
  }
</style>
<style>
  .el-input__inner {
    border-radius: 0;
    color: #333;
    border-color: #d5d5d5;
  }
  .el-table th {
    color: #333;
    text-align: center;
    font-weight: normal;
    background: #efefef;
    border-color: #e4e4e4;
  }
  .el-table th .el-checkbox::after {
    content: '全选';
    color: #333;
    padding-left: 6px;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #DE5B67;
    border-color: #DE5B67;
  }
  .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next, .el-pagination.is-background .el-pager li {
    font-weight: normal;
    color: #333;
    background: #fff;
    border: 1px solid #d5d5d5;
   }
</style>
