import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  menuLeft: '',
  qiniuUploadUrl: '//upload.qiniup.com',
  yiqixuanDomainUrl: '//image.yiqixuan.com/'
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
