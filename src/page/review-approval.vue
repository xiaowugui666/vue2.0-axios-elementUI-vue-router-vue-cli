<template>
  <div style="min-height: 100%;">
    <menu-left routeIndex="9-2"></menu-left>
    <div class="review-content">
      <div class="review-header">
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
      <div class="review-body">
        <ul class="review-status">
          <li :class="{'active':reviewStatu == 1}" @click="changState(1)">未审批</li>
          <li :class="{'active':reviewStatu == 2}" @click="changState(2)">已通过</li>
          <li :class="{'active':reviewStatu == 3}" @click="changState(3)">未通过</li>
        </ul>
        <div class="review-items">
          <div class="review-item" v-for="(item,index) in items" :key="index">
            <img :src="item.img" v-if="item.img">
            <span class="item-point" v-else></span>
            <div class="item-content" :style="{'margin-left':(item.img ? '15px' : '25px')}">
              <p><span class="title">{{item.title}}</span><span>{{item.date}}</span></p>
              <p class="content-mess" v-if="item.img">{{item.content}}</p>
            </div>
            <div :class="{'item-status': true, 'active-statu': (item.status == 1 ? true : false)}">{{item.status == 1 ? '未审批' : (item.status == 2 ? '已通过' : '未通过')}}</div>
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
      reviewStatu: 1,
      items: [{
        img: 'http://imgsrc.baidu.com/imgad/pic/item/eaf81a4c510fd9f900630df72f2dd42a2834a43c.jpg',
        title: '智能计算，唤醒万物',
        content: '绵阳千佛山，位于绵阳安州、北川和阿坝茂县交界处，海拔3033m，岷山山脉分支，四川360度观景平台之一，无限风光一览无余。绵阳千佛山，位于绵阳安州、北川和阿坝茂县交界处，海拔3033m，岷山山脉分支，四川360度观景平台之一，无限风光一览无余。绵阳千佛山，位于绵阳安州、北川和阿坝茂县交界处，海拔3033m，岷山山脉分支，四川360度观景平台之一，无限风光一览无余。',
        status: 1,
        date: '2018-12-12   23:23:33'
      }, {
        img: 'http://imgsrc.baidu.com/imgad/pic/item/eaf81a4c510fd9f900630df72f2dd42a2834a43c.jpg',
        title: '智能计算，唤醒万物',
        content: '绵阳千佛山，位于绵阳安州、北川和阿坝茂县交界处，海拔3033m，岷山山脉分支，四川360度观景平台之一，无限风光一览无余。绵阳千佛山，位于绵阳安州、北川和阿坝茂县交界处，海拔3033m，岷山山脉分支，四川360度观景平台之一，无限风光一览无余。绵阳千佛山，位于绵阳安州、北川和阿坝茂县交界处，海拔3033m，岷山山脉分支，四川360度观景平台之一，无限风光一览无余。',
        status: 2,
        date: '2018-12-12   23:23:33'
      }, {
        img: '',
        title: '智能计算，唤醒万物',
        content: '绵阳千佛山，位于绵阳安州、北川和阿坝茂县交界处，海拔3033m，岷山山脉分支，四川360度观景平台之一，无限风光一览无余。绵阳千佛山，位于绵阳安州、北川和阿坝茂县交界处，海拔3033m，岷山山脉分支，四川360度观景平台之一，无限风光一览无余。绵阳千佛山，位于绵阳安州、北川和阿坝茂县交界处，海拔3033m，岷山山脉分支，四川360度观景平台之一，无限风光一览无余。',
        status: 2,
        date: '2018-12-12   23:23:33'
      }, {
        img: '',
        title: '智能计算，唤醒万物',
        content: '绵阳千佛山，位于绵阳安州、北川和阿坝茂县交界处，海拔3033m，岷山山脉分支，四川360度观景平台之一，无限风光一览无余。绵阳千佛山，位于绵阳安州、北川和阿坝茂县交界处，海拔3033m，岷山山脉分支，四川360度观景平台之一，无限风光一览无余。绵阳千佛山，位于绵阳安州、北川和阿坝茂县交界处，海拔3033m，岷山山脉分支，四川360度观景平台之一，无限风光一览无余。',
        status: 3,
        date: '2018-12-12   23:23:33'
      }]
    }
  },
  methods: {
    changeTime () {
    },
    changState (val) {
      this.reviewStatu = val
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
  .review-content{
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
    .el-button--small {
      width: 80px;
      height: 30px;
      padding: 0;
      background: @mainC;
    }
  }
</style>
<style scoped lang="less">
.review-content {
  min-width: 1000px;
  margin: 0 20px 0 200px;
  padding-top: 20px;
  position: relative;
  height: 95%;
  .review-header {
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
  }
  .review-body {
    margin-top: 20px;
    background: #FFFFFF;
    min-height: 85%;
    .review-status {
      display: flex;
      height: 40px;
      font-size: 16px;
      color: #222222;
      line-height: 40px;
      border-bottom: 1px solid #d5d5d5;
      user-select: none;
      li {
        margin: 0 45px;
        cursor: pointer;
      }
      .active {
        color: #FA505D;
        border-bottom: 3px solid #FA505D;
      }
    }
    .review-items {
      padding: 20px;
      .review-item {
        overflow: hidden;
        border: 1px solid #D5D5D5;
        padding: 20px;
        margin-top: 20px;
        position: relative;
        &:first-child {
          margin-top: 0;
        }
        img {
          float: left;
          width: 90px;
          height: 60px;
        }
        div {
          float: left;
        }
        .item-point {
          position: absolute;
          top: 50%;
          margin-top: -4px;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 8px;
          background: #FA505D;
        }
        .item-content {
          width: 80%;
          font-size: 12px;
          color: #888888;
          vertical-align: bottom;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .title {
            font-size: 16px;
            color: #222222;
            font-weight: bold;
            margin-right: 20px;
          }
          .content-mess {
            margin-top: 10px;
          }
        }
        .item-status {
          position: absolute;
          width: 110px;
          height: 24px;
          border: 1px solid #222222;
          text-align: center;
          line-height: 24px;
          color: #222222;
          font-size: 12px;
          right: 21px;
          top: 50%;
          margin-top: -12px;
          user-select: none;
          cursor: pointer;
        }
        .item-status.active-statu {
          color: #FA505D;
          border: 1px solid #FA505D;
        }
      }
    }
  }
}
</style>
