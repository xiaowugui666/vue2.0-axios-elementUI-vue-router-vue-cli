<template>
    <div class="mp-setting-object">
      <div class="mp-setting-content">
        <p>
          <span class="">小程序名称：</span>
          <span>xxx小程序</span>
        </p>
        <p>
          <span>小程序ID：</span>
          <span>xxxxxxxxxxxxxxxxxxxxxxxxxx</span>
        </p>
        <el-button type="success" size="small" @click="dialogVisible = true">解绑小程序</el-button>
      </div>
      <div class="unbind-dialog">
        <el-dialog
          title="解除绑定"
          :visible.sync="dialogVisible"
          width="40%">
          <div>
            <p>解绑后，您将无权管理该店铺，但店铺数据将会保留。确定解绑以下小程序？</p>
            <div>
              <span class="mp-name">这里是小程序的名称</span>
              <span>APPID：这里是小程序的APPI</span>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button @click="dialogVisible = false" size="small" type="success">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    untieBtn () {}
  }
}
</script>

<style scoped lang="less">
  .mp-setting-object {
    margin-left: 200px;
    margin-right: 20px;
    padding-top: 20px;
    min-width: 1100px;
    .mp-setting-content {
      background: #fff;
      padding: 30px;
      p {
        padding-bottom: 20px;
        font-size: 12px;
        color: #333;
        span {
          display: inline-block;
          vertical-align: middle;
        }
        span:first-child {
          width: 90px;
          text-align: right;
          color: #999;
        }
      }
      .el-button--small {
        margin-top: 10px;
        margin-left: 94px;
      }
    }
    .unbind-dialog {
      p {
        font-size: 12px;
        color: #666;
        padding-bottom: 10px;
      }
      div {
        font-size: 14px;
        .mp-name {
          font-weight: bold;
          padding-right: 20px;
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
  .mp-setting-object {
    .el-dialog__header {
      font-size: 14px;
      color: #333;
      font-weight: bold;
      border-bottom: 2px solid #f5f5f5;
    }
    .el-dialog__body {
      padding: 20px;
    }
  }
</style>
