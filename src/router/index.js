import Vue from 'vue'
import Router from 'vue-router'
const home = r => require.ensure([], () => r(require('@/page/home')))
const initialSetting = r => require.ensure([], () => r(require('@/page/initial-setting')))
const commodityManagement = r => require.ensure([], () => r(require('@/page/commodity-management')))
const orderManagement = r => require.ensure([], () => r(require('@/page/order-management')))
const customerManagement = r => require.ensure([], () => r(require('@/page/customer-management')))
const customerOrder = r => require.ensure([], () => r(require('@/page/customer-order')))
const account = r => require.ensure([], () => r(require('@/page/account')))
const accountDetails = r => require.ensure([], () => r(require('@/page/account-details')))
const marketingManagement = r => require.ensure([], () => r(require('@/page/marketing-management')))
const addMarketingActivity = r => require.ensure([], () => r(require('@/page/add-marketing-activity')))
const informationSetting = r => require.ensure([], () => r(require('@/page/information-setting')))
const addEditGoods = r => require.ensure([], () => r(require('@/page/add-edit-goods')))
const oneKeyIntroduction = r => require.ensure([], () => r(require('@/page/one-key-introduction')))
const categoryManagement = r => require.ensure([], () => r(require('@/page/category-management')))
const orderSetting = r => require.ensure([], () => r(require('@/page/order-setting')))
const paySetting = r => require.ensure([], () => r(require('@/page/pay-setting')))
const mpSetting = r => require.ensure([], () => r(require('@/page/mp-setting')))
const shopProfile = r => require.ensure([], () => r(require('@/page/shop-profile')))
const orderAfterSale = r => require.ensure([], () => r(require('@/page/order-afterSale')))
const orderDetail = r => require.ensure([], () => r(require('@/page/order-detail')))
const orderRebate = r => require.ensure([], () => r(require('@/page/order-rebate')))
const addOrder = r => require.ensure([], () => r(require('@/page/add-order')))
const login = r => require.ensure([], () => r(require('@/page/login')))
const err404 = r => require.ensure([], () => r(require('@/page/404')))
const bindingMp = r => require.ensure([], () => r(require('@/page/binding-mp')))

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/initial-setting',
      name: 'initialSetting',
      component: initialSetting
    },
    {
      path: '/commodity-management',
      name: 'commodityManagement',
      component: commodityManagement
    },
    {
      path: '/orderManagement',
      name: 'orderManagement',
      component: orderManagement
    },
    {
      path: '/customerManagement',
      name: 'customerManagement',
      component: customerManagement
    },
    {
      path: '/customerOrder/:id',
      name: 'customerOrder',
      component: customerOrder
    },
    {
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '/account-details/:id',
      name: 'accountDetails',
      component: accountDetails
    },
    {
      path: '/marketing-management/:class',
      name: 'marketingManagement',
      component: marketingManagement
    },
    {
      path: '/add-marketing-activity/:class',
      name: 'addMarketingActivity',
      component: addMarketingActivity
    },
    {
      path: '/informationSetting',
      name: 'informationSetting',
      component: informationSetting
    },
    {
      path: '/orderSetting',
      name: 'orderSetting',
      component: orderSetting
    },
    {
      path: '/orderDetail/:id',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/addOrder',
      name: 'addOrder',
      component: addOrder
    },
    {
      path: '/orderAfterSale',
      name: 'orderAfterSale',
      component: orderAfterSale
    },
    {
      path: '/order-rebate',
      name: 'orderRebate',
      component: orderRebate
    },
    {
      path: '/shopProfile',
      name: 'shopProfile',
      component: shopProfile
    },
    {
      path: '/add-edit-goods',
      name: 'addEditGoods',
      component: addEditGoods
    },
    {
      path: '/oneKeyIntroduction',
      name: 'oneKeyIntroduction',
      component: oneKeyIntroduction
    },
    {
      path: '/category-management',
      name: 'categoryManagement',
      component: categoryManagement
    },
    {
      path: '/pay-setting',
      name: 'paySetting',
      component: paySetting
    },
    {
      path: '/mp-setting',
      name: 'mpSetting',
      component: mpSetting
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/binding-mp',
      name: 'bindingMp',
      component: bindingMp
    },
    {
      path: '/404',
      name: 'err404',
      component: err404
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
