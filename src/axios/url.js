// 有些不能用ip地址直接访问，先修改hosts文件
export default {
  // 接口代理配置
  // ip: 'https://test.yiqixuan.com'
  ip: 'https://test.yiqixuan.com'
  // ip: 'http://192.168.20.176:8080' // 吴慧卿 192.168.20.176
  // ip: 'http://192.168.20.198' // 将纯吉
}

// 也可以像下面这样，区分环境或者区分服务器等等
// let service = 'dev';
// // let service = 'prod';
// let api = '';
// if (service === 'dev') {
//   /**dev开发**/
//   api = '/stomatology/patient';
// } else if (service === 'prod') {
//   /**prod部署**/
//   api = '/proxy/client';
// }
//
// export default {
//   /**个人中心start**/
//   //1 获取c端个人信息 POST /wx/getClientInfo
//   getClientInfo: `${api}/wx/getClientInfo`,
//   //2 获取手机注册验证码 POST /wx/getClientRegisterCode
//   getClientRegisterCode: `${api}/wx/getClientRegisterCode`,
//   //3 绑定手机号 POST /wx/clientBindMobile
//   clientBindMobile: `${api}/wx/clientBindMobile`,
//   /**个人中心end**/
//
// }
