import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  menuLeft: '',
  qiniuDomainUrl: 'http://p94iruedm.bkt.clouddn.com/',
  qiniuUploadUrl: 'http://upload.qiniup.com',
  menuShow: true,
  yiqixuanDomainUrl: 'http://image.yiqixuan.com/'
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
