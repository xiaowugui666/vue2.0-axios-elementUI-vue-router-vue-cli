<template>
    <div style="height: 100%">
      <menu-left routeIndex="9-1"></menu-left>
      <div class="add-trends-content">
        <div class="add-header">动态管理 > 新增/编辑动态</div>
        <div class="add-body">
          <div class="add-title"><span></span><span>内容编辑</span></div>
          <div class="hr"></div>
          <div class="add-topic left-padding" v-if="trendType == 2 || addType == 2">
            <span class="pre-text required">标      题 ：</span>
            <el-input
              size="small"
              v-validate="'required'"
              name="商品名称"
              v-model="title"></el-input>
            <div class="err-tips">{{ errors.first('商品名称') }}</div>
          </div>
          <div class="description left-padding" v-if="trendType == 2 || addType == 2">
            <span class="pre-text">简      述 ：</span>
            <textarea type="textarea" class="add-textarea" v-model="textContent"></textarea>
          </div>
          <div class="add-thumbnail left-padding" v-if="trendType == 2 || addType == 2">
            <span class="pre-text">缩 略 图 ： </span>
            <el-upload
              class="avatar-uploader"
              :action="qiniuUploadUrl"
              :data="upToken"
              accept=".jpg,.png"
              :show-file-list="false"
              :on-success="(res,file)=>handleAvatarSuccess(res,file)">
              <img v-if="imgUrl" :src="yiqixuanDomainUrl + imgUrl">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="add-message left-padding">
            <span class="pre-text required">内      容 ：</span>
            <div class="rich-text-editor clear" v-if="trendType == 2 || addType == 2">
              <!--商品图文详情编辑框-->
              <quill-editor v-model.trim="quillContent"
                            ref="myQuillEditor"
                            v-validate="'required'"
                            name="富文本内容"
                            :options="editorOption"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @ready="onEditorReady($event)">
              </quill-editor>
              <!-- 文件上传input 将它隐藏-->
              <el-upload :action="qiniuUploadUrl"
                         :before-upload='beforeUpload'
                         :data="upToken"
                         accept=".jpg,.png"
                         :on-success='quillUpScuccess'
                         ref="quillUpload" style="display:none">
                <el-button size="small" type="primary" ref="quillUploadButton">点击上传</el-button>
              </el-upload>
            </div>
            <textarea v-else class="add-textarea" v-model="quillContent"></textarea>
          </div>
          <div class="add-imgs left-padding" v-if="trendType == 1 || addType == 1">
            <span class="pre-text required">配      图 ：</span>
            <el-upload
              :action="qiniuUploadUrl"
              :data="upToken"
              accept=".jpg,.png"
              list-type="picture-card"
              :file-list="fileList"
              :on-remove="removeFileList"
              :before-upload="(value)=>imgsBeforeUpload(value)"
              :on-success="(res,file, fileList)=>handlePictureList(res,file, fileList)">
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
          <el-button class="add-button" size="small" type="success" @click="saveTrends">保存</el-button>
        </div>
      </div>
    </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
import {getQnToken, getTrendDetail, putTrendDetail, addTrends} from '../axios/api'
import {mapState} from 'vuex'
import { quillEditor } from 'vue-quill-editor' // 调用编辑器
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  data () {
    // 工具栏配置
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],

      [{'header': 1}, {'header': 2}],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      [{'direction': 'rtl'}],
      [{'size': ['small', false, 'large', 'huge']}],
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      [{'color': []}, {'background': []}],
      [{'font': []}],
      [{'align': []}],
      ['link', 'image'],
      ['clean']
    ]
    return {
      // 动态类型
      trendType: '',
      // 长动态标题
      title: '',
      // 新增动态类型
      addType: this.$route.query.type || 0,
      // 长动态简述
      textContent: '',
      // 图片上传列表
      fileList: [],
      imgsList: [],
      // 动态数据
      data: {},
      // 七牛token
      upToken: {},
      quillContent: '',
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions
          }
        }
      },
      imgUrl: ''
    }
  },
  mounted () {
    if (this.addType == 2) {
      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
    }
    // 如果为编辑动态，获取动态详情
    if (this.$route.query.id) {
      getTrendDetail(this.$route.query.id).then(res => {
        console.log(res.data.images)
        // 赋值操作
        this.data = res.data
        this.trendType = res.data.type
        this.title = res.data.title
        this.textContent = res.data.description
        this.quillContent = res.data.content
        let tempArr = res.data.images
        for (let x = 0; x < tempArr.length; x++) {
          tempArr[x].url = this.yiqixuanDomainUrl + tempArr[x].img_url
          tempArr[x].icon_url = tempArr[x].img_url
          this.imgsList.push(tempArr[x].img_url)
        }
        console.log(this.imgsList)
        this.fileList = tempArr
        // 图片路径赋值 ///////////////////////////////////////须修改
        this.imgUrl = res.data.cover_url
      }).catch(err => {
        console.log(err)
      })
    }
    // 获取七牛token
    this.getImageToken()
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
    // 点击保存
    saveTrends () {
      // 编辑动态
      if (this.$route.query.id) {
        let params = {}
        params.type = this.trendType
        params.content = this.quillContent
        // 如果为编辑短动态
        if (this.trendType == 1) {
          params.feed_images = this.imgsList
        } else {
          params.title = this.title
          params.description = this.textContent
          params.cover_url = this.imgUrl
        }
        putTrendDetail(params, this.$route.query.id).then(res => {
          console.log(res)
          if (res.status == 200) {
            this.$router.push({name: 'trendsManagement'})
          }
        }).catch(() => {
          this.$message({
            message: '保存动态失败，请稍后重试',
            type: 'error'
          })
        })
      } else {
        if (this.quillContent && (this.fileList.length || this.title)) {
          // 新增动态
          let params = {}
          params.content = this.quillContent
          params.type = this.addType
          if (this.addType == 1) { // 发布短动态
            params.feed_images = this.imgsList
          } else {
            params.title = this.title
            params.description = this.textContent
            params.cover_url = this.imgUrl
          }
          addTrends(params).then(res => {
            this.$router.push({name: 'trendsManagement'})
          }).catch(err => {
            console.log('新增动态打印错误：')
            console.log(err)
            this.$message({
              message: '新增动态失败，请稍后重试',
              type: 'error'
            })
          })
        } else {
          this.$message({
            message: '请完善必填项',
            type: 'info'
          })
        }
      }
    },
    // 上传缩略图
    handleAvatarSuccess (file) {
      console.log(1111)
      console.log(file)
      this.imgUrl = file.key
    },
    // 点击缩略图删除
    removeFileList (file, fileList) {
      this.fileList = fileList
      // 遍历删除imgsList当前删除项
      for (let i = 0; i < this.imgsList.length; i++) {
        if (this.imgsList[i] == file.img_url) {
          this.imgsList.splice(i, 1)
        }
      }
      console.log(this.imgsList)
    },
    // 判断配图是否重复
    imgsBeforeUpload (file) {
      console.log(file)
      for (let v of this.fileList) {
        if (file.name === v.modified) {
          this.$message.error('不能上传重复的图片!')
          return false
        }
      }
      this.beforeUpload(file)
      if (this.fileList.length == 8) {
        this.$message({
          message: '一次最多上传8张图片',
          type: 'info'
        })
        return false
      }
    },
    // 图片上传之前的验证
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2
      const isMt = file.size > 100
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或者 PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return false
      }
      if (!isMt) {
        this.$message.error('上传图片大小不能小于 100B!')
        return false
      }
    },
    // 新增配图
    handlePictureList (res, file) {
      this.fileList.push({url: this.yiqixuanDomainUrl + file.response.key, icon_url: file.response.key})
      this.imgsList.push(file.response.key)
      console.log(this.fileList)
      console.log(this.imgsList)
    },
    // 富文本框操作
    onEditorBlur (val) {
      console.log(val)
      console.log(this.quillContent)
    },
    onEditorFocus (val) {
    },
    onEditorReady (val) {
    },
    // 点击图片ICON触发事件
    imgHandler (state) {
      this.addRange = this.$refs.myQuillEditor.quill.getSelection()
      if (state) {
        let fileInput = this.$refs.quillUploadButton.$el
        fileInput.click() // 加一个触发事件
      }
    },
    // 商品卖点详情，图片上传成功后的操作
    quillUpScuccess (e, file, fileList) {
      let vm = this
      let url = this.yiqixuanDomainUrl + e.key
      if (url != null && url.length > 0) { // 将文件上传后的URL地址插入到编辑器文本中
        let value = url
        // API: https://segmentfault.com/q/1010000008951906
        // this.$refs.myTextEditor.quillEditor.getSelection();
        // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
        vm.addRange = vm.$refs.myQuillEditor.quill.getSelection()
        value = value.indexOf('http') !== -1 ? value : 'http:' + value
        vm.$refs.myQuillEditor.quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, 'image', value, Quill.sources.USER) // 调用编辑器的 insertEmbed 方法，插入URL
      } else {
        this.$message.error(`插入失败`)
      }
      this.$refs['quillUpload'].clearFiles() // 插入成功后清除input的内容
    }
  },
  computed: {
    ...mapState(['qiniuUploadUrl', 'yiqixuanDomainUrl']),
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  components: {
    menuLeft,
    quillEditor
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
      line-height: 80px;
      width: 80px;
      height: 80px;
      color: #d5d5d5;
    }
    .add-thumbnail {
      .el-upload {
        width: 260px;
        height: 140px;
      }
      .el-icon-plus {
        line-height: 140px;
        width: 260px;
        height: 140px;
        vertical-align: middle;
      }
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
      padding-left: 10px;
      border: 1px solid #D5D5D5;
      color: #222222;
      border-radius: 2px;
    }
    .el-input--suffix .el-input__inner {
      padding:0 12px;
      font-size: 12px;
      color: @b3;
      line-height: 15px;
    }
    .ql-editor {
      min-height: 200px;
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
      position: relative;
    }
    .add-message {
      margin-top: 20px;
      .rich-text-editor {
        display: inline-block;
        width: 90%;
        min-height: 250px;
      }
    }
    .add-description {
      margin-top: 20px;
    }
    .add-thumbnail {
      margin-top: 20px;
      .avatar-uploader {
        display: inline-block;
        width: 260px;
        height: 140px;
        img {
          width: 260px;
          height: 140px;
          vertical-align: middle;
        }
        i {
          border: 1px dashed #d5d5d5;
        }
      }
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
    .err-tips {
      position: absolute;
      bottom: 4px;
      font-size: 12px;
      left: 78px;
      color: @mainC;
    }
  }
}
</style>
