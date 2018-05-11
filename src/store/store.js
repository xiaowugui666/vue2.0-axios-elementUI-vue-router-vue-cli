import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  menuLeft: '3-1',
  adminInfo: {
    avatar: 'default.jpg'
  }
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
