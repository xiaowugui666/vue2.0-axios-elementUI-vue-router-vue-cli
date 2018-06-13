<template>
  <div></div>
</template>

<script>
import {initialSetData, checkAuth} from '../axios/api'
import api from '../axios/url'
export default {
  data () {
    return {
      userToken: this.$route.query
    }
  },
  created () {
    this.loginState(this.userToken)
  },
  methods: {
    // 通过url上携带的token判断是否登录，并获取api-key，api-secret
    loginState (userToken) {
      // 如果url上有携带token参数
      if (userToken.token) {
        this.$http.post(api.ip + '/management/login', {token: userToken.token})
          .then(res => {
            localStorage.setItem('api-key', JSON.stringify(res.headers['api-key']))
            localStorage.setItem('api-secret', JSON.stringify(res.headers['api-secret']))

            let data = res.data
            if (!data.mpa) {
              this.setRouter('/binding-mp')
            } else {
              if (data.name && data.type && data.description && data.banner && data.owner_name && data.mpa.merchant_no && data.mpa.merchant_key && data.mpa.merchant_cert) {
                this.setRouter('/')
              } else {
                this.setRouter('/initial-setting')
              }
            }
          }).catch(error => {
            alert(error.response.data.message)
            location.href = 'http://www.51zan.cn/login.html'
          })
      } else if (userToken.appid) {
        // 绑定小程序回来后，url上会带有appid参数
        checkAuth({app_id: userToken.appid}).then(res => {
          this.getInitialSetData()
        }).catch()
      }
    },
    // 登录成功后调用
    getInitialSetData () {
      initialSetData('get').then(res => {
        console.log(res.data)
        let data = res.data
        if (!data.mpa) {
          this.setRouter('/binding-mp')
        } else {
          if (data.name && data.type && data.description && data.banner && data.owner_name && data.mpa.merchant_no && data.mpa.merchant_key && data.mpa.merchant_cert) {
            this.setRouter('/')
          } else {
            this.setRouter('/initial-setting')
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 设置路由链接
    setRouter (link) {
      this.$router.push({
        path: link
      })
    }
  }
}
</script>

<style scoped>

</style>
