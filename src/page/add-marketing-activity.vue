<template>
    <div class="add-activity-object">
      <div class="add-activity-content">
        <div class="bread-bar plate">
          <div class="add-edit">
            特价 > 新增/编辑
          </div>
        </div>
        <div class="activity-setting-list plate">
          <ul>
            <li>
              <span class="name alignment-top required">选择商品：</span>
              <div class="goods-img-box" v-if="recommendGoods.length == 0" data-id="111">
                <span v-if="imgVisible(good)" @click="dialogClick" class="goods-img">
                  <img :src="qiniuDomainUrl + imgUrlCompu(good)" alt="">
                </span>
                <i v-else @click="dialogClick" class="select-goods el-icon-plus"></i>
              </div>
              <div class="goods-img-box" v-else>
                <span  v-for="(item,index) in recommendGoods" :key="index"  :data-id="index" v-if="imgVisible(item)" @click="dialogClick" class="goods-img" style="margin-right: 10px;">
                  <img :src="qiniuDomainUrl + imgUrlCompu(item)" alt="">
                  <i @click.stop="deleteRecommend(index)" class="el-icon-circle-close"></i>
                </span>
                <i @click="dialogClick" class="select-goods el-icon-plus"></i>
              </div>
            </li>
            <li v-if="routerIf">
              <span class="name required">特<span class="right">价：</span></span>
              <span class="special-offer goods-price">
                <input type="text" v-validate="{decimal:2,required:true,min_value: 0,max_value:99999999999}" maxlength="11" name="特价价格" v-model="specialOffer" :class="{'input':true,'is-danger':errors.has('email')}">
                <div class="err-tips" v-if="errors.has('特价价格')" style="color: red;margin-top: 5px;margin-left: 80px;">{{errors.first('特价价格')}}</div>
              </span>
            </li>
            <li v-if="routerIf">
              <span class="name">原<span class="right">价：</span></span>
              <span class="original-price goods-price">
                <input type="text" v-model="originalPrice" disabled>
              </span>
            </li>
            <li v-if="routerIf">
              <span class="name required">库<span class="right">存：</span></span>
              <input type="text" v-validate="{required:true,numeric:true,min_value: 1,max_value:99999999999}" maxlength="11" name="库存" v-model="stock">
              <div class="err-tips" v-if="errors.has('库存')" style="color: red;margin-top: 5px;margin-left: 80px;">{{errors.first('库存')}}</div>
            </li>
            <li>
              <span class="name required">活动时间：</span>
              <div class="activity-time">
                <el-date-picker
                  v-model="activityTime"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  align="left">
                </el-date-picker>
              </div>
            </li>
            <li>
              <el-button
                type="success"
                size="small"
                @click="saveEditor">保存</el-button>
            </li>
          </ul>
        </div>
      </div>
      <select-production v-if="newGoods.length" :newGoods="newGoods" :qiniuDomainUrl="qiniuDomainUrl" @modalSearch="searchChange" @paginaNum="paginaChange" @goodsImgSrc="getGoodsImg" @goodsId="getGoodsId" @handleClose="getHandleClose" :goods-dialog-visible="goodsDialogVisible"></select-production>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import selectProduction from '@/components/select-production'
import {editorGoods, closeGoods, newGoodsList, addSpecialGood, goodsList, newRecommendGoods, closeRecommendGood, singleRecommendGood} from '@/axios/api'
export default {
  data () {
    return {
      linkClass: this.$route.query.class || this.$route.params.class,
      specialOffer: '',
      originalPrice: '',
      stock: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        },
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      activityTime: '',
      goodsImgSrc: '',
      routerIf: true,
      goodsId: undefined,
      goodsDialogVisible: false,
      good: {},
      recommendGoods: [],
      newGoods: []
    }
  },
  mounted () {
    this.setMenuLeft('/marketing-management/' + this.linkClass)
    if (this.$route.query.id && this.linkClass == 'special-offer') {
      // 请求编辑订单信息
      editorGoods(this.$route.query.id).then(res => {
        this.good = res.data
        // 赋值商品信息
        this.specialOffer = res.data.price / 100
        this.originalPrice = (res.data.goods_sku.display_price / 100).toFixed(2)
        this.stock = res.data.stock_count
        this.activityTime = [res.data.begin_at, res.data.end_at]
      })
    } else if (this.linkClass == 'recommend') {
      this.routerIf = false
      if (this.$route.query.id) {
        // 请求编辑推荐商品详情
        singleRecommendGood(this.$route.query.id).then(res => {
          console.log(res)
          this.good = res.data
          this.activityTime = [res.data.begin_at, res.data.end_at]
        })
      }
    }
  },
  methods: {
    ...mapMutations(['setMenuLeft']),
    // 删除当前选择商品
    deleteRecommend (index) {
      console.log(index)
      this.recommendGoods.splice(index, 1)
      console.log(this.recommendGoods)
    },
    getHandleClose (msg) {
      this.goodsDialogVisible = msg
    },
    // 点击选择模态框商品
    getGoodsId (value) {
      // 特价
      if (this.$route.params.class == 'special-offer') {
        this.good = value
        console.log(value.price / 100)
        this.originalPrice = (value.price / 100).toFixed(2)
        console.log(this.originalPrice)
      } else if (this.$route.params.class == 'recommend') {
        // 推荐
        if (this.recommendGoods.length == 0) {
          this.recommendGoods.push(value)
        } else if (this.recommendGoods.length < 7) {
          let flag = true
          for (let i = 0, len = this.recommendGoods.length; i < len; i++) {
            if (this.recommendGoods[i].id == value.id) {
              flag = false
            }
          }
          if (flag) {
            this.recommendGoods.push(value)
          } else {
            this.$message('请勿重复添加商品')
          }
        } else {
          this.$message('请勿一次性添加超过7条商品')
        }
      }
    },
    getGoodsImg (src) {
      this.goodsImgSrc = src
    },
    // 图片框点击处理
    dialogClick () {
      // 当页面入口为新建
      if (JSON.stringify(this.$route.query) == '{}') {
        // 如果路由为special
        if (this.$route.params.class == 'special-offer') {
          newGoodsList().then(res => {
            if (res.status == 200) {
              this.newGoods = res.data
              this.newGoods.totalPagina = res.headers.page_count
              if (this.newGoods.length !== 0) {
                this.goodsDialogVisible = true
              }
            } else {
              this.$message({
                message: '数据请求错误，请稍后重试',
                type: 'error'
              })
            }
          }).catch(res => {
            console.log(res)
            console.log(111111)
            this.$message({
              message: '数据请求错误，请稍后重试',
              type: 'error'
            })
          })
        } else if (this.$route.params.class == 'recommend') { // 如果路由为推荐商品 recommend
          goodsList({status: 1}).then(res => {
            if (res.status == 200) {
              this.newGoods = res.data
              this.newGoods.totalPagina = res.headers.page_count
              if (this.newGoods.length !== 0) {
                this.goodsDialogVisible = true
              }
            }
          })
        }
      }
    },
    // 当模态框分页改变
    paginaChange (value) {
      if (this.$route.params.class == 'special-offer') {
        newGoodsList({page: value}).then(res => {
          this.newGoods = res.data
          this.newGoods.totalPagina = res.headers.page_count
        })
      } else if (this.$route.params.class == 'recommend') {
        goodsList({page: value}).then(res => {
          this.newGoods = res.data
          this.newGoods.totalPagina = res.headers.page_count
          if (this.newGoods.length !== 0) {
            this.goodsDialogVisible = true
          }
        })
      }
    },
    // 模态框搜索商品
    searchChange (value) {
      if (this.$route.params.class == 'special-offer') {
        newGoodsList({goods_name: value}).then(res => {
          this.newGoods = res.data
          this.newGoods.totalPagina = res.headers.page_count
        })
      } else if (this.$route.params.class == 'recommend') {
        goodsList({goods_name: value}).then(res => {
          this.newGoods = res.data
          this.newGoods.totalPagina = res.headers.page_count
          if (this.newGoods.length !== 0) {
            this.goodsDialogVisible = true
          }
        })
      }
    },
    // 点击保存
    saveEditor () {
      if (JSON.stringify(this.good) !== '{}' || this.recommendGoods.length !== 0) {
        if (!this.errors.items.length && this.activityTime.length) {
          let params = {}
          let _this = this
          params.id = this.good.id
          params.goods_sku_id = this.good.id
          params.goods_id = this.good.goods_id
          params.price = this.specialOffer * 100
          console.log(new Date(this.activityTime[0]).getTime())
          params.begin_at = new Date(new Date(this.activityTime[0]).getTime() + 8 * 3600 * 1000)
          console.log(params.begin_at)
          params.end_at = new Date(new Date(this.activityTime[1]).getTime() + 8 * 3600 * 1000)
          params.stock_count = this.stock
          // 如果为新建商品
          if (JSON.stringify(this.$route.query) == '{}') { // 新建
            // 如果路由为special
            if (this.$route.params.class == 'special-offer' && this.stock.length) {
              console.log(this.originalPrice)
              if (parseFloat(this.specialOffer) < this.originalPrice) {
                addSpecialGood(params).then(res => {
                  if (res.data.success) {
                    _this.$router.push({path: '/marketing-management/' + _this.$route.params.class})
                  } else {
                    this.$message('新增商品失败，请勿重复添加或确认时间段')
                  }
                }).catch(err => {
                  console.log(err.response.data)
                  this.$message(err.response.data.message)
                })
              } else {
                this.$message({
                  message: '请确保特价小于原价',
                  type: 'warning'
                })
              }
            } else if (this.$route.params.class == 'recommend' && !this.stock.length) { // 路由为recommend
              let idArray = []
              for (let i = 0, len = this.recommendGoods.length; i < len; i++) {
                idArray.push(this.recommendGoods[i].id)
              }
              params.goods_ids = idArray
              newRecommendGoods(params).then(res => {
                if (res.data.success) {
                  _this.$router.push({path: '/marketing-management/' + _this.$route.params.class})
                }
              }).catch(err => {
                console.log(1111)
                if (err.status == 403) {
                  _this.$message(err.response.data.message)
                } else {
                  _this.$message({
                    message: '添加商品失败',
                    type: 'error'
                  })
                }
              })
            } else {
              this.$message({
                message: '请确保编辑信息完善',
                type: 'warning'
              })
            }
          } else { // 编辑
            // 更改特价商品信息
            if (this.$route.params.class == 'special-offer') {
              closeGoods(params).then(res => {
                console.log(res)
                if (res.status == 200) {
                  _this.$router.push({path: '/marketing-management/' + _this.$route.params.class})
                } else {
                  console.log(res)
                  _this.$message(res.data.message)
                }
              })
            } else if (this.$route.params.class == 'recommend') {
              // 推荐
              console.log(params)
              closeRecommendGood(params).then(res => {
                console.log('更新推荐商品成功')
                _this.$router.push({path: '/marketing-management/' + _this.$route.params.class})
              })
            }
          }
        } else {
          this.$message({
            message: '请确保编辑信息完善',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '请选择商品',
          type: 'warning'
        })
      }
    },
    // 图片v-if判断
    imgVisible (value) {
      if (value.goods_sku) {
        return true
      } else if (value.cover_url) {
        return true
      } else if (value.goods) {
        return true
      } else {
        return false
      }
    },
    // 图片url 计算属性
    imgUrlCompu (value) {
      if (value.goods_sku) {
        return value.goods_sku.cover_url
      } else if (value.cover_url) {
        return value.cover_url
      } else if (value.goods.cover_url) {
        return value.goods.cover_url
      }
    }
  },
  computed: {
    ...mapState(['menuLeft', 'qiniuDomainUrl'])
  },
  components: {
    selectProduction
  }
}
</script>

<style scoped lang="less">
  .add-activity-object {
    min-width: 1100px;
    padding-top: 20px;
    margin: 0 20px 0 200px;
    .bread-bar {}
    input {
      color: #333;
      border: 1px solid #d5d5d5;
      display: inline-block;
      width: 236px;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
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
    .plate {
      padding: 20px 15px;
      margin-bottom: 20px;
      background: #fff;
      color: #333;
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
        width: 61px;
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
    .activity-setting-list {
      padding: 0 25px 20px;
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
  }
</style>
