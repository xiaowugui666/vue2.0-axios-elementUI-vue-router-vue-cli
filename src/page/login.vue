<template>
  <div>登录验证</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {initialSetData} from '../axios/api'
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
      // 5146ae05-25e6-45b4-80f7-a0842859b4d2
      if (userToken) {
        this.$http.post(api.cjip83 + '/management/login', {token: userToken})
          .then(function (res) {
            console.log(res.headers)
            localStorage.setItem('api-key', JSON.stringify(res.headers['api-key']))
            localStorage.setItem('api-secret', JSON.stringify(res.headers['api-secret']))
          }).catch(function (error) {
            console.log(error)
            // location.href = 'http://www.51zan.cn/login.html'
          })
      } else {
        initialSetData().then(res => {
          console.log(res)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
