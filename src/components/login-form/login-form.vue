<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="code" style="display: flex;">
      <Input type="code" size="large" maxlength="4"  v-model="form.code" placeholder="验证码"
             style="width: 90px;height: 40px;position: relative;bottom: 10px" >
      </Input>
      <img style="margin-left: 10px;" :src="'/api/'+captcha_url" @click="refreshCaptcha()" width="80px" height="40px"/>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import { getCaptcha } from '@/service/api/user'
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted: function () {
    this.refreshCaptcha()
  },
  data () {
    return {
      captcha_url: '',
      form: {
        userName: 'super_admin',
        password: '',
        code: '',
        uuid: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    refreshCaptcha: function () {
      getCaptcha().then((resp) => {
        this.form.uuid = resp.data.uuid
        this.captcha_url = resp.data.path
      })
    },
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
            code: this.form.code,
            uuid: this.form.uuid
          })
        }
      })
    }
  }
}
</script>
