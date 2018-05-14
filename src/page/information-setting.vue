<template>
    <div>
      <menu-left></menu-left>
      <div class="info-setting-subject">
        <div class="subject-info plate">
          <div class="plate-top">
            <span>主体信息</span>
          </div>
          <div class="subject-info-list">
            <ul>
              <li>
                <span class="name">商铺名称：</span>
                <span v-show="!editState">{{shopName}}</span>
                <input v-show="editState" type="text" v-model="shopName" placeholder="请输入店铺名称"/>
              </li>
              <li>
                <span class="name">商铺编号：</span>
                <span>{{shopNum}}</span>
              </li>
              <li>
                <span class="name">店铺认证：</span>
                <span style="padding-right: 10px;">已认证</span>
                <i class="icon-淘宝认证"></i>
                <i class="icon-微信认证"></i>
                <i class="icon-公众号认证"></i>
                <i class="icon-京东认证"></i>
              </li>
              <li>
                <span class="name">主营类目：</span>
                <span v-show="!editState">{{value}}</span>
                <el-select v-show="editState" v-model="value" size="small" class="select-state">
                  <el-option
                    v-for="item in selectStateOptions"
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
                <img v-show="!editState" class="store-logo-img" :src="imageUrl" alt="">
                <el-upload
                  v-show="editState"
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-change='changeUpload'
                  :before-upload="beforeUpload"
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-success="handleAvatarSuccess">
                  <img :src="imageUrl" class="avatar">
                  <div class="alignment-tip">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <p slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</p>
                  </div>
                </el-upload>
              </li>
              <li>
                <span class="name alignment-top">商铺描述：</span>
                <span v-show="!editState" class="shop-description-txt">{{textarea}}</span>
                <textarea v-show="editState" class="shop-description-textarea" placeholder="请输入商品描述" v-model="textarea"></textarea>
              </li>
              <li>
                <span class="name alignment-top">banner：</span>
                <img v-show="!editState" class="shop-description-img" :src="imageUrl2" alt="">
                <el-upload
                  v-show="editState"
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-change='changeUpload'
                  :before-upload="beforeUpload"
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-success="handleAvatarSuccess">
                  <img :src="imageUrl2" class="avatar avatar2">
                  <div class="alignment-tip">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <p slot="tip" class="banner-tip">商铺首页展示的banner</p>
                    <p slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</p>
                  </div>
                </el-upload>
              </li>
              <li>
                <span class="name required">店长姓名：</span>
                <span v-show="!editState">{{shopChiefName}}</span>
                <input v-show="editState" type="text" v-model="shopChiefName" placeholder="请输入店长姓名"/>
              </li>
              <li>
                <span class="name">联系电话：</span>
                <span>{{telNum}}</span>
              </li>
              <li>
                <span class="name">联系微信：</span>
                <span v-show="!editState">{{contactWeChat}}</span>
                <input v-show="editState" type="text" v-model="contactWeChat" placeholder="请输入联系微信号"/>
              </li>
              <li>
                <span class="name">客服电话：</span>
                <span v-show="!editState">{{customerServiceNum}}</span>
                <input v-show="editState" type="text" v-model="customerServiceNum" placeholder="请输入客服电话"/>
              </li>
              <li>
                <span class="name">联系地址：</span>
                <span v-show="!editState">{{getDetailedAddress() + contactAddress}}</span>
                <div v-show="editState" class="el-cascader-box">
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
          </div>
        </div>
        <div class="edit-btn">
          <el-button v-show="!editState" type="primary" size="small" @click="editClick" style="padding-left: 25px;padding-right: 25px;">编辑</el-button>
          <el-button v-show="editState" type="success" size="small" @click="editClick" style="padding-left: 25px;padding-right: 25px;">保存</el-button>
        </div>
      </div>
    </div>
</template>

<script>
import menuLeft from '../components/menu-left'
import ceshi from '../assets/ceshi.png'
import ceshi2 from '../assets/ceshi2.png'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  data () {
    return {
      shopName: '阿迪达斯旗舰店',
      shopNum: 321354656454,
      creationTime: '2018-01-02 10:05',
      shopChiefName: '陈天一',
      telNum: 13611895011,
      contactWeChat: 'asdasq2134141',
      customerServiceNum: '021-65465400',
      editState: false,
      imageUrl: ceshi,
      imageUrl2: ceshi2,
      textarea: 'wqetrwqerwesdfdfasldkfjalsejtlaweflsadkjflwe',
      options: regionData,
      selectedOptions: [ '350000', '350100', '350102' ],
      contactAddress: '永康路99弄9号909室',
      selectStateOptions: [{
        value: '1',
        label: '食品'
      }, {
        value: '2',
        label: '数码家电'
      }, {
        value: '3',
        label: '女装'
      }, {
        value: '4',
        label: '美妆'
      }, {
        value: '5',
        label: '日用百货'
      }],
      value: '食品'
    }
  },
  components: {
    menuLeft,
    CodeToText
  },
  mounted () {
    this.beforeUpload()
  },
  methods: {
    editClick () {
      this.editState = !this.editState
    },
    handleAvatarSuccess (res, file) {
      console.log('success')
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeUpload (x) {
      // console.log(x)
    },
    changeUpload (file, fileList) {
      // console.log(file)
      this.imageUrl = file.url
    },
    handleChange (value) {
      // console.log(CodeToText[value[0]], CodeToText[value[1]], CodeToText[value[2]])
    },
    getDetailedAddress () {
      let selAdd = this.selectedOptions
      let detAdd = CodeToText[selAdd[0]] + ' ' + CodeToText[selAdd[1]] + ' ' + CodeToText[selAdd[2]] + ' '
      return detAdd
    }
  }
}
</script>

<style scoped lang="less">
  @import "../fonts/icomoon.css";
  .info-setting-subject {
    min-width: 1000px;
    padding-top: 20px;
    margin: 0 20px 0 200px;
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
  }
  .subject-info {
  }
  .subject-info-list {
    padding: 10px 0 20px;
    padding-left: 10px;
    li {
      box-sizing: border-box;
      height: 35px;
      line-height: 35px;
      font-size: 12px;
      span {
        vertical-align: middle;
      }
      span.name {
        color: #999;
        padding-right: 3px;
        width: 65px;
      }
      i {
        font-size: 20px;
        vertical-align: middle;
        padding-left: 5px;
      }
      .select-state {
        color: #333;
        display: inline-block;
        width: 256px;
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
        max-width: 260px;
        display: inline-block;
        vertical-align: middle;
      }
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
          width: 356px;
        }
        .contact-address-input {
          vertical-align: middle;
          margin-left: 10px;
        }
      }
    }
  }
  .edit-btn {
    position: fixed;
    top: 32px;
    right: 40px;
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
      width: 350px;
      text-align: left;
      position: relative;
      margin-left: 17px;
      .el-upload__tip {
        color: #b5b5b5;
        position: absolute;
        width: 100%;
        bottom: 0;
      }
      .banner-tip {
        color: #b5b5b5;
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
