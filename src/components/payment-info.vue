<template>
  <div>
    <div class="pay-information-setting">
      <ul>
        <li>
          <span class="pay-info-title">服务商商户号：</span>
          <span class="pay-info-txt" :title="busiInformation.merchant_no">{{busiInformation.merchant_no}}</span>
          <el-button type="primary" size="small" @click="setMerchantCert">设置</el-button>
          <span>获取方法：微信支付商户后台 > 账户中心 > 账户设置 > 商户信息 > 微信支付商户号</span>
        </li>
        <li>
          <span class="pay-info-title">服务商商户秘钥：</span>
          <span class="pay-info-txt" :title="busiInformation.merchant_key">{{busiInformation.merchant_key}}</span>
          <el-button type="primary" size="small" @click="setMerchantKey">设置</el-button>
          <span>获取方法：微信支付商户后台 > 账户中心 > 账户设置 > API 安全 > API 秘钥</span>
        </li>
        <li>
          <span class="pay-info-title">服务商P12证书：</span>
          <span class="pay-info-txt" :title="busiInformation.merchant_cert">{{busiInformation.merchant_cert}}</span>
          <el-upload
            :action="qiniuUploadUrl"
            :data="token"
            accept=".p12"
            :show-file-list="false"
            :on-success="qnUploadSuccess">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <span>获取方法：微信支付商户后台 > 账户中心 > 账户设置 > API安全 > 下载证书。<br>得到的 apiclient_cert.p12 文件后，点击右侧的上传按钮进行上传即可。</span>
        </li>
        <!--<li>-->
          <!--<span class="pay-info-title">升级支付接口：</span>-->
          <!--<span class="pay-info-txt"></span>-->
          <!--<el-button type="primary" size="small" @click="setMerchantNumber">免费升级</el-button>-->
          <!--<span>如果您是特约支付商户，创建社交立减金前需要完成接口升级</span>-->
        <!--</li>-->
      </ul>
      <div class="checked-protocol" v-if="agreementShow">
        <el-checkbox v-model.trim="checked">
          <span class="checked-protocol-text">我已同意并阅读</span>
          <el-button type="text" @click="readingProtocol = true">《协议》</el-button>
        </el-checkbox>
        <el-dialog
          title="提示"
          :visible.sync="readingProtocol"
          width="60%">
          <span>这里是协议内容这里是协议内容这里是协是协议内容</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="small" @click="readingProtocol = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {getQnToken, paySetting} from '../axios/api'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      checked: true,
      readingProtocol: false,
      token: '',
      busiInformation: {
        merchant_no: '',
        merchant_key: '--',
        merchant_cert: '--',
        merchantNumber: '--'
      }
    }
  },
  props: {
    agreementShow: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.getToken()
    this.getPaySetting()
  },
  methods: {
    getPaySetting () {
      paySetting('get').then(res => {
        console.log(res.data)
        let data = res.data
        this.busiInformation.merchant_no = data.merchant_no ? data.merchant_no : '--'
        this.busiInformation.merchant_key = data.merchant_key ? data.merchant_key : '--'
        this.busiInformation.merchant_cert = data.merchant_cert ? data.merchant_cert : '--'
      })
    },
    setMerchantCert () {
      this.$prompt('设置商户号', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        paySetting('put', {merchant_no: value}).then(res => {
          this.busiInformation.merchant_no = value
          // this.$emit('changeSetting', value, 1)
        })
      }).catch(() => {
      })
    },
    setMerchantKey () {
      this.$prompt('设置商户密钥', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        paySetting('put', {merchant_key: value}).then(res => {
          console.log(res.data)
          this.busiInformation.merchant_key = value
          // this.$emit('changeSetting', value, 2)
        })
      }).catch(() => {
      })
    },
    qnUploadSuccess (res, file) {
      paySetting('put', {merchant_cert: res.key}).then(resp => {
        console.log(res)
        this.busiInformation.merchant_cert = res.key
        // this.$emit('changeSetting', response.key, 3)
      })
    },
    getToken () {
      getQnToken('document').then(res => {
        this.token = res.data
      })
    }
  },
  computed: {
    ...mapState(['qiniuUploadUrl'])
  }
}
</script>

<style scoped lang="less">
  .pay-information-setting {
    padding: 0 0 10px;
    padding-left: 5px;
    li {
      padding-top: 20px;
      font-size: 12px;
      color: #B5B5B5;
      span {
        display: inline-block;
        vertical-align: middle;
        line-height: 1.4;
      }
      .pay-info-title {
        width: 96px;
        text-align: right;
        padding-right: 3px;
      }
      .pay-info-txt {
        width: 300px;
        color: #333;
        padding-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .el-button--small {
        margin-right: 25px;
      }
      &:nth-child(3) {
        >div {
          display: inline-block;
        }
      }
    }
  }
  .checked-protocol {
    padding-left: 74px;
    padding-top: 60px;
    .checked-protocol-text {
      color: #999;
    }
    .el-button--text {
      padding: 0;
      border: none;
    }
    .dialog-footer {
      text-align: center;
      display: block;
    }
  }
  .el-button--small {
    width: 80px;
    height: 30px;
    padding: 0;
    vertical-align: middle;
  }
</style>
