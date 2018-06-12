<template>
  <div>
    <first-setting-menu></first-setting-menu>
    <div class="first-setting-object">
      <div class="setting-step">
        <div class="el-steps-box">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step title="主体信息"></el-step>
            <el-step title="店铺信息"></el-step>
            <el-step title="支付信息"></el-step>
          </el-steps>
        </div>
        <div v-if="active == 0" class="subject-info plate">
          <div class="plate-top">主体信息</div>
          <div class="subject-info-setting">
            <ul>
              <li>
                <span class="name required">商铺名称：</span>
                <input type="text" v-validate="'required'" v-model.trim="shopName" name="店铺名称" placeholder="请输入店铺名称 (20个字符以内)" maxlength="20"/>
                <div class="err-tips">{{ errors.first('店铺名称') }}</div>
              </li>
              <li>
                <span class="name required">主营类目：</span>
                <el-select v-model.trim="categoryValue" size="small" class="select-state">
                  <el-option
                    v-for="item in mainCategory"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
            </ul>
            <div class="next-step">
              <el-button type="success" size="small" :disabled="false" @click="setStepActive(1)">下一步</el-button>
            </div>
          </div>
        </div>
        <div v-if="active == 1" class="store-information plate">
          <div class="plate-top">店铺信息</div>
          <div class="store-information-setting">
            <ul>
              <li>
                <span class="name alignment-top">商铺logo：</span>
                <el-upload
                  class="avatar-uploader"
                  :action="qiniuUploadUrl"
                  :data="upToken"
                  :before-upload="beforeUpload"
                  :show-file-list="false"
                  :on-success="handleLogoSuccess">
                  <img :src="logoImageUrl" class="avatar">
                  <div class="alignment-tip">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <p slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过1MB</p>
                  </div>
                </el-upload>
              </li>
              <li>
                <span class="name alignment-top required">商铺描述：</span>
                <textarea v-validate="'required'" v-model.trim="textArea" name="商铺描述" maxlength="1000" class="shop-description-textarea" placeholder="请输入商铺描述"></textarea>
                <div class="err-tips">{{ errors.first('商铺描述') }}</div>
              </li>
              <li>
                <span class="name alignment-top required">banner：</span>
                <el-upload
                  class="avatar-uploader"
                  :action="qiniuUploadUrl"
                  :data="upToken"
                  :before-upload="beforeUpload"
                  :show-file-list="false"
                  :on-success="handleBannerSuccess">
                  <img v-if="bannerImageUrl" :src="bannerImageUrl" class="avatar avatar2">
                  <div class="alignment-tip">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <p slot="tip" class="banner-tip">商铺首页展示的banner</p>
                    <p slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过1MB</p>
                  </div>
                </el-upload>
                <div class="err-tips" :style="{'display': bannerErrorTips?'block':'none'}">请先上传banner图！</div>
              </li>
              <li>
                <span class="name required">店长姓名：</span>
                <input type="text" v-validate="'required'" name="店长姓名" v-model.trim="shopChiefName" placeholder="请输入店长姓名" maxlength="20"/>
                <div class="err-tips">{{ errors.first('店长姓名') }}</div>
              </li>
              <li>
                <span class="name">联系电话：</span>
                <span>{{telNum}}</span>
              </li>
              <li>
                <span class="name">联系微信：</span>
                <input type="text" v-validate="{regex: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/}" name="微信号" v-model.trim="contactWeChat" placeholder="请输入联系微信号"/>
                <div class="err-tips">{{ errors.first('微信号') }}</div>
              </li>
              <li>
                <span class="name">客服电话：</span>
                <input type="text" v-validate="{regex: /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,4} [0-9]{3,8}$)|(^0{0,1}1[3|4|5|6|7|8][0-9]{9}$)/}" name="客服电话" v-model.trim="customerServiceNum" placeholder="请输入客服电话" maxlength="12"/>
                <div class="err-tips">{{ errors.first('客服电话') }}</div>
              </li>
              <li>
                <span class="name">联系地址：</span>
                <div class="el-cascader-box">
                  <el-cascader
                    size="small"
                    :options="options"
                    v-model.trim="selectedOptions"
                    placeholder="省 / 市 / 区"
                    @change="handleChange">
                  </el-cascader>
                  <input class="contact-address-input" type="text" v-model.trim="contactAddress" placeholder="请输入详细地址" maxlength="50"/>
                </div>
              </li>
            </ul>
            <div class="next-step">
              <el-button type="success" size="small" :disabled="false" @click="setStepActive(2)">下一步</el-button>
            </div>
          </div>
        </div>
        <div v-if="active == 2" class="pay-information plate">
          <div class="plate-top">支付信息</div>
          <div>
            <payment-info></payment-info>

            <div class="checked-protocol">
              <el-checkbox v-model.trim="checked">
                <span class="checked-protocol-text">我已同意并阅读</span>
                <el-button type="text" @click="readingProtocol = true">《授权协议》</el-button>
              </el-checkbox>
              <el-dialog
                title="授权协议"
                :visible.sync="readingProtocol"
                width="60%">
                <div>casasd</div>
                <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="small" @click="readingProtocol = false">确 定</el-button>
          </span>
              </el-dialog>
            </div>
            <div class="next-step">
              <el-button type="success" size="small" @click="setStepActive(3)">完成</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firstSettingMenu from '@/components/first-setting-menu'
import paymentInfo from '@/components/payment-info'
import {initialSetData, getQnToken, paySetting} from '../axios/api'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      active: -1,
      shopName: '',
      // 图片上传需要的token
      upToken: {},
      // 支付部分
      readingProtocol: false,
      checked: true,
      // 商家主营类目
      categoryValue: 1,
      shopChiefName: '',
      telNum: '',
      contactWeChat: '',
      customerServiceNum: '',
      logoImageUrl: '/static/default-img/shops-default-logo.png',
      logoKey: '',
      bannerImageUrl: '',
      bannerKey: '',
      bannerErrorTips: false,
      textArea: '',
      options: regionData,
      selectedOptions: [],
      contactAddress: ''
    }
  },
  created () {
    this.getImageToken()
    this.getInitialSetData()
  },
  mounted () {
    this.setMenuShow(false)
  },
  components: {
    firstSettingMenu,
    CodeToText,
    paymentInfo
  },
  computed: {
    ...mapState(['menuShow', 'mainCategory', 'yiqixuanDomainUrl', 'qiniuUploadUrl'])
  },
  methods: {
    ...mapMutations(['setMenuShow']),
    // 获取图片上传七牛的token
    getImageToken () {
      getQnToken('image').then(res => {
        this.upToken.token = res.data.token
      }).catch(err => {
        console.log(err)
      })
    },
    // 进入页面获取店铺信息
    getInitialSetData () {
      initialSetData('get').then(res => {
        console.log(res.data)
        let data = res.data
        if (data.name && data.type) {
          if (data.description && data.banner_url && data.owner_name) {
            this.active = 2
          } else {
            if (data.logo_url) {
              this.logoImageUrl = this.yiqixuanDomainUrl + data.logo_url
            }
            this.textArea = data.description
            if (data.banner_url) {
              this.bannerImageUrl = this.yiqixuanDomainUrl + data.banner_url
            }
            this.shopChiefName = data.owner_name
            this.telNum = data.mobile
            this.contactWeChat = data.wechat ? data.wechat : ''
            this.customerServiceNum = data.customer_service_mobile ? data.customer_service_mobile : ''
            this.getRegionCode(data.province, data.city, data.region)
            this.contactAddress = data.address
            this.active = 1
          }
        } else {
          this.shopName = data.name
          if (data.type) {
            this.categoryValue = data.type
          }
          this.active = 0
        }
      })
    },
    // 点击下一步，发送已填写的信息
    setStepActive (step) {
      let data = {}
      if (step === 1) {
        data = {
          name: this.shopName,
          type: this.getCategory()
        }
      } else if (step === 2) {
        data = {
          logo_url: this.logoKey,
          description: this.textArea,
          banner_url: this.bannerKey,
          owner_name: this.shopChiefName,
          wechat: this.contactWeChat,
          customer_service_mobile: this.customerServiceNum,
          province: CodeToText[this.selectedOptions[0]],
          city: CodeToText[this.selectedOptions[1]],
          region: CodeToText[this.selectedOptions[2]],
          address: this.contactAddress
        }
      } else if (step === 3) {
        this.paySettingVerification()
        return false
      }
      this.$validator.validateAll().then((msg) => {
        if (msg) {
          if (step === 2 && this.bannerKey === '') {
            this.bannerErrorTips = true
            return false
          }
          initialSetData('put', data).then(res => {
            console.log(res)
            this.active = step
          })
        } else {
          if (step === 2 && this.bannerKey === '') {
            this.bannerErrorTips = true
          }
        }
      })
    },
    // 根据主营类目的value获取类目名称
    getCategory () {
      for (let v of this.mainCategory) {
        if (v.value === this.categoryValue) {
          return v.label
        }
      }
    },
    // 商铺logo图片上传成功后的操作
    handleLogoSuccess (res, file) {
      this.logoKey = res.key
      this.logoImageUrl = URL.createObjectURL(file.raw)
    },
    // 商铺banner图片上传成功后的操作
    handleBannerSuccess (res, file) {
      this.bannerKey = res.key
      this.bannerImageUrl = URL.createObjectURL(file.raw)
    },
    // 上传文件之前对上传内容的验证
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      const isLt1M = file.size / 1024 / 1024 < 1
      const isMt10K = file.size > 100
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或者 PNG 格式!')
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!')
        return false
      }
      if (!isMt10K) {
        this.$message.error('上传图片大小不能小于 100B!')
        return false
      }
    },
    // 省市区三级联动改变时的操作
    handleChange (value) {
      // console.log(CodeToText[value[0]], CodeToText[value[1]], CodeToText[value[2]])
    },
    // 获取省市区信息，赋值给 selectedOptions 变量
    getRegionCode (province, city, region) {
      if (province && city && region) {
        this.selectedOptions = [TextToCode[province].code, TextToCode[province][city].code, TextToCode[province][city][region].code]
      }
    },
    // 验证支付信息是否完全设置，跳转到首页
    paySettingVerification () {
      paySetting('get').then(res => {
        console.log(res.data)
        let data = res.data
        if (!data.merchant_no) {
          this.$message.error('请先设置商户号！')
          return false
        }
        if (!data.merchant_key) {
          this.$message.error('请先设置商户秘钥！')
          return false
        }
        if (!data.merchant_cert) {
          this.$message.error('请先上传证书！')
          return false
        }
        if (!this.checked) {
          this.$message.error('请先选择同意授权协议！')
          return false
        }

        this.active = 3
        this.setRouter('/')
      })
    },
    // 设置路由链接
    setRouter (link) {
      this.$router.push({
        path: link
      })
    }
  }
}
</script>

<style scoped lang="less">
  .first-setting-object {
    margin-left: 200px;
    margin-right: 20px;
    padding-top: 20px;
    min-width: 1100px;
    .el-steps-box {
      background: #fff;
      padding: 20px;
      margin-bottom: 20px;
    }
    .plate {
      padding: 20px 15px;
      margin-bottom: 20px;
      background: #fff;
      color: #333;
      font-size: 12px;
      line-height: 15px;
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
          margin-top: 1px;
          margin-right: 10px;
          background: #999;
        }
      }
      .required::before {
        content: '*';
        color: #DE5B67;
        margin-left: -10px;
        padding-right: 5px;
      }
      .el-button--success.is-disabled {
        background: #d5d5d5;
        border-color: #d5d5d5;
      }
      li {
        position: relative;
        .err-tips {
          position: absolute;
          bottom: -16px;
          left: 74px;
          color: @mainC;
        }
      }
    }
    .setting-step {
      .next-step {
        padding-top: 30px;
        padding-left: 74px;
      }
      input {
        color: #333;
        border: 1px solid #d5d5d5;
        display: inline-block;
        width: 236px;
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
        padding-right: 10px;
        &::-webkit-input-placeholder {
          color: #b5b5b5;
        }
      }
    }
    .subject-info-setting {
      padding: 10px 0;
      padding-left: 10px;
      li {
        box-sizing: border-box;
        font-size: 12px;
        padding-top: 20px;
        padding-left: 5px;
        span {
          vertical-align: middle;
          display: inline-block;
        }
        span.name {
          color: #999;
          width: 65px;
        }
        .select-state {
          color: #333;
          display: inline-block;
          width: 258px;
        }
      }
    }
    .store-information-setting {
      padding: 10px 0;
      padding-left: 10px;
      li {
        box-sizing: border-box;
        font-size: 12px;
        padding-top: 20px;
        padding-left: 5px;
        span {
          display: inline-block;
          vertical-align: middle;
        }
        span.name {
          color: #999;
          width: 65px;
        }
        .name.alignment-top {
          vertical-align: top;
          padding-top: 6px;
        }
        .shop-description-textarea {
          display: inline-block;
          border: 1px solid #d5d5d5;
          padding: 10px;
          width: 236px;
          min-height: 80px;
        }
        .el-cascader-box {
          display: inline-block;
          .el-cascader {
            display: inline-block;
            vertical-align: middle;
            width: 258px;
          }
          .contact-address-input {
            vertical-align: middle;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .avatar-uploader {
    display: inline-block;
    .avatar {
      width: 80px;
      height: 80px;
      display: inline-block;
      vertical-align: top;
    }
    .avatar.avatar2 {
      width: 160px;
    }
    .alignment-tip {
      display: inline-block;
      vertical-align: top;
      height: 80px;
      width: 240px;
      text-align: left;
      position: relative;
      margin-left: 17px;
      .el-upload__tip {
        color: @b5b5;
        position: absolute;
        width: 100%;
        bottom: 0;
      }
      .banner-tip {
        color: @b5b5;
        padding-top: 10px;
      }
    }
  }
  .checked-protocol {
    padding-left: 74px;
    padding-top: 40px;
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
<style lang="less">
  .first-setting-object {
    .el-step__title.is-process {
      color: #333;
    }
    .el-step__title.is-wait {
      color: #d5d5d5;
    }
    .el-input__inner {
       border-radius: 0;
       color: #333;
     }
    .el-dialog__header {
      text-align: center;
    }
    .el-dialog__header span {
      font-size: 14px;
      color: #333;
      font-weight: bold;
    }
    .el-dialog__body {
      padding-top: 20px;
    }
  }
</style>
