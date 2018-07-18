<template>
  <div>
    <menu-left :routeIndex="menuLeftIndex"></menu-left>
    <div class="add-activity-object">
      <div class="add-activity-content">
        <div class="bread-bar plate">
          <div class="add-edit">
            拼团 > 新增
          </div>
        </div>
        <div class="groupbuy-setting-list plate"  ref="names"  :style="{width: widthData+'px'}"  :class="{isFixed: isFixed}">
          <div class="title">已选商品</div>
          <el-button class="save"  :class="{isSave: isFixed}"  type="success" @click="save()"  size="small" >保存</el-button>
          <div  class="choosebox">
            <div class="choose"  v-for="(item,id) in chooseList"  :key="id">
              <el-tooltip   :content=item.name  placement="top-start" effect="light">
                <el-button>{{item.name}}</el-button>
              </el-tooltip>
              <div class="el-icon-close clear" @click="clearChoose(item)"></div>
            </div>
          </div>
        </div>
        <div class="groupbuy-setting-list plate" ref='name'  :style="{marginTop: isFixed ? marginTop+'px' : ''}">
          <div class="title">选择商品</div>
          <div class="searchbox">
            <input type="text" v-model="productionKey" maxlength="40">
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
                label="操作"
                width="300">
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
      </div>
    </div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
import { mapState, mapMutations } from 'vuex'
import { goodsList } from '@/axios/api'
export default {
  data () {
    return {
      menuLeftIndex: '7-3',
      productionKey: '',
      multipleSelection: '',
      goods: [],
      totalPagina: 0,
      chooseList: [],
      scrollTop: 0,
      isFixed: false,
      widthData: 0,
      marginTop: 0,
      chooseListId: []
    }
  },
  beforeRouteLeave (to, from, next) {
    localStorage.removeItem('goods_sku')
    next()
  },
  mounted () {
    this.getGoodsList()
    this.widthData = this.$refs.name.offsetWidth - 58
    this.marginTop = this.$refs.names.offsetHeight
    window.addEventListener('scroll', this.handleScroll)
    window.onresize = () => {
      this.widthData = this.$refs.name.offsetWidth - 50
    }
  },
  computed: {
    ...mapState(['menuLeft', 'yiqixuanDomainUrl'])
  },
  components: {
    menuLeft
  },
  methods: {
    ...mapMutations(['setGroupProduct']),
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 75) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    getGoodsList () {
      goodsList({status: 1}).then(res => {
        if (res.status == 200) {
          this.goods = res.data
          this.totalPagina = res.headers.page_count
        }
      })
    },
    // 删除当前选中的商品
    clearChoose (value) {
      this.chooseList.forEach((v, i) => {
        if (v.id == value.id) {
          this.chooseList.splice(i, 1)
          this.chooseListId(i, 1)
        }
      })
    },
    // 选择当前商品
    selectThisGoods (value) {
      let haveThis = this.chooseList.every(function (v) {
        return v.id !== value.id
      })
      if (haveThis) {
        this.chooseList.push(value)
        this.chooseListId.push(value.id)
        this.marginTop = this.$refs.names.offsetHeight
      }
    },
    // 搜索商品
    diaSearch () {
      goodsList({status: 1, goods_name: this.productionKey}).then(res => {
        this.goods = res.data
        this.totalPagina = res.headers.page_count
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 点击分页,通知父组件改变状态
    currentChange (e) {
      goodsList({page: e - 1, status: 1}).then(res => {
        this.goods = res.data
        this.totalPagina = res.headers.page_count
      })
    },
    save () {
      this.setGroupProduct(this.chooseListId)
      this.$router.push({name: 'addGroupBuy', params: {id: 'newCreat'}})
    }
  }
}
</script>
<style scoped lang="less">
  .add-activity-object {
    .select-goods-table {
      padding-top:20px;
      background: #fff;
      .el-table th > .cell{
        text-align: center;
      }
      .el-table__header{
        background:#909399;
      }
      .setGroup{
        background: #fff;
        padding: 20px 0;
        button{
          width: 80px;
          height: 30px;
          padding: 0;
          line-height: 30px;
          text-align: center;
          font-family: MicrosoftYaHei;
          font-size: 12px;
          background: #fff;
          color: #333333;
          border: 1px solid #333333;
          border-radius: 2px;
          cursor: pointer;
        }
        button:nth-child(2){
          margin-left: 10px;
        }
        button:last-child{
          border: 1px solid #FA505D;
          color: #FA505D;
        }
      }
    }
    .groupbuy-setting-list{
      .el-input__inner{
        width: 236px;
      }
      .groupPrice{
        position: relative;
        .el-input__inner{
          padding-left: 30px;
          position: relative;
        }
      }
      .groupPrice::before{
        position: absolute;
        content: '\FFE5';
        display: block;
        color: #000;
        z-index: 500;
        top: 2px;
        left: 10px;
      }
      .title{
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #222222;
        line-height: 17px;
        padding-left: 10px;
        position: relative;
        height: 57px;
        line-height: 57px;
        border-bottom: 1px solid #D5D5D5;
      }
      .el-form-item:first-child {
        margin-top: 10px;
      }
      .title::before{
        display: block;
        content: '';
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        left:0px;
        width: 3px;
        height: 13px;
        background: #FA505D;
      }
      .el-form-item__label{
        text-align: left;
        position: relative;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #3A3A3A;
      }
      .el-radio__input.is-checked .el-radio__inner {
        border-color: #FA505D;
        background: #FA505D;
      }
      .el-radio__input.is-checked + .el-radio__label {
        color: #FA505D;
      }
      .el-form-item__label:before{
        content: '*';
        color: #DE5B67;
        margin-left: -10px;
        padding-right: 5px;
      }
      .el-button--primary {
        color: #fff;
        background-color: #FA505D;
        border-color: #FA505D;
        padding: 9px 15px;
        font-size: 12px;
        width: 80px;
        height: 30px;
        border-radius: 2px;
      }
      .el-button--primary:hover, .el-button--primary:focus {
        background: #fb737d;
        border-color: #fb737d;
        color: #fff; }
    }
    min-width: 1100px;
    padding-top: 20px;
    margin: 0 20px 0 200px;
    .searchbox{
      margin-top: 20px;
    }
    .choosebox{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .choose{
        margin-right: 20px;
        margin-top: 20px;
        position: relative;
      }
      /*.choose:first-child{*/
        /*margin-left: 0;*/
      /*}*/
      .el-tooltip{
        max-width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .clear{
        position: absolute;
        right: 2px;
        font-size: 16px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    input {
      color: #333;
      border: 1px solid #d5d5d5;
      display: inline-block;
      width: 236px;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      margin-right: 10px;
      padding-right: 10px;
      &::-webkit-input-placeholder {
        color: #b5b5b5;
      }
      &:disabled {
        background: #d5d5d5;
        border-color: #d5d5d5;
        cursor: not-allowed;
      }
    }
    .el-button--small{
      padding: 0;
      width: 80px;
      height: 30px;
    }
    .plate {
      padding: 20px 15px;
      margin-bottom: 20px;
      background: #fff;
      color: #333;
      position: relative;
      font-size: 12px;
      line-height: 15px;
      .required::before {
        content: '*';
        color: #DE5B67;
        margin-left: -10px;
        padding-right: 5px;
      }
      .name {
        padding-right: 3px;
        color: #999;
        width: 145px;
        display: inline-block;
        vertical-align: middle;
      }
      .name.alignment-top {
        vertical-align: top;
        padding-top: 6px;
      }
      .justify {
        text-align: justify;
        &::after {
          content: '';
          padding-left: 100%;
          display: inline-block;
        }
      }
    }
    .groupbuy-setting-list {
      padding: 0 25px 20px;
      position: relative;
      .pagination {
        padding-top: 30px;
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
      li {
        font-size: 12px;
        padding-top: 20px;
        .goods-img-box {
          display: inline-block;
          vertical-align: middle;
          .goods-img {
            display: inline-block;
            vertical-align: middle;
            width: 80px;
            height: 80px;
            position: relative;
            border: 1px solid #d5d5d5;
            text-align: center;
            box-sizing: border-box;
            img {
              display: inline-block;
              width: auto;
              height: auto;
              max-width: 100%;
              max-height: 100%;
              position: relative;
              top: 50%;
              transform: translateY(-50%);
            }
            i {
              font-size: 16px;
              position: absolute;
              background: #ffffff;
              color: #D5D5D5;
              top: -8px;
              right: -8px;
              cursor: pointer;
              border-radius: 50%;
            }
          }
          .select-goods {
            display: inline-block;
            vertical-align: middle;
            box-sizing: border-box;
            font-size: 20px;
            text-align: center;
            line-height: 80px;
            width: 80px;
            height: 80px;
            color: #d5d5d5;
            border: 1px dashed #d5d5d5;
          }
        }
        .goods-price {
          position: relative;
          &::before {
            content: '￥';
            display: block;
            position: absolute;
            top: 2px;
            left: 10px;
          }
          input {
            padding-left: 30px;
            width: 216px;
          }
        }
        .activity-time {
          display: inline-block;
          vertical-align: middle;
          .el-range-editor {
            padding: 0 10px;
            height: 32px;
            border-color: #d5d5d5;
            border-radius: 0;
          }
        }
        .el-button{
          width: 80px;
          height: 30px;
        }
      }
    }
    .isFixed{
      position: fixed;
      top: 0;
      left: 200px;
      z-index: 999;
      width: 100%;
      background: #fff;
      border-bottom: 15px solid #F5F5F5;
    }
    .save{
      position: absolute;
      top: 20px;
      right: 25px;
      z-index: 9999;
    }
    .isSave{
      position: fixed;
      top: 20px;
      right: 45px;
    }
  }
</style>
