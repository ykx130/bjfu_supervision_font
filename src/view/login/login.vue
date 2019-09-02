<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form ref="login" @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import { loginUser } from '@/service/api/user'
import UserMixin from '@/mixins/UserMixin.js'
export default {
  components: {
    LoginForm
  },
  mixins: [ UserMixin ],
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password, uuid, code }) {
      this.handleLogin({ userName, password, uuid, code }).then(res => {
        if (res.data.code === 200) {
          this.getUserInfo().then(res => {
            this.$router.push({
              name: '_home'
            })
          })
        } else {
          this.$refs.login.refreshCaptcha()
        }
      })
    }
  }
}
</script>

<style>

</style>
