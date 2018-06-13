<template>
  <div>
    <menu-left routeIndex="8-4"></menu-left>
    <div class="mp-setting-object content-box">
      <div class="mp-setting-content">
        <div class="mp-setting-module plate">
          <div class="plate-top">小程序设置</div>
          <p>
            <span class="">小程序名称：</span>
            <span>{{mpaName}}</span>
          </p>
          <p>
            <span>小程序ID：</span>
            <span>{{mpaId}}</span>
          </p>
          <el-button type="success" size="small" @click="dialogVisible = true">解除绑定</el-button>
        </div>
        <div class="experience-setting plate">
          <div class="plate-top">体验设置</div>
          <el-button class="add-experience-users" type="success" size="small">添加</el-button>
          <div class="experience-setting-table">
            <el-table
              :data="experienceUsersList"
              border
              show-overflow-tooltip>
              <el-table-column
                prop="wechat_number"
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
                  <el-button type="text">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="paging-box">
              <el-pagination
                background
                prev-text="< 上一页"
                :page-size="15"
                next-text="下一页 >"
                @current-change="changePage"
                layout="prev, pager, next"
                :total="totalPage">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>

      <div class="unbind-dialog">
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
      </div>
    </div>
  </div>
</template>

<script>
import {untieMp, mpInfo} from '../axios/api'
import menuLeft from '@/components/menu-left'
export default {
  data () {
    return {
      dialogVisible: false,
      mpaName: '',
      mpaId: '',
      experienceUsersList: [
        {
          wechat_number: 'qweqweqweqweqwe',
          created_at: '2018-02-22'
        }, {
          wechat_number: 'qweqweqweqweqwe',
          created_at: '2018-02-22'
        }, {
          wechat_number: 'qweqweqweqweqwe',
          created_at: '2018-02-22'
        }, {
          wechat_number: 'qweqweqweqweqwe',
          created_at: '2018-02-22'
        }, {
          wechat_number: 'qweqweqweqweqwe',
          created_at: '2018-02-22'
        }
      ],
      totalPage: 100
    }
  },
  created () {
    this.getMpInfo()
  },
  methods: {
    // 获取小程序信息
    getMpInfo () {
      mpInfo().then(res => {
        console.log(res.data)
        this.mpaName = res.data.nickName
        this.mpaId = res.data.authorizerAppId
      })
    },
    // 解绑小程序
    untieBtn () {
      untieMp().then(res => {
        console.log(res)
      }).catch(err => {
        console.dir(err.request, '失败')
      })
    }
  },
  components: {
    menuLeft
  }
}
</script>

<style scoped lang="less">
  .mp-setting-object {
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
