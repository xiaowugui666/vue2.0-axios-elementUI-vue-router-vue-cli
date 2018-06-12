// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '../theme/index.css'
import ElementUI from 'element-ui'
import './style/common.less'
// import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN' // 引入中文包，提示信息可以以中文形式显示
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios

Validator.localize('zh_CN', zhCN)
const config = {
  errorBagName: 'errors',
  fieldsBagName: 'fieldBags',
  delay: 0,
  locale: 'zh_CN',
  strict: true,
  enableAutoClasses: true,
  events: 'blur',
  inject: true
}
Vue.use(VeeValidate, config)

Vue.filter('money', function (val) {
  val = Number(val) / 100
  return val.toFixed(2)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  store.commit('setMenuLeft', '')
  next()
})
