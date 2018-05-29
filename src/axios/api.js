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
    params: data
  })
}

// 获取商品列表
export const goodsList = function (data) {
  return fetch({
    // api.Hallowmas 引用url.js里面的数据
    url: api.ip + '/management/goods',
    method: 'get', // 请求方法
    params: data
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
