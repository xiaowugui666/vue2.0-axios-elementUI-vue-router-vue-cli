<template>
    <div>
      <menu-left routeIndex="8-1"></menu-left>
      <div class="info-setting-subject content-box">
        <div class="subject-info plate">
          <div class="plate-top">
            <span>主体信息</span>
          </div>
          <div class="subject-info-list">
            <ul>
              <li>
                <span class="name required">商铺名称：</span>
                <span v-if="!editState">{{shopName}}</span>
                <input v-if="editState" type="text" v-validate="'required'" name="店铺名称" v-model="shopName" placeholder="请输入店铺名称"/>
                <div class="err-tips">{{ errors.first('店铺名称') }}</div>
              </li>
              <li>
                <span class="name">商铺编号：</span>
                <span>{{shopNum}}</span>
              </li>
              <!--<li>-->
                <!--<span class="name">店铺认证：</span>-->
                <!--<span style="padding-right: 10px;">已认证</span>-->
                <!--<i class="icon-淘宝认证"></i>-->
                <!--<i class="icon-微信认证"></i>-->
                <!--<i class="icon-公众号认证"></i>-->
                <!--<i class="icon-京东认证"></i>-->
              <!--</li>-->
              <li>
                <span class="name">主营类目：</span>
                <span v-if="!editState">{{typeof categoryValue === 'string' ? categoryValue : getCategory()}}</span>
                <el-select v-if="editState" v-model="categoryValue" size="small" class="select-state">
                  <el-option
                    v-for="item in mainCategory"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span class="name">创建日期：</span>
                <span>{{creationTime}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="store-info plate">
          <div class="plate-top">
            <span>店铺信息</span>
          </div>
          <div class="store-info-list">
            <ul>
              <li>
                <span class="name alignment-top">商铺logo：</span>
                <img v-if="!editState" class="store-logo-img" :src="yiqixuanDomainUrl+logoImageUrl" alt="">
                <el-upload
                  v-if="editState"
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
                <span v-if="!editState" class="shop-description-txt">{{textArea}}</span>
                <textarea v-if="editState" class="shop-description-textarea" v-model="textArea" placeholder="请输入商品描述"></textarea>
              </li>
              <li>
                <span class="name alignment-top required">banner：</span>
                <img v-if="!editState" class="shop-description-img" :src="yiqixuanDomainUrl+bannerImageUrl" alt="">
                <el-upload
                  v-if="editState"
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
              </li>
              <li>
                <span class="name">店长姓名：</span>
                <span v-if="!editState">{{shopChiefName}}</span>
                <input v-if="editState" type="text" v-model="shopChiefName" placeholder="请输入店长姓名"/>
              </li>
              <li>
                <span class="name">联系电话：</span>
                <span>{{telNum}}</span>
              </li>
              <li>
                <span class="name required">联系微信：</span>
                <span v-if="!editState">{{contactWeChat}}</span>
                <input v-if="editState" type="text" v-validate="{required: true, regex: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/}" name="微信号" v-model="contactWeChat" placeholder="请输入联系微信号"/>
                <div class="err-tips">{{ errors.first('微信号') }}</div>
              </li>
              <li>
                <span class="name required">客服电话：</span>
                <span v-if="!editState">{{customerServiceNum}}</span>
                <input v-if="editState" type="text" v-validate="{required: true, regex: /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,4} [0-9]{3,8}$)|(^0{0,1}1[3|4|5|6|7|8][0-9]{9}$)/}" name="客服电话" v-model="customerServiceNum" placeholder="请输入客服电话"/>
                <div class="err-tips">{{ errors.first('客服电话') }}</div>
              </li>
              <li>
                <span class="name">联系地址：</span>
                <span v-if="!editState">{{getDetailedAddress() + contactAddress}}</span>
                <div v-if="editState" class="el-cascader-box">
                  <el-cascader
                    size="small"
                    :options="options"
                    v-model="selectedOptions"
                    placeholder="省 / 市 / 区"
                    @change="handleChange">
                  </el-cascader>
                  <input class="contact-address-input" type="text" v-model="contactAddress" placeholder="请输入详细地址"/>
                </div>
              </li>
            </ul>
            <!--<el-button v-if="editState" @click="editClick" class="submitBtn" type="success" size="small">保存</el-button>-->
          </div>
        </div>
        <div class="edit-btn">
          <el-button v-if="!editState" type="primary" size="small" @click="editState = true">编辑</el-button>
          <el-button v-if="editState" type="success" size="small" @click="editClick">保存</el-button>
        </div>
      </div>
    </div>
</template>

<script>
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
import {initialSetData, getQnToken} from '../axios/api'
import menuLeft from '@/components/menu-left'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      shopName: '',
      shopNum: '',
      creationTime: '',
      shopChiefName: '',
      telNum: '',
      contactWeChat: '',
      customerServiceNum: '',
      editState: false,
      logoImageUrl: 'shop_default_logo.png',
      bannerImageUrl: '',
      textArea: '',
      options: regionData,
      selectedOptions: [],
      contactAddress: '',
      categoryValue: '',
      // 图片上传需要的token
      upToken: {}
    }
  },
  components: {
    CodeToText,
    menuLeft
  },
  created () {
    this.getImageToken()
    this.getInitialSetData()
  },
  mounted () {
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
    // 进入页面获取店铺信息
    getInitialSetData () {
      initialSetData('get').then(res => {
        console.log(res.data)
        let data = res.data

        this.shopName = data.name
        this.shopNum = data.no
        this.categoryValue = data.type
        this.creationTime = data.created_at
        if (data.logo_url) {
          this.logoImageUrl = data.logo_url
        }
        if (data.banner) {
          this.bannerImageUrl = data.banner
        }
        this.textArea = data.description
        this.shopChiefName = data.owner_name
        this.telNum = data.mobile
        this.contactWeChat = data.wechat ? data.wechat : ''
        this.customerServiceNum = data.customer_service_mobile ? data.customer_service_mobile : ''
        this.getRegionCode(data.province, data.city, data.region)
        this.contactAddress = data.address
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
    // 点击编辑/保存后的操作
    editClick () {
      this.$validator.validateAll().then((msg) => {
        if (msg) {
          let data = {
            name: this.shopName,
            type: this.getCategory(),
            logo_url: this.logoImageUrl,
            banner: this.bannerImageUrl,
            description: this.textArea,
            owner_name: this.shopChiefName,
            wechat: this.contactWeChat,
            customer_service_mobile: this.customerServiceNum,
            province: CodeToText[this.selectedOptions[0]],
            city: CodeToText[this.selectedOptions[1]],
            region: CodeToText[this.selectedOptions[2]],
            address: this.contactAddress
          }
          initialSetData('put', data).then(res => {
            this.editState = false
          }).catch()
        }
      })
    },
    // 省市区三级联动改变时的操作
    handleChange (value) {
      // console.log(CodeToText[value[0]], CodeToText[value[1]], CodeToText[value[2]])
    },
    // 显示省市区地址信息
    getDetailedAddress () {
      let detAdd = ''
      if (this.selectedOptions.length > 0) {
        let selAdd = this.selectedOptions
        detAdd = CodeToText[selAdd[0]] + ' ' + CodeToText[selAdd[1]] + ' ' + CodeToText[selAdd[2]] + ' '
      }
      return detAdd
    },
    // 获取省市区信息，赋值给 selectedOptions 变量
    getRegionCode (province, city, region) {
      if (province && city && region) {
        this.selectedOptions = [TextToCode[province].code, TextToCode[province][city].code, TextToCode[province][city][region].code]
      }
    }
  },
  computed: {
    ...mapState(['mainCategory', 'yiqixuanDomainUrl', 'qiniuUploadUrl'])
  }
}
</script>

<style scoped lang="less">
  @import "../fonts/icomoon.css";
  .info-setting-subject {
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
    li {
      position: relative;
      .name {
        padding-right: 3px;
        color: #999;
        width: 65px;
      }
      .required::before {
        content: '*';
        color: #DE5B67;
        margin-left: -10px;
        padding-right: 5px;
      }
      .name.alignment-top {
        vertical-align: top;
        padding-top: 6px;
      }
      .err-tips {
        position: absolute;
        bottom: -16px;
        left: 74px;
        color: @mainC;
      }
    }
  }
  .subject-info {
  }
  .subject-info-list {
    padding: 10px 0 20px;
    padding-left: 10px;
    li {
      box-sizing: border-box;
      padding-top: 20px;
      font-size: 12px;
      span {
        vertical-align: middle;
      }
      i {
        font-size: 20px;
        vertical-align: middle;
        padding-left: 5px;
      }
      .select-state {
        color: #333;
        display: inline-block;
        width: 258px;
      }
    }
  }
  .store-info-list {
    padding-top: 10px;
    padding-left: 10px;
    li {
      padding-top: 20px;
      font-size: 12px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .store-logo-img {
        display: inline-block;
        width: 80px;
        height: 80px;
      }
      .shop-description-img {
        width: 200px;
      }
      .shop-description-txt {
        line-height: 1.5;
        padding: 10px;
        border: 1px solid #d5d5d5;
        width: 236px;
        min-height: 80px;
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
    .submitBtn {
      margin-top: 20px;
      margin-left: 73px;
    }
  }
  .edit-btn {
    position: fixed;
    top: 32px;
    right: 40px;
  }
  .el-button--small {
    width: 80px;
    height: 30px;
    padding: 0;
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
    .alignment-tip {
      display: inline-block;
      vertical-align: top;
      height: 80px;
      width: 400px;
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
</style>
<style>
  .el-input__inner {
    border-radius: 0;
    color: #333;
  }
</style>
