<template>
  <div style="height: 100%;">
    <menu-left routeIndex="9-1"></menu-left>
    <div class="view-trends-content">
      <div class="view-header">动态管理 > 新增/编辑动态</div>
      <div class="view-body">
        <div class="view-title"><span></span><span>内容编辑</span></div>
        <div class="hr"></div>
        <div class="view-content">
          <span class="pre-text">内      容 ：</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
        </div>
        <div class="view-imgs">
          <span class="pre-text">配      图 ：</span>
          <img v-for="(item,index) in imgs" :key="index" :src="item">
        </div>
        <div class="view-title approval"><span></span><span>评论</span><span>( 88888 )</span></div>
        <div class="hr appro-hr"></div>
        <div class="approvals">
          <div class="appro-item" v-for="(ite,ind) in approvals" :key="ind">
            <img class="avatar" :src="ite.img">
            <div class="appro-info">
              <p><span>{{ite.nickname}}</span><span>手机号 ： {{ite.mobile}}</span></p>
              <p><span>{{ite.date}}</span></p>
              <p>{{ite.content}}</p>
              <el-input
                v-if="isReplay"
                placeholder="巴拉巴拉巴拉"></el-input>
              <div class="replay" v-if="ite.replay">
                <span>店家回复：</span>
                <div>
                  <p>{{ite.replay}}</p>
                  <p>{{ite.date}}</p>
                </div>
              </div>
            </div>
            <img class="mark-img" v-if="ite.status == 3" src="../assets/Don't show_label@2x.png">
            <el-button class="replay-button" v-if="ite.status == 2" type="primary" size="small" @click="isReplay = !isReplay">回复</el-button>
          </div>
        </div>
        <el-pagination
          v-if="totalPagina != 0"
          background
          :page-size="15"
          :page-count="6"
          :current-page="currentPage"
          style="padding-top: 20px;"
          prev-text="< 上一页"
          next-text="下一页 >"
          layout="prev, pager, next"
          @current-change="currentIndex"
          :total="30">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
export default {
  data () {
    return {
      imgs: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529994182978&di=08da2f8ad2073f864b4dbecb116e2b65&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F151006%2F14-151006114S1135.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529994182978&di=08da2f8ad2073f864b4dbecb116e2b65&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F151006%2F14-151006114S1135.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529994182978&di=08da2f8ad2073f864b4dbecb116e2b65&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F151006%2F14-151006114S1135.jpg'],
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
      // 是否点击回复
      isReplay: false,
      // 当前页数
      currentPage: 1
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
  .view-trends-content {
    .el-input__inner {
      border-radius: 2px;
      border: 1px solid #d5d5d5;
      height: 40px;
      padding-left: 15px;
      font-size: 12px;
      color: #888888;
      line-height: 20px;
      margin-top: 15px;
    }
  }
</style>
<style scoped lang="less">
  .view-trends-content {
    margin-left: 200px;
    margin-right: 20px;
    min-width: 1100px;
    height: 100%;
    .view-header {
      padding: 15px 20px;
      font-size: 12px;
      color: #888888;
      line-height: 16px;
    }
    .view-body {
      min-width: 1100px;
      background: #ffffff;
      height: auto;
      min-height: 88%;
      padding: 20px;
      .view-title {
        font-size: 14px;
        color: #222222;
        line-height: 17px;
        span:first-child::before {
          content: '';
          width: 3px;
          height: 13px;
          background: #FA505D;
          display: inline-block;
          vertical-align: middle;
          margin-top: -1px;
          margin-right: 10px;
        }
      }
      .hr {
        height: 2px;
        background: #D5D5D5;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .appro-hr {
        margin-bottom: 0;
      }
      .view-content {
        p {
          display: inline-block;
          width: 94%;
          font-size: 12px;
          color: #222222;
          line-height: 20px;
        }
      }
      .view-imgs {
        margin-top: 20px;
        img {
          vertical-align: middle;
          width: 80px;
          height: 80px;
          margin-right: 10px;
        }
      }
      .approvals {
        padding-right: 10px;
        .appro-item {
          padding: 20px 0;
          border-bottom: 1px dashed #d5d5d5;
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
            .replay {
              margin-top: 20px;
              background: #F5F5F5;
              padding: 20px 15px;
              position: relative;
              >span {
                color: #58A8FF;
                vertical-align: top;
              }
              div {
                display: inline-block;
                width: 95%;
                p {
                  &:last-child {
                    color: #888888;
                    margin-top: 5px;
                  }
                }
              }
            }
            .replay::before {
              position: absolute;
              top: -9px;
              left: 90px;
              content: '';
              border-left: 10px solid transparent;
              border-right: 10px solid transparent;
              border-bottom: 10px solid #F5F5F5;
            }
          }
          .mark-img {
            width: 58px;
            height: 47px;
            position: absolute;
            right: 42px;
            top: 15px;
          }
          .replay-button {
            position: absolute;
            right: 42px;
            top: 15px;
            width: 80px;
            height: 30px;
            z-index: 10;
          }
        }
      }
      .pre-text {
        font-size: 12px;
        display: inline-block;
        padding-top: 5px;
        color: #3A3A3A;
        text-align: right;
        line-height: 15px;
        vertical-align: top;
        white-space:pre;
        margin-right: 9px;
      }
      .approval {
        margin-top: 40px;
        span:last-child {
          margin-left: 10px;
          font-size: 12px;
          color: #888888;
          white-space:pre;
          letter-spacing: 0.5px;
        }
      }
    }
  }
</style>
