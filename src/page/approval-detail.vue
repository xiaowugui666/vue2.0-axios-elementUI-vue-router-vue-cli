<template>
  <div style="min-height: 100%;">
    <menu-left routeIndex="9-2"></menu-left>
    <div class="approval-content">
      <div class="approval-header">动态 > 评论审批 > 未审批</div>
      <div class="approval-body">
        <div class="appro-content" v-if="JSON.stringify(content) != '{}'">
          <div>
            <div class="appro-content-title"><span>{{content.title}}</span><span>{{content.created_at}}</span></div>
            <div class="appro-content-messa">
              <p v-html="content.content"></p>
              <span @click="navigateTo">全文 ></span>
            </div>
            <img v-for="(item,index) in content.imgs" :key="index" :src="item.url">
          </div>
          <div class="hr"></div>
          <div class="approvals" v-if="approvals.length">
            <div class="appro-item" v-for="(ite,ind) in approvals" :key="ind">
              <div class="appro-info">
                <p><span>{{ite.nick_name}}</span><span v-if="ite.user">手机号 ： {{ite.user.mobile}}</span></p>
                <p><span>{{ite.updated_at}}</span></p>
                <p>{{ite.content}}</p>
              </div>
              <span class="pass button" @click="changeStatus(2, ite.id)">通过</span>
              <span class="close button" @click="changeStatus(3, ite.id)">关闭</span>
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
          <div class="no-data inner" v-else>暂无未评审评论</div>
        </div>
        <div class="no-data" v-else>暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
import {getTrendDetail, getComments, putComment} from '../axios/api'
export default {
  data () {
    return {
      content: {},
      approvals: [],
      id: this.$route.query.id,
      status: this.$route.query.status,
      totalPagina: 1,
      currentPage: 1
    }
  },
  mounted () {
    // 获取动态详情
    getTrendDetail(this.$route.query.id).then(res => {
      console.log(res)
      this.content = res.data
    })
    this.getFeedComment({})
  },
  methods: {
    // 点击分页
    currentIndex (val) {
      this.getFeedComment({page: val - 1})
    },
    // 获取对应评论列表
    getFeedComment (params) {
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
    },
    // 评论评审
    changeStatus (val, id) {
      let param = {}
      param.feed_id = this.id
      param.status = val
      putComment(param, id).then(res => {
        console.log(res)
        this.getFeedComment({})
        this.$message({
          message: '审批成功',
          type: 'success'
        })
      }).catch(err => {
        console.dir(err)
        this.$message({
          message: '审批评论失败，请稍后重试',
          type: 'error'
        })
      })
    }
  },
  computed: {
  },
  components: {
    menuLeft
  }
}
</script>

<style scoped lang="less">
.approval-content {
  margin-left: 200px;
  margin-right: 20px;
  min-width: 1100px;
  padding-bottom: 20px;
  height: calc(100% - 20px);
  .approval-header {
    padding: 15px 20px;
    font-size: 12px;
    color: #888888;
    line-height: 16px;
  }
  .approval-body {
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
    .no-data.inner {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .appro-content {
      box-sizing: border-box;
      border: 1px solid #D5D5D5;
      padding: 25px 20px 0px;
      font-size: 12px;
      color: #888888;
      line-height: 23px;
      .appro-content-title {
        span:first-child {
          font-size: 18px;
          color: #222222;
          font-weight: bold;
          margin-right: 20px;
        }
      }
      .appro-content-messa {
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
      p {
        margin-top: 10px;
      }
      img {
        vertical-align: middle;
        margin-left: 10px;
        width: 90px;
        height: 60px;
        margin-top: 10px;
        &:nth-child(3) {
          margin-left: 0;
        }
      }
    }
    .hr {
      height: 2px;
      background: #D5D5D5;
      margin-top: 20px;
    }
    .approvals {
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
          width: 90%;
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
        .button {
          display: inline-block;
          width: 80px;
          height: 30px;
          font-size: 12px;
          line-height: 30px;
          text-align: center;
          border-radius: 2px;
          position: absolute;
          user-select: none;
          cursor: pointer;
        }
        .pass {
          border: 1px solid #FA505D;
          color: #FA505D;
          right: 120px;
        }
        .close {
          border: 1px solid #222222;
          color: #222222;
          right: 20px;
        }
      }
    }
  }
}
</style>
