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
      <div class="online-consulting" @click="consultationQQ">
        <el-button slot="reference">在<br>线<br>咨<br>询<br><img class="qq-icon" src="../assets/qq.svg"></el-button>
      </div>
      <div class="QR-code">
        <el-popover
          placement="left-start"
          width="200"
          trigger="hover">
          <div class="code">
            <span>店铺预览码</span>
            <img v-if="QRcode" :src="yiqixuanDomainUrl + QRcode" />
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
      // console.log(res)
      this.QRcode = res.data.code_url
    })
  },
  components: {
    echarts,
    menuLeft
  },
  computed: {
    ...mapState(['yiqixuanDomainUrl'])
  },
  methods: {
    getShopInfo () {
      initialSetData('get').then(res => {
        this.shopName = res.data.name
        this.wechat = res.data.wechat
      }).catch()
    },
    // 咨询QQ，打开QQ聊天应用
    consultationQQ () {
      window.open('http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDE5MDczOV80ODM3MjVfODAwMTkwNzM5XzJf')
    }
  }
}
</script>
<style scoped lang="less">
  @import '../fonts/icomoon.css';
  .home-content {
    min-width: 1000px;
    margin-right: 60px;
  }
  .shop-info, .shortcut-entrance, .home-survey {
    background: #fff;
    height: 60px;
    line-height: 60px;
    font-size: 0;
    color: @b2;
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
        a {
          color: @mainC;
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
        color: @b2;
        margin-top: -10px;
      }
      .down {
        padding-top: 10px;
        font-size: 12px;
        color: @b8;
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
        color: #FF8C96;
        font-weight: 600;
      }
      .down {
        i::before {
          color: #FF8C96;
        }
      }
    }
    li:nth-child(2) {
      width: 20%;
      .up {
        color: #FEB670;
        font-weight: 600;
      }
      .down {
        i::before {
          color: #FEB670;
        }
      }
    }
    li:last-child {
      border-right: none;
    }
  }
  .online-consulting, .QR-code {
    position: fixed;
    z-index: 99;
    right: 0;
    top: 100px;
    background: #fff;
    text-align: center;
    /*writing-mode: vertical-rl;*/
    .el-button {
      width: 40px;
      box-sizing: border-box;
      padding:16px 0;
      border: none;
      margin-left: -10px;
      color: @b2;
      font-size: 12px;
      line-height: 1.4;
      &:hover {
        background: #fff;
        color: @b2;
      }
      &:focus {
        background: #fff;
        color: @b2;
      }
      .qq-icon {
        margin-top: 5px;
        width: 28px;
      }
    }
  }
  .QR-code{
    top: 260px;
  }
  .detailed-consultation {
    font-size: 12px;
    color: @b8;
    span {
      color: @blue;
    }
  }
  .code {
    font-size: 12px;
    color: @b8;
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
      color: @b2;
    }
  }
</style>
