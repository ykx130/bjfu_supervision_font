<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import LoginForm from './components/LoginForm'
  import {loginUser} from '../../service/api/user'
  export default {
    components: {
      LoginForm
    },

    computed: {
      userInfo () {
        return this.$store.state.userInfo
      }
    },
    methods: {
      handleSubmit ({ userName, password }) {
        loginUser({
          "username": userName,
          "password": password
        }).then((resp)=>{
          if(resp.data.code === 500){
            this.$Message.error('用户名错误密码错误');
          } else {
            this.$Message.success('登陆成功');
            this.$router.push({path: '/'})
          }
        })
      }
    }
  }
</script>

<style>
</style>
