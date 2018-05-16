import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  menuLeft: '',
  menuShow: true,
  adminInfo: {
    avatar: 'default.jpg'
  }
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
