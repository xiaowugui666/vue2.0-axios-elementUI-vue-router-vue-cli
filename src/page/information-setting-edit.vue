<template>
    <div>
      <menu-left></menu-left>
      <div class="info-setting-subject">
        <div class="subject-info plate">
          <div class="plate-top">
            <span>主体信息</span>
          </div>
          <div class="subject-info-list">
            <ul>
              <li>
                <span class="name">商铺名称：</span>
                <span>{{shopName}}</span>
              </li>
              <li>
                <span class="name">商铺编号：</span>
                <span>{{shopNum}}</span>
              </li>
              <li>
                <span class="name">店铺认证：</span>
                <span style="padding-right: 10px;">已认证</span>
                <i class="icon-淘宝认证"></i>
                <i class="icon-微信认证"></i>
                <i class="icon-公众号认证"></i>
                <i class="icon-京东认证"></i>
              </li>
              <li>
                <span class="name">主营类目：</span>
                <span>{{mainCamp}}</span>
              </li>
              <li>
                <span class="name">创建日期：</span>
                <span>{{creationTime}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="store-info plate">
          <div class="plate-top">
            <span>店铺信息</span>
          </div>
          <div class="store-info-list">
            <ul>
              <li>
                <span class="name alignment-top">商铺logo：</span>
                <img class="store-logo-img" src="../assets/ceshi.png" alt="">
              </li>
              <li>
                <span class="name alignment-top">banner：</span>
                <img class="shop-description-img" src="../assets/ceshi2.png" alt="">
              </li>
              <li>
                <span class="name alignment-top">商铺描述：</span>
                <span class="shop-description-txt">这里是商铺的描述这里是商铺的描述这里是商铺的描述这里是商铺的描述这里是商铺的描述这里是商铺的描述</span>
              </li>
              <li>
                <span class="name">店长姓名：</span>
                <span>{{shopChiefName}}</span>
              </li>
              <li>
                <span class="name">联系电话：</span>
                <span>{{telNum}}</span>
              </li>
              <li>
                <span class="name">联系微信：</span>
                <span>{{contactWeChat}}</span>
              </li>
              <li>
                <span class="name">客服电话：</span>
                <span>{{customerServiceNum}}</span>
              </li>
              <li>
                <span class="name">联系地址：</span>
                <span>{{contactAddress}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import menuLeft from '../components/menu-left'
export default {
  data () {
    return {
      shopName: '阿迪达斯旗舰店',
      shopNum: 321354656454,
      mainCamp: '视频',
      creationTime: '2018.01.02 10:05',
      shopChiefName: '陈天一',
      telNum: 13611895011,
      contactWeChat: 'asdasq2134141',
      customerServiceNum: '021-65465400',
      contactAddress: '上海市 上海市 卢湾区 永康路99弄9号909室'
    }
  },
  components: {
    menuLeft
  }
}
</script>

<style scoped lang="less">
  @import "../fonts/icomoon.css";
  .info-setting-subject {
    padding-top: 20px;
    padding-bottom: 20px;
    margin: 0 20px 0 200px;
  }
  .plate {
    padding: 20px 15px;
    margin-bottom: 20px;
    background: #fff;
    color: #333;
    font-size: 12px;
    line-height: 15px;
    .plate-top {
      font-size: 14px;
      border-bottom: 2px solid #d5d5d5;
      padding-bottom: 20px;
      padding-left: 5px;
      &::before {
        content: '';
        display: block;
        float: left;
        width: 3px;
        height: 14px;
        margin-top: 1px;
        margin-right: 10px;
        background: #999;
      }
    }
  }
  .subject-info {
  }
  .subject-info-list {
    padding: 10px 0 20px;
    li {
      box-sizing: border-box;
      height: 35px;
      line-height: 35px;
      font-size: 12px;
      span {
        vertical-align: middle;
      }
      span.name {
        color: #999;
        padding-right: 3px;
        width: 65px;
      }
      i {
        font-size: 20px;
        vertical-align: middle;
        padding-left: 5px;
      }
    }
  }
  .store-info-list {
    padding-top: 10px;
    li {
      padding-top: 20px;
      font-size: 12px;
      span {
        max-width: 260px;
        display: inline-block;
        vertical-align: middle;
      }
      .name {
        padding-right: 3px;
        color: #999;
        width: 65px;
      }
      .name.alignment-top {
        vertical-align: top;
        padding-top: 6px;
      }
      .store-logo-img {
        display: inline-block;
        width: 80px;
      }
      .shop-description-img {
        width: 200px;
      }
      .shop-description-txt {
        line-height: 1.5;
        padding: 10px;
        border: 1px solid #d5d5d5;
        min-height: 80px;
      }
    }
  }
</style>
