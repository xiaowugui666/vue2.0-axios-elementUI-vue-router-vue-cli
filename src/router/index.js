import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import initialSetting from '@/page/initial-setting'
import commodityManagement from '@/page/commodity-management'
import orderManagement from '@/page/order-management'
import customerManagement from '@/page/customer-management'
import account from '@/page/account'
import collageManagement from '@/page/collage-management'
import informationSetting from '@/page/information-setting'
import orderSetting from '@/page/order-setting'
import shopProfile from '@/page/shop-profile'
import addEditGoods from '@/page/add-edit-goods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/initialSetting',
      name: 'initialSetting',
      component: initialSetting
    },
    {
      path: '/commodityManagement',
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
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '/collageManagement',
      name: 'collageManagement',
      component: collageManagement
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
      path: '/shopProfile',
      name: 'shopProfile',
      component: shopProfile
    },
    {
      path: '/addEditGoods',
      name: 'addEditGoods',
      component: addEditGoods
    }
  ]
})
