<template>
  <div>
    <menu-left routeIndex="8-4"></menu-left>
    <div class="mp-setting-object content-box">
      <div class="mp-setting-content">
        <!--<div class="mp-setting-module plate">-->
          <!--<div class="plate-top">小程序设置</div>-->
          <!--<p>-->
            <!--<span class="">小程序名称：</span>-->
            <!--<span>{{mpaName}}</span>-->
          <!--</p>-->
          <!--<p>-->
            <!--<span>小程序ID：</span>-->
            <!--<span>{{mpaId}}</span>-->
          <!--</p>-->
          <!--<el-button type="success" size="small" @click="dialogVisible = true">解除绑定</el-button>-->
        <!--</div>-->
        <div class="experience-setting plate">
          <div class="plate-top">小程序体验设置</div>
          <el-button @click="setWechat()" class="add-experience-users" type="success" size="small">添加</el-button>
          <div class="experience-setting-table">
            <el-table
              :data="experienceUsersList"
              border
              show-overflow-tooltip>
              <el-table-column
                prop="wechat_id"
                label="用户微信号">
              </el-table-column>
              <el-table-column
                prop="created_at"
                label="添加时间">
              </el-table-column>
              <el-table-column
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button @click="deleteWechat(scope.row.id, scope.row.wechat_id)" type="text">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="paging-box" v-if="experienceUsersList.length>0">
              <el-pagination
                background
                prev-text="< 上一页"
                :page-size="1"
                next-text="下一页 >"
                :current-page="page+1"
                @current-change="changePage"
                layout="prev, pager, next"
                :total="totalPage">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div class="QR-code">
        <el-popover
          placement="left"
          width="200"
          trigger="hover">
          <div class="code">
            <span>店铺预览码</span>
            <img :src="yiqixuanDomainUrl+mpaQRUrl" />
            <span>微信扫描预览店铺</span>
          </div>
          <el-button slot="reference">小<br>程<br>序<br>预<br>览<br></el-button>
        </el-popover>
      </div>

      <!--<div class="unbind-dialog">
        <el-dialog
          title="解除绑定"
          :visible.sync="dialogVisible"
          width="40%">
          <div>
            <p>解绑后，您将无权管理该店铺，但店铺数据将会保留。确定解绑以下小程序？</p>
            <div>
              <span class="mp-name">{{mpaName}}</span>
              <span>APPID：{{mpaId}}</span>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button @click="untieBtn" size="small" type="success">确 定</el-button>
          </span>
        </el-dialog>
      </div>-->
    </div>
  </div>
</template>

<script>
import {mpaExperience, getQRCode} from '../axios/api'
import menuLeft from '@/components/menu-left'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      dialogVisible: false,
      mpaName: '',
      mpaId: '',
      mpaQRUrl: '',
      experienceUsersList: [],
      totalPage: 1,
      page: 0
    }
  },
  created () {
    // this.getMpInfo()
    this.getMpaExperience()
    this.getMpQRCode()
  },
  methods: {
    // // 获取小程序信息
    // getMpInfo () {
    //   mpInfo().then(res => {
    //     console.log(res.data)
    //     this.mpaName = res.data.nickName
    //     this.mpaId = res.data.authorizerAppId
    //   })
    // },
    // // 解绑小程序
    // untieBtn () {
    //   untieMp().then(res => {
    //     console.log(res)
    //   }).catch(err => {
    //     console.dir(err.request, '失败')
    //   })
    // },
    getMpQRCode () {
      getQRCode().then(res => {
        this.mpaQRUrl = res.data.code_url
      })
    },
    // 添加体验用户的微信号
    // 获取体验用户列表
    getMpaExperience () {
      mpaExperience('get', {page: this.page}).then(res => {
        this.totalPage = parseInt(res.headers.page_count)
        this.experienceUsersList = res.data
      })
    },
    // 添加体验用户
    setWechat () {
      this.$prompt('微信号：', '添加体验用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
        inputErrorMessage: '微信号格式错误！'
      }).then(({ value }) => {
        // 添加小程序体验者
        mpaExperience('post', {wechat_id: value}).then(res => {
          console.log(res.data)
          // this.experienceUsersList.unshift(obj)
          this.page = 0
          this.getMpaExperience()
        }).catch(err => {
          this.$message.error(err.response.data.message)
        })
      })
    },
    // 是否删除这个体验账号
    deleteWechat (id, wid) {
      this.$confirm(`确认删除此账号的体验权限？`, '确认操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        mpaExperience('delete', {id: id, wechat_id: wid}).then(res => {
          console.log(res.data)
          this.page = 0
          this.getMpaExperience()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消`
        })
      })
    },
    // 分页
    changePage (val) {
      this.page = val - 1
      this.getMpaExperience()
    }
  },
  components: {
    menuLeft
  },
  computed: {
    ...mapState(['yiqixuanDomainUrl'])
  }
}
</script>

<style scoped lang="less">
  .mp-setting-object {
    margin-right: 60px;
    .mp-setting-content {
      .plate {
        padding: 20px;
        margin-bottom: 20px;
        background: #fff;
        color: #333;
        font-size: 12px;
        .plate-top {
          font-size: 14px;
          border-bottom: 2px solid #f5f5f5;
          padding-bottom: 20px;
          padding-left: 5px;
          &::before {
            content: '';
            display: block;
            float: left;
            width: 3px;
            height: 14px;
            margin-top: 3px;
            margin-right: 10px;
            background: @mainC;
          }
        }
      }
      .mp-setting-module {
        p {
          padding-top: 20px;
          font-size: 12px;
          color: #333;
          span {
            display: inline-block;
            vertical-align: middle;
          }
          span:first-child {
            width: 74px;
            text-align: right;
            color: #999;
          }
        }
        .el-button--small {
          margin-top: 30px;
          margin-left: 78px;
          margin-bottom: 10px;
        }
      }
      .experience-setting {
        .add-experience-users {
          margin-top: 20px;
          margin-bottom: 20px;
        }
        .experience-setting-table {
          .el-table {
            font-size: 12px;
            text-align: center;
            color: #666;
            .profit {
              color: #DE5B67;
            }
            .loss {
              color: #6BA725;
            }
          }
          .paging-box {
            padding-top: 30px;
            padding-bottom: 10px;
          }
        }
      }
    }
    .unbind-dialog {
      p {
        font-size: 12px;
        color: #666;
        padding-bottom: 10px;
      }
      div {
        font-size: 14px;
        .mp-name {
          font-weight: bold;
          padding-right: 20px;
        }
      }
    }
    .QR-code{
      top: 220px;
      position: fixed;
      z-index: 99;
      right: 0;
      background: #fff;
      text-align: center;
      writing-mode: vertical-rl;
      .el-button {
        padding: 22px 13px;
        border: none;
        margin-left: -10px;
        color: #333;
        font-size: 12px;
        line-height: 1.4;
        &:hover {
          background: #fff;
          color: #333;
        }
      }
    }
  }
  .code {
    font-size: 12px;
    color: #999999;
    height: 202px;
    width: 198px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    img {
      max-width: 180px;
    }
    span:first-child {
      font-size: 14px;
      font-weight: 600;
      color: #333333;
    }
  }
  .el-button--small {
    width: 80px;
    height: 30px;
    padding: 0;
    vertical-align: middle;
  }
</style>
<style lang="less">
  .mp-setting-object {
    .el-dialog__header {
      font-size: 14px;
      color: #333;
      font-weight: bold;
      border-bottom: 2px solid #f5f5f5;
    }
    .el-dialog__body {
      padding: 20px;
    }
    .el-table {
      th, td {
        padding: 8px 0;
      }
      th {
        color: #333;
        font-size: 14px;
        text-align: center;
        font-weight: normal;
        background: #efefef;
        border-color: #e4e4e4;
      }
      td {
        .el-button--text {
          font-size: 12px;
          border: 1px solid #63A4FF;
          padding: 4px 8px;
        }
      }
    }
  }
</style>
