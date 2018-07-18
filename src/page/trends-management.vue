<template>
  <div>
    <menu-left routeIndex="9-1"></menu-left>
    <div class="trends-content">
      <div class="trends-header">
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
      <div class="trends-editor">
        <div>
          <el-button
            class="medium-button"
            size="small"
            @click="dialogVisible = true"
            type="success">发布新动态</el-button>
        </div>
        <div v-if="data.length">
          <div class="trends" v-for="(item,index) in data" :key="index">
            <div class="title">
              <span class="title-txt">{{item.title || item.content}}</span>
              <span :class="{'long-trend': (item.type == 2 ? true : false), 'short-trend': (item.type == 1 ? true : false)}">{{item.type == 2 ? '长动态' : '短动态'}}</span>
            </div>
            <!--<div class="message" v-if="item.type == 1" v-html="item.content"></div>-->
            <div class="message" v-if="item.type == 2">
              <p>{{item.description}}</p>
            </div>
            <div class="imgs" v-if="item.images">
              <div class="img-item" v-for="(ite,ind) in item.images" :key="ind">
                <img :src="yiqixuanDomainUrl + ite.img_url">
              </div>
            </div>
            <div class="thumbnail" v-if="item.type == 2 && item.cover_url">
              <img :src="yiqixuanDomainUrl + item.cover_url">
            </div>
            <div class="operations">
              <div class="operation">
                <span @click="editorTrend(item.id)">编辑</span><span @click="viewTrend(item.id)">查看</span><span @click="deleteTrend(item.id)">删除</span>
              </div>
              <div class="infor">
                <i class="icon-查看"></i><span>{{item.pv_browse}}</span><i class="icon-评论"></i><span>{{item.comment_success_count + item.comment_fail_count}}</span><i class="icon-点赞"></i><span>{{item.pv_vote}}</span>
              </div>
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
import {mapState} from 'vuex'
import {getTrends, deleteTrend} from '../axios/api'
export default {
  data () {
    return {
      keyTime: [],
      keyWord: '',
      data: [],
      dialogVisible: false,
      shortSele: true,
      totalPagina: 1,
      currentPage: 1
    }
  },
  mounted () {
    this.getTrends()
  },
  methods: {
    // 点击分页
    currentIndex (val) {
      this.getTrends({page: val - 1})
    },
    // 点击搜索
    search () {
      let params = {}
      if (this.keyTime && this.keyTime.length > 0) {
        let dateBegin = new Date(this.keyTime[0])
        let dateEnd = new Date(this.keyTime[1])
        params.begin_at = dateBegin.getFullYear() + '-' + (dateBegin.getMonth() + 1) + '-' + dateBegin.getDate()
        params.end_at = dateEnd.getFullYear() + '-' + (dateEnd.getMonth() + 1) + '-' + dateEnd.getDate()
      }
      getTrends(params).then(res => {
        this.$message.success('获取数据成功！')
        this.data = res.data
      }).catch()
    },
    // 编辑动态
    editorTrend (val) {
      this.$router.push({name: 'addTrends', query: {id: val}})
    },
    // 查看动态
    viewTrend (val) {
      this.$router.push({name: 'viewTrends', query: {id: val}})
    },
    // 删除动态
    deleteTrend (val) {
      this.$confirm('确定删除该条动态？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTrend(val).then(res => {
          // 重新请求动态列表数据
          this.getTrends()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    },
    changeTime (value) {
    },
    // 请求动态列表数据
    getTrends (params) {
      getTrends(params).then(res => {
        this.data = res.data
        this.totalPagina = res.headers.page_count
      }).catch()
    },
    // 模态框点击确定
    dialogComfirm () {
      this.dialogVisible = false
      this.$router.push({name: 'addTrends', query: {type: this.shortSele ? 1 : 2}})
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
  margin: 0 20px 20px 200px;
  padding-top: 20px;
  position: relative;
  .icon-查看[data-v-278dd273]:before {
    content: "\E905";
    color: #000;
    font-size: 18px;
  }
  .icon-评论[data-v-278dd273]:before {
    content: "\E901";
    color: #000;
    font-size: 18px;
  }
  .icon-点赞[data-v-278dd273]:before {
    content: "\E903";
    color: #000;
    font-size: 20px;
  }
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
    .no-data {
      height: 50px;
      text-align: center;
      color: @b8;
      font-size: 12px;
      margin-top: 20px;
      line-height: 50px;
    }
    .trends {
      border: 1px solid #EAEAEA;
      margin-top: 20px;
      padding: 20px;
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
          vertical-align: middle;
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
        .title-txt {
          max-width: 500px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
      .thumbnail {
        img {
          width: 60px;
          height: 60px;
          display: block;
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
        max-height: 280px;
        overflow: hidden;
        word-wrap: break-word;
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
            line-height: 24px;
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
