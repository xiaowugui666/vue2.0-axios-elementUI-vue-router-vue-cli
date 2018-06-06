<template>
    <div class="add-goods-object">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="add-goods-type plate">
          <div class="plate-top clear">
            <span class="plate-name">商品类型</span>
          </div>
          <ul class="select-goods-type">
            <li :class="{'active':goodsType==1}" @click="goodsType=1">实物（物流发货）</li>
            <!--<li :class="{'active':goodsType==2}" @click="goodsType=2">虚拟商品</li>-->
          </ul>
        </div>
        <div class="plate essential-info">
          <div class="plate-top">基本信息</div>
          <div class="essential-info-edit">
            <ul>
              <li>
                <span class="required name">商品名称：</span>
                <div>
                  <input v-validate="'required'" name="商品名称" v-model.trim="goodsName" maxlength="30" type="text" placeholder="请输入商品名称">
                  <div class="err-tips">{{ errors.first('商品名称') }}</div>
                </div>
              </li>
              <li>
                <span class="name">分享描述：</span>
                <div>
                  <input type="text" placeholder="请输入分享描述" v-model.trim="sharingDescription" maxlength="30">
                </div>
              </li>
              <li>
                <span class="required name alignment-top">商品图片：</span>
                <div class="goods-pic-box">
                  <!--上传商品图片-->
                  <el-upload
                    :action="qiniuUploadUrl"
                    :data="upToken"
                    list-type="picture-card"
                    multiple
                    :limit="10"
                    :file-list="goodsImageShowList"
                    :on-exceed="beyondNumberLimit"
                    :before-upload="beforeUpload"
                    :on-success="goodsUploadSuccess"
                    :before-remove="goodsHandleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="goodsPicVisible">
                    <img width="100%" :src="goodsPicUrl" alt="">
                  </el-dialog>
                  <span class="err-tips" style="display: none;">请先上传图片！</span>
                </div>
                <p class="upload-img-explain">建议尺寸：800*800像素，最多上传10张，图片大小请控制在2MB以内，支持jpg、jpeg、png格式的图片</p>
              </li>
              <li>
                <span class="name">商品类目：</span>
                <div>
                  <el-cascader
                    expand-trigger="hover"
                    size="small"
                    clearable
                    class="select-state"
                    :options="selectStateOptions"
                    v-model="selectedOptions">
                  </el-cascader>
                </div>
              </li>
              <li>
                <span class="name alignment-top">商品卖点：</span>
                <div class="rich-text-editor clear">
                  <!--商品图文详情编辑框-->
                  <quill-editor v-model.trim="quillContent"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
                  </quill-editor>
                  <!-- 文件上传input 将它隐藏-->
                  <el-upload :action="qiniuUploadUrl"
                             :before-upload='goodsImageBeforeUpload'
                             :data="upToken"
                             :on-success='quillUpScuccess'
                             ref="quillUpload" style="display:none">
                    <el-button size="small" type="primary" ref="quillUploadButton">点击上传</el-button>
                  </el-upload>
                </div>
              </li>
              <li>
                <span class="name">商品重量：</span>
                <div class="weight-unit">
                  <input type="tel" v-validate="'decimal:2'" name="商品重量" placeholder="请输入商品重量" v-model.trim="weightNum" maxlength="20">
                  <div class="err-tips">{{ errors.first('商品重量') }}</div>
                  <el-select v-model.trim="weightUnitValue" size="small" class="select-state">
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
                <div>
                  <input type="text" placeholder="商品的唯一编码" v-model.trim="uniqueCoding" maxlength="30">
                </div>
              </li>
              <li>
                <span class="name">商品量词：</span>
                <div>
                  <el-select v-model.trim="quantifier" clearable size="small" class="select-state">
                    <el-option
                      v-for="item in goodsQuantifier"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
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
                    v-model.trim="inputValue"
                    ref="saveTagInput"
                    maxLength="20"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 关键字</el-button>
                  <span class="keyword-tips">输入完成后，按“回车键”确认，最多设置15个</span>
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
                <span class="name alignment-top">商品规格：</span>
                <div class="goods-specification-box">
                  <div class="specification-block clear" v-for="(item, index) in specificationList" :key="index">
                    <div class="specification-name-box">
                      <span class="name">规格名：</span>
                      <input @change="specificNameChange(index, item.name)" ref="specificV" type="text" :value="item.name" placeholder="请输入规格名" maxlength="20"/>
                      <!--v-model.trim="item.name"-->
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
                          v-model.trim="inputSpacValue"
                          ref="saveSpecTagInput"
                          size="small"
                          @keyup.enter.native="handleInputSpec(index)"
                          @blur="handleInputSpec(index)"
                          maxlength="20"
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
              <li v-if="skus[0] && skus[0].specs && skus[0].specs.length>0">
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
                      <td v-for="(item, index2) in sku.specs" v-if="sku.specs.length>0" :key="index2">{{item.property}}</td>
                      <td><span class="money-tips">￥</span><input v-model.trim="sku.price" v-validate="'required|decimal:2'" data-vv-as="价格" :name="`price-${index}`" type="text" maxlength="10"/>
                        <div class="err-tips">{{ errors.first(`price-${index}`) }}</div>
                      </td>
                      <td>
                        <input type="text" v-model.trim="sku.stock_count" v-validate="'required|numeric'" data-vv-as="库存" :name="`stock-${index}`" class="stock-quantity" maxlength="10"/>
                        <div class="err-tips">{{ errors.first(`stock-${index}`) }}</div>
                      </td>
                      <td><input type="text" v-model.trim="sku.sku_no" class="sku-code" maxlength="20"/></td>
                      <td><span class="money-tips">￥</span><input type="text" v-model.trim="sku.display_price" v-validate="'decimal:2'" data-vv-as="划线价格" :name="`display-price-${index}`" maxlength="20"/>
                        <div class="err-tips">{{ errors.first(`display-price-${index}`) }}</div>
                      </td>
                      <td width="50">
                        <el-upload
                          class="avatar-uploader"
                          :action="qiniuUploadUrl"
                          :data="upToken"
                          :show-file-list="false"
                          :on-success="(res,file)=>handleAvatarSuccess(res,file,index)"
                          :before-upload="(value)=>beforeUpload(value, index)">
                          <img v-if="sku.cover_url" :src="sku.cover_url" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </td>
                    </tr>
                  </table>
                </div>
              </li>
              <li>
                <span class="name required">商品价格：</span>
                <div>
                  <span class="goods-price">
                    <input type="text" v-model.trim="goodsPrice" placeholder="" :disabled="verificationSpec()" maxlength="20">
                  </span>
                </div>
              </li>
              <li>
                <span class="name">划线价格：</span>
                <div>
                  <span class="goods-price">
                    <input type="text" v-model.trim="goodsLinePrice" placeholder="" :disabled="verificationSpec()" maxlength="20">
                  </span>
                </div>
              </li>
              <li>
                <span class="name required">库存：</span>
                <div>
                  <input type="text" v-model.trim="goodStock" placeholder="" :disabled="verificationSpec()" maxlength="20">
                </div>
              </li>
              <li class="show-stock-btn">
                <span class="name">库存显示：</span>
                <div>
                  <el-button type="success" size="small" :class="['show-stock', {'active':showStock}]" @click="showStock=true">显示库存</el-button>
                  <el-button type="success" size="small" :class="['hide-stock', {'active':!showStock}]" @click="showStock=false">不显示剩余库存</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="plate other-info">
        <div class="plate-top">其他信息</div>
        <div class="other-info-edit">
          <ul>
            <li>
              <span class="name required">快递邮费：</span>
              <div>
                <span class="express-postage">
                  <input type="text" v-model.trim="postage.money" :disabled="postage.freeShipping" placeholder="">
                  <!--<el-button type="success" size="small" :class="{'active':postage.freeShipping}" @click="postage.freeShipping=!postage.freeShipping">包邮</el-button>-->
                  <el-checkbox v-model="postage.freeShipping" class="freeCheckbox" size="small">包邮</el-checkbox>
                </span>
              </div>
            </li>
            <li>
              <span class="required name">是否上架：</span>
              <div>
                <el-button type="success" size="small" :class="{'active':grounding}" @click="grounding=true" style="margin-left: 0;">立即上架</el-button>
                <el-button type="success" size="small" :class="{'active':!grounding}" @click="grounding=false">暂不上架</el-button>
              </div>
            </li>
            <li>
              <span class="name">商家承诺：</span>
              <div>
                <el-button type="success" size="small" :class="{'active':businessCommitment.refundable}" @click="businessCommitment.refundable=!businessCommitment.refundable" style="margin-left: 0;">7天包退换</el-button>
                <el-button type="success" size="small" :class="{'active':businessCommitment.qualityGoods}" @click="businessCommitment.qualityGoods=!businessCommitment.qualityGoods">100%正品</el-button>
                <el-button type="success" size="small" :class="{'active':businessCommitment.deliverGoods}" @click="businessCommitment.deliverGoods=!businessCommitment.deliverGoods">24小时发货</el-button>
              </div>
            </li>
          </ul>
        </div>
        <div class="add-goods-btn">
            <el-button @click="submitGoodsInfo" type="success" size="small">保存</el-button>
          </div>
      </div>
      </el-form>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {goodsEditDetails, goodsCategory, getQnToken, addGoods} from '../axios/api'
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
      goodsType: 1, // 商品类型
      // 商品图片
      goodsPicUrl: '',
      goodsPicVisible: false,
      // 商品关键字
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      inputSpacValue: '',
      inputSpacVisible0: false,
      inputSpacVisible1: false,
      inputSpacVisible2: false,
      specificationList: [],
      specs: [],
      skus: [],
      selectStateOptions: [],
      selectedOptions: [],
      goodsPrice: '',
      goodsLinePrice: '',
      goodStock: '',
      showStock: true,
      postage: {
        freeShipping: true,
        money: ''
      }, // 包邮和邮费
      hash: this.$route.query.gid, // 商品id

      // 商品信息
      goodsName: '',
      sharingDescription: '',
      grounding: true,
      businessCommitment: {
        refundable: false,
        qualityGoods: false,
        deliverGoods: false
      },
      uniqueCoding: '',
      // 商品卖点
      quillContent: '',
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions
          }
        }
      },
      addRange: '',
      weightNum: '',
      weightUnit: [
        {
          value: 1,
          label: '克'
        }, {
          value: 2,
          label: '千克'
        }, {
          value: 3,
          label: '吨'
        }
      ],
      weightUnitValue: 1,
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
      quantifier: '',

      // 表单验证
      rules: {},
      ruleForm: {},
      // 图片 token
      upToken: {},
      goodsImageShowList: [],
      goodsImages: []
    }
  },
  created () {
    this.setRoutePath()
    this.getGoods(this.hash)
    this.getGoodsCategory()
    this.getImageToken()
  },
  mounted () {
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
    // console.log(this.hash)
  },
  methods: {
    ...mapMutations(['setMenuLeft']),
    // 设置路径为商品列表的路径，以便于菜单栏选中
    setRoutePath () {
      this.setMenuLeft('/commodity-management')
    },
    // 若存在商品id，获取商品信息
    getGoods (id) {
      if (id) {
        goodsEditDetails(id).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 请求商品分类
    getGoodsCategory () {
      goodsCategory().then(res => {
        this.selectStateOptions = []
        if (res.data.length > 0) {
          for (let v of res.data) {
            let option = {
              label: v.name,
              value: v.id
            }
            if (v.children.length > 0) {
              option.children = []
              for (let w of v.children) {
                option.children.push({
                  label: w.name,
                  value: w.id
                })
              }
            }
            this.selectStateOptions.push(option)
          }
        } else {
          this.setRouter('/category-management')
        }
        // console.log(this.selectStateOptions)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取图片上传七牛的token
    getImageToken () {
      getQnToken('image').then(res => {
        // console.log(res)
        this.upToken.token = res.data.token
      }).catch(err => {
        console.log(err)
      })
    },
    // 商品图片验证是否重复
    goodsImageBeforeUpload (file) {
      // 判断是否重复上传图片
      for (let v of this.goodsImageShowList) {
        if (file.name === v.modified) {
          this.$message.error('不能上传重复的图片!')
          return false
        }
      }
      this.beforeUpload(file)
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
    // 商品图片超出个数限制
    beyondNumberLimit () {
      this.$message.error('商品图片超过个数限制！')
    },
    // 商品图片上传成功的操作
    goodsUploadSuccess (response, file, fileList) {
      this.goodsImageShowList.push({id: '', url: this.qiniuDomainUrl + response.key, key: response.key, modified: file.name})
    },
    // 删除商品图片列表中的图片，删除商品图片的key
    goodsHandleRemove (file, fileList) {
      if (file.key) {
        for (let [i, v] of this.goodsImageShowList.entries()) {
          if (v.key === file.key) {
            this.goodsImageShowList.splice(i, 1)
          }
        }
      }
    },
    // 商品卖点详情，图片上传成功后的操作
    quillUpScuccess (e, file, fileList) {
      let vm = this
      let url = this.qiniuDomainUrl + e.key
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
    },
    // 点击图片ICON触发事件
    imgHandler (state) {
      this.addRange = this.$refs.myQuillEditor.quill.getSelection()
      if (state) {
        let fileInput = this.$refs.quillUploadButton.$el
        fileInput.click() // 加一个触发事件
      }
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
    setSkus (keep) {
      let [keepArr, ret] = [[], this.setSpeRetData()]
      for (let k of ret) {
        let sku = {id: '', price: '', stock_count: '', sku_no: '', display_price: '', cover_url: '', specs: []}
        for (let l of k) {
          sku.specs.push({ spec: k.name, property: l.name })
        }
        keepArr.push(sku)
      }
      if (keep) {
        // 去除skus内没填写的项，结果赋值给arr
        let arr = []
        for (let v of this.skus) {
          if (v.id !== '' || v.price !== '' || v.stock_count !== '' || v.sku_no !== '' || v.display_price !== '' || v.cover_url !== '') {
            arr.push(v)
          }
        }
        // 把arr里的内容，通过比对后赋值给keepArr
        for (let v of keepArr) {
          for (let w of arr) {
            if (JSON.stringify(v.specs) === JSON.stringify(w.specs)) {
              v.price = w.price
              v.stock_count = w.stock_count
              v.sku_no = w.sku_no
              v.display_price = w.display_price
              v.cover_url = w.cover_url
              break
            }
          }
        }
        // 把新建的规格列表赋值给skus
        this.skus = keepArr
      } else {
        this.skus = keepArr
      }
    },
    // 删除当前规格
    deleteThis (index) {
      this.specificationList.splice(index, 1)
      this.setSkus()
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
      let _this = this
      let val = this.$refs.specificV[index].value.trim()
      let newS = this.specificationList.slice(0)
      newS.splice(index, 1)
      // 判断原来的输入框内是否有内容，再确定是否渲染sku
      if (this.specificationList[index].name) {
        if (!val) {
          this.specificationList[index].name = val
          this.setSkus()
          return false
        }
      } else {
        if (val) {
          this.specificationList[index].name = val
          this.setSkus()
          return false
        }
      }
      if (f()) {
        // 如果规格名没有重复，触发修改
        this.specificationList[index].name = val
      } else {
        // 如果规格名重复，使输入框变回原来的值
        this.$refs.specificV[index].value = this.specificationList[index].name
      }
      // 判断规格名是否重复
      function f () {
        for (let k of newS) {
          if (val) {
            if (val === k.name) {
              _this.$message({
                showClose: true,
                message: '规格名重复！',
                type: 'warning'
              })
              return false
            }
          }
        }
        return true
      }
    },
    // 删除选中的规则值
    alignmentHandleClose (tag, index) {
      let values = this.specificationList[index].values
      this.specificationList[index].values.splice(values.indexOf(tag), 1)
      if (this.specificationList[index].name) {
        if (this.specificationList[index].values.length === 0) {
          this.setSkus()
        } else {
          this.setSkus(true)
        }
      }
    },
    // 显示 规则值输入框，使输入框获取焦点
    showSpecInput (index) {
      this['inputSpacVisible' + index] = true
      this.$nextTick(_ => {
        this.$refs.saveSpecTagInput[0].$refs.input.focus()
        // this.$refs['saveSpecTagInput' + index][0].$refs.input.focus()
      })
    },
    showSpecInputIf (index) {
      return this['inputSpacVisible' + index]
    },
    // 获取规则值输入框的内容，赋值给this.specificationList[index].values，清空this.inputSpacValue，为规格表增加此项
    handleInputSpec (index) {
      let _this = this
      let inputValue = this.inputSpacValue
      if (inputValue) {
        if (f()) {
          this.specificationList[index].values.push({'name': inputValue})
          if (this.specificationList[index].name) {
            if (this.specificationList[index].values.length === 1) {
              this.setSkus()
            } else {
              this.setSkus(true)
            }
          }
        }
      }
      this['inputSpacVisible' + index] = false
      this.inputSpacValue = ''
      function f () {
        for (let k of _this.specificationList[index].values) {
          if (inputValue === k.name) {
            _this.$message({
              showClose: true,
              message: '规格值重复！',
              type: 'warning'
            })
            return false
          }
        }
        return true
      }
    },
    // 确认规格列表内是否有内容
    verificationSpec () {
      if (this.specificationList.length > 0) {
        for (let v of this.specificationList) {
          if (v.name && v.values.length > 0) {
            return true
          }
        }
        return false
      }
      return false
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
    // 关键字不重复
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        if (this.dynamicTags.indexOf(inputValue) < 0) {
          this.dynamicTags.push(inputValue)
        } else {
          this.$message.warning(`关键字重复！`)
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 富文本框 事件
    onEditorBlur (quill) {
      // console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      // console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      // console.log('editor ready!', quill)
    },
    // 每种规格图片上传不重复
    avatarBeforeUpload (file, index) {
      this.beforeUpload(file)
    },
    // 每种规格图片上传
    handleAvatarSuccess (res, file, index) {
      this.skus[index].cover_url = this.qiniuDomainUrl + res.key
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file, index) {},
    // 处理商品重量，以‘克’为单位，保留小数点后两位
    getWeightGram () {
      if (this.weightUnitValue === 2) {
        return this.weightNum * 1000
      } else if (this.weightUnitValue === 3) {
        return this.weightNum * 1000000
      }
      return this.weightNum
    },
    // 获取商品量词
    getGoodsQuantifier () {
      if (this.quantifier !== '') {
        for (let v of this.goodsQuantifier) {
          if (v.value === this.quantifier) {
            return v.label
          }
        }
      } else {
        return this.quantifier
      }
    },
    // 处理商品图片列表，将图片展示列表的内容转换到 goodsImages
    getGoodsImages () {
      this.goodsImages = []
      for (let v of this.goodsImageShowList) {
        this.goodsImages.push({id: v.id, url: v.key})
      }
    },
    // 处理规格名和规格值的格式
    getSpecs () {
      this.specs = []
      if (this.specificationList.length > 0) {
        for (let v of this.specificationList) {
          if (v.name && v.values.length > 0) {
            let obj = {spec: v.name, property: []}
            for (let w of v.values) {
              obj.property.push(w.name)
            }
            this.specs.push(obj)
          }
        }
      }
    },
    // 保存发送商品信息
    submitGoodsInfo () {
      this.getGoodsImages()
      if (this.goodsImages.length === 0) {}
      let data = {
        type: this.goodsType,
        name: this.goodsName,
        description: this.sharingDescription,
        goods_images: this.goodsImages,
        category_id: this.selectedOptions[this.selectedOptions.length - 1],
        content: this.quillContent,
        weight: this.getWeightGram(),
        no: this.uniqueCoding,
        unit: this.getGoodsQuantifier(),
        keywords: this.dynamicTags,
        stock_shown: this.showStock ? 1 : 2,
        is_free_express: this.postage.freeShipping ? 1 : 2,
        free_express_price: this.postage.money,
        status: this.grounding ? 1 : 2
      }
      // 判断是否存在商品规格
      if (this.skus.length > 0) {
        this.getSpecs()
        data.specs = this.specs
        data.sku = this.skus
      } else {
        data.display_price = this.goodsLinePrice
        data.price = this.goodsPrice
        data.stock_count = this.goodStock
      }

      console.log(data)
      addGoods(data).then(res => {
        console.log(res)
        // this.setRouter('/commodity-management')
      }).catch(err => {
        console.log(err)
      })
    },
    // 设置路由链接
    setRouter (link) {
      this.$router.push({
        path: link
      })
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
  },
  computed: {
    ...mapState(['menuLeft', 'qiniuDomainUrl', 'qiniuUploadUrl']),
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
        position: relative;
        span.name {
          display: inline-block;
          vertical-align: middle;
          color: #999;
          padding-right: 3px;
          width: 65px;
          float: left;
          margin-top: 7px;
        }
        >div {
          margin-left: 70px;
        }
        .name.alignment-top {
        }
        .err-tips {
          position: absolute;
          bottom: -16px;
          left: 87px;
          color: @mainC;
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
        &:disabled {
          background: @bc;
        }
      }
      .select-state {
        color: #333;
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
      }
      .select-goods-type {
        padding: 20px 5px;
        font-size: 0;
        li {
          padding-top: 0;
          padding-left: 0;
          display: inline-block;
          box-sizing: border-box;
          height: 55px;
          line-height: 55px;
          text-align: center;
          width: 140px;
          color: @b9;
          font-size: 12px;
          border-radius: 2px;
          border: 1px solid @b5b5;
          cursor: pointer;
          margin-right: 20px;
          &.active {
            border-color: @mainC;
            color: @mainC;
          }
        }
      }
    }
    .essential-info {
      .essential-info-edit {
        padding: 10px 5px 20px;
        .upload-img-explain {
          color: @b5b5;
          font-size: 12px;
          padding-top: 10px;
          padding-left: 72px;
        }
        .select-state {
          padding-right: 15px;
        }
        .weight-unit {
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
            font-size: 0;
            .keyword-tips {
              color: @b5b5;
              font-size: 12px;
              padding-left: 20px;
            }
            .el-tag {
              margin-right: 10px;
              margin-bottom: 10px;
            }
            .button-new-tag {
              margin-right: 10px;
              height: 32px;
              line-height: 30px;
              padding-top: 0;
              padding-bottom: 0;
              margin-bottom: 10px;
            }
            .input-new-tag {
              width: 90px;
              margin-right: 10px;
              margin-bottom: 10px;
            }
          }
        }
        .goods-pic-box {
          .err-tips {
            position: static;
          }
        }
      }
    }
    .price-inventory {
      .price-inventory-edit {
        padding: 10px 5px 20px;
        .goods-specification-box {
          border: 1px solid #d5d5d5;
          padding: 20px;
          .name {
            color: #666;
            width: auto;
          }
          .specification-block {
            background: #efefef;
            margin-bottom: 10px;
            padding: 20px;
            &:last-child {
              margin-bottom: 0;
            }
            .delete-specific {
              float: right;
              cursor: pointer;
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
              .err-tips {
                position: static;
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
        .show-stock-btn {
          .show-stock {
            width: 100px;
          }
          .hide-stock {
            width: 146px;
            margin-left: 9px;
          }
          .hide-stock, .show-stock {
            vertical-align: middle;
            background: #fff;
            border-color: @b5b5;
            color: @b9;
          }
          .hide-stock.active, .show-stock.active {
            background: #fff;
            border-color: @mainC;
            color: @mainC;
          }
        }
      }
    }
    .other-info {
      .other-info-edit {
        padding: 10px 5px 20px;
        .el-button--small {
          width: 100px;
          vertical-align: middle;
          margin-left: 8px;
        }
        .el-button--success {
          background: #fff;
          border-color: @b5b5;
          color: @b9;
          &.active {
            background: #fff;
            border-color: @mainC;
            color: @mainC;
          }
        }
        .freeCheckbox {
          color: @b9;
          border: 1px solid @b5b5;
          display: inline-block;
          vertical-align: middle;
          box-sizing: border-box;
          border-radius: 3px;
          margin-left: 8px;
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          &.is-checked {
            border-color: @mainC;
          }
        }
        .express-postage {
          position: relative;
          &::before {
            content: '￥';
            display: block;
            position: absolute;
            top: 2px;
            left: 10px;
          }
          input {
            width: 210px;
            padding-left: 26px;
            box-sizing: border-box;
          }
        }
      }
    }
    .add-goods-btn {
      padding: 10px 0 30px 90px;
    }
  }
  .el-button--small {
    width: 80px;
    height: 30px;
    padding: 0;
  }
</style>
<style lang="less">
  .add-goods-object {
    .el-input__inner {
      border-radius: 0;
    }
    .ql-container, .ql-editor {
      min-height: 200px;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: @mainC;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: @mainC;
      border-color: @mainC;
    }
    .el-checkbox__input.is-focus .el-checkbox__inner {
      border-color: @mainC;
    }
    .el-upload--picture-card {
      width: 80px;
      height: 80px;
      border-color: @bc;
      background: #fff;
      i {
        color: @bc;
        font-size: 20px;
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 80px;
      height: 80px;
    }
    .el-select {
      vertical-align: middle;
    }
  }
</style>
