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
                  accept=".jpg,.png"
                  :before-upload="beforeUpload"
                  :show-file-list="false"
                  :on-success="handleLogoSuccess">
                  <img :src="yiqixuanDomainUrl+logoImageUrl" class="avatar">
                  <div class="alignment-tip">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <p slot="tip" class="el-upload__tip">建议尺寸：160*160像素，只能上传jpg/jpeg/png文件，且不超过1MB</p>
                  </div>
                </el-upload>
              </li>
              <li>
                <span class="name alignment-top">商铺描述：</span>
                <textarea v-model.trim="textArea" maxlength="1000" class="shop-description-textarea" placeholder="请输入商铺描述"></textarea>
              </li>
              <li>
                <span class="name alignment-top required">banner：</span>
                <el-upload
                  class="avatar-uploader"
                  :action="qiniuUploadUrl"
                  :data="upToken"
                  accept=".jpg,.png"
                  :before-upload="beforeUpload"
                  :show-file-list="false"
                  :on-success="handleBannerSuccess">
                  <img v-if="bannerImageUrl" :src="yiqixuanDomainUrl+bannerImageUrl" class="avatar avatar2">
                  <div class="alignment-tip">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <p slot="tip" class="banner-tip">商铺首页展示的banner</p>
                    <p slot="tip" class="el-upload__tip">建议尺寸：710*288，只能上传jpg/jpeg/png文件，且不超过1MB</p>
                  </div>
                </el-upload>
                <div class="err-tips" :style="{'display': bannerErrorTips?'block':'none'}">请先上传banner图！</div>
              </li>
              <li>
                <span class="name">店长姓名：</span>
                <input type="text" v-model.trim="shopChiefName" placeholder="请输入店长姓名" maxlength="20"/>
              </li>
              <li>
                <span class="name">联系电话：</span>
                <span>{{telNum}}</span>
              </li>
              <li>
                <span class="name required">联系微信：</span>
                <input type="text" v-validate="{required: true, regex: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/}" name="微信号" v-model.trim="contactWeChat" placeholder="请输入联系微信号"/>
                <div class="err-tips">{{ errors.first('微信号') }}</div>
              </li>
              <li>
                <span class="name required">客服电话：</span>
                <input type="text" v-validate="{required: true, regex: /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,4} [0-9]{3,8}$)|(^0{0,1}1[3|4|5|6|7|8][0-9]{9}$)/}" name="客服电话" v-model.trim="customerServiceNum" placeholder="请输入客服电话" maxlength="12"/>
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
            <div class="pay-information-setting">
              <ul>
                <li>
                  <span class="pay-info-title">微信支付商户号：</span>
                  <span class="pay-info-txt" :title="busiInformation.merchant_no">{{busiInformation.merchant_no}}</span>
                  <el-button type="primary" size="small" @click="setMerchantCert">设置</el-button>
                  <span>获取方法：微信支付商户后台 > 账户中心 > 账户设置 > 商户信息 > 微信支付商户号</span>
                </li>
                <li>
                  <span class="pay-info-title">微信支付商户秘钥：</span>
                  <span class="pay-info-txt" :title="busiInformation.merchant_key">{{busiInformation.merchant_key}}</span>
                  <el-button type="primary" size="small" @click="setMerchantKey">设置</el-button>
                  <span>获取方法：微信支付商户后台 > 账户中心 > 账户设置 > API 安全 > API 秘钥</span>
                </li>
                <li>
                  <span class="pay-info-title">微信支付P12证书：</span>
                  <span class="pay-info-txt" :title="busiInformation.merchant_cert">{{busiInformation.merchant_cert}}</span>
                  <el-upload
                    :action="qiniuUploadUrl"
                    :data="docToken"
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
            </div>
            <div class="checked-protocol">
              <el-checkbox v-model.trim="checked">
                <span class="checked-protocol-text">我已同意并阅读</span>
                <el-button type="text" @click="readingProtocol = true">《授权协议》</el-button>
              </el-checkbox>
              <el-dialog
                style="margin-top: -5vh;"
                title="授权协议"
                :visible.sync="readingProtocol"
                width="60%">
                <div class="checked-protocol-dialog">
                  <p><strong>授权人</strong>：<span>{{shopName}}</span></p>
                  <p><strong>被授权人</strong>：<span>上海虎赞信息科技有限公司</span></p>
                  <p><span class="t">授权人点击“同意”按钮，视为同意授权上海虎赞信息科技有限公司代为管理授权人微信小程序（以下统称“标的账号”）内的部分内容。双方就该授权达成如下协议;</span></p>
                  <p>
                    <strong>第一条</strong>
                    <br>
                    <span class="t">授权人将其标的账号授权委托被授权人代为管理，被授权人通过标的账号所进行的任何行为，均视为授权人的行为；授权人有权随时在微信平台取消授权以终止被授权人的管理权。</span>
                  </p>
                  <p>
                    <strong>第二条</strong>
                    <br>
                    <span class="t">授权范围如下：</span>
                    <br>
                    <span class="t">1、授权人在微信平台的“设置——第三方服务”功能项下选择被授权人，完成授权；</span>
                    <span class="t">2、被授权人在功能范围内为授权人搭建小程序展示页面；</span>
                    <span class="t">3、被授权人提供“小程序电子商铺后台管理功能”服务，并开通端口对接授权人标的账号。</span>
                  </p>
                  <p>
                    <strong>第三条</strong>
                    <br>
                    <span class="t">授权人与被授权人另行签订的《虎赞平台服务协议》（以下简称‘主合同’），本授权协议有效期与主合同一致。主合同提前终止、解除的，本授权协议随之终止、解除，主合同有效期延长的，本协议授权有效期随之延长。但授权人在微信平台主动取消授权的除外。</span>
                  </p>
                  <p>
                    <strong>第四条</strong>
                    <br>
                    <span class="t">授权人取消授权、或本协议到期未续约的，授权人可正常使用小程序展示页面，但“小程序电子商铺后台管理功能”无权继续使用。</span>
                  </p>
                  <p>
                    <strong>第五条</strong>
                    <br>
                    <span class="t">授权人应及时以明确、有效的方式告知小程序使用用户，标的账号使用了被授权人的服务，这部分用户数据可能被被授权人获取并使用。</span>
                  </p>
                  <p>
                    <strong>第六条</strong>
                    <br>
                    <span class="t">被授权人在为授权人提供服务期间会获取标的账号的用户数据、运营数据、交易数据，被授权人承诺获取上述数据仅为向标的账户提供管理服务，未经授权人另行书面授权，不做他用。</span>
                  </p>
                  <p>
                    <strong>第七条</strong>
                    <br>
                    <span class="t">授权人应在微信平台开通标的账号的功能，获得相应的能力和资格，同意微信平台要求的协议和规则；若因授权人未完成功能开通导致被授权人无法提供服务的，由此产生的责任由授权人承担。</span>
                  </p>
                  <p>
                    <strong>第八条</strong>
                    <br>
                    <span class="t">本协议自授权人在勾选 “我已同意并阅读《协议》” 并提交起生效。</span>
                  </p>
                </div>
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
import {initialSetData, getQnToken, paySetting} from '../axios/api'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      active: -1,
      shopName: '',
      // 图片上传需要的token
      upToken: {},
      docToken: {},
      // 支付部分
      readingProtocol: false,
      checked: true,
      // 商家主营类目
      categoryValue: 1,
      shopChiefName: '',
      telNum: '',
      contactWeChat: '',
      customerServiceNum: '',
      logoImageUrl: 'shop_default_logo.png',
      bannerImageUrl: '',
      bannerErrorTips: false,
      textArea: '',
      options: regionData,
      selectedOptions: [],
      contactAddress: '',
      busiInformation: {
        merchant_no: '--',
        merchant_key: '--',
        merchant_cert: '--',
        merchantNumber: '--'
      }
    }
  },
  created () {
    this.getImageToken()
    this.getInitialSetData()
    this.getCertificateToken()
  },
  mounted () {
  },
  components: {
    firstSettingMenu,
    CodeToText
  },
  computed: {
    ...mapState(['mainCategory', 'yiqixuanDomainUrl', 'qiniuUploadUrl'])
  },
  methods: {
    // 获取图片上传七牛的token
    getImageToken () {
      getQnToken('image').then(res => {
        this.upToken.token = res.data.token
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取证书上传七牛的token
    getCertificateToken () {
      getQnToken('document').then(res => {
        this.docToken.token = res.data.token
      }).catch(err => {
        console.log(err)
      })
    },
    // 进入页面获取店铺信息
    getInitialSetData () {
      initialSetData('get').then(res => {
        // console.log(res.data)
        let data = res.data
        this.telNum = data.mobile
        this.shopName = data.name
        if (data.name && data.type) {
          if (data.wechat && data.banner && data.customer_service_mobile) {
            if (data.mpa.merchant_no && data.mpa.merchant_key_encrypt && data.mpa.merchant_cert_encrypt) {
              this.setRouter('/')
              this.active = 2
            } else {
              this.active = 2
            }
          } else {
            if (data.logo_url) {
              this.logoImageUrl = data.logo_url
            }
            this.textArea = data.description ? data.description : ''
            if (data.banner) {
              this.bannerImageUrl = data.banner
            }
            this.shopChiefName = data.owner_name ? data.owner_name : ''
            this.contactWeChat = data.wechat ? data.wechat : ''
            this.customerServiceNum = data.customer_service_mobile ? data.customer_service_mobile : ''
            this.getRegionCode(data.province, data.city, data.region)
            this.contactAddress = data.address ? data.address : ''
            this.active = 1
          }
        } else {
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
          logo_url: this.logoImageUrl,
          description: this.textArea,
          banner: this.bannerImageUrl,
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
          if (step === 2 && this.bannerImageUrl === '') {
            this.bannerErrorTips = true
            return false
          }
          initialSetData('put', data).then(res => {
            this.active = step
          })
        } else {
          if (step === 2 && this.bannerImageUrl === '') {
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
      this.logoImageUrl = res.key
    },
    // 商铺banner图片上传成功后的操作
    handleBannerSuccess (res, file) {
      // this.bannerImageUrl = URL.createObjectURL(file.raw)
      this.bannerImageUrl = res.key
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
    setMerchantCert () {
      let _this = this
      this.$prompt('设置商户号', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.+$/,
        inputErrorMessage: '商户号不能为空！'
      }).then(({ value }) => {
        _this.busiInformation.merchant_no = value
      }).catch(() => {
      })
    },
    setMerchantKey () {
      let _this = this
      this.$prompt('设置商户密钥', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.+$/,
        inputErrorMessage: '商户密钥不能为空！'
      }).then(({ value }) => {
        _this.busiInformation.merchant_key = value
      }).catch(() => {
      })
    },
    // 上传证书
    qnUploadSuccess (res, file) {
      this.busiInformation.merchant_cert = res.key
    },
    // 验证支付信息是否完全设置，跳转到首页
    paySettingVerification () {
      if (!this.busiInformation.merchant_no || this.busiInformation.merchant_no === '--') {
        this.$message.error('请先设置商户号！')
        return false
      }
      if (!this.busiInformation.merchant_key || this.busiInformation.merchant_key === '--') {
        this.$message.error('请先设置商户秘钥！')
        return false
      }
      if (!this.busiInformation.merchant_cert || this.busiInformation.merchant_cert === '--') {
        this.$message.error('请先上传证书！')
        return false
      }
      if (!this.checked) {
        this.$message.error('请先选择同意授权协议！')
        return false
      }

      let data = {
        merchant_no: this.busiInformation.merchant_no,
        merchant_key: this.busiInformation.merchant_key,
        merchant_cert: this.busiInformation.merchant_cert
      }
      paySetting('put', data).then(res => {
        localStorage.setItem('api-key', JSON.stringify(res.headers['api-key']))
        localStorage.setItem('api-secret', JSON.stringify(res.headers['api-secret']))

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
          color: @b5b5;
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
      width: 200px;
      height: auto;
    }
    .avatar {
      margin-right: 17px;
    }
    .alignment-tip {
      display: inline-block;
      vertical-align: top;
      height: 80px;
      width: 400px;
      text-align: left;
      position: relative;
      .el-upload__tip {
        color: @b8;
        position: absolute;
        width: 100%;
        bottom: 0;
      }
      .banner-tip {
        color: @b8;
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
    .checked-protocol-dialog {
      color: #333;
      line-height: 22px;
      padding: 0 10px;
      max-height: 55vh;
      overflow-y: auto;
      p {
        padding-bottom: 13px;
      }
      .t {
        text-indent: 2em;
      }
      span {
        display: inline-block;
        color: #888;
      }
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
  .pay-information-setting {
    padding: 0 0 10px;
    padding-left: 5px;
    li {
      padding-top: 20px;
      font-size: 12px;
      color: @b8;
      span {
        display: inline-block;
        vertical-align: middle;
        line-height: 1.4;
      }
      .pay-info-title {
        width: 108px;
        text-align: right;
        padding-right: 3px;
        color: @b3;
      }
      .pay-info-txt {
        width: 300px;
        color: @b3;
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
      color: @b3;
    }
    .el-step__title.is-wait {
      color: #d5d5d5;
    }
    .el-input__inner {
       border-radius: 0;
       color: @b3;
     }
    .el-dialog__header {
      text-align: center;
    }
    .el-dialog__header span {
      font-size: 18px;
      color: #000;
      font-weight: bold;
    }
    .el-dialog__body {
      padding-top: 20px;
    }
  }
</style>
