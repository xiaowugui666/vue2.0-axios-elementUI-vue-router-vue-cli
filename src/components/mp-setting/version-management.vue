<template>
  <div class="version-management">
    <div class="submission-audit-box">
      <p class="tips">上线小程序，首先需要提交审核。</p>
      <div>
        <el-button @click="subMpaAudit" :disabled="mpaAudit===2" type="success" size="small">{{mpaAudit===2?'审核中':'提交审核'}}</el-button>
      </div>
      <p class="take-care">注意：请确保您已经正确填写了 <a href="" target="_blank">必要的类目设置</a> ，且已经上架了商品（空白店铺可能无法通过微信审核）；</p>
    </div>
    <div class="history-version-update-record">
      <div class="title">历史版本更新记录</div>
      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <div class="version-number-time">
              <span class="version-number">版本号：V1.0.1</span>
              <span class="version-time">（2018-08-12）</span>
            </div>
          </template>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import {mpaAudit, mpaHistory} from '@/axios/api'
export default {
  data () {
    return {
      mpaAudit: 1
    }
  },
  created () {
    this.getMpaAudit()
    this.getMpaHistory()
  },
  methods: {
    // 获取小程序审核状态
    getMpaAudit () {
      mpaAudit('get').then(res => {
        this.mpaAudit = res.data
      })
    },
    // 提交小程序审核
    subMpaAudit () {
      mpaAudit('post').then(res => {
        this.$message.success('提交成功！')
        this.mpaAudit = 2
      })
    },
    // 获取小程序更新记录
    getMpaHistory () {
      mpaHistory().then(res => {
      })
    }
  }
}
</script>

<style scoped lang="less">
.version-management {
  .submission-audit-box {
    background: #fff;
    padding: 20px 25px 30px;
    font-size: 12px;
    .tips {
      color: @fMain;
      padding-bottom: 20px;
    }
    .take-care {
      color: @b9;
      padding-top: 10px;
      a {
        color: #58A8FF;
        text-decoration: underline;
        font-weight: 600;
        cursor: pointer;
      }
    }
  }
  .history-version-update-record {
    background: #fff;
    margin-top: 20px;
    padding: 0 20px;
    font-size: 14px;
    .title {
      padding: 20px 0;
      font-size: 14px;
      color: @fMain;
      font-weight: bold;
    }
    .version-number-time {
      font-size: 0;
      &::before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 3px;
        height: 14px;
        margin-right: 10px;
        background: @mainC;
      }
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .version-number {
        font-size: 14px;
        color: @fMain;
        margin-right: 20px;
      }
      .version-time {
        font-size: 12px;
        color: @b9;
      }
    }
  }
  .el-collapse {
    border: none;
  }
  .el-collapse-item {
    border-top: 2px solid @bg;
  }
}
</style>
<style lang="less">
  .version-management {
    .el-collapse-item__wrap, .el-collapse-item__header {
      border-bottom: none;
    }
  }
</style>
