<template>
  <div class="one-key-introduction-object">
    <div class="el-steps-box">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="主体信息"></el-step>
        <el-step title="店铺信息"></el-step>
        <el-step title="支付信息"></el-step>
      </el-steps>
    </div>
    <div v-if="active == 0" class="choose-shop plate">
      <p>把你的淘宝店、天猫店、京东店等其他平台商品，一键导入虎赞小店铺。</p>
      <div class="shop-list">
        <div @click="shopSelect=index" :class="{'active':shopSelect==index,'el-icon-check':shopSelect==index}" v-for="(item, index) in shopList" :key="index">授权{{item.shopName}}</div>
      </div>
      <div class="immediate-introduction">
        <el-button type="success" size="small" @click="immediateIntroduction">立即导入</el-button>
      </div>
    </div>
    <div v-else-if="active==1" class="goods-category-box plate">
      <p>导入商品类目列表</p>
      <div class="goods-category-list">
        <ul>
          <li v-for="(item, index) in goodsCategoryList" :key="index">
            <span class="customary">{{item.name}}</span>
            <span class="derived">
              <el-select v-model="values1[index]" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="values2[index]" size="small" placeholder="请选择二级类目">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </li>
          <li>一级类目1-二级1-三级1</li>
          <li>一级类目1-二级1-三级2</li>
          <li>一级类目1-二级2-三级3</li>
          <li>一级类目1-二级2-三级4</li>
          <li>一级类目2-二级3-三级5</li>
          <li>12321</li>
        </ul>
      </div>
      <div class="confirm-import">
        <el-button type="success" size="small" @click="confirmImport">确认</el-button>
      </div>
    </div>
    <div v-if="active == 2" class="import-completion">
      <div class="completion-tips">
        <div class="completion-tips-img"><img src="../assets/success.png" alt=""></div>
        <div class="tips-txt">
          <p>恭喜，您已完成此批次的商品导入</p>
          <p>请到商品管理查看导入商品</p>
        </div>
      </div>
      <div>
        <router-link to="/commodityManagement" class="jump-link">点击跳转，商品管理页</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 1,
      shopSelect: -1,
      shopList: [
        {
          shopId: 1,
          shopName: '店铺1'
        },
        {
          shopId: 1,
          shopName: '店铺2'
        },
        {
          shopId: 1,
          shopName: '店铺3'
        }
      ],
      goodsCategoryList: [
        {
          'id': 2,
          'name': '服装',
          'parent_id': 0,
          'children': [
            {
              'id': 3,
              'name': '女装',
              'parent_id': 2,
              'children': [
                {
                  'id': 34,
                  'name': '上衣',
                  'parent_id': 3,
                  'children': [
                    {
                      'id': 341,
                      'name': 'T恤',
                      'parent_id': 34
                    },
                    {
                      'id': 341,
                      'name': 'T恤',
                      'parent_id': 34
                    }
                  ]
                },
                {
                  'id': 34,
                  'name': '上衣',
                  'parent_id': 3,
                  'children': [
                    {
                      'id': 341,
                      'name': 'T恤',
                      'parent_id': 34
                    },
                    {
                      'id': 341,
                      'name': 'T恤',
                      'parent_id': 34
                    }
                  ]
                },
                {
                  'id': 34,
                  'name': '帽子',
                  'parent_id': 3
                }
              ]
            },
            {
              'id': 4,
              'name': '男装',
              'parent_id': 2
            }
          ]
        },
        {
          'id': 2,
          'name': '服装',
          'parent_id': 0,
          'children': [
            {
              'id': 3,
              'name': '女装',
              'parent_id': 2,
              'children': [
                {
                  'id': 34,
                  'name': '上衣',
                  'parent_id': 3,
                  'children': [
                    {
                      'id': 341,
                      'name': 'T恤',
                      'parent_id': 34
                    },
                    {
                      'id': 341,
                      'name': 'T恤',
                      'parent_id': 34
                    }
                  ]
                },
                {
                  'id': 34,
                  'name': '上衣',
                  'parent_id': 3,
                  'children': [
                    {
                      'id': 341,
                      'name': 'T恤',
                      'parent_id': 34
                    },
                    {
                      'id': 341,
                      'name': 'T恤',
                      'parent_id': 34
                    }
                  ]
                },
                {
                  'id': 34,
                  'name': '帽子',
                  'parent_id': 3
                }
              ]
            },
            {
              'id': 4,
              'name': '男装',
              'parent_id': 2
            }
          ]
        }
      ],
      options1: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
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
      options2: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
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
      values1: ['', '', '', ''],
      values2: ['', '', '', '']
    }
  },
  mounted () {
  },
  methods: {
    immediateIntroduction () {
      this.active = 1
    },
    confirmImport () {
      this.active = 2
    }
  }
}
</script>

<style scoped lang="less">
  .one-key-introduction-object {
    margin-left: 200px;
    margin-right: 20px;
    padding-top: 20px;
    min-width: 1100px;
    .el-steps-box {
      background: #fff;
      padding: 20px;
      margin-bottom: 20px;
    }
    .plate {
      padding: 20px 15px;
      margin-bottom: 20px;
      background: #fff;
      color: #333;
      font-size: 12px;
      line-height: 15px;
    }
    .choose-shop {
      padding-bottom: 30px;
      p {
        color: #666;
      }
      .shop-list {
        padding-top: 20px;
        font-size: 0;
        div {
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;
          width: 150px;
          height: 150px;
          text-align: center;
          line-height: 150px;
          font-size: 12px;
          color: #FFFFFF;
          background: #D8D8D8;
          border: 1px solid #979797;
          cursor: pointer;
          margin-bottom: 20px;
          position: relative;
          &.active {
            border-color: #DE5B67;
            color: #DE5B67;
            &::before {
              line-height: 1;
              font-size: 16px;
              position: absolute;
              right: 0;
              top: 0;
            }
          }
        }
      }
      .immediate-introduction {
        padding-top: 10px;
      }
    }
    .goods-category-box {
      padding-bottom: 30px;
      p {
        font-size: 14px;
        color: #333;
      }
      .goods-category-list {
        background: #EFEFEF;
        padding: 20px;
        margin-top: 20px;
        li {
          margin-top: 20px;
          &:first-child {
            margin-top: 0;
          }
          span {
            display: inline-block;
            vertical-align: middle;
          }
          .customary {
            width: 400px;
          }
          .el-select {
            width: 246px;
            .el-input {
              height: 30px;
            }
            &:first-child {
              margin-right: 15px;
            }
          }
        }
      }
      .confirm-import {
        padding-top: 30px;
      }
    }
    .import-completion {
      text-align: center;
      padding-top: 140px;
      .completion-tips {
        >div {
          display: inline-block;
          vertical-align: middle;
        }
        .completion-tips-img {
          width: 60px;
        }
        .tips-txt {
          padding-left: 10px;
          text-align: left;
          font-size: 14px;
          color: #666;
          line-height: 22px;
        }
      }
      .jump-link {
        color: #63A4FF;
        font-size: 12px;
        margin-left: -12px;
      }
    }
  }
</style>

<style lang="less">
  .one-key-introduction-object {
    .el-step__title.is-process {
      color: #333;
    }
    .el-step__title.is-wait {
      color: #d5d5d5;
    }
    .el-input__inner {
      border-radius: 0;
      color: #333;
    }
    .el-dialog__header {
      text-align: center;
    }
    .el-dialog__header span {
      font-size: 14px;
      color: #333;
      font-weight: bold;
    }
    .el-dialog__body {
      padding-top: 20px;
    }
  }
</style>
