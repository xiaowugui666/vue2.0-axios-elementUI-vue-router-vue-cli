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
              <div class="goods-img-box">
                <span v-if="goodsImgSrc" @click="goodsDialogVisible = true" class="goods-img">
                <img :src="goodsImgSrc" alt="">
                </span>
                <i v-else @click="goodsDialogVisible = true" class="select-goods el-icon-plus"></i>
              </div>
            </li>
            <li>
              <span class="name required">特<span class="right">价：</span></span>
              <span class="special-offer goods-price">
                <input type="text" v-model="specialOffer">
              </span>
            </li>
            <li>
              <span class="name">原<span class="right">价：</span></span>
              <span class="original-price goods-price">
                <input type="text" v-model="originalPrice" disabled>
              </span>
            </li>
            <li>
              <span class="name required">库<span class="right">存：</span></span>
              <input type="text" v-model="stock">
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
          </ul>
        </div>
      </div>
      <select-production @goodsImgSrc="getGoodsImg" @goodsId="getGoodsId" @handleClose="getHandleClose" :goods-dialog-visible="goodsDialogVisible"></select-production>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import selectProduction from '@/components/select-production'
export default {
  data () {
    return {
      linkClass: this.$route.params.class,
      specialOffer: 2222.22,
      originalPrice: 13213.54,
      stock: 1000,
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
      goodsId: undefined,
      goodsDialogVisible: false
    }
  },
  mounted () {
    this.setMenuLeft('/marketing-management/' + this.linkClass)
  },
  methods: {
    ...mapMutations(['setMenuLeft']),
    getHandleClose (msg) {
      this.goodsDialogVisible = msg
    },
    getGoodsId (id) {
      this.goodsId = id
    },
    getGoodsImg (src) {
      this.goodsImgSrc = src
    }
  },
  computed: {
    ...mapState(['menuLeft'])
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
      }
    }
  }
</style>
