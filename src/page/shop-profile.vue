<template>
    <div>
      <menu-left routeIndex="2"></menu-left>
      <div class="orderProfile">
        <ul class="home-survey">
          <li>
            <div class="up">{{goodsCounts.pv_mpa}}</div>
            <div class="down"><span>昨日浏览量</span></div>
          </li>
          <li>
            <div class="up">{{goodsCounts.uv_mpa}}</div>
            <div class="down"><span>昨日访客数</span></div>
          </li>
          <li>
            <div class="up">{{goodsCounts.pv_goods}}</div>
            <div class="down"><span>昨日商品浏览量</span></div>
          </li>
          <!--<li>-->
            <!--<div class="up">99</div>-->
            <!--<div class="down"><span>昨日商品访客数</span></div>-->
          <!--</li>-->
          <li>
            <div class="up">{{goodsCounts.goods_count}}</div>
            <div class="down"><span>商铺商品总数</span></div>
          </li>
        </ul>
        <echarts></echarts>
        <div class="contentTist">
          <div class="title">七日界面浏览排行榜</div>
          <div class="datalist">
            <div class="top">
              <div>页面名称</div>
              <div>浏览量</div>
              <div>访客数</div>
              <div>分享访问次数</div>
              <div>分享访问人数</div>
            </div>
            <div class="list" v-for="(item,index) in sevenDays" :key="index">
              <div>{{item.name}}</div>
              <div>{{item.pv_sum}}</div>
              <div>{{item.uv_sum}}</div>
              <div>{{item.pv_share_sum}}</div>
              <div>{{item.uv_share_sum}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import echarts from '@/components/echarts'
import {storeGoodsAmount, sevenDaysPv} from '../axios/api'
import menuLeft from '@/components/menu-left'
export default {
  data () {
    return {
      goodsCounts: {},
      sevenDays: []
    }
  },
  components: {
    echarts,
    menuLeft
  },
  computed: {
  },
  created () {
    storeGoodsAmount().then(res => {
      this.goodsCounts = res.data
    })
    sevenDaysPv().then(res => {
      this.sevenDays = res.data
    })
  },
  methods: {
  }
}
</script>
<style lang="less">
  .orderProfile {
    .el-pager li {
      padding: 0;
      background: #fff;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 30px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      text-align: center;
      margin: 0;
      border: 1px solid #D5D5D5;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
    }
    .el-pager li.active + li {
      border-left: 1px solid #D5D5D5;
    }
  }
</style>
<style scoped lang="less">
  .contentTist{
    box-sizing: border-box;
    padding:20px;
    background: #fff;
    margin-top: 20px;
  }
  .title{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #333333;
    padding-left:10px;
    position: relative;
    margin-bottom: 19px;
  }
  .title::after{
    content:'';
    display: block;
    position: absolute;
    width: 3px;
    height: 13px;
    background: #999;
    top:4px;
    left:0;
  }
  .datalist{
    width: 100%;
  }
  .list{
    border-left: 1px solid #EFEFEF;
  }
  .datalist>div{
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 50px;
  }
  .datalist .top{
    background: #d5d5d5;
    height: 40px;
    line-height: 40px;
    border:1px solid #EFEFEF;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #333333;
    text-align: center;
  }
  .datalist>div div{
    width: 20%;
    box-sizing: border-box;
    text-align: center;
    border-right:1px solid #EFEFEF;
    border-bottom: 1px solid #EFEFEF;
    height: 50px;
    line-height: 50px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #666666;
  }
  .datalist .top div{
    width: 20%;
    box-sizing: border-box;
    text-align: center;
    border-right:1px solid #EFEFEF;
    border-bottom: 1px solid #EFEFEF;
    height: 40px;
    line-height: 40px;
  }
  .orderProfile {
    margin: 0 60px 0 200px;
    padding-top: 20px;
    position: relative;
    min-width: 1000px;
  }
  .home-survey {
    background: #fff;
    height: 60px;
    line-height: 60px;
    font-size: 0;
    color: #333;
    margin-bottom: 20px;
  }
  .home-survey {
    padding: 20px 0;
    height: 60px;
    li {
      display: inline-block;
      vertical-align: middle;
      width: 19.5%;
      height: 40px;
      line-height: 1.4;
      text-align: center;
      box-sizing: border-box;
      border-right: 2px solid #eee;
      .up {
        font-family: MicrosoftYaHei;
        font-size: 22px;
        color: #333333;
        text-align: center;
        margin-top: -10px;
      }
      .down {
        padding-top: 10px;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #999999;
        text-align: center;
        span {
          vertical-align: middle;
        }
      }
    }
    li:last-child {
      border-right: none;
    }
  }
</style>
