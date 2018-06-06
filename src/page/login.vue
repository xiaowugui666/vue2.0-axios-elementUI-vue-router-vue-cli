<template>
  <div>登录验证</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import api from '../axios/url'
export default {
  data () {
    return {
      userToken: this.$route.query.token
    }
  },
  created () {
    this.setMenuShow(false)
    this.loginState(this.userToken)
  },
  computed: {
    ...mapState(['menuShow'])
  },
  methods: {
    ...mapMutations(['setMenuShow']),
    // 通过url上携带的token判断是否登录，并获取api-key，api-secret
    loginState (userToken) {
      // 307a503d-66b6-4002-9667-817883202489
      if (userToken) {
        this.$http.post(api.hqip8080 + '/management/login', {token: userToken})
          .then(function (res) {
            console.log(res.headers)
            localStorage.setItem('api-key', JSON.stringify(res.headers['api-key']))
            localStorage.setItem('api-secret', JSON.stringify(res.headers['api-secret']))
          }).catch(function (error) {
            console.log(error)
            // location.href = 'http://www.51zan.cn/login.html'
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
