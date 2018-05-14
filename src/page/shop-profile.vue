<template>
    <div>
      <menu-left-com></menu-left-com>
      <div class="home-content">
        <ul class="home-survey">
          <li>
            <div class="up">9999.99</div>
            <div class="down"><span>昨日浏览量</span></div>
          </li>
          <li>
            <div class="up">999.99</div>
            <div class="down"><span>昨日访客数</span></div>
          </li>
          <li>
            <div class="up">9999</div>
            <div class="down"><span>昨日商品浏览量</span></div>
          </li>
          <li>
            <div class="up">99</div>
            <div class="down"><span>昨日商品访客数</span></div>
          </li>
          <li>
            <div class="up">9</div>
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
            <div class="list">
              <div>商铺首页</div>
              <div>123</div>
              <div>234324</div>
              <div>234234234</div>
              <div>234234324</div>
            </div>
            <div class="list">
              <div>商铺首页</div>
              <div>123</div>
              <div>234324</div>
              <div>234234234</div>
              <div>234234324</div>
            </div>
            <div class="list">
              <div>商铺首页</div>
              <div>123</div>
              <div>234324</div>
              <div>234234234</div>
              <div>234234324</div>
            </div>
          </div>
          <el-pagination
            background
            :page-size="20"
            :page-count="6"
            prev-text="< 上一页"
            next-text="下一页 >"
            layout="prev, pager, next"
            current-change="currentIndex"
            :total="1000">
          </el-pagination>
        </div>
      </div>

    </div>
</template>

<script>
import menuLeftCom from '@/components/menu-left'
import echarts from '@/components/echarts'
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
    }
  },
  components: {
    echarts,
    menuLeftCom
  },
  computed: {
    ...mapState(['menuLeft'])
  },
  methods: {
    ...mapMutations(['setMenuLeft'])
  }
}
</script>
<style>
  .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next {
    padding: 0 15px;
  }
  .el-pagination span:not([class*=suffix]), .el-pagination button {
    display: inline-block;
    font-size: 13px;
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-pagination .btn-prev, .el-pagination .btn-next {
    background: center center no-repeat;
    background-size: 16px;
    background-color: #fff;
    height: 30px;
    line-height: 30px;
    padding:0 15px;
    cursor: pointer;
    margin: 0;
    color: #303133;
    border: 1px solid #d5d5d5;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #DE5B67;
    color: #fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active:hover {
    color: #fff;
  }
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
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #DE5B67; }
</style>
<style scoped lang="less">

  .el-pagination{
    margin:30px 0;
    text-align: right;
  }
  .contentTist{
    box-sizing: border-box;
    padding:20px 20px 0;
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
    border-left: 1px solid #d5d5d5;
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
    border:1px solid #d5d5d5;
  }
  .datalist>div div{
    width: 20%;
    box-sizing: border-box;
    text-align: center;
    border-right:1px solid #d5d5d5;
    border-bottom: 1px solid #d5d5d5;
    height: 50px;
    line-height: 50px;
  }
  .datalist .top div{
    width: 20%;
    box-sizing: border-box;
    text-align: center;
    border-right:1px solid #d5d5d5;
    border-bottom: 1px solid #d5d5d5;
    height: 40px;
    line-height: 40px;
  }
  .home-content {
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
