import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  menuLeft: '',
  qiniuUploadUrl: '//upload.qiniup.com',
  yiqixuanDomainUrl: '//image.yiqixuan.com/',
  groupProductId: []
}

const mutations = {
  setMenuLeft (state, i) {
    state.menuLeft = i
  },
  setGroupProduct (state, value) {
    state.groupProductId = value
  }
}

const actions = {
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
