<template>
    <div class="cus-container">
      <div class="header">
        <div class="number">
          <span>手机号码</span>
          <input type="text" v-model="phoneNum">
        </div>
        <div class="screen">
          <span>购物次数</span>
          <el-select v-model="value" placeholder="不限">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search">搜索</div>
      </div>
      <div class="table">
        <template>
          <el-table
            :data="tableData"
            border>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="phoneNumber"
              label="手机号码"
              width="180">
            </el-table-column>
            <el-table-column
              prop="wechat"
              label="微信号">
            </el-table-column>
            <el-table-column
              prop="orders"
              label="拥有订单数">
            </el-table-column>
            <el-table-column
              prop="from"
              label="来源渠道">
            </el-table-column>
            <el-table-column
              prop="methods"
              label="来源方式">
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="dialogVisible=true">编辑</el-button>
                <el-button type="text" size="small" @click="orderDetails">订单详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-pagination
          background
          prev-text="<上一页"
          next-text="下一页>"
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
        <el-dialog
          title="编辑"
          :show-close="false"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <hr/>
          <div>
            <span class="dialog_name">姓名</span><input type="text" v-model="name" clearable>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" plain size="small">保存</el-button>
            <el-button @click="dialogVisible = false" plain size="small">返回</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      dialogVisible: false,
      phoneNum: '',
      wechatNum: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      tableData: [{
        name: '王小虎',
        phoneNumber: '13577884567',
        wechat: 'skakjshdkhakh',
        orders: 18,
        from: '微信',
        methods: '普通下单'
      }, {
        name: '王小虎',
        phoneNumber: '13577884567',
        wechat: 'skakjshdkhakh',
        orders: 18,
        from: '微信',
        methods: '普通下单'
      }, {
        name: '王小虎',
        phoneNumber: '13577884567',
        wechat: 'skakjshdkhakh',
        orders: 18,
        from: '微信',
        methods: '普通下单'
      }, {
        name: '王小虎',
        phoneNumber: '13577884567',
        wechat: 'skakjshdkhakh',
        orders: 18,
        from: '微信',
        methods: '普通下单'
      }, {
        name: '王小虎',
        phoneNumber: '13577884567',
        wechat: 'skakjshdkhakh',
        orders: 18,
        from: '微信',
        methods: '普通下单'
      }, {
        name: '王小虎',
        phoneNumber: '13577884567',
        wechat: 'skakjshdkhakh',
        orders: 18,
        from: '微信',
        methods: '普通下单'
      }, {
        name: '王小虎',
        phoneNumber: '13577884567',
        wechat: 'skakjshdkhakh',
        orders: 18,
        from: '微信',
        methods: '普通下单'
      }]
    }
  },
  methods: {
    handleClose (done) {
      console.log(done)
      this.$confirm('are you sure?')
    },
    orderDetails () {
      this.$router.push({path: '/customerOrder'})
    }
  }
}
</script>

<style scoped lang="less">
.cus-container{
  min-width: 1000px;
  margin: 0 20px 0 200px;
  margin-top: 20px;
  position: relative;
  .header{
    min-width: 1000px;
    background: #ffffff;
    height: 120px;
    span{
      font-size: 12px;
      color: #999999;
      margin-left: 20px;
      margin-right: 10px;
    }
    .number{
      min-width: 1000px;
      padding-top: 20px;
      }
      input{
        width: 230px;
        height: 30px;
        border: 1px solid #D5D5D5;
        border-radius: 2px;
        padding-left: 10px;
    }
    .screen{
      margin-top: 20px;
    }
    .search{
      width: 80px;
      height: 30px;
      position: absolute;
      top: 45px;
      left: 450px;
      background: #DE5B67;
      text-align: center;
      font-size: 12px;
      color: #ffffff;
      line-height: 30px;
      font-family: MicrosoftYaHei;
    }
  }
  .table{
    min-width: 1000px;
    margin-top: 20px;
    padding: 20px;
    background: #ffffff;
    min-height: 281px;
    overflow: hidden;
  }
}
</style>
<style lang="less">
  .cus-container{
    .el-input__inner{
      width: 128px;
      height: 30px;
      color: #333333;
      font-family: MicrosoftYaHei;
      border-radius: 0;
    }
    .el-table__header-wrapper thead{
      color: #333333;
    }
    .el-table::before{
      background-color: #D5D5D5;
    }
    .el-table--border::after{
      background-color: #D5D5D5;
    }
    .el-table__header-wrapper thead tr th{
      background: #EFEFEF;
    }
    .el-table__body-wrapper,.el-table__header-wrapper tr th div{
      text-align: center;
    }
    .el-table--group, .el-table--border {
      border: 1px solid #D5D5D5;
    }
    .el-table--border {
      border-right: none;
      border-bottom: none;
    }
    .el-table th.is-leaf, .el-table td {
      border-bottom: 1px solid #D5D5D5;
    }
    .el-table--border th, .el-table--border td {
      border-right: 1px solid #D5D5D5;
    }
    .el-table__body-wrapper tr td .el-button--text{
      border: 1px solid #63A4FF;
      padding: 4px 8px;
    }
    .el-pagination {
      padding: 0;
      float: right;
      margin-top: 30px;
      padding-bottom: 30px;
    }
    .el-pagination button span {
      padding: 0 16px;
      border: 1px solid #D5D5D5;
      font-family: MicrosoftYaHei;
      font-size: 12px;
      text-align: center;
    }
    .el-pagination.is-background .el-pager li{
      border: 1px solid #D5D5D5;
      border-radius: 2px;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active{
      background-color: #DE5B67;
      color: #ffffff;
    }
    .el-pagination.is-background .el-pager li:not(.active):hover {
      color: #DE5B67;
    }
    .el-pagination button:hover {
      color: #DE5B67;
    }
    .el-dialog .el-dialog__header .el-dialog__title {
      font-family: MicrosoftYaHei-Bold;
      font-size: 14px;
      color: #333333;
      font-weight: 600;
    }
    .el-dialog .el-dialog__body div{
      padding-top: 20px;
    }
    .el-dialog .el-dialog__body .dialog_name{
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #999999;
    }
    .el-dialog .el-dialog__body input{
      width: 240px;
      height: 30px;
      padding-left: 10px;
      border: 1px solid #D5D5D5;
      border-radius: 2px;
      font-size: 12px;
      color: #333333;
      line-height: 30px;
      margin-left: 10px;
    }
    .el-dialog .el-dialog__footer button{
      width: 80px;
      height: 30px;
      border: 1px solid #333333;
      border-radius: 2px;
      color: #333333;
    }
    .el-button.is-plain:hover, .el-button.is-plain:focus {
      background: #DE5B67;
      border-color: #DE5B67;
      color: #ffffff;
    }
  }
</style>
