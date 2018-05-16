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
              <div class="goods-specification-box"></div>
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
// require styles
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
  mounted () {
    this.setRoutePath()
    console.log('this is current quill instance object', this.editor)
  },
  methods: {
    ...mapMutations(['setMenuLeft']),
    setRoutePath () {
      this.setMenuLeft('/commodityManagement')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
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
      console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
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
          margin-top: 1px;
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
