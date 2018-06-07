<template>
  <div></div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {initialSetData, checkAuth} from '../axios/api'
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
      // 2afd51e0-8650-474a-81f3-f51ff2761f59
      if (userToken) {
        this.$http.post(api.cjip83 + '/management/login', {token: userToken})
          .then(res => {
            console.log(res.headers)
            localStorage.setItem('api-key', JSON.stringify(res.headers['api-key']))
            localStorage.setItem('api-secret', JSON.stringify(res.headers['api-secret']))

            this.getInitialSetData()
          }).catch(error => {
            console.log(error)
            // location.href = 'http://www.51zan.cn/login.html'
          })
      } else {
        checkAuth().then(res => {
          this.getInitialSetData()
        }).catch()
      }
    },
    // 登录成功后调用
    getInitialSetData () {
      initialSetData().then(res => {
        if (res.data.authorization_status === 0) {
          this.setRouter('/binding-mp')
        } else {
          this.setRouter('/initial-setting')
        }
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
