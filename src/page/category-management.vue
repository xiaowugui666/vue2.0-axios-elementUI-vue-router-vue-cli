<template>
  <div>
    <menu-left routeIndex="3-2"></menu-left>
    <div class="category-management-object content-box">
      <div class="category-management-content">
        <el-button @click="dialogVisible=true;addFirstCategory=true" type="primary" size="small" class="first-category-management">新增一级类目</el-button>
        <div class="two-level-category-list">
          <ul>
            <li v-for="(item, index) in categoryList" :key="index">
              <el-collapse accordion>
                <el-collapse-item>
                  <template slot="title">
                    <div class="one-level-img"><img :src="yiqixuanDomainUrl+item.icon_url" alt=""></div>
                    <div class="one-level-name">
                      <p class="one-level-category">{{item.name}}</p>
                      <p class="two-level-category">二级分类有 {{item.children?item.children.length:0}} 项</p>
                    </div>
                    <el-button @click="(event)=>editFirstCategoryBtn(item.id, item.icon_url, item.name, event)" type="primary" size="mini" class="edit-first-category">编辑</el-button>
                    <el-button @click="(event)=>deleteGoodsCategoryConfirm(item.id,event)" class="one-level-delete" type="primary" size="mini" >删除</el-button>
                  </template>
                  <div class="collapse-body clear">
                    <el-tag
                      :key="index2"
                      v-for="(tag, index2) in item.children"
                      closable
                      :disable-transitions="false"
                      @close="alignmentHandleClose(tag, index)">
                      <span class="el-tag-bar">{{tag.name}}</span>
                      <div class="tag-img">
                        <el-upload
                          class="avatar-uploader"
                          :action="qiniuUploadUrl"
                          :data="upToken"
                          accept=".jpg,.png"
                          :show-file-list="false"
                          :on-success="(res,file)=>handleAvatarSuccess(res,file,item,tag)"
                          :before-upload="beforeAvatarUpload">
                          <img :src="yiqixuanDomainUrl + item.children[index2].icon_url" class="avatar">
                        </el-upload>
                      </div>
                    </el-tag>
                    <el-input
                      class="input-new-tag"
                      v-if="inputSpacVisible[index]"
                      v-model="inputSpacValue"
                      :ref="'saveSpecTagInput'+index"
                      size="small"
                      maxlength="20"
                      @keyup.enter.native="handleInputSpec(index, item.id)"
                      @blur="handleInputSpec(index, item.id)"
                    >
                    </el-input>
                    <el-button v-else @click="showSpecInput(index)" type="primary" size="small" class="button-new-tag">添加二级分类</el-button>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </li>
          </ul>
        </div>
        <div class="category-management-dialog">
          <el-dialog
            :title="addFirstCategory?'新增一级分类':'编辑一级分类'"
            :visible.sync="dialogVisible"
            width="620px"
            :before-close="handleClose">
            <div class="first-category-list">
              <ul>
                <li>
                  <span class="name required">类目名称：</span>
                  <input v-validate="'required'" name="类目名称" v-model.trim="firstCategory.name" class="category-name-input" type="text" maxlength="20">
                  <div class="err-tips">{{ errors.first('类目名称') }}</div>
                </li>
                <li>
                  <span class="name required alignment-top">添加图片：</span>
                  <div class="first-category-upload">
                    <el-upload
                      class="avatar-uploader"
                      :action="qiniuUploadUrl"
                      :data="upToken"
                      accept=".jpg,.png"
                      :show-file-list="false"
                      :on-success="firstCategorySuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="firstCategory.icon_url" :src="yiqixuanDomainUrl+firstCategory.icon_url" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                  <p class="first-category-tips">图片请控制在1MB以内，支持jpg、jpeg、png格式的图片</p>
                  <div class="err-tips" :style="{'display':firstCategoryImage?'none':'block'}">请先添加图片</div>
                </li>
              </ul>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmationModification" size="small">确 定</el-button>
            <el-button @click="handleClose" size="small">取 消</el-button>
          </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuLeft from '@/components/menu-left'
import {mapState} from 'vuex'
import {goodsCategory, addGoodsCategory, deleteGoodsCategory, updateGoodsCategoryPic, getQnToken} from '../axios/api.js'
export default {
  data () {
    return {
      dialogVisible: false,
      categoryList: [],
      inputSpacVisible: [],
      inputSpacValue: '',
      firstCategory: {
        parent_id: 0,
        name: '',
        icon_url: ''
      },
      firstCategoryId: 0,
      addFirstCategory: true, // 新增或者编辑一级分类
      firstCategoryImage: true,
      // 七牛上传图片所需要的token
      upToken: {}
    }
  },
  created () {
    this.getCategoryList()
    this.getImageToken()
  },
  methods: {
    // 获取商品类目列表
    getCategoryList () {
      goodsCategory().then(res => {
        if (res.data) {
          this.categoryList = res.data
        } else {
          this.dialogVisible = true
        }
      }, res => {
        this.categoryList = []
        this.dialogVisible = true
      })
    },
    // 获取图片上传七牛的token
    getImageToken () {
      getQnToken('image').then(res => {
        this.upToken.token = res.data.token
      })
    },
    // 关闭一级类目选择框之前的动作
    handleClose () {
      this.firstCategory.name = ''
      this.firstCategory.icon_url = ''
      this.dialogVisible = false
    },
    // 确认修改一级类目
    confirmationModification () {
      this.$validator.validateAll().then((msg) => {
        if (msg) {
          if (!this.firstCategory.icon_url) {
            this.firstCategoryImage = false
            return false
          }
          this.firstCategoryImage = true
          if (this.addFirstCategory) {
            // 判断一级分类名称是否重复
            for (let v of this.categoryList) {
              if (v.name === this.firstCategory.name) {
                this.$message.warning('一级分类名称重复！')
                return false
              }
            }
            // 添加一级分类
            addGoodsCategory(this.firstCategory).then(res => {
              this.$message.success('添加分类成功！')
              let data = res.data
              let cate = {
                id: data.id,
                name: data.name,
                icon_url: data.icon_url,
                parent_id: 0,
                children: []
              }
              this.categoryList.push(cate)
              this.handleClose()
            }).catch()
          } else {
            // 编辑一级分类
            updateGoodsCategoryPic(this.firstCategory, this.firstCategoryId).then(res => {
              this.$message.success('修改分类成功！')
              for (let v of this.categoryList) {
                if (v.id === this.firstCategoryId) {
                  v.name = this.firstCategory.name
                  v.icon_url = this.firstCategory.icon_url
                }
              }
              // this.getCategoryList()
              this.handleClose()
            }).catch()
          }
        } else {
          if (!this.firstCategory.icon_url) {
            this.firstCategoryImage = false
            return false
          }
        }
      })
    },
    // 删除一级商品分类
    deleteGoodsCategoryConfirm (id, e) {
      // console.log(123)
      e.stopPropagation()
      this.$confirm('确认删除此分类？')
        .then(_ => {
          deleteGoodsCategory(id, 0).then(res => {
            this.$message('删除分类成功！')
            for (let [i, v] of this.categoryList.entries()) {
              if (v.id === id) {
                this.categoryList.splice(i, 1)
              }
            }
          })
        })
        .catch(_ => {})
    },
    // 删除选中的规则值
    alignmentHandleClose (tag, index) {
      let values = this.categoryList[index].children
      // 删除选择的二级分类
      deleteGoodsCategory(tag.id, this.categoryList[index].id).then(res => {
        // this.$message('删除二级分类成功！')
        this.categoryList[index].children.splice(values.indexOf(tag), 1)
      })
    },
    // 显示 规则值输入框，使输入框获取焦点
    showSpecInput (index) {
      this.$set(this.inputSpacVisible, index, true)
      this.$nextTick(_ => {
        this.$refs['saveSpecTagInput' + index][0].$refs.input.focus()
      })
    },
    // 获取二级类目输入框的内容，赋值给this.categoryList[index].children，清空this.inputSpacValue
    handleInputSpec (index, id) {
      let inputValue = this.inputSpacValue
      let _this = this
      if (inputValue) {
        if (f()) {
          let data = {
            'parent_id': id,
            'name': inputValue,
            'icon_url': 'level2_cate_default.png'
          }
          // 请求接口，保存二级商品分类
          addGoodsCategory(data).then(res => {
            // this.$message.success('添加二级分类成功！')
            data.id = res.data.id
            this.categoryList[index].children.push(data)
          })
        }
      }
      this.$set(this.inputSpacVisible, index, false)
      this.inputSpacValue = ''

      function f () {
        for (let k of _this.categoryList[index].children) {
          if (inputValue === k.name) {
            _this.$message({
              showClose: true,
              message: '二级分类重复！',
              type: 'warning'
            })
            return false
          }
        }
        return true
      }
    },
    // 上传文件之前对上传内容的验证
    beforeAvatarUpload (file) {
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
    // 二级分类图片上传
    handleAvatarSuccess (res, file, parent, children) {
      // 修改上传图片地址，修改二级分类图片地址
      updateGoodsCategoryPic({
        'icon_url': res.key,
        'name': children.name,
        'parent_id': parent.id
      }, children.id).then(resp => {
        children.icon_url = res.key
      })
    },
    firstCategorySuccess (res, file) {
      this.firstCategory.icon_url = res.key
    },
    editFirstCategoryBtn (id, url, name, e) {
      e.stopPropagation()
      this.addFirstCategory = false
      this.firstCategoryId = id
      this.firstCategory.icon_url = url
      this.firstCategory.name = name
      this.dialogVisible = true
    }
  },
  computed: {
    ...mapState(['yiqixuanDomainUrl', 'qiniuUploadUrl'])
  },
  components: {
    menuLeft
  }
}
</script>

<style scoped lang="less">
  .category-management-object {
    .category-management-content {
      background: #fff;
      padding: 20px;
    }
    .two-level-category-list {
      li {
        position: relative;
        background: #EFEFEF;
        margin-top: 20px;
        .edit-first-category {
          margin-left: 20px;
          vertical-align: middle;
        }
        .one-level-img {
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;
          width: 60px;
          height: 60px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .one-level-delete {
          display: inline-block;
          vertical-align: middle;
        }
        .one-level-name {
          display: inline-block;
          vertical-align: middle;
          .one-level-category {
            font-size: 14px;
            color: @b2;
            margin-bottom: 20px;
          }
          .two-level-category {
            color: @b8;
            font-size: 12px;
          }
        }
        .collapse-body {
          .tag-img {
            width: 85px;
            height: 85px;
            padding: 10px;
            background: #fff;
            text-align: center;
            margin: 10px auto 0;
            position: relative;
            &::before {
              content: '';
              display: block;
              position: absolute;
              left: 50%;
              top: -6px;
              width: 0;
              height: 0;
              transform: translateX(-50%) rotateZ(45deg);
              border: 8px solid #fff;
              border-right-color: transparent;
              border-bottom-color: transparent;
            }
            .avatar {
              width: 85px;
              height: 85px;
            }
          }
          .el-tag {
            display: inline-block;
            vertical-align: middle;
            position: relative;
            color: #333;
            font-size: 12px;
            margin-right: 10px;
            padding: 0;
            height: auto;
            border: none;
            background: transparent;
            margin-bottom: 10px;
            .el-tag-bar {
              border:1px solid #d5d5d5;
              border-radius: 3px;
              line-height: 30px;
              height: 32px;
              display: inline-block;
              width: 100%;
              background: #fff;
              box-sizing: border-box;
              padding: 0 20px 0 10px;
            }
          }
        }
      }
    }
    .category-management-dialog {
      .first-category-list {
        font-size: 0;
        border-top: 2px solid #f5f5f5;
        border-bottom: 2px solid #f5f5f5;
        padding: 20px 20px 0;
        li {
          padding-bottom: 20px;
          position: relative;
          .name {
            display: inline-block;
            vertical-align: middle;
            width: 70px;
            color: #3a3a3a;
            font-size: 12px;
          }
          .name.alignment-top {
            vertical-align: top;
            padding-top: 7px;
          }
          .required::before {
            content: '*';
            color: @mainC;
            margin-left: -10px;
            padding-right: 5px;
          }
          .err-tips {
            position: absolute;
            bottom: 4px;
            left: 70px;
            color: @mainC;
            font-size: 12px;
          }
          .first-category-upload {
            display: inline-block;
            vertical-align: middle;
            padding-right: 20px;
            .avatar-uploader-icon {
              font-size: 20px;
              box-sizing: border-box;
              color: @bc;
              width: 80px;
              height: 80px;
              line-height: 80px;
              text-align: center;
              border: 1px dashed @bc;
            }
            .avatar {
              width: 80px;
              height: 80px;
              display: block;
            }
          }
          .first-category-tips {
            display: inline-block;
            vertical-align: middle;
            font-size: 12px;
            color: @b8;
          }
          input {
            width: 234px;
            padding: 0 10px;
            border: 1px solid @bc;
            display: inline-block;
            height: 30px;
            line-height: 30px;
            vertical-align: middle;
          }
        }
      }
    }
  }
</style>
<style lang="less">
  .category-management-object {
    .el-collapse {
      font-size: 14px;
      color: #333333;
    }
    .el-collapse-item__header {
      background: #EFEFEF;
      border-bottom-color: #fff;
      height: auto;
      line-height: normal;
      padding: 20px 15px 20px 20px;
      font-size: 0;
    }
    .el-collapse-item__arrow {
      margin-top: 6px;
      font-size: 14px;
      color: @b8;
    }
    .el-collapse-item__wrap {
      padding: 20px;
      background: #EFEFEF;
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
    .collapse-body {
      .el-tag__close {
        position: absolute;
        right: 3px;
        top: 8px;
      }
      .button-new-tag {
        display: inline-block;
        vertical-align: top;
      }
      .input-new-tag {
        width: 100px;
        display: inline-block;
        vertical-align: top;
      }
    }
    .el-dialog__body {
      padding: 0 20px;
    }
    .el-dialog__footer {
      padding-top: 20px;
    }
    .el-dialog__title {
      font-size: 14px;
      font-weight: bold;
      color: @b2;
    }
  }
</style>
