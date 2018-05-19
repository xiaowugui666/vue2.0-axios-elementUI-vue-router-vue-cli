<template>
    <div class="add-goods-object">
      <div class="add-goods-type plate">
        <div class="plate-top clear">
          <span class="plate-name">商品类型</span>
          <span class="add-goods-btn">
            <el-button type="success" size="small">保存</el-button>
            <el-button size="small">返回</el-button>
          </span>
        </div>
        <ul class="select-goods-type">
          <li :class="{'active':goodsType==0}" @click="goodsType=0">实物（物流发货）</li>
          <li :class="{'active':goodsType==1}" @click="goodsType=1">虚拟商品</li>
        </ul>
      </div>
      <div class="plate essential-info">
        <div class="plate-top">基本信息</div>
        <div class="essential-info-edit">
          <ul>
            <li>
              <span class="required name">商品名称：</span>
              <input type="text" placeholder="请输入商品名称" v-model="goodsName">
            </li>
            <li>
              <span class="name">分享描述：</span>
              <input type="text" placeholder="请输入分享描述" v-model="goodsName">
            </li>
            <li>
              <span class="required name alignment-top">商品图片：</span>
              <div class="goods-pic-box">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="goodsPicVisible">
                  <img width="100%" :src="goodsPicUrl" alt="">
                </el-dialog>
              </div>
              <p class="upload-img-explain">建议尺寸：800*800像素，最多上传15张，图片大小请控制在2MB以内，支持jpg、jpeg、png格式的图片</p>
            </li>
            <li>
              <span class="name">商品类目：</span>
              <el-select v-model="value" size="small" class="select-state">
                <el-option
                  v-for="item in selectStateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <input type="text" placeholder="自定义二级类目" v-model="secondClass">
            </li>
            <li>
              <span class="name alignment-top">商品卖点：</span>
              <div class="rich-text-editor clear">
                <quill-editor v-model="quillContent"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
                </quill-editor>
              </div>
            </li>
            <li>
              <span class="name">商品重量：</span>
              <div class="weight-unit">
                <input type="tel" placeholder="请输入商品重量(纯数字)" v-model="secondClass" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="30">
                <el-select v-model="weightUnitValue" size="small" class="select-state">
                  <el-option
                    v-for="item in weightUnit"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </li>
            <li>
              <span class="name">唯一编码：</span>
              <input type="text" placeholder="商品的唯一编码" v-model="secondClass" maxlength="30">
            </li>
            <li>
              <span class="name">商品量词：</span>
              <el-select v-model="quantifier" size="small" class="select-state">
                <el-option
                  v-for="item in goodsQuantifier"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li class="keyword-box">
              <span class="name">关键字：</span>
              <div class="keyword-list">
                <el-tag
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 关键字</el-button>
                <span class="keyword-tips">输入完成后，按“回车键”确认</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="plate price-inventory">
        <div class="plate-top">价格库存</div>
        <div class="price-inventory-edit">
          <ul>
            <li>
              <span class="required name alignment-top">商品规格：</span>
              <div class="goods-specification-box">
                <div class="specification-block clear" v-for="(item, index) in specificationList" :key="index">
                  <div class="specification-name-box">
                    <span class="name">规格名：</span>
                    <input @change="specificNameChange(index, item.name)" :data-value="item.name" type="text" placeholder="请输入规格名" v-model="item.name"/>
                    <i @click="deleteThis(index)" class="delete-specific el-icon-circle-close-outline" style="font-size: 18px"></i>
                  </div>
                  <div class="specification-value-box">
                    <span class="name alignment-top">规格值：</span>
                    <div class="specification-value-list">
                      <el-tag
                        :key="index2"
                        v-for="(tag, index2) in item.values"
                        closable
                        :disable-transitions="false"
                        @close="alignmentHandleClose(tag,index)">
                        {{tag.name}}
                      </el-tag>
                      <el-input
                        class="input-new-tag"
                        v-if="showSpecInputIf(index)"
                        v-model="inputSpacValue"
                        :ref="'saveSpecTagInput'+index"
                        size="small"
                        @keyup.enter.native="handleInputSpec(index)"
                        @blur="handleInputSpec(index)"
                      >
                      </el-input>
                      <el-button v-else @click="showSpecInput(index)" type="primary" size="small">添加规格值</el-button>
                    </div>
                  </div>
                </div>
                <div class="add-specification-name specification-block">
                  <el-button :disabled="specificationList.length === 3" @click="addSpecific" class="add-specific-btn" type="primary" size="small">添加规格名</el-button>
                </div>
              </div>
            </li>
            <li v-if="skus[0].values.length>0">
              <span class="name alignment-top">规格明细：</span>
              <div class="goods-specific-table">
                <!--商品表格-->
                <table >
                  <tr>
                    <th v-for="(item, index) in specificationList" v-if="item.values.length>0 && item.name" :key="index">{{item.name}}</th>
                    <th><span class="c_red">*</span>价格</th>
                    <th><span class="c_red">*</span>库存</th>
                    <th>规格编码</th>
                    <th>划线价格</th>
                    <th>图片</th>
                  </tr>
                  <tr v-for="(sku, index) in skus" :key="index">
                    <td v-for="(item, index2) in sku.values" v-if="sku.values.length>0" :key="index2">{{item.specificName}}</td>
                    <td><span class="money-tips">￥</span><input type="text" v-model="sku.SkuPrice" maxlength="10"/></td>
                    <td><input type="text" v-model="sku.StockQuantity" class="stock-quantity" maxlength="10"/></td>
                    <td><input type="text" v-model="sku.SkuCode" class="sku-code" maxlength="20"/></td>
                    <td><span class="money-tips">￥</span><input type="text" v-model="sku.linePrice" maxlength="20"/></td>
                    <td width="50">
                      <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-change='(value)=>changeUpload(value, index)'
                        :on-success="(res,file)=>handleAvatarSuccess(res,file,index)"
                        :before-upload="(value)=>beforeAvatarUpload(value, index)">
                        <img v-if="sku.imgSrc" :src="sku.imgSrc" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </td>
                  </tr>
                </table>
              </div>
            </li>
            <li>
              <span class="name required alignment-top">商品价格：</span>
              <span class="goods-price">
                <input type="text" v-model="goodsPrice" placeholder="" :disabled="specificationList.length>0">
              </span>
            </li>
            <li>
              <span class="name required alignment-top">划线价格：</span>
              <span class="goods-price">
                <input type="text" v-model="goodsLinePrice" placeholder="" :disabled="specificationList.length>0">
              </span>
            </li>
            <li>
              <span class="name required alignment-top">库存：</span>
              <input type="text" v-model="goodsLinePrice" placeholder="" :disabled="specificationList.length>0">
            </li>
          </ul>
        </div>
      </div>
      <div class="plate other-info">
        <div class="plate-top">其他信息</div>
        <div class="other-info-edit">
          <ul>
            <li>
              <span class="required name">商品名称：</span>
              <input type="text" placeholder="" v-model="goodsName">
            </li>
            <li>
              <span class="required name">商品名称：</span>
              <input type="text" placeholder="" v-model="goodsName">
            </li>
            <li>
              <span class="required name">商品名称：</span>
              <input type="text" placeholder="" v-model="goodsName">
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import { quillEditor } from 'vue-quill-editor' // 调用编辑器
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
      ['link'],
      ['clean']
    ]
    return {
      goodsType: 0,
      goodsName: '',
      goodsPicUrl: '',
      goodsPicVisible: false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      inputSpacValue: '',
      inputSpacVisible0: false,
      inputSpacVisible1: false,
      inputSpacVisible2: false,
      specificationList: [
        {
          'name': '材质1',
          'values': [
            {
              name: '铝1'
            }, {
              name: '棉花1'
            }, {
              name: '铝2'
            }, {
              name: '棉花3'
            }
          ]
        },
        {
          'name': '材质2',
          'values': [
            {
              name: '铝1232'
            }, {
              name: '棉花2'
            }
          ]
        }
      ],
      skus: [],
      selectStateOptions: [
        {
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
        }
      ],
      value: '食品',
      goodsPrice: '',
      goodsLinePrice: '',
      secondClass: '',
      quillContent: '',
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions
          }
        }
      },
      weightUnit: [{
        value: '1',
        label: '克'
      }, {
        value: '2',
        label: '千克'
      }, {
        value: '3',
        label: '吨'
      }],
      weightUnitValue: '克',
      goodsQuantifier: [
        {
          value: '1',
          label: '个'
        }, {
          value: '2',
          label: '对'
        }, {
          value: '3',
          label: '只'
        }, {
          value: '4',
          label: '双'
        }, {
          value: '5',
          label: '条'
        }, {
          value: '6',
          label: '群'
        }, {
          value: '7',
          label: '张'
        }, {
          value: '8',
          label: '顶'
        }, {
          value: '9',
          label: '匹'
        }, {
          value: '10',
          label: '量'
        }, {
          value: '11',
          label: '棵'
        }, {
          value: '12',
          label: '扎'
        }, {
          value: '13',
          label: '颗'
        }, {
          value: '14',
          label: '支'
        }
      ],
      quantifier: '个'
    }
  },
  beforeMount () {
    this.setSkus()
  },
  mounted () {
    this.setRoutePath()
  },
  methods: {
    ...mapMutations(['setMenuLeft']),
    setRoutePath () {
      this.setMenuLeft('/commodityManagement')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    // 计算规格属性的笛卡尔积
    setSpeRetData () {
      let orz = []
      for (let k of this.specificationList) {
        if (k.name && k.values.length > 0) {
          orz.push(k.values)
        }
      }
      let ret = this.cartesianProduct(orz)
      return ret
    },
    // 设置skus，渲染规格表
    setSkus () {
      this.skus = []
      let ret = this.setSpeRetData()
      for (let k of ret) {
        let sku = {SkuPrice: '', StockQuantity: '0', SkuCode: '', linePrice: '', imgSrc: '', values: []}
        for (let l of k) {
          sku.values.push({ specificName: l.name })
        }
        this.skus.push(sku)
      }
    },
    // 删除当前规格
    deleteThis (index) {
      this.specificationList.splice(index, 1)
    },
    // 添加一个规格
    addSpecific () {
      this.specificationList.push({
        'name': '',
        'values': []
      })
    },
    // 使规格名不重复
    specificNameChange (index) {
      let val = this.specificationList[index].name
      let newS = this.specificationList.slice(0)
      newS.splice(index, 1)
      for (let k of newS) {
        if (val === k.name) {
          this.$message({
            showClose: true,
            message: '规格名重复！',
            type: 'error'
          })
          this.specificationList[index].name = ''
          return false
        }
      }
    },
    // 删除选中的规则值
    alignmentHandleClose (tag, index) {
      let values = this.specificationList[index].values
      this.specificationList[index].values.splice(values.indexOf(tag), 1)
    },
    // 显示 规则值输入框，使输入框获取焦点
    showSpecInput (index) {
      this['inputSpacVisible' + index] = true
      this.$nextTick(_ => {
        // console.log(this.$refs['saveSpecTagInput' + index])
        this.$refs['saveSpecTagInput' + index][0].$refs.input.focus()
      })
    },
    showSpecInputIf (index) {
      return this['inputSpacVisible' + index]
    },
    // 获取规则值输入框的内容，赋值给this.specificationList[index].values，清空this.inputSpacValue
    handleInputSpec (index) {
      let inputValue = this.inputSpacValue
      if (inputValue) {
        for (let k of this.specificationList[index].values) {
          if (inputValue === k.name) {
            this.$message({
              showClose: true,
              message: '规格值重复！',
              type: 'error'
            })
            return false
          }
        }
        this.specificationList[index].values.push({'name': inputValue})
      }
      this['inputSpacVisible' + index] = false
      this.inputSpacValue = ''
    },

    // 关键字操作部分
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 关键字操作部分结束

    handlePictureCardPreview (file) {
      this.goodsPicUrl = file.url
      this.goodsPicVisible = true
    },
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      // console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    },
    // 每种规格图片上传
    handleAvatarSuccess (res, file, index) {
      console.log(res, file, index)
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file, index) {},
    changeUpload (file, index) {
      // console.log(file)
      this.skus[index].imgSrc = file.url
    },
    // 求笛卡尔积
    cartesianProduct (arr) {
      return arr.reduce(function (a, b) {
        return a.map(function (x) {
          return b.map(function (y) {
            return x.concat(y)
          })
        }).reduce(function (a, b) { return a.concat(b) }, [])
      }, [[]])
    }
  },
  watch: {
    specificationList: {
      handler (newValue, oldValue) {
        this.setSkus()
        // console.log(this.skus)
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['menuLeft']),
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style scoped lang="less">
  .add-goods-object {
    margin-left: 200px;
    margin-right: 15px;
    min-width: 1100px;
    padding: 20px 0;
    .plate {
      padding: 20px 15px 0;
      margin-bottom: 20px;
      background: #fff;
      color: #333;
      font-size: 12px;
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
          margin-top: 3px;
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
      li {
        padding-top: 20px;
        padding-left: 15px;
        span.name {
          display: inline-block;
          vertical-align: middle;
          color: #999;
          padding-right: 3px;
          width: 65px;
        }
        .name.alignment-top {
          vertical-align: top;
          padding-top: 6px;
        }
      }
      input {
        display: inline-block;
        vertical-align: middle;
        width: 236px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #333;
        border: 1px solid #d5d5d5;
      }
      .select-state {
        color: #333;
        display: inline-block;
        vertical-align: middle;
        width: 258px;
      }
    }
    .add-goods-type {
      .plate-top {
        font-size: 14px;
        color: #333;
        &::before {
          content: '';
          margin-top: 9px;
        }
        .plate-name {
          float: left;
          margin-top: 6px;
        }
        .add-goods-btn {
          float: right;
        }
      }
      .select-goods-type {
        padding: 20px 5px;
        font-size: 0;
        li {
          padding-top: 0;
          padding-left: 0;
          display: inline-block;
          height: 55px;
          line-height: 55px;
          text-align: center;
          width: 136px;
          color: #fff;
          font-size: 12px;
          border-radius: 3px;
          background: #d5d5d5;
          cursor: pointer;
          &:first-child {
            margin-right: 20px;
          }
          &.active {
            background: #DE5B67;
          }
        }
      }
    }
    .essential-info {
      .essential-info-edit {
        padding: 10px 5px 20px;
        .goods-pic-box {
          display: inline-block;
        }
        .upload-img-explain {
          color: #B5B5B5;
          font-size: 12px;
          padding-top: 10px;
          padding-left: 72px;
        }
        .select-state {
          padding-right: 15px;
        }
        .rich-text-editor {
          display: inline-block;
          width: 700px;
        }
        .weight-unit {
          display: inline-block;
          vertical-align: middle;
          input {
            width: 148px;
            margin-right: 5px;
          }
          .select-state {
            width: 80px;
          }
        }
        .keyword-box {
          >span {
            text-align: right;
            width: 60px;
          }
          .keyword-list {
            display: inline-block;
            vertical-align: middle;
            font-size: 0;
            .keyword-tips {
              color: #b5b5b5;
              font-size: 12px;
              padding-left: 20px;
            }
            .el-tag + .el-tag {
              margin-left: 10px;
            }
            .button-new-tag {
              margin-left: 10px;
              height: 32px;
              line-height: 30px;
              padding-top: 0;
              padding-bottom: 0;
            }
            .input-new-tag {
              width: 90px;
              margin-left: 10px;
              vertical-align: bottom;
            }
          }
        }
      }
    }
    .price-inventory {
      .price-inventory-edit {
        padding: 10px 5px 20px;
        .goods-specification-box {
          display: inline-block;
          vertical-align: middle;
          border: 1px solid #d5d5d5;
          padding: 20px;
          min-width: 900px;
          width: 900px;
          .name {
            color: #666;
            width: auto;
          }
          .specification-block {
            background: #efefef;
            margin-bottom: 10px;
            padding: 20px;
            .delete-specific {
              float: right;
              display: none;
              cursor: pointer;
            }
            &:hover .delete-specific {
              display: block;
            }
            .specification-name-box {
              margin-bottom: 20px;
            }
            .specification-value-box {
              .specification-value-list {
                display: inline-block;
                width: 800px;
                .el-tag {
                  margin-right: 10px;
                  border-color: #d5d5d5;
                  color: #333;
                  background: #fff;
                  margin-bottom: 10px;
                }
                .input-new-tag {
                  width: 100px;
                }
              }
            }
          }
        }
        .goods-specific-table {
          display: inline-block;
          vertical-align: middle;
          width: 942px;
          table {
            width: 100%;
            font-size: 12px;
            color: #666;
            border: 1px solid #d5d5d5;
            border-collapse: collapse;
            text-align: center;
            th {
              border: 1px solid #d5d5d5;
              color: #333;
              padding: 8px 10px;
              background: #f5f5f5;
              .c_red {
                color: #DE5B67;
                padding-right: 5px;
              }
            }
            td {
              border: 1px solid #d5d5d5;
              padding: 8px 10px;
              .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
              }
              .money-tips {
                padding-right: 5px;
              }
              .stock-quantity {
                width: 60px;
              }
              .sku-code {
                width: 120px;
              }
              .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
              }
              .avatar-uploader-icon {
                font-size: 20px;
                color: #8c939d;
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                border: 1px solid #d5d5d5;
              }
              .avatar {
                width: 50px;
                height: 50px;
                display: block;
              }
            }
          }
          input {
            width: 90px;
          }
        }
        .goods-price {
          position: relative;
          &::before {
            content: '￥';
            display: block;
            position: absolute;
            top: 2px;
            left: 10px;
          }
          input {
            padding-left: 30px;
            width: 216px;
          }
        }
      }
    }
    .other-info {
      .other-info-edit {
        padding: 10px 5px 20px;
      }
    }
  }
  .el-button--small {
    width: 80px;
    height: 30px;
    padding: 0;
  }
</style>
<style>
  .el-input__inner {
    border-radius: 0;
  }
  .ql-container .ql-editor p {
    min-height: 150px;
  }
</style>
