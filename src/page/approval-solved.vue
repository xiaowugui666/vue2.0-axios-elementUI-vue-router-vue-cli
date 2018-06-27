<template>
  <div style="min-height: 100%;">
    <menu-left routeIndex="9-2"></menu-left>
    <div class="solved-content">
      <div class="solved-header">动态 > 评论审批 > {{type == 1 ? '未通过' : '已通过'}}</div>
      <div class="solved-body">
        <div class="solved-container">
          <div class="container-header">
            <img :src="content.img">
            <div class="container-content">
              <p><span class="container-title">{{content.title}}</span><span>{{content.date}}</span></p>
              <div>
                <p class="container-mess">{{content.content}}</p>
                <span>全文 ></span>
              </div>
            </div>
          </div>
          <div class="hr"></div>
          <div class="container-items">
            <div class="appro-item" v-for="(ite,ind) in approvals" :key="ind">
              <img class="avatar" :src="ite.img">
              <div class="appro-info">
                <p><span>{{ite.nickname}}</span><span>手机号 ： {{ite.mobile}}</span></p>
                <p><span>{{ite.date}}</span></p>
                <p>{{ite.content}}</p>
              </div>
              <img class="mark-img" v-if="type == 1" src="../assets/Don't show_label@2x.png">
              <img class="mark-img" v-else src="../assets/not pass_label@2x.png">
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
      content: {
        img: 'http://imgsrc.baidu.com/imgad/pic/item/eaf81a4c510fd9f900630df72f2dd42a2834a43c.jpg',
        title: '智能计算，唤醒万物',
        content: '绵阳千佛山，位于绵阳安州、北川和阿坝茂县交界处，海拔3033m，岷山山脉分支，四川360度观景平台之一，无限风光一览无余。绵阳千佛山，位于绵阳安州、北川和阿坝茂县交界处，海拔3033m，岷山山脉分支，四川360度观景平台之一，无限风光一览无余。绵阳千佛山，位于绵阳安州、北川和阿坝茂县交界处，海拔3033m，岷山山脉分支，四川360度观景平台之一，无限风光一览无余。',
        status: 1,
        date: '2018-12-12   23:23:33'
      },
      approvals: [{
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529995158190&di=bceedad7f7edfcee5d3fff7eef36ff72&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F1b4c510fd9f9d72af17e9109de2a2834349bbb88.jpg',
        nickname: '小明',
        mobile: '123456789101',
        status: 3,
        date: '2017-6-26  23:23:23',
        content: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！'
      }, {
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529995158190&di=bceedad7f7edfcee5d3fff7eef36ff72&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F1b4c510fd9f9d72af17e9109de2a2834349bbb88.jpg',
        nickname: '小明',
        mobile: '123456789101',
        status: 2,
        date: '2017-6-26  23:23:23',
        content: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！'
      }, {
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529995158190&di=bceedad7f7edfcee5d3fff7eef36ff72&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F1b4c510fd9f9d72af17e9109de2a2834349bbb88.jpg',
        nickname: '小明',
        mobile: '123456789101',
        status: 1,
        date: '2017-6-26  23:23:23',
        content: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！',
        replay: '呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵'
      }],
      type: 1
    }
  },
  methods: {
  },
  computed: {
  },
  components: {
    menuLeft
  }
}
</script>

<style scoped lang="less">
.solved-content {
  margin-left: 200px;
  margin-right: 20px;
  min-width: 1100px;
  padding-bottom: 20px;
  height: calc(100% - 20px);
  .solved-header {
    padding: 15px 20px;
    font-size: 12px;
    color: #888888;
    line-height: 16px;
  }
  .solved-body {
    min-width: 1100px;
    background: #ffffff;
    min-height: 90%;
    padding: 20px;
    .solved-container {
      box-sizing: border-box;
      border: 1px solid #D5D5D5;
      padding: 25px 20px 0px;
      font-size: 12px;
      color: #888888;
      line-height: 23px;
      .container-header {
        overflow: hidden;
        display: flex;
        img {
          width: 90px;
          height: 60px;
        }
        .container-content {
          font-size: 12px;
          color: #888888;
          margin-left: 15px;
          vertical-align: bottom;
          flex: 1;
          overflow: hidden;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          >div {
            display: flex;
            p {
              width: 95%;
            }
            span {
              display: inline-block;
              margin-top: 10px;
              color: #58A8FF;
              margin-left: 10px;
            }
          }
          .container-title {
            font-size: 14px;
            color: #222222;
            font-weight: bold;
            margin-right: 20px;
          }
          .container-mess {
            margin-top: 10px;
          }
        }
      }
      .hr {
        height: 2px;
        background: #D5D5D5;
        margin-top: 20px;
      }
      .container-items {
        .appro-item {
          padding: 20px 0;
          border-bottom: 1px dashed #d5d5d5;
          display: flex;
          position: relative;
          &:last-child {
            border-bottom: none;
          }
          .avatar {
            width: 42px;
            height: 42px;
            border-radius: 42px;
            vertical-align: top;
          }
          .appro-info {
            display: inline-block;
            margin-left: 15px;
            font-size: 12px;
            flex: 1;
            overflow: hidden;
            width: 95%;
            >p {
              margin-top: 10px;
              color: #222222;
              &:first-child {
                margin-top: 0;
                span:last-child {
                  color: #888888;
                  margin-left: 20px;
                }
              }
              &:nth-child(2) {
                color: #888888;
              }
            }
          }
          .mark-img {
            width: 58px;
            height: 47px;
            position: absolute;
            right: 42px;
            top: 15px;
          }
        }
      }
    }
  }
}
</style>
