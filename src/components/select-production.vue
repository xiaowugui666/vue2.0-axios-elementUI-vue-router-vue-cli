<template>
    <div class="addProduction">
        <div class="content">
            <div class="top">
                <div class="title">选择商品</div>
                <div class="searchBox">
                  <label>商品名称</label>
                  <input type="text" v-model="productionKey">
                  <button class="search">搜索</button>
                </div>
            </div>
            <div class="productionList">
                <div class="listHeader">
                  <label>下单时间：2018-10-10</label>
                  <label>状态</label>
                  <label>操作</label>
                </div>
                <div class="list">
                    <div class="select">
                      <img src="/static/test/ceshi.png" alt="">
                      <div>
                        <p  class="desc">
                            好丽友拍蛋糕
                        </p>
                        <p class="info">
                          <label>标准白；35.5；皮质</label>
                          <label>￥9999.00</label>
                        </p>
                      </div>
                    </div>
                    <div class="state">
                      上架
                    </div>
                    <div class="toSelect">
                      选择
                    </div>
                </div>
              <div class="list">
                <div class="select">
                  <img src="/static/test/ceshi.png" alt="">
                  <div>
                    <p  class="desc">
                      好丽友拍蛋糕
                    </p>
                    <p class="info">
                      <label>标准白；35.5；皮质</label>
                      <label>￥9999.00</label>
                    </p>
                  </div>
                </div>
                <div class="state">
                  上架
                </div>
                <div class="toSelect">
                  选择
                </div>
              </div>
              <div class="list">
                <div class="select">
                  <img src="/static/test/ceshi.png" alt="">
                  <div>
                    <p  class="desc">
                      好丽友拍蛋糕
                    </p>
                    <p class="info">
                      <label>标准白；35.5；皮质</label>
                      <label>￥9999.00</label>
                    </p>
                  </div>
                </div>
                <div class="state">
                  上架
                </div>
                <div class="toSelect">
                  选择
                </div>
              </div>
              <div class="list">
                <div class="select">
                  <img src="/static/test/ceshi.png" alt="">
                  <div>
                    <p  class="desc">
                      好丽友拍蛋糕
                    </p>
                    <p class="info">
                      <label>标准白；35.5；皮质</label>
                      <label>￥9999.00</label>
                    </p>
                  </div>
                </div>
                <div class="state">
                  上架
                </div>
                <div class="toSelect">
                  选择
                </div>
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
</template>

<script>
export default {
  data () {
    return {
      productionKey: ''
    }
  }
}
</script>
<style lang="less">
  .addProduction{
    .el-pagination.is-background .el-pager li {
      background-color: #fff;
    }
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
    .el-pagination{
      margin-top: 30px;
      text-align: right;
    }
    .el-pagination.is-background .el-pager li:not(.disabled):hover {
      color: #DE5B67; }
    .el-tabs__item.is-active {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      text-align: center;
    }
  }
</style>
<style scoped lang="less">
  .select{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 60%;
    box-sizing: border-box;
    border-right: 1px solid #d5d5d5;
    .desc{
      padding-left: 5px;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
    }
    .info{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      padding-left: 5px;
      margin-top: 20px;
      color: #999;
      label:nth-child(2){
        color:#DE5B67;
        margin-left: 30px;
      }
    }
  }
  .state{
    width: 20%;
    box-sizing: border-box;
    text-align: center;
    height: 80px;
    line-height: 80px;
    border-right: 1px solid #d5d5d5;
    font-size: 14px;
    color: #333;
  }
  .toSelect{
    box-sizing: border-box;
    text-align: center;
    width: 20%;
    height: 80px;
    line-height: 80px;
    font-size:14px;
    border-right: 1px solid #d5d5d5;
    color:#63A4FF;
  }
  .list{
    height: 80px;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items: center;
    border-left:1px solid  #d5d5d5;
    border-bottom: 1px solid  #d5d5d5;
    img{
      width: 60px;
      height: 60px;
      padding: 10px;
    }
  }
  .listHeader{
    background: #EFEFEF;
    height: 40px;
    line-height: 40px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid #d5d5d5;
    label{
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #333333;
      display: block;
    }
    label:nth-child(1){
      width: 60%;
      box-sizing: border-box;
      padding-left: 20px;
      border-right: 1px solid  #D5D5D5;
    }
    label:nth-child(2){
      width: 20%;
      text-align: center;
      border-right: 1px solid  #D5D5D5;
    }
    label:nth-child(3){
      width: 20%;
      text-align: center;
    }
  }
  .title{
    font-family: MicrosoftYaHei-Bold;
    font-size: 14px;
    color: #333333;
  }
  .searchBox{
    margin-top: 39px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    label{
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #999999;
      text-align: right;
      line-height: 15px;
    }
    input{
      border: 1px solid #D5D5D5;
      border-radius: 2px;
      width: 256px;
      height: 30px;
      line-height: 30px;
      padding-left: 7px;
      box-sizing: border-box;
      margin-right: 150px;
    }
    .search{
      background: #DE5B67;
      border-radius: 2px;
      width: 80px;
      height: 30px;
      line-height: 30px;
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #FFFFFF;
      text-align: center;
    }
  }
  .addProduction{
    background: rgba(51,51,51,0.60);
    position: fixed;
    width:100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  .content{
    padding:20px;
    background: #FFFFFF;
    border: 1px solid #979797;
    border-radius: 7px;
    width: 600px;
    box-sizing: border-box;
    .productionList{
      width: 100%;
      margin-top: 30px;
    }
  }
  .top{
    padding-left: 5px;
  }
</style>
