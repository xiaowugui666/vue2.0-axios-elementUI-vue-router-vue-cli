<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import url from './axios/url'
export default {
  name: 'App',
  data () {
    return {}
  }
  // beforeCreate () {
  //   // 在页面刷新的时候发送同步ajax请求，判断是否登录
  //   let loc = location.href.split('?')[0]
  //   let log = ''
  //   if (loc) {
  //     let l = loc.split('/')
  //     log = l[l.length - 1]
  //   } else {
  //     let l = location.href.split('/')
  //     log = l[l.length - 1]
  //   }
  //   // console.log(log)
  //   if (log !== 'login') {
  //     let key = null
  //     let secret = null
  //     if (localStorage.getItem('api-key') !== 'undefined' && localStorage.getItem('api-secret') !== 'undefined') {
  //       key = JSON.parse(localStorage.getItem('api-key'))
  //       secret = JSON.parse(localStorage.getItem('api-secret'))
  //     }
  //     let ajax = new XMLHttpRequest()
  //     ajax.open('get', url.ip + '/management/category', false)
  //     ajax.setRequestHeader('Api-Key', key)
  //     ajax.setRequestHeader('Api-Secret', secret)
  //     ajax.send()
  //     if (ajax.status == 200) {
  //     } else {
  //       if (ajax.status == 401) {
  //         alert('未登录！请返回51赞平台重进入！')
  //         location.href = 'http://www.51zan.cn/login.html'
  //       }
  //       if (ajax.status === 403 && log !== 'initial-setting' && log !== 'binding-mp') {
  //         alert('未授权小程序或未完成初次设置！')
  //         location.href = '/login'
  //       }
  //     }
  //   }
  // }
}
</script>

<style lang="less">
</style>
