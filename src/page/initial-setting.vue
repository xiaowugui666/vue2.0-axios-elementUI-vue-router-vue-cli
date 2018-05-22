<template>
  <div>
    <first-setting-menu></first-setting-menu>
    <div class="first-setting-object">
      <div v-show="settingStep" class="setting-step">
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
                <input type="text" v-model="shopName" placeholder="请输入店铺名称 (15个字符以内)"/>
              </li>
              <li>
                <span class="name required">主营类目：</span>
                <el-select v-model="value" size="small" class="select-state">
                  <el-option
                    v-for="item in selectStateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
            </ul>
            <div class="next-step">
              <el-button type="success" size="small" :disabled="false" @click="setStepActive">下一步</el-button>
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
                <span class="name alignment-top required">商铺描述：</span>
                <textarea class="shop-description-textarea" placeholder="请输入商品描述" v-model="textArea"></textarea>
              </li>
              <li>
                <span class="name alignment-top">banner：</span>
                <el-upload
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
                <input type="text" v-model="shopChiefName" placeholder="请输入店长姓名"/>
              </li>
              <li>
                <span class="name">联系电话：</span>
                <span>{{telNum}}</span>
              </li>
              <li>
                <span class="name">联系微信：</span>
                <input type="text" v-model="contactWeChat" placeholder="请输入联系微信号"/>
              </li>
              <li>
                <span class="name">客服电话：</span>
                <input type="text" v-model="customerServiceNum" placeholder="请输入客服电话"/>
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
                  <input class="contact-address-input" type="text" v-model="contactAddress" placeholder="请输入详细地址"/>
                </div>
              </li>
            </ul>
            <div class="next-step">
              <el-button type="success" size="small" :disabled="false" @click="setStepActive">下一步</el-button>
            </div>
          </div>
        </div>
        <div v-if="active == 2" class="pay-information plate">
          <div class="plate-top">支付信息</div>
          <div>
            <payment-info></payment-info>
            <div class="next-step">
              <el-button type="success" size="small" :disabled="true" @click="setStepActive">完成</el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-show="!settingStep" class="authorized-small-program-object" :style="{height:authorizedHeight}">
        <div class="authorized-small-program-title ">
          <span>小程序授权</span>
        </div>
        <div class="authorized-small-program-body">
          <h2>授权小程序就能开店啦</h2>
          <p>点击下面授权按钮，用小程序管理员微信号扫描授权即可开店</p>
          <el-row>
            <el-button type="success" size="small">已有小程序，授权</el-button>
            <el-button size="small">未注册过小程序？注册小程序</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firstSettingMenu from '@/components/first-setting-menu'
import paymentInfo from '@/components/payment-info'
import ceshi from '../assets/ceshi.png'
import ceshi2 from '../assets/ceshi2.png'
import { regionData, CodeToText } from 'element-china-area-data'
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      settingStep: true,
      authorizedHeight: this.setAuthorizedHeight(),
      active: 0,
      shopName: '',
      merchantNumber: '--',
      businessSecretKey: 'UedEVaPixDUY04g8MfGNUVBOx3noJSJu',
      p12Certificate: 'apiclient_cert.p12',
      checked: true,
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
      value: '食品',
      shopNum: 321354656454,
      creationTime: '2018-01-02 10:05',
      shopChiefName: '',
      telNum: 13611895011,
      contactWeChat: '',
      customerServiceNum: '',
      editState: false,
      imageUrl: ceshi,
      imageUrl2: ceshi2,
      textArea: 'wqetrwqerwesdfdfasldkfjalsejtlaweflsadkjflwe',
      options: regionData,
      selectedOptions: [],
      contactAddress: '',
      readingProtocol: false
    }
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
    ...mapState(['menuShow'])
  },
  methods: {
    ...mapMutations(['setMenuShow']),
    setAuthorizedHeight () {
      let wHeight = document.documentElement.clientHeight - 40 + 'px'
      return wHeight
    },
    setStepActive () {
      this.active++
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
    .authorized-small-program-object {
      background: #fff;
      min-height: 600px;
      position: relative;
      padding: 0 15px;
      .authorized-small-program-title {
        padding: 20px 0;
        border-bottom: 2px solid #f5f5f5;
        span {
          font-size: 14px;
          line-height: 17px;
          color: #333;
          &::before {
            content: '';
            display: block;
            float: left;
            width: 3px;
            height: 14px;
            background: #999;
            margin: 5px 10px 0 5px;
          }
        }
      }
      .authorized-small-program-body {
        position: absolute;
        text-align: center;
        top: 40%;
        left: 50%;
        transform: translate(-50%);
        h2 {
          color: #333;
          font-size: 30px;
          font-weight: normal;
        }
        p {
          padding-top: 40px;
          padding-bottom: 20px;
          font-size: 12px;
          color: #999;
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
