<template>
  <div>
    <menu-left routeIndex="8-4"></menu-left>
    <div class="mp-setting-object content-box">
      <div class="mp-setting-content">
        <!--<div class="mp-setting-module plate">
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
        </div>-->
        <ul class="mp-setting-bar">
          <li @click="setTabOption(0)"><span :class="{'active':tabOption===0}">通用设置</span></li>
          <li @click="setTabOption(1)"><span :class="{'active':tabOption===1}">设置体验账号</span></li>
          <li @click="setTabOption(2)"><span :class="{'active':tabOption===2}">版本管理</span></li>
        </ul>
        <general v-if="tabOption===0"></general>
        <experience v-if="tabOption===1"></experience>
        <version v-if="tabOption===2"></version>
      </div>
      <div class="QR-code">
        <el-popover
          placement="left"
          width="200"
          trigger="hover">
          <div class="code">
            <span>体验店铺预览码</span>
            <img :src="yiqixuanDomainUrl+mpaQRUrl" />
            <span>微信扫描预览体验店铺</span>
          </div>
          <el-button slot="reference">小<br>程<br>序<br>体<br>验<br></el-button>
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
import {getQRCode} from '../axios/api'
import menuLeft from '@/components/menu-left'
import general from '@/components/mp-setting/general-setting'
import experience from '@/components/mp-setting/experience-setting'
import version from '@/components/mp-setting/version-management'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      tabOption: 0,
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
    // 小程序二维码
    getMpQRCode () {
      getQRCode().then(res => {
        this.mpaQRUrl = res.data.exp_code_url
      })
    },
    // 小程序设置的选项
    setTabOption (index) {
      if (index === 0) {
      }
      this.tabOption = index
    }
  },
  components: {
    menuLeft,
    general,
    experience,
    version
  },
  computed: {
    ...mapState(['yiqixuanDomainUrl'])
  }
}
</script>

<style scoped lang="less">
  .mp-setting-object {
    margin-right: 60px;
    min-width: 970px;
    .mp-setting-content {
      .mp-setting-bar {
        border-bottom: 1px solid @bg;
        font-size: 0;
        background: #fff;
        li {
          display: inline-block;
          vertical-align: middle;
          width: 160px;
          text-align: center;
          font-size: 14px;
          color: @fMain;
          cursor: pointer;
          span {
            display: inline-block;
            padding: 11px 12px 8px;
            border-bottom: 3px solid #fff;
            &.active {
              border-bottom-color: @mainC;
            }
          }
        }
      }
      /*.mp-setting-module {
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
      }*/
    }
    /*.unbind-dialog {
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
    }*/
    .QR-code {
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
</style>
<style lang="less">
  .mp-setting-object {
    .el-button--small {
      width: 80px;
      height: 30px;
      padding: 0;
      vertical-align: middle;
    }
    /*.el-dialog__header {
      font-size: 14px;
      color: #333;
      font-weight: bold;
      border-bottom: 2px solid #f5f5f5;
    }
    .el-dialog__body {
      padding: 20px;
    }*/
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
