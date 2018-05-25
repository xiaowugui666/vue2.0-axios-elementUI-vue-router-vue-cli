// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '../theme/index.css'
import ElementUI from 'element-ui'
import './style/common.less'
// import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/store'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
