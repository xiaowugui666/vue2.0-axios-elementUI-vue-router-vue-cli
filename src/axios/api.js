import { fetch } from './fetch' // 引用fetch.js
import api from './url' // 引用url.js

// 例子
export function lookOption (issuer, userId) { // lookOption是你要调用接口的名字，issuer,userId是传进来的参数
  return fetch({
    // api.Hallowmas 引用url.js里面的数据
    url: api.ip + '/halloween/' + issuer + '/question',
    method: 'get', // 请求方法
    params: {
      currentUserId: userId // 传过去的参数
    }
  })
}

/* 首页 */
// 首页交易额
export function tradeVolum () {
  return fetch({
    url: api.ip + '/management/merchant/stat/order',
    method: 'GET'
  })
}

/* 店铺 */
// 商品总数
export function storeGoodsAmount () {
  return fetch({
    url: api.ip + '/management/statistics/summary',
    method: 'GET'
  })
}

// 7日浏览量
export function sevenDaysPv () {
  return fetch({
    url: api.ip + '/management/statistics/page',
    method: 'GET'
  })
}

/* 表格数据 */
// 计算表格起止时间
export function endBegins () {
  return fetch({
    url: api.ip + '/management/statistics/nav',
    method: 'GET'
  })
}

// 走势图表格数据
export function tableData (params) {
  return fetch({
    url: api.ip + '/management/statistics',
    method: 'GET',
    params: params
  })
}

/* 订单模块 */
// 获取订单列表
export function order (data) {
  return fetch({
    url: api.ip + '/management/order',
    method: 'GET',
    params: data
  })
}

// 获取售后订单列表
export function afterSaleGoods (data) {
  return fetch({
    url: api.ip + '/management/aftersale',
    method: 'GET',
    params: data
  })
}

// 获取售后订单详情
export function refundDetail (id) {
  return fetch({
    url: api.ip + '/management/aftersale/' + id,
    method: 'GET'
  })
}

// 编辑售后订单
export function editorRefundDetail (params) {
  return fetch({
    url: api.ip + '/management/aftersale/' + params.id,
    method: 'PUT',
    data: params
  })
}

// 订单详情
export function orderDetail (id) {
  return fetch({
    url: api.ip + '/management/order/' + id,
    method: 'GET'
  })
}

// 请求快递公司信息
export function transComp () {
  return fetch({
    url: api.ip + '/management/order/express',
    method: 'GET'
  })
}

// 修改未付款订单价格
export function orderPrice (data) {
  return fetch({
    url: api.ip + '/management/order/' + data.id + '/price',
    method: 'PUT',
    data: data
  })
}

// 订单发货
export function orderExpress (data) {
  return fetch({
    url: api.ip + '/management/order/' + data.id + '/express',
    method: 'PUT',
    data: data
  })
}

// 获取商品列表
export const goodsList = function (data) {
  return fetch({
    url: api.ip + '/management/goods',
    method: 'get', // 请求方法
    params: data
  })
}

// 获取客户列表
export const user = function (data) {
  return fetch({
    // api.Hallowmas 引用url.js里面的数据
    url: api.ip + '/management/user',
    method: 'GET', // 请求方法
    params: data
  })
}

// 编辑客户信息
export function userEditor (data, id) {
  return fetch({
    url: api.ip + '/management/user/' + id,
    data: data,
    method: 'PUT'
  })
}
// 获取账户列表
export const settlement = function (data) {
  return fetch({
    url: api.ip + '/management/settlement',
    method: 'get', // 请求方法
    params: data
  })
}

// 获取账户账单金额
export function settlementTotal (id) {
  return fetch({
    url: api.ip + '/management/settlement/' + id,
    method: 'GET'
  })
}

// 获取账户账单详情
export function settlementDetail (params) {
  return fetch({
    url: api.ip + '/management/settlement/' + params.id + '/payment',
    method: 'GET',
    params: params
  })
}

// 客户
// 客户订单详情
export function customerOrder (params) {
  return fetch({
    url: api.ip + '/management/user/' + params.id + '/orders',
    method: 'GET',
    params: params
  })
}

// 账户
// 获取账户收入信息
export function incomeInfo () {
  return fetch({
    url: api.ip + '/management/settlement/stat/income',
    method: 'GET'
  })
}

// 营销模块：获取商品列表
export function marketingGoods (router, data) {
  return fetch({
    url: api.ip + '/management/' + router,
    method: 'GET',
    params: data
  })
}

// 新增特价商品
export function addSpecialGood (data) {
  return fetch({
    url: api.ip + '/management/special_goods',
    method: 'POST',
    data: data
  })
}

// 编辑特价商品活动
export function closeGoods (data) {
  return fetch({
    url: api.ip + '/management/special_goods/' + data.id,
    method: 'PUT',
    data: data
  })
}

// 获取单一推荐商品
export function singleRecommendGood (id) {
  return fetch({
    url: api.ip + '/management/recommend_goods/' + id,
    method: 'GET'
  })
}

// 编辑推荐商品
export function closeRecommendGood (data) {
  return fetch({
    url: api.ip + '/management/recommend_goods/' + data.id,
    method: 'PUT',
    data: data
  })
}

// 获取编辑特价商品信息
export function editorGoods (id) {
  return fetch({
    url: api.ip + '/management/special_goods/' + id,
    method: 'GET'
  })
}

// 删除特价商品
export function deleteSpecial (id) {
  return fetch({
    url: api.ip + '/management/special_goods/' + id,
    method: 'DELETE'
  })
}

// 删除推荐商品
export function deleteRecommend (id) {
  return fetch({
    url: api.ip + '/management/recommend_goods/' + id,
    method: 'DELETE'
  })
}

// 新建特价商品，获取商品列表
export function newGoodsList (data) {
  return fetch({
    url: api.ip + '/management/goods_sku/search',
    method: 'GET',
    params: data
  })
}

// 新建推荐商品，点击分页获取商品列表
export function paginaGoods (params) {
  return fetch({
    url: api.ip + '/management/goods_sku/search',
    params: params
  })
}

// 新建推荐商品
export function newRecommendGoods (data) {
  return fetch({
    url: api.ip + '/management/recommend_goods',
    method: 'POST',
    data: data
  })
}

// 点击排序
export function changeSort (route, data) {
  return fetch({
    url: api.ip + '/management/' + route + '/rank',
    method: 'POST',
    data: data
  })
}
/* 营销模块结束 */

// 批量商品上下架
export const goodsStatus = function (data) {
  return fetch({
    url: api.ip + '/management/goods/batch',
    method: 'put', // 请求方法
    data: data
  })
}

// 批量删除商品
export const goodsDelete = function (data) {
  return fetch({
    url: api.ip + '/management/goods/batch',
    method: 'delete', // 请求方法
    data: data
  })
}

// 获取商品分类
export const goodsCategory = function (data) {
  return fetch({
    url: api.ip + '/management/category',
    method: 'get' // 请求方法
  })
}

// 修改商品页，获取商品详情
export const goodsEditDetails = function (id) {
  return fetch({
    url: api.ip + '/management/goods/' + id,
    method: 'get' // 请求方法
  })
}

// 修改商品页，获取上传图片到七牛的token
export const getQnToken = function (param) {
  return fetch({
    url: api.ip + '/management/merchant/upload?type=' + param,
    method: 'get' // 请求方法
  })
}

// 添加商品
export const addEditGoods = function (id, data) {
  let method = 'post'
  if (id) {
    method = 'put'
  }
  return fetch({
    url: api.ip + '/management/goods/' + id,
    method: method,
    data: data
  })
}

// 设置 -> 支付设置
export function paySetting (type, data) {
  return fetch({
    url: api.ip + '/management/mpa',
    method: type,
    data: data
  })
}

// 添加商品分类
export const addGoodsCategory = function (data) {
  return fetch({
    url: api.ip + '/management/category',
    method: 'post', // 请求方法
    data: data
  })
}

// 删除商品分类
export const deleteGoodsCategory = function (id) {
  return fetch({
    url: api.ip + '/management/category/' + id,
    method: 'delete' // 请求方法
  })
}

// 增加商品分类图片
export const updateGoodsCategoryPic = function (data, id) {
  return fetch({
    url: api.ip + '/management/category/' + id,
    method: 'put', // 请求方法
    data: data
  })
}

// 获取是否绑定小程序，初次设置数据，支付设置
export const initialSetData = function (type, data) {
  return fetch({
    url: api.ip + '/management/merchant',
    method: type, // 请求方法
    data: data
  })
}

// 绑定小程序
export const bindingMp = function () {
  return fetch({
    url: api.ip + '/management/mpa/auth',
    method: 'get' // 请求方法
  })
}

// 解绑小程序
export const untieMp = function () {
  return fetch({
    url: api.ip + '/management/mpa/unbind',
    method: 'delete' // 请求方法
  })
}

// 验证小程序是否授权成功
export const checkAuth = function (data) {
  return fetch({
    url: api.ip + '/management/mpa/auth',
    method: 'post', // 请求方法
    data: data
  })
}

// 获取小程序信息
export const mpInfo = function () {
  return fetch({
    url: api.ip + '/management/mpa/info',
    method: 'get' // 请求方法
  })
}

// 小程序体验者账号
export const mpaExperience = function (type, data) {
  return fetch({
    url: api.ip + '/management/mpa/tester',
    method: type, // 请求方法
    data: data,
    params: data
  })
}
