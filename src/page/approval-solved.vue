<template>
  <div style="min-height: 100%;">
    <menu-left routeIndex="9-2"></menu-left>
    <div class="solved-content">
      <div class="solved-header">动态 > 评论审批 > {{status == 3 ? '未通过' : '已通过'}}</div>
      <div class="solved-body">
        <div class="solved-container">
          <div class="container-header" v-if="JSON.stringify(content) != '{}'">
            <img :src="yiqixuanDomainUrl + content.cover_url">
            <div class="container-content">
              <p><span class="container-title">{{content.title}}</span><span>{{content.date}}</span></p>
              <div>
                <p class="container-mess">{{content.content}}</p>
                <span @click="navigateTo">全文 ></span>
              </div>
            </div>
          </div>
          <div class="no-data" v-else>请求动态数据失败</div>
          <div class="hr"></div>
          <div class="container-items" v-if="approvals.length">
            <div class="appro-item" v-for="(ite,ind) in approvals" :key="ind">
              <div class="appro-info">
                <p><span>{{ite.nick_name}}</span><span>手机号 ： {{ite.user.mobile}}</span></p>
                <p><span>{{ite.updated_at}}</span></p>
                <p>{{ite.content}}</p>
              </div>
              <img class="mark-img" v-if="status == 2" src="../assets/pass_label@2x.png">
              <img class="mark-img" v-else src="../assets/not pass_label@2x.png">
            </div>
            <el-pagination
              v-if="totalPagina != 0"
              background
              :page-size="15"
              :page-count="6"
              :current-page="currentPage"
              style="padding-top: 20px;padding-bottom: 20px;"
              prev-text="< 上一页"
              next-text="下一页 >"
              layout="prev, pager, next"
              @current-change="currentIndex"
              :total="totalPagina * 15">
            </el-pagination>
          </div>
          <div class="no-data bottom" v-else>暂无评论数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
import {mapState} from 'vuex'
import {getTrendDetail, getComments} from '../axios/api'
export default {
  data () {
    return {
      content: {},
      approvals: [],
      status: this.$route.query.status,
      // 动态id
      id: this.$route.query.id,
      totalPagina: 1,
      currentPage: 1
    }
  },
  mounted () {
    // 获取动态详情
    getTrendDetail(this.id).then(res => {
      console.log(res)
      this.content = res.data
    })
    this.getComments({})
  },
  methods: {
    // 点击分页
    currentIndex (val) {
      this.getFeedComment({page: val - 1})
    },
    // 获取评论详情
    getComments (params) {
      params.feed_id = this.id
      params.status = this.status
      getComments(params).then(res => {
        console.log(res)
        this.approvals = res.data
        this.totalPagina = res.headers.page_count
      })
    },
    // 跳转动态详情
    navigateTo () {
      this.$router.push({name: 'viewTrends', query: {id: this.id}})
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
    .no-data {
      height: 50px;
      border: 1px solid #d5d5d5;
      text-align: center;
      color: #222222;
      line-height: 50px;
    }
    .no-data.bottom {
      margin: 20px 0;
    }
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
              max-width: 95%;
            }
            span {
              display: inline-block;
              margin-top: 10px;
              color: #58A8FF;
              margin-left: 10px;
              cursor: pointer;
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
