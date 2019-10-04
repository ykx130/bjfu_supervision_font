<template>
  <Form ref="loginForm" :model="form" :rules="rules"  ><!--@keydown.enter.native="handleSubmit"-->
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
      <div id="your-dom-id" class="nc-container"></div> <!--No-Captcha渲染的位置，其中 class 中必须包含 nc-container-->
    </FormItem>
    <FormItem>
      <Button :disabled="disable_login" @click="handleSubmit" type="primary" long>登录</Button>
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
      nc: undefined,
      disable_login: true,
      form: {
        userName: 'super_admin',
        password: '',
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
      var nc_token = ["FFFF0N000000000084BF", (new Date()).getTime(), Math.random()].join(':');
      var NC_Opt =
        {
          renderTo: "#your-dom-id",
          appkey: "FFFF0N000000000084BF",
          scene: "nc_login",
          token: nc_token,
          customWidth: 270,
          trans:{"key1":"code0"},
          elementID: ["usernameID"],
          is_Opt: 0,
          language: "cn",
          isEnabled: true,
          timeout: 3000,
          times:5,
          apimap: {
            // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
            // 'get_captcha': '//b.com/get_captcha/ver3',
            // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3'
            // 'get_img': '//c.com/get_img',
            // 'checkcode': '//d.com/captcha/checkcode.jsonp',
            // 'umid_Url': '//e.com/security/umscript/3.2.1/um.js',
            // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
            // 'umid_serUrl': 'https://g.com/service/um.json'
          },
          callback:  (data) => {
            this.disable_login = false
            window.console && console.log(nc_token)
            window.console && console.log(data.csessionid)
            window.console && console.log(data.sig)
          }
        }
      this.nc = new noCaptcha(NC_Opt)
      this.nc.upLang('cn', {
        _startTEXT: "请按住滑块，拖动到最右边",
        _yesTEXT: "验证通过",
        _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
        _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
      })
    },
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
          })
        }
      })
    }
  }
}
</script>
