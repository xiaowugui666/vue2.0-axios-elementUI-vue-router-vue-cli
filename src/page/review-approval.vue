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
          @click="search"
          size="small">搜索</el-button>
      </div>
      <div class="review-body">
        <ul class="review-status">
          <li :class="{'active':reviewStatu == 1}" @click="changState(1)">未审批<span v-if="reviewStatu == 1 && tabCount"> ( {{tabCount}} ) </span></li>
          <li :class="{'active':reviewStatu == 2}" @click="changState(2)">已通过<span v-if="reviewStatu == 2 && tabCount"> ( {{tabCount}} ) </span></li>
          <li :class="{'active':reviewStatu == 3}" @click="changState(3)">未通过<span v-if="reviewStatu == 3 && tabCount"> ( {{tabCount}} ) </span></li>
        </ul>
        <div v-if="items.length" class="review-items">
          <div class="review-item" v-for="(item,index) in items" :key="index">
            <img :src="yiqixuanDomainUrl + item.cover_url" v-if="item.cover_url">
            <span class="item-point" v-else></span>
            <div class="item-content">
              <p v-if="item.title"><span class="title">{{item.title}}</span><span>{{item.created_at}}</span></p>
              <p class="content-mess" v-if="item.type==2">{{item.description}}</p>
              <p class="content-short-dynamic" v-else><span class="content-short-dynamic-txt">{{item.content}}</span><span class="short-dynamic-time">{{item.created_at}}</span></p>
            </div>
            <div :class="{'item-status': true, 'active-statu': (reviewStatu == 1 ? true : false)}" @click="itemDetail(item.id)">
              {{reviewStatu == 1 ? '未审批' : (reviewStatu == 2 ? '已通过' : '未通过')}}
              <span>( {{reviewStatu == 1 ? item.comment_rank_count : (reviewStatu == 2 ? item.comment_success_count : item.comment_fail_count)}} )</span>
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
            :total="totalPagina * 15">
          </el-pagination>
        </div>
        <div v-else class="no-data">
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
import {getFeedComment} from '../axios/api'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      keyTime: [],
      reviewStatu: 1,
      items: [],
      tabCount: 0,
      searchObj: {},
      totalPagina: 1,
      currentPage: 1
    }
  },
  mounted () {
    let params = {}
    params.status = this.reviewStatu
    this.getFeedComment(params)
  },
  methods: {
    // 点击分页
    currentIndex (val) {
      this.getFeedComment({status: this.reviewStatu, page: val - 1})
    },
    // 点击搜索
    search () {
      let dateBegin = new Date(this.keyTime[0])
      let dateEnd = new Date(this.keyTime[1])
      this.searchObj.begin_at = dateBegin.getFullYear() + '-' + (dateBegin.getMonth() + 1) + '-' + dateBegin.getDate()
      this.searchObj.end_at = dateEnd.getFullYear() + '-' + (dateEnd.getMonth() + 1) + '-' + dateEnd.getDate()
      let params = {}
      if (this.keyTime && this.keyTime.length > 0) {
        params = this.searchObj
      }
      params.status = this.reviewStatu
      getFeedComment(params).then(res => {
        this.$message.success('获取数据成功！')
        if (res.data.length > 0) {
          this.items = res.data.data
          this.tabCount = res.data.tab_count
        }
      })
    },
    // 点击查看动态详情
    itemDetail (id) {
      if (this.reviewStatu == 1) {
        this.$router.push({name: 'approvalDetail', query: {id: id, status: 1}})
      } else {
        this.$router.push({name: 'approvalSolved', query: {id: id, status: this.reviewStatu}})
      }
    },
    changeTime () {
    },
    // 查看不同评论状态
    changState (val) {
      this.tabCount = 0
      this.getFeedComment({status: val})
      this.reviewStatu = val
    },
    // 获取列表数据
    getFeedComment (params) {
      getFeedComment(params).then(res => {
        this.items = res.data
        this.tabCount = res.headers.data_count
        this.totalPagina = res.headers.page_count
        // this.tabCount = res.headers.
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
  min-width: 1100px;
  margin: 0 20px 0 200px;
  padding-top: 20px;
  position: relative;
  height: 95%;
  .review-header {
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
    overflow: hidden;
    .no-data {
      margin: 20px;
      height: 50px;
      text-align: center;
      color: @b8;
      font-size: 12px;
      line-height: 50px;
    }
    .review-status {
      display: flex;
      height: 40px;
      font-size: 14px;
      color: #222222;
      line-height: 40px;
      border-bottom: 1px solid @bg;
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
      font-size: 0;
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
          display: inline-block;
          vertical-align: middle;
          width: 90px;
          height: 60px;
          margin-right: 20px;
        }
        div {
          display: inline-block;
          vertical-align: middle;
        }
        .item-point {
          display: inline-block;
          vertical-align: middle;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: @mainC;
          margin-right: 10px;
        }
        .item-content {
          width: 75%;
          font-size: 12px;
          color: #888888;
          .fontEllipsis() {
            max-width: 600px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span {
            display: inline-block;
            vertical-align: middle;
          }
          .title {
            .fontEllipsis();
            font-size: 14px;
            color: #222222;
            font-weight: bold;
            margin-right: 20px;
          }
          .content-mess {
            .fontEllipsis();
            margin-top: 10px;
          }
          .content-short-dynamic {
            display: inline-block;
            vertical-align: middle;
            .content-short-dynamic-txt {
              .fontEllipsis();
              color: @b2;
              font-weight: bold;
              font-size: 14px;
            }
            .short-dynamic-time {
              margin-left: 20px;
              font-size: 12px;
              color: @b8;
            }
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
          background: #ffffff;
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
