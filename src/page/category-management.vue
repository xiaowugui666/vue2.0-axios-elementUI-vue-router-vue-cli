<template>
    <div class="category-management-object">
      <div class="category-management-content">
        <el-button @click="dialogVisible = true" type="primary" size="small" class="first-category-management">一级类目编辑管理</el-button>
        <div class="two-level-category-list">
          <ul>
            <li v-if="item.active" v-for="(item, index) in categoryList" :key="index">
              <el-collapse accordion>
                <el-collapse-item>
                  <template slot="title">
                    <span class="one-level-category">{{item.label}}</span>
                    <span class="two-level-category">二级分类有 {{item.children?item.children.length:0}} 项</span>
                  </template>
                  <div class="collapse-body clear">
                    <el-tag
                      :key="index2"
                      v-for="(tag, index2) in item.children"
                      closable
                      :disable-transitions="false"
                      @close="alignmentHandleClose(tag,index)">
                      <span class="el-tag-bar">{{tag.label}}</span>
                      <div class="tag-img">
                        <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-change='(value)=>changeUpload(value, index, index2)'
                          :on-success="(res,file)=>handleAvatarSuccess(res,file,index)"
                          :before-upload="(value)=>beforeAvatarUpload(value, index)">
                          <img :src="item.children[index2].imgSrc" class="avatar">
                        </el-upload>
                      </div>
                    </el-tag>
                    <el-input
                      class="input-new-tag"
                      v-if="inputSpacVisible[index]"
                      v-model="inputSpacValue"
                      :ref="'saveSpecTagInput'+index"
                      size="small"
                      @keyup.enter.native="handleInputSpec(index)"
                      @blur="handleInputSpec(index)"
                    >
                    </el-input>
                    <el-button v-else @click="showSpecInput(index)" type="primary" size="small" class="button-new-tag">添加规格值</el-button>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </li>
          </ul>
        </div>
        <div class="category-management-dialog">
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
          </span>
          </el-dialog>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      categoryList: [
        {
          active: true,
          value: '选项1',
          label: '黄金糕',
          'children': [
            {
              value: '选项1',
              label: '黄金糕121',
              imgSrc: '/static/test/ceshi.png'
            },
            {
              value: '选项1',
              label: '黄金糕12321',
              imgSrc: '/static/test/ceshi.png'
            }
          ]
        }, {
          active: true,
          value: '选项2',
          label: '双皮奶',
          'children': []
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          active: true,
          value: '选项5',
          label: '北京烤鸭',
          'children': []
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }, {
          active: true,
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      inputSpacVisible: [],
      inputSpacValue: ''
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 删除选中的规则值
    alignmentHandleClose (tag, index) {
      let values = this.categoryList[index].children
      this.categoryList[index].children.splice(values.indexOf(tag), 1)
    },
    // 显示 规则值输入框，使输入框获取焦点
    showSpecInput (index) {
      this.$set(this.inputSpacVisible, index, true)
      this.$nextTick(_ => {
        // console.log(this.$refs)
        this.$refs['saveSpecTagInput' + index][0].$refs.input.focus()
      })
    },
    // 获取二级类目输入框的内容，赋值给this.categoryList[index].children，清空this.inputSpacValue
    handleInputSpec (index) {
      let inputValue = this.inputSpacValue
      if (inputValue) {
        for (let k of this.categoryList[index].children) {
          if (inputValue === k.name) {
            this.$message({
              showClose: true,
              message: '规格值重复！',
              type: 'error'
            })
            return false
          }
        }
        let children = {
          id: index,
          'label': inputValue,
          'imgSrc': '/static/test/ceshi.png'
        }
        this.categoryList[index].children.push(children)
      }
      this.$set(this.inputSpacVisible, index, false)
      this.inputSpacValue = ''
    },
    // 二级分类图片上传
    handleAvatarSuccess (res, file, index) {
      console.log(res, file, index)
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file, index) {},
    changeUpload (file, index, index2) {
      // console.log(file)
      this.categoryList[index].children[index2].imgSrc = file.url
    }
  }
}
</script>

<style scoped lang="less">
  .category-management-object {
    margin-left: 200px;
    margin-right: 20px;
    padding-top: 20px;
    min-width: 1100px;
    .category-management-content {
      background: #fff;
      padding: 20px;
      .first-category-management {
      }
    }
    .two-level-category-list {
      li {
        background: #EFEFEF;
        margin-top: 10px;
        .one-level-category {
          width: 100px;
          display: inline-block;
        }
        .two-level-category {
          color: #666;
          font-size: 12px;
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
              width: 100%;
              height: 100%;
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
              line-height: 32px;
              height: 32px;
              display: inline-block;
              width: 100%;
              background: #fff;
              box-sizing: border-box;
              padding: 0 10px;
            }
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
      padding-left: 20px;
      padding-right: 10px;
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
        right: 0;
        top: 0;
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
  }
</style>
