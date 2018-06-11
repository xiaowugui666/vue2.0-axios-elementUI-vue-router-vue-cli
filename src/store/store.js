import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  menuLeft: '',
  qiniuDomainUrl: 'http://p94iruedm.bkt.clouddn.com/',
  qiniuUploadUrl: 'http://upload.qiniup.com',
  yiqixuanDomainUrl: 'http://image.yiqixuan.com/',
  mainCategory: [
    {
      value: 1,
      label: '食品'
    },
    {
      value: 2,
      label: '数码家电'
    },
    {
      value: 3,
      label: '女装'
    },
    {
      value: 4,
      label: '美妆'
    },
    {
      value: 5,
      label: '日用百货'
    },
    {
      value: 6,
      label: '休闲娱乐'
    },
    {
      value: 7,
      label: '男装'
    },
    {
      value: 8,
      label: '亲子'
    },
    {
      value: 9,
      label: '教育培训'
    },
    {
      value: 10,
      label: '餐饮外卖'
    },
    {
      value: 11,
      label: '箱包配饰'
    },
    {
      value: 12,
      label: '家居家纺'
    },
    {
      value: 13,
      label: '媒体服务'
    },
    {
      value: 14,
      label: '海外购'
    },
    {
      value: 15,
      label: '运动户外'
    },
    {
      value: 16,
      label: '礼品鲜花'
    },
    {
      value: 17,
      label: '医疗健康'
    },
    {
      value: 18,
      label: '酒店旅游'
    },
    {
      value: 19,
      label: '票务卡券'
    },
    {
      value: 20,
      label: '汽车养护'
    },
    {
      value: 21,
      label: '丽人健身'
    },
    {
      value: 22,
      label: '家装建材'
    },
    {
      value: 23,
      label: '充值缴费'
    },
    {
      value: 24,
      label: '图书音像'
    },
    {
      value: 25,
      label: '家政服务'
    },
    {
      value: 26,
      label: '名俗文化'
    },
    {
      value: 27,
      label: '鞋靴'
    },
    {
      value: 28,
      label: '宠物'
    },
    {
      value: 29,
      label: '其他'
    }
  ]
}

const mutations = {
  setMenuLeft (state, i) {
    state.menuLeft = i
  }
}

const actions = {
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
