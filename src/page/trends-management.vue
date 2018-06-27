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
            @click="dialogVisible = true"
            type="success">发布新动态</el-button>
        </div>
        <div class="trends" v-for="(item,index) in data" :key="index">
          <div class="title">
            <span>{{item.title}}</span>
            <span :class="{'long-trend': (item.type == 1 ? true : false), 'short-trend': (item.type == 2 ? true : false)}">{{item.type == 1 ? '长动态' : '短动态'}}</span>
          </div>
          <div class="message">{{item.body}}</div>
          <div class="imgs" v-if="item.imgs">
            <div class="img-item" v-for="(ite,ind) in item.imgs" :key="ind">
              <img :src="ite.url">
            </div>
          </div>
          <div class="operations">
            <div class="operation">
              <span @click="editorTrend(item,index)">编辑</span><span @click="viewTrend(item,index)">查看</span><span @click="deleteTrend(item,index)">删除</span>
            </div>
            <div class="infor">
              <i class="icon-查看"></i><span>9999</span><i class="icon-评论"></i><span>10.8W+</span><i class="icon-转发"></i><span>1.6W+</span><i class="icon-点赞"></i><span>9999</span>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog" v-if="dialogVisible">
        <el-dialog
          title="发布新动态"
          :visible.sync="dialogVisible"
          width="600">
          <hr style="color: #EFEFEF;border: 1px solid #EFEFEF;border-bottom: 0;"/>
          <div class="dia-trends">
            <div :class="{'dia-short': true,'active': shortSele}" @click="shortSele = true">短动态</div>
            <div :class="{'dia-long': true,'active': !shortSele}" @click="shortSele = false">长动态</div>
          </div>
          <p class="explain-title">什么是短动态？长动态？</p>
          <p class="explain-messa">短动态：类似于微博+朋友圈的结合，最大支持140个字的文字编辑+最多9张配图的动态展示；<br>长动态：更适合发布详细的商品资讯，图文搭配没有最大上限，也可添加微信支持的外部URL链接。</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogComfirm" size="small" type="success">确定</el-button>
            <el-button class="return-button" @click="dialogVisible = false" size="small">返回</el-button>
          </span>
        </el-dialog>
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
      }],
      dialogVisible: false,
      shortSele: true
    }
  },
  methods: {
    // 编辑动态
    editorTrend (item, val) {
      console.log(val)
      this.$router.push({name: 'addTrends', query: {id: val, type: 1}})
    },
    // 查看动态
    viewTrend (item, val) {
      this.$router.push({name: 'viewTrends', query: {id: val}})
    },
    // 删除动态
    deleteTrend (item, val) {
      console.log(val)
    },
    changeTime (value) {
      console.log(value)
      console.log(1111)
    },
    dialogComfirm () {
      this.dialogVisible = false
      this.$router.push({name: 'addTrends', query: {type: this.shortSele ? 1 : 2}})
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
  .el-dialog {
    width: 600px;
  }
}
</style>
<style scoped lang="less">
@import '../fonts/icomoon.css';
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
          user-select: none;
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
            user-select: none;
            cursor: pointer;
            &:first-child {
              margin-left: 0;
              color: #58A8FF;
            }
          }
        }
        .infor {
          float: left;
          margin-left: 30px;
          display: flex;
          align-items: center;
          color: #888888;
          user-select: none;
          i {
            font-size: 14px;
            margin-right: 2px;
          }
          span {
            margin-right: 12px;
          }
        }
      }
    }
  }
  .dialog {
    .dia-trends {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      user-select: none;
      >div {
        height: 50px;
        width: 150px;
        line-height: 50px;
        text-align: center;
        border: 1px solid #D5D5D5;
        font-size: 14px;
        color: #888888;
        border-radius: 4px;
        cursor: pointer;
        &:last-child {
          margin-left: 50px;
        }
      }
      div.active {
        color: #FA505D;
        border: 1px solid #FA505D;
      }
    }
    .explain-title {
      margin-top: 40px;
      font-size: 12px;
      color: #222222;
      line-height: 16px;
    }
    .explain-messa {
      margin-top: 10px;
      font-size: 12px;
      color: #888888;
      line-height: 22px;
    }
    .return-button {
      background: white;
      border: 1px solid #333333;
      border-radius: 2px;
      color: #333333;
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
