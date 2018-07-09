let api = ''

// 根据dev.env.js和prod.env.js获取域名配置
api = 'https://' + process.env.API_HOST + '.yiqixuan.com'
// api = 'https://backend-v120-develop.yiqixuan.com/'
// api = 'https://backend-v120-releases.yiqixuan.com'

export default {
  ip: api
  // 接口代理配置
  // ip: 'https://develop.yiqixuan.com'
  // ip: 'https://api.yiqixuan.com'
  // ip: 'https://test.yiqixuan.com'
  // ip: 'http://192.168.20.176:8080' // 吴慧卿 192.168.20.176
  // ip: 'http://192.168.20.198' // 将纯吉
}
