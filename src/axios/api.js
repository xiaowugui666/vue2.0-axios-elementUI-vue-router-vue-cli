import { fetch } from './fetch' // 引用fetch.js
import api from './url' // 引用url.js

// 查看用户
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

// 获取订单列表
export function order (data) {
  return fetch({
    url: api.ip + '/management/order',
    method: 'GET',
    params: data
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
    url: api.hqip + '/management/goods',
    method: 'get', // 请求方法
    params: data
  })
}

// 营销模块：获取商品列表
export function marketingGoods (router, data) {
  return fetch({
    url: api.xkip + '/management/' + router,
    method: 'GET',
    params: data
  })
}

// 新增特价商品
export function addSpecialGood (data) {
  return fetch({
    url: api.xkip + '/management/special_goods',
    method: 'POST',
    data: data
  })
}

// 编辑特价商品活动
export function closeGoods (data) {
  return fetch({
    url: api.xkip + '/management/special_goods/' + data.id,
    method: 'PUT',
    data: data
  })
}

// 编辑推荐商品
export function closeRecommendGood (data) {
  return fetch({
    url: api.xkip + '/management/recommend_goods/' + data.id,
    method: 'PUT',
    data: data
  })
}

// 获取编辑商品信息
export function editorGoods (id) {
  return fetch({
    url: api.xkip + '/management/special_goods/' + id,
    method: 'GET'
  })
}

// 删除特价商品
export function deleteSpecial (id) {
  return fetch({
    url: api.xkip + '/management/special_goods/' + id,
    method: 'DELETE'
  })
}

// 删除推荐商品
export function deleteRecommend (id) {
  return fetch({
    url: api.xkip + '/management/recommend_goods/' + id,
    method: 'DELETE'
  })
}

// 新建特价商品，获取商品列表
export function newGoodsList (data) {
  return fetch({
    url: api.hqip + '/management/goods/sku',
    method: 'GET',
    params: data
  })
}

// 新建推荐商品，点击分页获取商品列表
export function paginaGoods (params) {
  return fetch({
    url: api.hqip + '/management/goods/sku',
    params: params
  })
}

// 新建推荐商品
export function newRecommendGoods (data) {
  return fetch({
    url: api.xkip + '/management/recommend_goods',
    method: 'POST',
    data: data
  })
}

// 批量商品上下架
export const goodsStatus = function (data) {
  return fetch({
    url: api.hqip + '/management/goods/batch',
    method: 'put', // 请求方法
    data: data
  })
}

// 批量删除商品
export const goodsDelete = function (data) {
  return fetch({
    url: api.hqip + '/management/goods/batch',
    method: 'delete', // 请求方法
    data: data
  })
}

// 获取商品分类
export const goodsCategory = function (data) {
  return fetch({
    url: api.hqip + '/management/category',
    method: 'get' // 请求方法
  })
}

// 修改商品页，获取商品详情
export const goodsEditDetails = function (id) {
  return fetch({
    url: api.hqip + '/management/goods/' + id,
    method: 'get' // 请求方法
  })
}

// 修改商品页，获取上传图片到七牛的token
export const getQnToken = function (param) {
  return fetch({
    url: api.hqip + '/management/merchant/upload?type=' + param,
    method: 'get' // 请求方法
  })
}

// 添加商品
export const addGoods = function (data) {
  return fetch({
    url: api.hqip + '/management/goods',
    method: 'post',
    data: data
  })
}

// 添加商品分类
export const addGoodsCategory = function (data) {
  return fetch({
    url: api.hqip + '/management/category',
    method: 'post', // 请求方法
    data: data
  })
}

// 删除商品分类
export const deleteGoodsCategory = function (id) {
  return fetch({
    url: api.hqip + '/management/category/' + id,
    method: 'delete' // 请求方法
  })
}

// 增加商品分类图片
export const updateGoodsCategoryPic = function (data, id) {
  return fetch({
    url: api.hqip + '/management/category/' + id,
    method: 'put', // 请求方法
    data: data
  })
}

// 有新接口的时候像上面那样再来一次
// //修改昵称接口
// export function userID(name){
//   return fetch({
//     url:api.myself_name,
//     method:"put",
//     data:{
//       nickname:name
//     }
//   })
// }
//
//
// //取消转发赞踩接口
// export function cancelForward(articleId,type){
//   return fetch({
//     url:api.detail_article+articleId+"/forwarded_impress",
//     method:"delete",
//     params:{
//       type:type
//     }
//   })
// }
