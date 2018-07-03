<template>
  <div class="version-management">
    <div class="submission-audit-box">
      <p class="tips">上线小程序，首先需要提交审核。</p>
      <div>
        <el-button @click="subMpaAudit" :disabled="mpaAudit===2" type="success" size="small">{{mpaAudit===2?'审核中':'提交审核'}}</el-button>
      </div>
      <p class="take-care">注意：请确保您已经正确填写了 <a href="http://www.51zan.cn/hotArticle.html?type=skill&articleId=29" target="_blank">必要的类目设置</a> ，且已经上架了商品（空白店铺可能无法通过微信审核）；</p>
    </div>
    <div class="history-version-update-record">
      <div class="title">历史版本更新记录</div>
      <el-collapse>
        <el-collapse-item v-for="(item,index) in versionRecordArray" :key="index">
          <template slot="title">
            <div class="version-number-time">
              <span class="version-number">版本号：{{item.template.version}}</span>
              <span class="version-time">（{{item.release_at}}）</span>
            </div>
          </template>
          <div class="version-update-inner">
            <ul>
              <li>
                <div class="column-title">新功能：</div>
                <p class="column-inner">{{item.template.description}}</p>
              </li>
              <li>
                <div class="column-title">改进：</div>
                <p class="column-inner">{{item.template.improvement}}</p>
              </li>
              <li>
                <div class="column-title">BUG修复：</div>
                <ol class="column-inner">
                  <li v-for="(item2,index2) in item.template.bug" :key="index2">{{item2}}</li>
                </ol>
              </li>
            </ul>
          </div>
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
      mpaAudit: 1,
      versionRecordArray: []
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
        this.versionRecordArray = res.data
        this.setVersionRecordArray()
      })
    },
    // 修改更新记录的数据
    setVersionRecordArray () {
      if (this.versionRecordArray.length > 0) {
        for (let v of this.versionRecordArray) {
          v.release_at = v.release_at.split(' ')[0]
          // console.log(v.template.bug.indexOf('\n'))
          v.template.bug = v.template.bug.split('\n')
        }
      }
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
    .version-update-inner {
      padding-left: 15px;
      padding-top: 10px;
      >ul >li {
        padding-bottom: 10px;
        .column-title {
          color: @b3;
          font-size: 12px;
        }
        .column-inner {
          color: @b9;
          font-size: 12px;
          padding-left: 27px;
          word-wrap: break-word;
        }
        ol.column-inner {
          /*list-style-type: decimal;*/
          >li {
            /*list-style: inherit;*/
          }
        }
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
