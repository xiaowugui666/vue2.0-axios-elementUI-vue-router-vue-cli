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
        <div v-show="active == 0" class="subject-info plate">
          <div class="plate-top">主体信息</div>
          <div class="subject-info-setting">
            <ul>
              <li>
                <span class="name">商铺名称：</span>
                <input type="text" v-model="shopName" placeholder="请输入店铺名称"/>
              </li>
              <li>
                <span class="name">主营类目：</span>
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
          </div>
        </div>
        <div v-show="active == 1" class="subject-information plate">
          <div class="plate-top">店铺信息</div>
        </div>
        <div v-show="active == 2" class="subject-information plate">
          <div class="plate-top">支付信息</div>
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
import ceshi from '../assets/ceshi.png'
import ceshi2 from '../assets/ceshi2.png'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  data () {
    return {
      settingStep: true,
      authorizedHeight: this.setAuthorizedHeight(),
      active: 0,
      shopName: '',
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
      textarea: 'wqetrwqerwesdfdfasldkfjalsejtlaweflsadkjflwe',
      options: regionData,
      selectedOptions: [],
      contactAddress: ''
    }
  },
  mounted () {
  },
  components: {
    firstSettingMenu,
    CodeToText
  },
  methods: {
    setAuthorizedHeight () {
      let wHeight = document.documentElement.clientHeight - 40 + 'px'
      return wHeight
    }
  }
}
</script>

<style scoped lang="less">
  .first-setting-object {
    margin-left: 200px;
    margin-right: 20px;
    padding-top: 20px;
    min-width: 1000px;
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
    }
    .subject-info-setting {
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
</style>
<style>
  .el-step__title.is-process {
    color: #333;
  }
  .el-step__title.is-wait {
    color: #d5d5d5;
  }
</style>
