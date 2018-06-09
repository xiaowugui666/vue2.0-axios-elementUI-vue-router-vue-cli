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
      userToken: this.$route.query
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
      if (userToken.token) {
        this.$http.post(api.cjip + '/management/login', {token: userToken.token})
          .then(res => {
            localStorage.setItem('api-key', JSON.stringify(res.headers['api-key']))
            localStorage.setItem('api-secret', JSON.stringify(res.headers['api-secret']))

            this.getInitialSetData()
          }).catch(error => {
            console.log(error)
            // location.href = 'http://www.51zan.cn/login.html'
          })
      } else if (userToken.appid) {
        checkAuth({app_id: userToken.appid}).then(res => {
          this.getInitialSetData()
        }).catch()
      }
    },
    // 登录成功后调用
    getInitialSetData () {
      initialSetData('get').then(res => {
        console.log(res.data)
        if (!res.data.mpa) {
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
