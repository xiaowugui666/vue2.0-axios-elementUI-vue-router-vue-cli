import axios from 'axios'
let key = JSON.parse(localStorage.getItem('api-key'))
let secret = JSON.parse(localStorage.getItem('api-secret'))

// console.log(secret)
// console.log(key)
export function fetch (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({ // instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
      // 所有的请求都会带上这些配置，比如全局都要用的身份信息等。
      headers: {
        'Api-Key': '222222222',
        'Api-Secret': '2222222'
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
        console.dir(error)
        if (error.response.status === 401) {
          alert('未登录！请返回51赞平台重进入！')
          location.href = 'http://www.51zan.cn/login.html'
        }
        // console.log('请求异常信息：' + error)
        reject(error)
      })
  })
}
