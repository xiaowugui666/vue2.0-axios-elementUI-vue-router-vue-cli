<template>
    <div style="height: 100%">
      <menu-left></menu-left>
      <div class="add-trends-content">
        <div class="add-header">动态管理 > 新增/编辑动态</div>
        <div class="add-body">
          <div class="add-title"><span></span><span>内容编辑</span></div>
          <div class="hr"></div>
          <div class="add-topic left-padding">
            <span class="pre-text required">标      题 ：</span>
            <el-input
              size="small"
              v-model="title"></el-input>
          </div>
          <div class="description left-padding">
            <span class="pre-text">简      述 ：</span>
            <textarea type="textarea" class="add-textarea" v-model="textContent"></textarea>
          </div>
          <div class="add-message left-padding">
            <span class="pre-text required">内      容 ：</span>
            <textarea type="textarea" class="add-textarea" v-model="textContent"></textarea>
          </div>
          <div class="add-imgs left-padding">
            <span class="pre-text required">配      图 ：</span>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
          <el-button class="add-button" size="small" type="success">保存</el-button>
        </div>
      </div>
    </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
export default {
  data () {
    return {
      // 长动态标题
      title: '',
      // 长动态简述
      description: '',
      // 文章内容
      textContent: '',
      // 图片上传列表
      fileList: []
    }
  },
  methods: {
    handlePictureCardPreview (file) {
      console.log(1111)
      console.log(file)
    },
    handleRemove (file) {
      console.log(2222)
      console.log(file)
    }
  },
  components: {
    menuLeft
  }
}
</script>

<style lang="less">
  .add-trends-content {
    .el-upload {
      width: 80px;
      height: 80px;
    }
    .el-upload--picture-card {
      border: 1px dashed #D5D5D5;
      border-radius: 0;
      background: white;
    }
    .el-icon-plus {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      vertical-align: top;
      font-size: 20px;
      text-align: center;
      line-height: 78px;
      width: 78px;
      height: 78px;
      color: #d5d5d5;
    }
    .el-upload-list--picture-card {
      display: inline-block;
      li {
        width: 80px;
        height: 80px;
        border-radius: 0;
      }
    }
    .el-input {
      width: 256px;
      height: 30px;
    }
    .el-input__inner{
      height: 30px;
      line-height: 30px;
      border: 1px solid #D5D5D5;
      border-radius: 2px;
    }
    .el-input--suffix .el-input__inner {
      padding:0 12px;
      font-size: 12px;
      color: @b3;
      line-height: 15px;
    }
  }
</style>
<style scoped lang="less">
.add-trends-content {
  margin-left: 200px;
  margin-right: 20px;
  min-width: 1100px;
  height: 100%;
  .add-header {
    padding: 15px 20px;
    font-size: 12px;
    color: #888888;
    line-height: 16px;
  }
  .add-body {
    min-width: 1100px;
    background: #ffffff;
    height: auto;
    min-height: 88%;
    padding: 20px;
    .add-title {
      font-size: 14px;
      color: #222222;
      line-height: 17px;
      span:first-child::before {
        content: '';
        width: 3px;
        height: 13px;
        background: #FA505D;
        display: inline-block;
        vertical-align: middle;
        margin-top: -1px;
        margin-right: 10px;
      }
    }
    .hr {
      height: 2px;
      background: #D5D5D5;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .add-topic {
      padding-bottom: 20px;
    }
    .add-message {
      margin-top: 20px;
    }
    .add-description {
      margin-top: 20px;
    }
    .add-imgs {
      margin-top: 20px;
      >div {
        display: inline-block;
      }
    }
    .add-button {
      margin-top: 30px;
      margin-left: 74px;
      width: 80px;
      height: 30px;
      background-color: #FA505D;
    }
    /* 公共样式 */
    .left-padding {
      padding-left: 10px;
    }
    .pre-text {
      font-size: 12px;
      display: inline-block;
      padding-top: 10px;
      color: #3A3A3A;
      text-align: right;
      line-height: 15px;
      vertical-align: top;
      position: relative;
      white-space:pre
    }
    .add-textarea {
      display: inline-block;
      border: 1px solid #d5d5d5;
      padding: 10px;
      width: 236px;
      min-height: 100px;
    }
    .required::before {
      position: absolute;
      content: '*';
      color: #DE5B67;
      margin-left: -10px;
      padding-right: 5px;
    }
  }
}
</style>
