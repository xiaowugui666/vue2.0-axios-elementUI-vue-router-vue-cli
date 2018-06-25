<template>
  <div>
    <menu-left routeIndex="9-1"></menu-left>
    <div class="trends-content">
      <div class="trends-header">
        <div>
          <span>关键字</span>
          <input type="text" v-model="keyWord">
        </div>
        <div class="time-picker">
          <span>发布时间</span>
          <el-date-picker
            @change="changeTime"
            v-model="keyTime"
            type="daterange"
            align="right"
            unlink-panels
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <el-button
          type="success"
          size="small">搜索</el-button>
      </div>
      <div class="trends-editor">
        <div>
          <el-button
            class="medium-button"
            size="small"
            type="success">发布新动态</el-button>
        </div>
        <div class="trends" v-for="(item,index) in data" :key="index">
          <div class="title">
            <span>{{item.title}}</span>
            <span :class="{'long-trend': (item.type == 1 ? true : false), 'short-trend': (item.type == 2 ? true : false)}">{{item.type == 1 ? '长动态' : '短动态'}}</span>
          </div>
          <div class="message">{{item.body}}</div>
          <div class="imgs">
            <div class="img-item" v-if="item.imgs" v-for="(ite,ind) in item.imgs" :key="ind">
              <img :src="ite.url">
            </div>
          </div>
          <div class="operations">
            <div class="operation">
              <span>编辑</span><span>查看</span><span>删除</span>
            </div>
            <div class="infor">
              <i class="icon-查看"></i><span>9999</span><i class="icon-评论"></i><span>10.8W+</span><i class="icon-转发"></i><span>1.6W+</span><i class="icon-点赞"></i><span>9999</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
export default {
  data () {
    return {
      keyTime: [],
      keyWord: '',
      data: [{
        title: '手机卡基多拉空间',
        body: '爱神的箭啊啥看啥看动画',
        type: 1,
        pv: 9999,
        comment: 1233,
        zhuanfa: 1231,
        dianzan: 12312,
        imgs: [{
          url: 'http://imgsrc.baidu.com/imgad/pic/item/eaf81a4c510fd9f900630df72f2dd42a2834a43c.jpg'
        }, {
          url: 'http://imgsrc.baidu.com/imgad/pic/item/d439b6003af33a87589a973ccc5c10385343b525.jpg'
        }, {
          url: 'http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=453c53fbfa1f3a294ec5dd8df14cd644/2cf5e0fe9925bc319508f3bd54df8db1cb1370ba.jpg'
        }]
      }, {
        title: '手机卡基多拉空间',
        body: '爱神的箭啊啥看啥看动画',
        type: 2,
        pv: 9999,
        comment: 1233,
        zhuanfa: 1231,
        dianzan: 12312
      }, {
        title: '手机卡基多拉空间',
        body: '爱神的箭啊啥看啥看动画',
        type: 1,
        pv: 9999,
        comment: 1233,
        zhuanfa: 1231,
        dianzan: 12312
      }, {
        title: '手机卡基多拉空间',
        body: '爱神的箭啊啥看啥看动画',
        type: 2,
        pv: 9999,
        comment: 1233,
        zhuanfa: 1231,
        dianzan: 12312
      }]
    }
  },
  methods: {
    changeTime (value) {
      console.log(value)
      console.log(1111)
    }
  },
  computed: {
  },
  components: {
    menuLeft
  }
}
</script>

<style lang="less">
.trends-content{
  .el-date-editor .el-range__icon {
    display: none;
  }
  .el-date-editor--daterange.el-input__inner{
    width: 230px;
  }
  .el-date-editor .el-range__close-icon {
    line-height: 23px;
  }
  .el-select .el-input .el-select__caret {
    line-height: 30px;
  }
  .el-date-editor .el-range-input{
    width: 43%;
  }
  .el-input__inner{
    height: 30px;
    line-height: 30px;
    border: 1px solid #D5D5D5;
    border-radius: 0;
  }
  .el-date-editor .el-range-separator {
    line-height: 23px;
  }
}
</style>
<style scoped lang="less">
.trends-content {
  min-width: 1000px;
  margin: 0 20px 0 200px;
  padding-top: 20px;
  position: relative;
  .trends-header {
    min-width: 1000px;
    height: 55px;
    padding-top: 25px;
    background: #FFFFFF;
    >div {
      float: left;
    }
    .time-picker {
      margin-right: 30px;
    }
    span {
      font-size: 12px;
      color: #888888;
      margin-left: 20px;
      margin-right: 8px;
    }
    input {
      width: 246px;
      height: 28px;
      border: 1px solid #D5D5D5;
      border-radius: 2px;
      padding-left: 10px;
    }
  }
  .trends-editor {
    margin-top: 20px;
    background: #FFFFFF;
    padding: 20px;
    .trends {
      border: 1px solid @bc;
      margin-top: 10px;
      padding: 20px 28px 20px 20px;
      overflow: hidden;
      &:nth-child(2) {
        margin-top: 20px;
      }
      .title {
        font-size: 14px;
        font-weight: 900;
        color: #222222;
        span {
          display: inline-block;
          line-height: 22px;
          &:last-child {
            text-align: center;
            width: 58px;
            height: 22px;
            font-weight: 100;
            margin-left: 10px;
            font-size: 12px;
            border-radius: 10px;
          }
        }
        .long-trend {
          background: #E6F2FF;
          color: #58A8FF;
        }
        .short-trend {
          background: #FFF1E4;
          color: #FF9D3C;
        }
      }
      .imgs {
        margin-top: 10px;
        overflow: hidden;
        .img-item {
          margin-left: 10px;
          float: left;
          &:nth-child(1) {
            margin-left: 0;
          }
          img {
            width: 60px;
            height: 60px;
            display: block;
          }
        }
      }
      .message {
        margin-top: 12px;
        font-size: 12px;
        color: #888888;
        line-height: 20px;
      }
      .operations {
        margin-top: 30px;
        height: 26px;
        font-size: 12px;
        line-height: 26px;
        overflow: hidden;
        .operation {
          float: left;
          span {
            display: inline-block;
            width: 40px;
            height: 24px;
            border: 1px solid #D5D5D5;
            border-radius: 2px;
            color: #222222;
            text-align: center;
            margin-left: 10px;
            &:first-child {
              margin-left: 0;
              color: #58A8FF;
            }
          }
        }
        .infor {
          float: left;
          margin-left: 30px;
        }
      }
    }
  }
  .el-button--small {
    width: 80px;
    height: 30px;
    padding: 0;
    background: @mainC;
  }
  .medium-button {
    width: 100px;
    height: 30px;
    background: @mainC;
  }
}
</style>
