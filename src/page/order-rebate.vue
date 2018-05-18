<template>
    <div class="orderRebate">
      <div class="title">退款维权 > 处理退款</div>
      <div class="rebateDetail">
          <div class="content">
            <div class="left">
              <div class="rebateInfo">
                <div><label>订单编号：</label><label>HZ236483468</label></div>
                <div><label>创建时间：</label><label>2018-08-22    12:33</label></div>
                <div><label>付款时间：</label><label>2018-08-22    12:33</label></div>
                <div><label>退款编号：</label><label>HZ236483468</label></div>
                <div><label>创建时间：</label><label>2018-08-23    15:33</label></div>
              </div>
              <div class="buyer">
                <div><label>买家微信号：</label><label>248773573799</label></div>
                <div><label>买家手机号：</label><label>13566774466</label></div>
                <div><label>卖家商铺号：</label><label>商品名称</label></div>
              </div>
              <div class="buyer">
                <div><label>期望结果：</label><label>退货退款</label></div>
                <div><label>退款金额：</label><label>¥ 999.99 （含运费）</label></div>
                <div><label>退款原因：</label><label>多拍/拍错/不想要</label></div>
              </div>
              <div class="trade">交易记录</div>
              <div class="dialogue">
                <p class="user">
                  <label>买家</label>
                  <label>2018-12-12   18:18</label>
                </p>
                <div>
                  <label>操作行为：</label>
                  <label>发起退款  I  退货退款</label>
                </div>
                <div>
                  <label>退款金额：</label>
                  <label>¥ 999.99</label>
                </div>
                <div>
                  <label>留&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言：</label>
                  <label>买家留言理由</label>
                </div>
              </div>
              <div class="dialogue" style="background: #efefef">
                <p class="user">
                  <label>买家</label>
                  <label>2018-12-12   18:18</label>
                </p>
                <div>
                  <label>操作行为：</label>
                  <label>发起退款  I  退货退款</label>
                </div>
                <div>
                  <label>退款金额：</label>
                  <label>¥ 999.99</label>
                </div>
                <div>
                  <label>留&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言：</label>
                  <label>买家留言理由</label>
                </div>
              </div>
              <div class="dialogue">
                <p class="user">
                  <label>买家</label>
                  <label>2018-12-12   18:18</label>
                </p>
                <div>
                  <label>操作行为：</label>
                  <label>发起退款  I  退货退款</label>
                </div>
                <div>
                  <label>退款金额：</label>
                  <label>¥ 999.99</label>
                </div>
                <div>
                  <label>留&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言：</label>
                  <label>买家留言理由</label>
                </div>
              </div>
            </div>
            <div class="right">
                <div class="top">
                  <label  class="agree">同意</label>
                  <label  class="disagree">拒绝</label>
                </div>
                <div class="tip">留言：</div>
                <textarea  id="tips" cols="30" rows="10">
                </textarea>
                <div class="money">
                  <label>退款金额：</label>
                  <label>￥999.00</label>
                </div>
                <div class="bank">
                  <label>退款至：</label>
                  <label>招商银行（银行卡）</label>
                </div>
                <div class="warn">
                  <label>友情提醒：</label>
                  <label>如通过：“微信支付-代销”付款订单，退款3个工作日到账。</label>
                  <label>如通过“微信支付-自有”付款订单，需要前往对应财付通帐号进行退款操作</label>
                </div>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="less">
  .money{
    margin-top: 30px;
    label:nth-child(1){
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #999999;
    }
    label:nth-child(2){
      color: #DE5B67 ;
      font-family: MicrosoftYaHei;
      font-size: 12px;
    }
  }
  .bank{
    margin-top: 10px;
    padding-bottom: 200px;
    border-bottom: 1px dashed #efefef;
    label:nth-child(1){
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #999999;
    }
    label:nth-child(2){
      color: #151515  ;
      font-family: MicrosoftYaHei;
      font-size: 12px;
    }
  }
  .warn{
    margin-top: 25px;
    label{
      display: block;
      font-family: MicrosoftYaHei;
      font-size: 12px;
      line-height: 16px;
      color: #999999;
    }
    label:nth-child(2){
      margin-top: 15px;
    }
  }
  .right{
    padding: 20px;
    width: 34%;
    .tip{
      margin-top: 30px;
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #999999;
    }
    #tips{
      display: block;
      width:100%;
      margin-top: 13px;
      resize:none;
      padding:5px;
      font-size: 12px;
      color: #333;
      line-height:16px;
      border: 1px solid #efefef;
    }
    .top{
      display: flex;
      justify-content: center;
      label:nth-child(1){
        margin-right: 30px;
        background: #63A4FF;
        width: 100px;
        height: 30px;
        border-radius: 2px;
        color:#fff;
        font-size: 12px;
        line-height: 30px;
        text-align: center;
      }
      label:nth-child(2){
        border:1px solid #333;
        font-size: 12px;
        box-sizing: border-box;
        width: 100px;
        height: 30px;
        border-radius: 2px;
        color:#333;
        line-height: 28px;
        text-align: center;
      }
    }
  }
  .dialogue{
    padding-left: 8px;
  }
  .dialogue p{
    padding-top:20px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #333333;
    padding-bottom: 10px;
    border-bottom: 1px solid #EFEFEF;
  }
  .dialogue div:last-child{
    padding-bottom:20px;
  }
  .dialogue div{
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #999999;
    margin-top: 10px;
    label:nth-child(2){
      color: #151515;
    }
  }
  .left{
    width:66%;
    padding-right: 10px;
    border-right: 1px solid #EFEFEF;
  }
  .orderRebate {
    margin: 0 20px 0 200px;
    position: relative;
    min-width: 1000px;
    .title{
      height: 56px;
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #333333;
      line-height: 56px;
      padding-left: 20px;
      margin-top: 20px;
      margin-bottom: 20px;
      background: #fff;
    }
    .rebateDetail{
      padding: 20px;
      background: #fff;
      box-sizing: border-box;
      .content{
        border: 1px solid #D5D5D5;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        width: 100%;
        .buyer , .rebateInfo{
          background:#EFEFEF;
          display: flex;
          flex-wrap:wrap;
          justify-content: flex-start;
          padding:0 10px 10px;
          div{
            width: 33%;
            margin-top: 10px;
            label:nth-child(1){
              font-family: MicrosoftYaHei;
              font-size: 12px;
              color: #999999;
            }
            label:nth-child(2){
              font-family: MicrosoftYaHei;
              font-size: 12px;
              color: #151515;
            }
          }
        }
        .trade{
          padding-left: 20px;
          position: relative;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #333333;
          margin-top:30px;
          padding-bottom: 20px;
          border-bottom:1px dashed #EFEFEF;
        }
        .trade::after{
          background: #999999;
          width: 3px;
          height: 13px;
          left:9px;
          top:4px;
          position: absolute;
          content: '';
          display:block;
        }
        .buyer{
          background:#fff;
          border-bottom: 1px solid #EFEFEF;
          div{
            width: 38%;
          }
        }
      }
    }
  }
</style>
