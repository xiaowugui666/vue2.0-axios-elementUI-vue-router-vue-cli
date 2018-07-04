<template>
  <div style="height: 100%;">
    <menu-left routeIndex="9-1"></menu-left>
    <div class="view-trends-content">
      <div class="view-header">动态管理 > 查看动态</div>
      <div class="view-body">
        <div class="view-title"><span></span><span>内容编辑</span></div>
        <div class="hr"></div>
        <div class="view-mess-title" v-if="trendType == 2">
          <span class="pre-text">标      题 ：</span>
          <p>{{trendData.title}}</p>
        </div>
        <div class="view-content">
          <span class="pre-text">内      容 ：</span>
          <div>
            <p v-html="trendData.content"></p>
            <p v-if="trendType == 2">修改时间： {{trendData.updated_at}}</p>
          </div>
        </div>
        <div class="view-imgs" v-if="trendType == 1">
          <span class="pre-text">配      图 ：</span>
          <img v-for="(item,index) in trendData.images" :key="index" :src="yiqixuanDomainUrl + item.img_url">
        </div>
        <div class="view-title approval"><span></span><span>评论</span><span v-if="commentData.length">( {{trendData.comment_success_count + trendData.comment_fail_count}} )</span></div>
        <div class="hr appro-hr"></div>
        <div class="approvals" v-if="commentData.length">
          <div class="appro-item" v-for="(ite,ind) in commentData" :key="ind">
            <div class="appro-info">
              <p><span>{{ite.nick_name}}</span><span v-if="ite.user">手机号 ： {{ite.user.mobile}}</span></p>
              <p><span>{{ite.created_at}}</span></p>
              <p>{{ite.content}}</p>
              <!-- v-if判断条件须改动 -->
              <div v-if="isReplay && ite.id == clickIndex">
                <el-input :placeholder="'回复：'+ite.nick_name" v-model="content" ref="replyinput"></el-input>
                <el-button class="replaying-button" type="primary" size="small" @click="clickSave(ite.id)">回复</el-button>
              </div>
              <div class="replay" v-if="ite.reply">
                <span>店家回复：</span>
                <div>
                  <p>{{ite.reply.content}}</p>
                  <p>{{ite.reply.created_at}}</p>
                </div>
              </div>
            </div>
            <img class="mark-img" v-if="ite.status == 3" src="../assets/Don't show_label@2x.png">
            <el-button class="replay-button" v-if="ite.status == 2 && !isReplay && !ite.reply" type="primary" size="small" @click="clickSaveChang(ite.id)">回复</el-button>
          </div>
        </div>
        <div class="no-data" v-else>暂无数据</div>
        <el-pagination
          background
          :page-size="15"
          :page-count="6"
          v-if="commentData.length"
          :current-page="currentPage"
          style="padding-top: 20px;"
          prev-text="< 上一页"
          next-text="下一页 >"
          layout="prev, pager, next"
          @current-change="currentIndex"
          :total="totalPagina * 15">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
import {getTrendDetail, getComments, postComment} from '../axios/api'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      trendType: '',
      imgs: [],
      approvals: [],
      // 是否点击回复
      isReplay: false,
      // 点击回复时当前index：拿到数据时改为id判断
      clickIndex: 0,
      totalPagina: 0,
      // 当前页数
      currentPage: 1,
      // 动态数据
      trendData: {},
      // 回复内容
      content: '',
      // 评论数据
      commentData: []
    }
  },
  mounted () {
    // 获取动态数据
    getTrendDetail(this.$route.query.id).then(res => {
      // 赋值
      this.trendData = res.data
      this.trendType = res.data.type
    })
    this.getFeedComments({feed_id: this.$route.query.id})
  },
  methods: {
    // 点击分页
    currentIndex (val) {
      let params = {}
      params.feed_id = this.$route.query.id
      params.page = val - 1
      this.getFeedComments(params)
    },
    // 点击回复，仅改变视图
    clickSaveChang (val) {
      this.clickIndex = val
      this.isReplay = true
      this.$nextTick(_ => {
        this.$refs.replyinput[0].$refs.input.focus()
      })
    },
    // 点击回复
    clickSave (val) {
      this.clickIndex = val
      if (this.content) {
        let params = {}
        params.id = val
        params.feed_id = this.$route.query.id
        params.content = this.content
        postComment(params).then(res => {
          if (res.status == 200) {
            this.getFeedComments({feed_id: this.$route.query.id})
            this.content = ''
            this.isReplay = !this.isReplay
          }
        })
      } else {
        this.isReplay = !this.isReplay
      }
    },
    // 获取评论列表
    getFeedComments (params) {
      getComments(params).then(res => {
        this.commentData = res.data
        this.totalPagina = res.headers.page_count
      })
    }
  },
  computed: {
    ...mapState(['yiqixuanDomainUrl'])
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
      color: #222;
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
      .no-data {
        margin-top: 20px;
        height: 50px;
        text-align: center;
        color: @b8;
        font-size: 12px;
        line-height: 50px;
      }
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
        background: @bg;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .appro-hr {
        margin-bottom: 0;
      }
      .view-content, .view-mess-title {
        display: flex;
        div, >p {
          display: inline-block;
          vertical-align: middle;
          width: 94%;
          font-size: 12px;
          flex: 1;
          overflow: hidden;
          color: #222222;
        }
        >div>p:nth-child(2) {
          color: #888888;
          margin-top: 10px;
        }
      }
      .view-mess-title {
        margin-bottom: 20px;
        word-wrap: break-word;
        p {
          font-size: 14px;
          font-weight: bold;
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
            .replay {
              margin-top: 20px;
              background: #F5F5F5;
              padding: 20px 15px;
              display: flex;
              position: relative;
              >span {
                color: #58A8FF;
                vertical-align: top;
              }
              div {
                flex: 1;
                overflow: hidden;
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
            .replaying-button {
              width: 80px;
              height: 30px;
              float: right;
              margin-top: 20px;
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
        vertical-align: middle;
        color: #3A3A3A;
        text-align: right;
        white-space:pre;
        margin-right: 9px;
      }
      .approval {
        margin-top: 40px;
      }
    }
  }
</style>
