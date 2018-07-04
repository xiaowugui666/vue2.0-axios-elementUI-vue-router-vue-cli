let api = ''

// 根据dev.env.js和prod.env.js获取域名配置
api = 'https://' + process.env.API_HOST + '.yiqixuan.com'
// api = 'https://wu-v101-develop.yiqixuan.com'

export default {
  // 接口代理配置
  ip: api
  // ip: 'https://develop.yiqixuan.com'
  // ip: 'https://api.yiqixuan.com'
  // ip: 'https://test.yiqixuan.com'
  // ip: 'https://wu-v101-develop.yiqixuan.com' // 吴慧卿 192.168.20.176
  // ip: 'http://192.168.20.198' // 将纯吉
}
