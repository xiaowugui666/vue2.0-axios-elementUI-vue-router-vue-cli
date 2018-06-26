<template>
  <div class="home-content">
    <div class="title">
      <label>订单管理 > 新增订单</label>
      <div>
        <label>保存</label>
        <label>返回</label>
      </div>
    </div>
    <div class="rebateDetail">
        <div class="content">
          <label><i>*</i>添加商品：</label>
          <div class="productList">
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div>
              <img src="/static/test/ceshi.png"  class="proImg" alt="">
              <em>x1</em>
              <img src="/static/test/clear.png" class="clear" alt="">
            </div>
            <div class="add"></div>
            </div>
        </div>
        <div class="form">
          <p><label>商品价格</label><input disabled type="tel" ><s>￥</s></p>
          <p><label>划线价格</label><input type="tel" ><s>￥</s></p>
          <p><label style="margin-right: 34px;"><i>*</i>数量</label> <input type="tel"></p>
          <p><label><i>*</i>快递公司</label> <input type="tel"></p>
          <p><label><i>*</i>快递编号</label> <input type="tel"></p>
          <p>
            <label>订单状态</label>
            <el-select v-model="OrderType" placeholder="全部"  @change="changeType" >
              <el-option
                v-for="item in optionType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </p>
          <p><label><i>*</i>客户手机</label> <input type="tel"></p>
          <p><label>订单状态</label> <input type="text" placeholder="例：胡女士"></p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      OrderType: '',
      optionType: [
        {
          value: '1',
          label: '全部'
        }
      ]
    }
  },
  methods: {
    changeType () {
    }
  }
}
</script>
<style>
  .el-input__inner{
    width: 256px;
    border-radius: 2px;
    height: 30px;
    line-height: 30px;
  }
  .el-select-dropdown__item{
    height: 30px;
    line-height: 30px;
  }
  .el-scrollbar__view el-select-dropdown__list{
    padding: 0;
  }
</style>
<style scoped lang="less">
  .form{
    p{
      margin-top: 20px;
      border-radius: 2px;
      label{
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #3F3F3F;
        line-height: 15px;
      }
    }
    P:nth-child(1) input{
      background: #D5D5D5;
    }
    P:nth-child(1) , P:nth-child(2){
      position: relative;
      label{
        margin-right: 15px;
      }

      input{
        padding-left: 20px;
      }
      s{
        font-style: normal;
        text-decoration:none ;
        position: relative;
        top:50%;
        transform: translateY(-50%);
        right: 250px;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #333333;;
      }
    }
    input{
      width: 256px;
      height: 30px;
      box-sizing: border-box;
      border: 1px solid #D5D5D5;
      padding-left: 10px;
    }
  }
  .home-content {
    margin: 0 20px 0 200px;
    position: relative;
    min-width: 1000px;
    .title {
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #333333;
      line-height: 56px;
      padding:0 20px;
      margin-top: 20px;
      margin-bottom: 20px;
      background: #fff;
      div{
        display: flex;
        label:nth-child(1){
          width:80px;
          height: 30px;
          text-align: center;
          display: block;
          line-height: 30px;
          color: #fff;
          background: #DE5B67 ;
          border-radius: 2px;
          margin-right: 20px;
        }
        label:nth-child(2){
          width:80px;
          height: 30px;
          display: block;
          box-sizing: border-box;
          text-align: center;
          line-height: 30px;
          border: 1px solid #333333;
          border-radius: 2px;
          color: #333;
        }
      }
    }
    .rebateDetail{
      box-sizing: border-box;
      padding:22px 0 20px 26px;
      background: #fff;
      .content{
        display: flex;
        margin-bottom: 20px;
        justify-content:flex-start;
        /*margin-bottom: 20px;*/
        .productList{
          margin-right: 20px;
          display: flex;
          justify-content:flex-start;
          flex-wrap:wrap;
          >div{
            position: relative;
          }
          .proImg{
            width: 80px;
            margin-right: 10px;
          }
          em{
            font-style: normal;
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #3F3F3F;
            margin-right: 15px;
          }
          .clear{
            position: absolute;
            width: 20px;
            top:0px;
            left: 60px;
          }
        }
      }
      label{
        font-family: MicrosoftYaHei;
        font-size: 12px;
        width: 135px;
        color: #3F3F3F;
        line-height: 15px;
        margin-right:10px;
        position: relative;
        i{
          color: #DE5B67;
          position: absolute;
          top:0px;
          left:-9px;
          font-size: 12px;
        }
      }
      .add{
        width: 80px;
        height: 80px;
        box-sizing: border-box;
        border: 1px solid #d5d5d5;
        position: relative;
      }
      .add::before{
        content:'';
        display: block;
        width: 20px;
        height: 1px;
        position: absolute;
        top:39px;
        left: 29px;
        background: #D5D5D5;
      }
      .add::after{
        content:'';
        display: block;
        width: 1px;
        height: 20px;
        position: absolute;
        top:29px;
        left: 39px;
        background: #D5D5D5;
      }
    }
  }
</style>
