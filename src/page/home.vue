<template>
  <div>
    <menu-left routeIndex="1"></menu-left>
    <div class="home-content content-box">
      <div class="shop-info">
        <span>{{shopName}}</span>
        <!--<i class="icon-淘宝认证"></i>-->
        <!--<i class="icon-微信认证"></i>-->
        <!--<i class="icon-公众号认证"></i>-->
        <!--<i class="icon-京东认证"></i>-->
      </div>
      <el-row class="shortcut-entrance">
        <el-col class="li" :span="4"><router-link to="/shop-profile"><i class="icon-店铺"></i><span>店铺概况</span></router-link></el-col>
        <el-col class="li" :span="4"><router-link to="/commodity-management"><i class="icon-商品"></i><span>商品管理</span></router-link></el-col>
        <el-col class="li" :span="4"><router-link to="/order-management"><i class="icon-订单"></i><span>订单管理</span></router-link></el-col>
        <el-col class="li" :span="4"><router-link to="/customer-management"><i class="icon-客户"></i><span>客户管理</span></router-link></el-col>
        <el-col class="li" :span="4"><router-link to="/account"><i class="icon-账户"></i><span>我的账户</span></router-link></el-col>
        <el-col class="li" :span="4"><router-link :to="{name:'marketingManagement',params:{class:'special-offer'}}"><i class="icon-特卖"></i><span>特价管理</span></router-link></el-col>
      </el-row>
      <ul class="home-survey">
        <li>
          <div class="up">￥{{storeDetail.today_trade | money}}</div>
          <div class="down"><i class="icon-钱"></i><span>今日交易额</span></div>
        </li>
        <li>
          <div class="up">￥{{storeDetail.yesterday_trade | money}}</div>
          <div class="down"><i class="icon-钱"></i><span>昨日交易额</span></div>
        </li>
        <li>
          <div class="up">{{storeDetail.today_order}}</div>
          <div class="down"><span>今日订单</span></div>
        </li>
        <li>
          <div class="up">{{storeDetail.yesterday_order}}</div>
          <div class="down"><span>昨日订单</span></div>
        </li>
        <li>
          <div class="up">{{storeDetail.total_after_sale}}</div>
          <div class="down"><span>维权订单</span></div>
        </li>
        <li>
          <div class="up">{{storeDetail.express_order}}</div>
          <div class="down"><span>待发订单</span></div>
        </li>
      </ul>
      <echarts></echarts>
      <div class="online-consulting">
        <el-popover
          placement="left"
          width="150"
          trigger="hover">
          <div class="detailed-consultation">详情咨询微信号：<span>{{wechat}}</span></div>
          <el-button slot="reference">在<br>线<br>咨<br>询</el-button>
        </el-popover>
      </div>
      <div class="QR-code">
        <el-popover
          placement="left-start"
          width="200"
          trigger="hover">
          <div class="code">
            <span>店铺预览码</span>
            <img :src="yiqixuanDomainUrl + QRcode" />
            <span>微信扫描预览店铺</span>
          </div>
          <el-button slot="reference">店<br>铺<br>预<br>览<br></el-button>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
import echarts from '@/components/echarts'
import {mapState} from 'vuex'
import {tradeVolum, initialSetData, getQRCode} from '../axios/api'
export default {
  data () {
    return {
      shopName: '',
      wechat: '',
      QRcode: '',
      storeDetail: {}
    }
  },
  mounted () {
    this.getShopInfo()
    tradeVolum().then(res => {
      if (res.status == 200) {
        this.storeDetail = res.data
      } else {
        this.$message({
          type: 'error',
          message: '数据加载失败，请刷新重试'
        })
      }
    })
    // 获取体验二维码
    getQRCode().then(res => {
      console.log(res)
      this.QRcode = res.data.code_url
    })
  },
  components: {
    echarts,
    menuLeft
  },
  computed: {
    ...mapState(['menuShow', 'yiqixuanDomainUrl'])
  },
  methods: {
    getShopInfo () {
      initialSetData('get').then(res => {
        this.shopName = res.data.name
        this.wechat = res.data.wechat
      }).catch()
    }
  }
}
</script>
<style scoped lang="less">
  @import '../fonts/icomoon.css';
  .home-content {
    margin-right: 60px;
  }
  .shop-info, .shortcut-entrance, .home-survey {
    background: #fff;
    height: 60px;
    line-height: 60px;
    font-size: 0;
    color: #333;
    margin-bottom: 20px;
  }
  .shop-info span {
    font-size: 16px;
    font-weight: bold;
    padding-left: 20px;
    padding-right: 20px;
    vertical-align: middle;
  }
  .shop-info i {
    font-size: 20px;
    padding-right: 10px;
    display: inline-block;
    vertical-align: middle;
  }
  .shortcut-entrance {
    .li {
      border-right: 1px solid #F5F5F5;
      &:hover {
        background: #F6F6F6;
        a {
          color: #333;
        }
      }
      &:first-child {
        border-left: 1px solid #F5F5F5;
      }
      &:last-child {
        border-right: none;
      }
      a {
        color: #888;
        display: block;
        font-size: 12px;
        text-align: center;
        i {
          padding-right: 10px;
          font-size: 16px;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
    }
  }
  .home-survey {
    padding: 20px 0;
    height: 60px;
    li {
      display: inline-block;
      vertical-align: middle;
      width: 15%;
      height: 40px;
      line-height: 1.4;
      text-align: center;
      box-sizing: border-box;
      border-right: 2px solid #eee;
      .up {
        font-size: 22px;
        color: #333;
        margin-top: -10px;
      }
      .down {
        padding-top: 10px;
        font-size: 12px;
        color: #999;
        i {
          font-size: 16px;
          padding-right: 8px;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
    }
    li:first-child {
      width: 20%;
      .up {
        color: rgba(255, 117, 129, 0.84);
      }
      .down {
        i::before {
          color: rgba(255, 117, 129, 0.84);
        }
      }
    }
    li:nth-child(2) {
      width: 20%;
      .up {
        color: rgba(255, 173, 113, 0.93);
      }
      .down {
        i::before {
          color: rgba(255, 173, 113, 0.93);
        }
      }
    }
    li:last-child {
      border-right: none;
    }
  }
  .online-consulting {
    position: fixed;
    z-index: 99;
    right: 0;
    top: 100px;
    background: #fff;
    text-align: center;
    writing-mode: vertical-rl;
    .el-button {
      padding: 22px 13px;
      border: none;
      margin-left: -10px;
      color: #333;
      font-size: 12px;
      line-height: 1.4;
      &:hover {
        background: #fff;
        color: #333;
      }
    }
  }
  .QR-code{
    top: 220px;
    position: fixed;
    z-index: 99;
    right: 0;
    background: #fff;
    text-align: center;
    writing-mode: vertical-rl;
    .el-button {
      padding: 22px 13px;
      border: none;
      margin-left: -10px;
      color: #333;
      font-size: 12px;
      line-height: 1.4;
      &:hover {
        background: #fff;
        color: #333;
      }
    }
  }
  .detailed-consultation {
    font-size: 12px;
    color: #999999;
    span {
      color: #63A4FF;
    }
  }
  .code {
    font-size: 12px;
    color: #999999;
    height: 202px;
    width: 198px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    img {
      max-width: 180px;
    }
    span:first-child {
      font-size: 14px;
      font-weight: 600;
      color: #333333;
    }
  }
</style>
