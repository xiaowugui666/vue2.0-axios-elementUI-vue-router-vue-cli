import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import initialSetting from '@/page/initial-setting'
import commodityManagement from '@/page/commodity-management'
import orderManagement from '@/page/order-management'
import customerManagement from '@/page/customer-management'
import customerOrder from '@/page/customer-order'
import account from '@/page/account'
import accountDetails from '@/page/account-details'
import marketingManagement from '@/page/marketing-management'
import addMarketingActivity from '@/page/add-marketing-activity'
import informationSetting from '@/page/information-setting'
import addEditGoods from '@/page/add-edit-goods'
import oneKeyIntroduction from '@/page/one-key-introduction'
import categoryManagement from '@/page/category-management'
import orderSetting from '@/page/order-setting'
import paySetting from '@/page/pay-setting'
import mpSetting from '@/page/mp-setting'
import shopProfile from '@/page/shop-profile'
import orderAfterSale from '@/page/order-afterSale'
import orderDetail from '@/page/order-detail'
import orderRebate from '@/page/order-rebate'
import addOrder from '@/page/add-order'
import select from '@/components/select-production'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/select',
      name: 'select',
      component: select
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
      path: '/customerOrder',
      name: 'customerOrder',
      component: customerOrder
    },
    {
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '/account-details',
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
    }
  ]
})
