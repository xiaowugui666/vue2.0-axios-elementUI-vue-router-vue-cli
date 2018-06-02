import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  menuLeft: '',
  qiniuDomainUrl: 'http://p94iruedm.bkt.clouddn.com/',
  menuShow: true,
  adminInfo: {
    avatar: 'default.jpg'
  },
  huzanDomainUrl: 'http://image.c.51zan.cn/'
}

const mutations = {
  setMenuLeft (state, i) {
    state.menuLeft = i
  },
  setMenuShow (state, i) {
    state.menuShow = i
  }
}

const actions = {
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
