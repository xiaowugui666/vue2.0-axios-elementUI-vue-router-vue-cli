<template>
  <div>
    <menu-left :routeIndex="menuLeftIndex"></menu-left>
    <div class="add-activity-object">
      <div class="add-activity-content">
        <div class="bread-bar plate">
          <div class="add-edit">
            拼团 > 新增
          </div>
          <el-button class="save"  type="success" @click="save()" size="small">保存</el-button>
        </div>
        <div class="groupbuy-setting-list plate">
          <div class="title">拼团基础设置</div>
          <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="170px">
            <el-form-item label="团长免单：">
              <el-radio-group v-model="ruleForm.exemption">
                <el-radio :label="1"> 免单 </el-radio>
                <el-radio :label="2"> 不免单 </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动起止时间："  prop="rangeTime">
              <el-date-picker
                v-model="ruleForm.rangeTime"
                type="datetimerange"
                value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="拼团失效时间："  prop="outTime">
              <el-input v-model="ruleForm.outTime" placeholder="拼团失效时间为1-23小时"></el-input>
            </el-form-item>
            <el-form-item label="开团人数：" prop="groupNum">
              <el-input v-model="ruleForm.groupNum" placeholder="开团人数至少为2人" ></el-input>
            </el-form-item>
            <el-form-item label="单个用户购买次数上限："  prop="limitNum">
              <el-input v-model="ruleForm.limitNum" placeholder="设置为0，表示不设上限"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="groupbuy-setting-list plate" v-if="isGroupSet">
          <div class="title">批量数据修改</div>
          <el-form :model="setPrice" :rules="rule"  ref="setPrice" label-width="100px">
            <el-form-item label="拼团价格："  prop="groupPrice">
              <el-input v-model="setPrice.groupPrice"  class="groupPrice"></el-input>
            </el-form-item>
            <el-form-item label="库存："  prop="totalCount">
              <el-input v-model="setPrice.totalCount"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  @click="submitGroupForm('setPrice')">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="datalist">
          <div class="clear setGroup">
            <button class="left" @click="groupUpdate()">批量修改</button>
            <button class="left" @click="groupDelete()">批量删除</button>
            <button class="right"  v-if="newCreat == 'newCreat'" @click="addGroupBuy()">新增商品</button>
          </div>
          <el-table
            ref="multipleTable"
            :data="goods"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              label="全选"
              width="100">
            </el-table-column>
            <el-table-column
              label="商品"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="goods-info-box">
                  <span class="goods-img"><img :src="yiqixuanDomainUrl + scope.row.cover_url" alt=""></span>
                  <div class="goods-info">
                    <p class="goods-info-name">{{scope.row.goods_name}}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="stock_count"
              label="规格"
              width="300"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="goods-info-price" v-if="scope.row.sku_desc">{{scope.row.sku_desc}}</span>
                <span class="goods-info-price" v-else>{{showSpecs(scope.row)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="原价"
              width="150"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="goods-info-price">￥{{ scope.row.price| money}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="拼团价格"
              width="200"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input    v-model="scope.row.prices"  @blur="setGroupMoney(scope.$index)"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="stock_count"
              label="现有库存"
              width="150"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="库存"
              width="200"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input   v-model="scope.row.stock_counts"  @blur="setGroupCount(scope.$index)"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button @click="deleteSku(scope.$index)" type="text" class="delete-btn">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
import { mapState, mapMutations } from 'vuex'
import { groupGoodSku, setGroupInfo, getGroupInfo } from '@/axios/api'
export default {
  data () {
    let validateRangeTime = (rule, value, callback) => {
      let time = new Date().getTime()
      if (value == '') {
        callback(new Error('活动起止时间不能为空'))
      } else if (value[1] - time < 24 * 60 * 60 * 1000) {
        callback(new Error('活动结束时间必须大于当前时间24小时'))
      } else {
        callback()
      }
    }
    let validateOutTime = (rule, value, callback) => {
      // value = parseFloat(value)
      if (value == '') {
        callback(new Error('失效时间不能为空'))
      } else if (value > 23 || value < 1) {
        callback(new Error('失效时间大于1小时，小于23小时'))
      } else if (isNaN(value)) {
        callback(new Error('失效时间必须是数字'))
      } else {
        callback()
      }
    }
    let validateGroupNum = (rule, value, callback) => {
      // value = parseFloat(value)
      if (value == '') {
        callback(new Error('开团人数不能为空'))
      } else if (value < 2) {
        callback(new Error('开团人数大于2人'))
      } else if (isNaN(value)) {
        callback(new Error('开团人数必须是数字'))
      } else {
        callback()
      }
    }
    let validateLimitNum = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('单个用户购买件数上限不能为空'))
      } else if (isNaN(value)) {
        callback(new Error('单个用户购买件数必须是数字'))
      } else if (value != 0 && value < 3) {
        callback(new Error('单个用户购买件数要大于3哦'))
      } else {
        callback()
      }
    }
    let validateGroupPrice = (rule, value, callback) => {
      value = parseFloat(value) * 100
      var b = this.multipleSelection.every(function (v) {
        return value < v.price
      })
      if (value == '') {
        callback(new Error('批量修改价格不能为空'))
      } else if (isNaN(value)) {
        callback(new Error('批量修改价格必须是数字'))
      } else if (!b) {
        callback(new Error('批量修改价格必须比所选规格的原价低'))
      } else {
        callback()
      }
    }
    let validateTotalCount = (rule, value, callback) => {
      value = parseFloat(value)
      var b = this.multipleSelection.every(function (v) {
        return value <= v.stock_count
      })
      if (value == '') {
        callback(new Error('批量修改库存不能为空'))
      } else if (isNaN(value)) {
        callback(new Error('批量修改库存必须是数字'))
      } else if (!b) {
        callback(new Error('批量修改库存必须比所选规格的现有库存低'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        rangeTime: [],
        outTime: '',
        groupNum: '',
        limitNum: '',
        exemption: 1,
        obj: {}
      },
      setPrice: {
        groupPrice: '',
        totalCount: ''
      },
      isGroupSet: false,
      activityTime: '',
      goodsImgSrc: '',
      routerIf: true,
      goodsId: undefined,
      goodsDialogVisible: false,
      good: [],
      newCreat: '',
      menuLeftIndex: '7-3',
      specialOffer: '',
      originalPrice: '',
      stock: '',
      goods: [],
      multipleSelection: '',
      productId: '',
      goodsList: [],
      // 拼团基础设置
      rules: {
        rangeTime: [
          { required: true, validator: validateRangeTime, trigger: ['blur', 'change'] }
        ],
        outTime: [
          { required: true, validator: validateOutTime, trigger: ['blur', 'change'] }
        ],
        groupNum: [
          { required: true, validator: validateGroupNum, trigger: ['blur', 'change'] }
        ],
        limitNum: [
          { required: true, validator: validateLimitNum, trigger: ['blur', 'change'] }
        ]
      },
      // 批量数据修改
      rule: {
        groupPrice: [
          { required: true, validator: validateGroupPrice, trigger: ['blur', 'change'] }
        ],
        totalCount: [
          { required: true, validator: validateTotalCount, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {
    ...mapState(['menuLeft', 'yiqixuanDomainUrl', 'groupProductId'])
  },
  components: {
    menuLeft
  },
  mounted () {
    this.newCreat = this.$route.params.id
    if (this.$route.params.id == 'newCreat') {
      this.groupGoodSku()
    } else {
      this.getGroupInfo()
    }
  },
  methods: {
    ...mapMutations(['setGroupProduct']),
    showSpecs (value) {
      if (value.spec_c) {
        return value.spec_a + ':' + value.property_a + ',' + value.spec_b + ':' + value.property_b + ',' + value.spec_c + ':' + value.property_c + ';'
      } else if (value.spec_b) {
        return value.spec_a + ':' + value.property_a + ',' + value.spec_b + ':' + value.property_b + ';'
      } else if (value.spec_a) {
        return value.spec_a + ':' + value.property_a + ';'
      }
    },
    getGroupInfo () {
      getGroupInfo(this.$route.params.id).then(res => {
        if (res.status == 200) {
          this.ruleForm.exemption = res.data.is_owner_free
          this.ruleForm.outTime = res.data.expire
          this.ruleForm.groupNum = res.data.min_join_count
          this.ruleForm.limitNum = res.data.buy_limit_count
          var start = new Date(res.data.begin_at).getTime()
          var end = new Date(res.data.end_at).getTime()
          this.ruleForm.rangeTime = [start, end]
          var goods = res.data.goods_sku
          goods.forEach(v => {
            v.prices = parseFloat(v.prices / 100).toFixed(2)
            this.goods.push(v)
          })
        }
      })
    },
    // 批量修改
    groupUpdate () {
      if (this.multipleSelection.length > 0) {
        this.isGroupSet = true
      } else {
        this.$message({
          type: 'warning',
          message: `请选择规格`
        })
      }
    },
    timestampToTime (timestamp) {
      var date = new Date(timestamp)
      var Y = date.getFullYear()
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
    },
    // 设置保存
    save () {
      var arr = []
      this.goods.forEach(function (v) {
        var o = {}
        o.sku_id = v.id
        o.price = v.prices * 100
        o.goods_id = v.goods_id
        o.stock_count = v.stock_counts
        arr.push(o)
      })
      this.ruleForm.obj.goods_sku = arr
      if (this.ruleForm.obj) {
        setGroupInfo(this.ruleForm.obj).then(res => {
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: `拼团成功`
            })
            this.setGroupProduct(this.productId)
            localStorage.goods_sku = []
            this.$router.push({name: 'groupBuyManagement'})
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: `请设置拼团基础设置`
        })
      }
    },
    // 批量喊出规格
    groupDelete () {
      var newArr = this.goods
      if (this.multipleSelection.length > 0) {
        this.$confirm(`是否删除该规格`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除该规格拼团
          console.log(this.goods)
          console.log(this.multipleSelection)
          for (var i = 0; i < this.goods.length; i++) {
            for (var j = 0; j < this.multipleSelection.length; j++) {
              if (this.goods[i].id == this.multipleSelection[j].id) {
                newArr.splice(i, 1)
              }
            }
          }
          this.goods = newArr
          localStorage.goods_sku = JSON.stringify(this.goods)
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
      } else {
        this.$message({
          type: 'warning',
          message: `请选择规格`
        })
      }
    },
    // 设置拼团价格
    setGroupMoney (index) {
      if (this.goods[index].price < parseFloat(this.goods[index].prices * 100)) {
        this.goods[index].prices = ''
        this.$message({
          message: '拼团价格不能大于商品价格',
          type: 'error'
        })
      }
    },
    // 设置拼团库存
    setGroupCount (index) {
      if (this.goods[index].stock_count < parseFloat(this.goods[index].stock_counts)) {
        this.goods[index].stock_counts = ''
        this.$message({
          message: '拼团库存不能大于商品商品库存',
          type: 'error'
        })
      }
    },
    showSpecific (value) {
    },
    deleteSku (value) {
      this.$confirm(`是否删除该规格`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除该规格拼团
        this.goods.splice(value, 1)
        localStorage.goods_sku = JSON.stringify(this.goods)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消`
        })
      })
    },
    groupGoodSku () {
      if (this.groupProductId.length > 0) {
        groupGoodSku({goods: this.groupProductId}).then(res => {
          if (res.status == 200) {
            this.goods = res.data
            localStorage.goods_sku = JSON.stringify(res.data)
          }
        })
      } else {
        this.goods = JSON.parse(localStorage.goods_sku)
      }
    },
    addGroupBuy () {
      this.$router.push({name: 'selectProduct'})
    },
    handleSelectionChange (val) {
      console.log(111)
      if (val.length == 0) {
        this.isGroupSet = false
      }
      this.multipleSelection = val
    },
    // 拼团基础设置
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var timestart = this.timestampToTime(this.ruleForm.rangeTime[0])
          var timeend = this.timestampToTime(this.ruleForm.rangeTime[1])
          this.ruleForm.obj = {
            is_owner_free: this.ruleForm.exemption,
            begin_at: timestart,
            end_at: timeend,
            expire: this.ruleForm.outTime,
            min_join_count: this.ruleForm.groupNum,
            buy_limit_count: this.ruleForm.limitNum
          }
          this.$message({
            message: '设置成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '设置失败，请认真检查设置项哦',
            type: 'error'
          })
        }
      })
    },
    // 批量数据修改
    submitGroupForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for (var i = 0; i < this.goods.length; i++) {
            for (var j = 0; j < this.multipleSelection.length; j++) {
              if (this.goods[i].id == this.multipleSelection[j].id) {
                this.goods[i].prices = this.setPrice.groupPrice
                this.goods[i].stock_counts = this.setPrice.totalCount
              }
            }
          }
          this.$message({
            message: '设置成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '设置失败，请认真检查设置项哦',
            type: 'error'
          })
        }
      })
    },
    // 删除当前选择商品
    deleteRecommend (index) {
      this.recommendGoods.splice(index, 1)
    },
    getHandleClose (msg) {
      this.goodsDialogVisible = msg
    }
  }
}
</script>
<style lang="less">
  .datalist{
    .el-table--scrollable-x .el-table__body-wrapper {
      overflow-x: hidden;
    }
    .el-table th .el-checkbox::after {
      content: '全选';
      color: #333;
      padding-left: 6px;
    }
  }
  .groupbuy-setting-list{
    .el-form-item.is-success .el-input__inner {
      border-color: @green;
    }
    .el-date-editor .el-range-input {
      width:100%;
    }
  }
  .datalist {
    padding: 0 25px 20px;
    overflow: hidden;
    background: #fff;
    .el-table th > .cell{
      text-align: center;
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
      button:nth-child(3){
        border: 1px solid #FA505D;
        color: #FA505D;
      }
    }
  }
  .el-tooltip, .cell{
    text-align: center;
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
  .groupbuy-setting-list{
    .el-input__inner{
      width: 370px;
      border-radius:0;
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
</style>
<style scoped lang="less">
    .add-activity-object .save {
      position: absolute;
      top: 34px;
      right: 45px;
      z-index: 9999;
    }

    .add-activity-object .el-button--small{
      padding: 0;
      width: 80px;
      height: 30px;
    }
  .delete-btn {
    color: #333;
    padding: 4px 8px;
    border: 1px solid #333;
    font-size: 12px;
    display: block;
    margin: 0 auto;
  }
  .delete-btn:focus{
    color: #333;
    padding: 4px 8px;
    border: 1px solid #333;
    font-size: 12px;
  }
  .delete-btn:hover{
    color: #333;
    padding: 4px 8px;
    border: 1px solid #333;
    font-size: 12px;
  }
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
  }
</style>
