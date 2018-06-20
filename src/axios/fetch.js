import axios from 'axios'
import { MessageBox } from 'element-ui'

export function fetch (options) {
  return new Promise((resolve, reject) => {
    let key = null
    let secret = null
    if (localStorage.getItem('api-key') !== 'undefined' && localStorage.getItem('api-secret') !== 'undefined') {
      key = JSON.parse(localStorage.getItem('api-key'))
      secret = JSON.parse(localStorage.getItem('api-secret'))
    }
    const instance = axios.create({ // instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
      // 所有的请求都会带上这些配置，比如全局都要用的身份信息等。
      headers: {
        'Api-Key': key,
        'Api-Secret': secret
        // 'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'application/json'
        // 'token_in_header': global_.token,//token从全局变量那里传过来
      },
      timeout: 30 * 1000 // 30秒超时
    })
    instance(options)
      .then(response => { // then 请求成功之后进行什么操作
        resolve(response)// 把请求到的数据发到引用请求的地方
      })
      .catch(error => {
        // console.dir(error)
        if (error.response.status === 401) {
          // alert('未登录！请返回51赞平台重新进入！')
          // location.href = 'http://www.51zan.cn/login.html'
          MessageBox.alert('未登录！请返回51赞平台重新进入！', {
            confirmButtonText: '确定',
            showClose: false,
            callback: action => {
              location.href = 'http://www.51zan.cn/login.html'
            }
          })
        }
        if (error.response.status === 403) {
          // alert('未授权小程序或未完成初次设置！')
          // location.href = '/login'
          MessageBox.alert('未授权小程序或未完成初次设置！', {
            confirmButtonText: '确定',
            showClose: false,
            callback: action => {
              location.href = '/login'
            }
          })
        }
        reject(error)
      })
  })
}
