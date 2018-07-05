<template>
  <div class="general-setting">
    <div class="subject-info plate">
      <div class="plate-top">主体信息</div>
      <div class="subject-info-list">
        <ul>
          <li>
            <span class="name">商铺编号：</span>
            <span>{{mini.no}}</span>
          </li>
          <li>
            <span class="name">主体信息：</span>
            <span>{{mini.principal_name}}</span>
          </li>
          <li>
            <span :class="['name',{'alignment-top':mini.category.length>1}]">主营类目：</span>
            <div class="list" v-if="mini.category.length>0">
              <p v-for="(item,index) in mini.category" :key="index"><span>{{item.first_class}}</span><span>{{item.second_class}}</span></p>
            </div>
          </li>
          <li>
            <span class="name">创建日期：</span>
            <span>{{mini.create_time}}</span>
          </li>
          <li>
            <span class="name">小程序名称：</span>
            <span>{{mini.nick_name}}</span>
          </li>
          <li>
            <span class="name">小程序ID：</span>
            <span>{{mini.app_id}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="store-info plate">
      <div class="plate-top">
        <span>店铺信息</span>
      </div>
      <div class="plate-edit-btn">
        <el-button v-if="!editState" type="primary" size="small" @click="editState = true">编辑</el-button>
        <el-button v-if="editState" type="success" size="small" @click="editClick">保存</el-button>
      </div>
      <div class="store-info-list"  v-if="!editState">
        <ul>
          <li>
            <span class="name required">商铺名称：</span>
            <span>{{shopName}}</span>
          </li>
          <li>
            <span class="name alignment-top required">商铺logo：</span>
            <img class="store-logo-img" :src="yiqixuanDomainUrl+logoImageUrl" alt="">
          </li>
          <li>
            <span class="name alignment-top required">欢迎文案：</span>
            <span class="shop-description-txt">{{textArea}}</span>
          </li>
          <li>
            <span class="name alignment-top">首页展示图：</span>
            <img v-if="bannerImageUrl" class="shop-description-img" :src="yiqixuanDomainUrl+bannerImageUrl" alt="">
          </li>
          <li>
            <span class="name">店长姓名：</span>
            <span>{{shopChiefName}}</span>
          </li>
          <li>
            <span class="name">联系电话：</span>
            <span>{{telNum}}</span>
          </li>
          <li>
            <span class="name required">客服电话：</span>
            <span>{{customerServiceNum}}</span>
          </li>
          <li>
            <span class="name">联系地址：</span>
            <span>{{getDetailedAddress() + contactAddress}}</span>
          </li>
          <li>
            <span class="name">搜索文案：</span>
            <span>{{searchDefaultText}}</span>
          </li>
        </ul>
      </div>
      <div class="store-info-list" v-if="editState">
        <ul>
          <li>
            <span class="name required">商铺名称：</span>
            <input type="text" v-validate="'required'" name="店铺名称" v-model="shopName" placeholder="请输入店铺名称" maxlength="20"/>
            <div class="err-tips">{{ errors.first('店铺名称') }}</div>
          </li>
          <li>
            <span class="name required alignment-top">商铺logo：</span>
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
            <span class="name required alignment-top">欢迎文案：</span>
            <textarea v-validate="'required'" name="欢迎文案" class="shop-description-textarea" v-model="textArea" placeholder="请输入欢迎文案" maxlength="45"></textarea>
            <div class="err-tips">{{ errors.first('欢迎文案') }}</div>
          </li>
          <li>
            <span class="name alignment-top">首页展示图：</span>
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
                <el-button @click="(event)=>handleBannerDelete(event)" size="small" type="primary">点击删除</el-button>
                <p slot="tip" class="banner-tip">商铺首页展示的banner</p>
                <p slot="tip" class="el-upload__tip">建议尺寸：710*288，只能上传jpg/jpeg/png文件，且不超过1MB</p>
              </div>
            </el-upload>
          </li>
          <li>
            <span class="name">店长姓名：</span>
            <input type="text" v-model="shopChiefName" placeholder="请输入店长姓名" maxlength="20"/>
          </li>
          <li>
            <span class="name">联系电话：</span>
            <span>{{telNum}}</span>
          </li>
          <!--<li>
            <span class="name">联系微信：</span>
            <span>{{contactWeChat}}</span>
          </li>-->
          <li>
            <span class="name required">客服电话：</span>
            <input type="text" v-validate="{required: true, regex: /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,4} [0-9]{3,8}$)|(^0{0,1}1[3|4|5|6|7|8][0-9]{9}$)/}" name="客服电话" v-model="customerServiceNum" placeholder="请输入客服电话" maxlength="12"/>
            <div class="err-tips">{{ errors.first('客服电话') }}</div>
          </li>
          <li>
            <span class="name">联系地址：</span>
            <div class="el-cascader-box">
              <el-cascader
                size="small"
                :options="options"
                v-model="selectedOptions"
                placeholder="省 / 市 / 区"
                @change="handleChange">
              </el-cascader>
              <input class="contact-address-input" type="text" v-model="contactAddress" placeholder="请输入详细地址" maxlength="50"/>
            </div>
          </li>
          <li>
            <span class="name">搜索文案：</span>
            <input type="text" v-model="searchDefaultText" maxlength="10"/>
          </li>
        </ul>
      </div>
    </div>
    <div class="sharing-info plate">
      <div class="plate-top">
        <span>首页分享信息</span>
      </div>
      <div class="plate-edit-btn">
        <el-button v-if="!sharingState" type="primary" size="small" @click="sharingState = true">编辑</el-button>
        <el-button v-if="sharingState" type="success" size="small" @click="editSharingInfo">保存</el-button>
      </div>
      <div class="store-info-list"  v-if="!sharingState">
        <ul>
          <li>
            <span class="name">分享文案：</span>
            <span>{{shareText}}</span>
          </li>
          <li>
            <span class="name alignment-top">分享图片：</span>
            <img v-if="shareImage" class="shop-description-img" :src="yiqixuanDomainUrl+shareImage" alt="">
          </li>
        </ul>
      </div>
      <div class="store-info-list" v-if="sharingState">
        <ul>
          <li>
            <span class="name">分享文案：</span>
            <input v-model="shareText" placeholder="请输入分享文案" maxlength="45" type="text"/>
          </li>
          <li>
            <span class="name alignment-top">分享图片：</span>
            <el-upload
              class="avatar-uploader"
              :action="qiniuUploadUrl"
              :data="upToken"
              accept=".jpg,.png"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :on-success="handleShareSuccess">
              <img v-if="shareImage" :src="yiqixuanDomainUrl+shareImage" class="avatar avatar2">
              <div class="alignment-tip">
                <el-button size="small" type="primary">点击上传</el-button>
                <p slot="tip" class="el-upload__tip">建议宽高比：5:4，只能上传jpg/jpeg/png文件，且不超过1MB</p>
              </div>
            </el-upload>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
import {initialSetData, getQnToken, sharingInfo} from '@/axios/api'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      mini: {
        category: []
      }, // 主题信息
      shopName: '',
      shopNum: '',
      shopChiefName: '',
      telNum: '',
      contactWeChat: '',
      customerServiceNum: '',
      searchDefaultText: '',
      editState: false,
      sharingState: false,
      logoImageUrl: 'shop_default_logo.png',
      bannerImageUrl: '',
      textArea: '',
      options: regionData,
      selectedOptions: [],
      contactAddress: '',
      shareText: '',
      shareImage: '',
      // 图片上传需要的token
      upToken: {}
    }
  },
  created () {
    this.getImageToken()
    this.getInitialSetData()
  },
  methods: {
    // 获取图片上传七牛的token
    getImageToken () {
      getQnToken('image').then(res => {
        this.upToken.token = res.data.token
      })
    },
    // 进入页面获取店铺信息
    getInitialSetData () {
      initialSetData('get').then(res => {
        // console.log(res.data)
        let data = res.data

        this.mini = data.mini
        this.shopName = data.name
        this.shopNum = data.no
        if (data.logo_url) {
          this.logoImageUrl = data.logo_url
        }
        if (data.banner) {
          this.bannerImageUrl = data.banner
        }
        this.textArea = data.description
        this.shopChiefName = data.owner_name
        this.telNum = data.mobile
        this.contactWeChat = data.wechat
        this.customerServiceNum = data.customer_service_mobile ? data.customer_service_mobile : ''
        this.searchDefaultText = data.search_default_text
        this.getRegionCode(data.province, data.city, data.region)
        this.contactAddress = data.address ? data.address : ''
        this.shareText = data.share_text ? data.share_text : ''
        this.shareImage = data.share_logo_url ? data.share_logo_url : ''
      })
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
    // 商铺banner图片上传成功后的操作
    handleShareSuccess (res, file) {
      // this.bannerImageUrl = URL.createObjectURL(file.raw)
      this.shareImage = res.key
    },
    // 商铺banner图片删除操作
    handleBannerDelete (e) {
      e.stopPropagation()
      this.bannerImageUrl = ''
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
            logo_url: this.logoImageUrl,
            banner: this.bannerImageUrl,
            description: this.textArea,
            owner_name: this.shopChiefName,
            customer_service_mobile: this.customerServiceNum,
            province: CodeToText[this.selectedOptions[0]],
            city: CodeToText[this.selectedOptions[1]],
            region: CodeToText[this.selectedOptions[2]],
            address: this.contactAddress,
            search_default_text: this.searchDefaultText
          }
          initialSetData('put', data).then(res => {
            this.$message.success('保存信息成功！')
            this.editState = false
          }).catch()
        }
      })
    },
    editSharingInfo () {
      let data = {
        share_text: this.shareText,
        share_logo_url: this.shareImage
      }
      sharingInfo(data).then(res => {
        this.$message.success('保存信息成功！')
        this.sharingState = false
      }).catch()
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
  components: {
    CodeToText
  },
  computed: {
    ...mapState(['yiqixuanDomainUrl', 'qiniuUploadUrl'])
  }
}
</script>

<style scoped lang="less">
  .plate {
    padding: 20px;
    margin-bottom: 20px;
    background: #fff;
    color: @fMain;
    font-size: 12px;
    position: relative;
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
    .plate-edit-btn {
      position: absolute;
      top: 15px;
      right: 20px;
    }
    li {
      position: relative;
      .name {
        display: inline-block;
        vertical-align: middle;
        padding-right: 3px;
        color: @b8;
        width: 74px;
        text-align: right;
      }
      .required::before {
        content: '*';
        color: @mainC;
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
  .subject-info-list {
    padding: 10px 10px 20px;
    li {
      box-sizing: border-box;
      padding-top: 20px;
      font-size: 12px;
      span {
        vertical-align: middle;
      }
      .list {
        display: inline-block;
        p {
          margin-top: 10px;
          &:first-child {
            margin-top: 0;
          }
          span {
            margin-right: 20px;
          }
        }
      }
      i {
        font-size: 20px;
        vertical-align: middle;
        padding-left: 5px;
      }
      .select-state {
        color: @fMain;
        display: inline-block;
        width: 258px;
      }
    }
}
  .store-info-list {
    padding: 10px 10px 20px;
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
        border: 1px solid @bc;
        width: 236px;
        min-height: 80px;
      }
      .shop-description-textarea {
        display: inline-block;
        border: 1px solid @bc;
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
  input {
    color: @fMain;
    border: 1px solid @bc;
    display: inline-block;
    vertical-align: middle;
    width: 236px;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    &::-webkit-input-placeholder {
      color: @b5b5;
    }
  }
  .avatar-uploader {
    display: inline-block;
    .avatar {
      width: 80px;
      height: 80px;
      display: inline-block;
      vertical-align: top;
      margin-right: 17px;
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
</style>
<style lang="less">
  .general-setting {
    .el-input__inner {
      border-radius: 0;
      color: @fMain;
    }
    .el-cascader__label {
      padding-left: 10px;
      color: @fMain;
    }
  }
</style>
