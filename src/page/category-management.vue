<template>
    <div class="category-management-object">
      <div class="category-management-content">
        <el-button @click="dialogVisible = true" type="primary" size="small" class="first-category-management">一级类目编辑管理</el-button>
        <div class="two-level-category-list">
          <ul>
            <li v-for="(item, index) in categoryList" :key="index">
              <el-collapse accordion>
                <el-collapse-item>
                  <template slot="title">
                    <span class="one-level-category">{{item.name}}</span>
                    <span class="two-level-category">二级分类有 {{item.children?item.children.length:0}} 项</span>
                  </template>
                  <div class="collapse-body clear">
                    <el-tag
                      :key="index2"
                      v-for="(tag, index2) in item.children"
                      closable
                      :disable-transitions="false"
                      @close="alignmentHandleClose(tag,index)">
                      <span class="el-tag-bar">{{tag.name}}</span>
                      <div class="tag-img">
                        <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-change='(value)=>changeUpload(value, index, index2)'
                          :on-success="(res,file)=>handleAvatarSuccess(res,file,index)"
                          :before-upload="(value)=>beforeAvatarUpload(value, index)">
                          <img :src="item.children[index2].icon_url" class="avatar">
                        </el-upload>
                      </div>
                    </el-tag>
                    <el-input
                      class="input-new-tag"
                      v-if="inputSpacVisible[index]"
                      v-model="inputSpacValue"
                      :ref="'saveSpecTagInput'+index"
                      size="small"
                      @keyup.enter.native="handleInputSpec(index, item.id)"
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
            title="请选择要编辑的一级类目"
            :visible.sync="dialogVisible"
            width="620px"
            :before-close="handleClose">
            <div class="first-category-list">
              <ul>
                <li @click="selectFirstCategory(index)" v-for="(item, index) in firstCategoryList" :class="{'active':item.selected}" :key="index">{{item.label}}</li>
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
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {goodsCategory, addGoodsCategory, deleteGoodsCategory, updateGoodsCategoryPic} from '../axios/api.js'
export default {
  data () {
    return {
      dialogVisible: false,
      categoryList: [],
      inputSpacVisible: [],
      inputSpacValue: '',
      firstCategoryList: [
        {
          value: 1,
          label: '食品',
          selected: false,
          changed: false
        },
        {
          value: 2,
          label: '数码家电',
          selected: false,
          changed: false
        },
        {
          value: 3,
          label: '女装',
          selected: false,
          changed: false
        },
        {
          value: 4,
          label: '美妆',
          selected: false,
          changed: false
        },
        {
          value: 5,
          label: '日用百货',
          selected: false,
          changed: false
        },
        {
          value: 6,
          label: '休闲娱乐',
          selected: false,
          changed: false
        },
        {
          value: 7,
          label: '男装',
          selected: false,
          changed: false
        },
        {
          value: 8,
          label: '亲子',
          selected: false,
          changed: false
        },
        {
          value: 9,
          label: '教育培训',
          selected: false,
          changed: false
        },
        {
          value: 10,
          label: '餐饮外卖',
          selected: false,
          changed: false
        },
        {
          value: 11,
          label: '箱包配饰',
          selected: false,
          changed: false
        },
        {
          value: 12,
          label: '家居家纺',
          selected: false,
          changed: false
        },
        {
          value: 13,
          label: '媒体服务',
          selected: false,
          changed: false
        },
        {
          value: 14,
          label: '海外购',
          selected: false,
          changed: false
        },
        {
          value: 15,
          label: '运动户外',
          selected: false,
          changed: false
        },
        {
          value: 16,
          label: '礼品鲜花',
          selected: false,
          changed: false
        },
        {
          value: 17,
          label: '医疗健康',
          selected: false,
          changed: false
        },
        {
          value: 18,
          label: '酒店旅游',
          selected: false,
          changed: false
        },
        {
          value: 19,
          label: '票务卡券',
          selected: false,
          changed: false
        },
        {
          value: 20,
          label: '汽车养护',
          selected: false,
          changed: false
        },
        {
          value: 21,
          label: '丽人健身',
          selected: false,
          changed: false
        },
        {
          value: 22,
          label: '家装建材',
          selected: false,
          changed: false
        },
        {
          value: 23,
          label: '充值缴费',
          selected: false,
          changed: false
        },
        {
          value: 24,
          label: '图书音像',
          selected: false,
          changed: false
        },
        {
          value: 25,
          label: '家政服务',
          selected: false,
          changed: false
        },
        {
          value: 26,
          label: '名俗文化',
          selected: false,
          changed: false
        },
        {
          value: 27,
          label: '鞋靴',
          selected: false,
          changed: false
        },
        {
          value: 28,
          label: '宠物',
          selected: false,
          changed: false
        },
        {
          value: 29,
          label: '其他',
          selected: false,
          changed: false
        }
      ]
    }
  },
  created () {
    this.setMenuLeft('/category-management')
    this.getCategoryList()
  },
  methods: {
    ...mapMutations(['setMenuLeft']),
    // 获取商品类目列表
    getCategoryList () {
      goodsCategory().then(res => {
        // console.log(res.data)
        this.categoryList = res.data
        this.setFirstCategoryListSelect()
      })
    },
    // 获取一级类目列表,设置被选择的内容
    setFirstCategoryListSelect () {
      let self = this
      this.firstCategoryList.forEach(function (v, k) {
        self.categoryList.forEach(function (val, key) {
          if (v.label === val.name) {
            v.selected = true
          }
        })
      })
      // console.log(this.firstCategoryList)
    },
    // 关闭一级类目选择框之前的动作
    handleClose (done) {
      this.dialogVisible = false
      for (let k of this.firstCategoryList) {
        if (k.changed) {
          k.selected = !k.selected
          k.changed = !k.changed
        }
      }
    },
    // 确认修改一级类目
    confirmationModification () {
      this.dialogVisible = false
      for (let k of this.firstCategoryList) {
        if (k.changed) {
          if (k.selected === true) {
            addGoodsCategory({
              'name': k.name,
              'parent_id': 0
            }).then(res => {
              console.log('添加分类成功')
            })
          } else {
            // 删除商品分类
            deleteGoodsCategory({
              'id': k.id
            }).then(res => {
              console.log('删除分类成功')
            })
          }
        }
        k.changed = false
      }
      // 重新请求接口，获取修改后的页面显示数据
      this.getCategoryList()
    },
    // 选择一级类目
    selectFirstCategory (index) {
      this.firstCategoryList[index].selected = !this.firstCategoryList[index].selected
      this.firstCategoryList[index].changed = !this.firstCategoryList[index].changed
    },
    // 删除选中的规则值
    alignmentHandleClose (tag, index) {
      let values = this.categoryList[index].children
      this.categoryList[index].children.splice(values.indexOf(tag), 1)
      // 删除选择的二级分类
      deleteGoodsCategory({
        id: 1
      }).then(res => {
        console.log('删除二级分类成功')
      })
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
    handleInputSpec (index, id) {
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
          'name': inputValue,
          'icon_url': '/static/test/ceshi.png'
        }
        // 请求接口，保存二级商品分类
        addGoodsCategory({
          'name': inputValue,
          'parent_id': id,
          'icon': '/static/test/ceshi.png'
        }).then(res => {
          console.log('添加二级商品分类成功')
        })
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
      // 修改上传图片地址，修改二级分类图片地址
      updateGoodsCategoryPic({
        'id': 1,
        'icon': file.url
      }).then(res => {
        console.log('修改二级商品分类图片成功')
      })
    }
  },
  computed: {
    ...mapState(['menuLeft'])
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
    .category-management-dialog {
      .first-category-list {
        font-size: 0;
        padding-bottom: 20px;
        border-top: 2px solid #f5f5f5;
        border-bottom: 2px solid #f5f5f5;
        li {
          font-size: 12px;
          color: #999;
          text-align: center;
          width: 100px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #d5d5d5;
          margin-right: 20px;
          margin-top: 20px;
          display: inline-block;
          vertical-align: middle;
          box-sizing: border-box;
          border-radius: 3px;
          cursor: pointer;
          user-select:none;
          &:nth-child(5n) {
            margin-right: 0;
          }
          &.active {
            color: #DE5B67;
            border-color: #DE5B67;
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
    .el-dialog__body {
      padding: 0 20px;
    }
    .el-dialog__footer {
      padding-top: 20px;
    }
  }
</style>
