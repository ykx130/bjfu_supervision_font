<style scoped lang="less">
  .ivu-layout-header {
    padding: 0px;
    background-color: #ffffff;
  }

  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: scroll;
    height: 100%;
  }

  .content-wrapper {
    padding: 19px;
    min-height: 650px;
    height: ~"calc(100% - 80px)";
    overflow: scroll;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #f3fffe;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-nav {
    width: 100%;
    margin: 0 auto;
    margin-right: 0px;
  }

  .layout-footer-center {
    text-align: center;
  }
</style>
<template>
  <div style="height: 100%">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="primary" :active-name="activity_name" @on-select="onMenuSelect">
          <div class="layout-nav">
            <!--            <Submenu name="3" v-role="['督导','管理员']">-->
            <!--              <template slot="title">-->
            <!--                <Icon type="ios-stats" />-->
            <!--                我要填写评价-->
            <!--              </template>-->

            <!--            </Submenu>-->

            <div v-if="is_mobile">
              <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-stats"/>
                  菜单栏
                </template>
                <MenuItem name="notice_lesson" v-role="['督导','管理员']">
                  <Icon type="ios-bookmarks-outline"/>
                  重点关注
                </MenuItem>
                <MenuItem name="lesson_model" v-role="['督导','管理员']">
                  <Icon type="ios-happy-outline"/>
                  好评课堂
                </MenuItem>
                <MenuItem name="judge" v-role="['督导','管理员']">
                  <Icon type="ios-book-outline"/>
                  自主听课
                </MenuItem>
                <MenuItem name="my_form" v-role="['督导','管理员']">
                  <Icon type="ios-paper"/>
                  我的评价
                </MenuItem>
                <MenuItem name="lesson_form" v-role="['督导','管理员']">
                  <Icon type="ios-list-box-outline"/>
                  课程表
                </MenuItem>

                <MenuItem name="attend" v-role="['教师']">
                  <Icon type="ios-people"/>
                  活动报名
                </MenuItem>
                <MenuItem name="consult_apply" v-role="['教师']">
                  <Icon type="ios-construct"/>
                  咨询申请
                </MenuItem>
                <MenuItem name="leader_lookup" v-role="['督导','管理员']">
                  <Icon type="ios-body"/>
                  学院教学院长
                </MenuItem>
              </Submenu>
            </div>
            <div v-else>
              <MenuItem name="notice_lesson" v-role="['督导','管理员']">
                <Icon type="ios-bookmarks-outline"/>
                重点关注
              </MenuItem>
              <MenuItem name="lesson_model" v-role="['督导','管理员']">
                <Icon type="ios-happy-outline"/>
                好评课堂
              </MenuItem>
              <MenuItem name="judge" v-role="['督导','管理员']">
                <Icon type="ios-book-outline"/>
                自主听课
              </MenuItem>
              <MenuItem name="my_form" v-role="['督导','管理员']">
                <Icon type="ios-paper"/>
                我的评价
              </MenuItem>
              <MenuItem name="lesson_form" v-role="['督导','管理员']">
                <Icon type="ios-list-box-outline"/>
                课程表
              </MenuItem>
              <MenuItem name="attend" v-role="['教师']">
                <Icon type="ios-people"/>
                活动报名
              </MenuItem>
              <MenuItem name="consult_apply" v-role="['教师']">
                <Icon type="ios-construct"/>
                咨询申请
              </MenuItem>
              <MenuItem name="leader_lookup" v-role="['督导','管理员']">
                <Icon type="ios-body"/>
                学院教学院长
              </MenuItem>
            </div>

          </div>

          <user :user-avator="userAvator" style="float: right; margin-right: 40px"/>
          <userNotices style="margin-right: 10px; float: right;color: #E6EFFA;cursor:pointer"></userNotices>
          <language v-if="$config.useI18n" @on-lang-change="setLocal"
                    style="margin-right: 10px; float: right;color:#E6EFFA" :lang="local"/>
          <!--<error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage" :count="errorCount" style="float: right; margin-right: 10px;color:#E6EFFA"></error-store>-->
          <fullscreen v-model="isFullscreen" style="margin-right: 10px; float: right;color:#E6EFFA"/>
          <div style="margin-right: 100px;float: right" >
            <!--            <span style="font-size:small;color: #FFFFFF">当前身份：</span>-->
            <ButtonGroup style="margin-top: 3px" size="large">
              <Button v-for="(value,index) in this.roles" :key="value" @click="handleClickToAdmin(value)"
                      :type="getBtnType(value)">{{value}}
              </Button>
            </ButtonGroup>
            <span style="color:#E6EFFA;float: left;margin-right: 30px;font-size: medium">
              {{this.userInfo.userInfo.name}}老师,您好!
            </span>
          </div>
          <!--          <span @click="handleClickToAdmin" style="margin-right: 10px; float: right;color:#E6EFFA;cursor:pointer"-->
          <!--                v-role="['管理员', '学院领导', '小组长', '大组长']"> 切换到管理员端 </span>-->
        </Menu>

      </Header>
      <Content class="content-wrapper">
        <router-view/>
        <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper">
          <div class="top">返回顶端</div>
        </ABackTop>
      </Content>
      <Footer class="layout-footer-center">2011-2016 &copy; BJFU-SUPERVIERSION</Footer>
    </Layout>
  </div>
</template>
<script>
import HeaderBar from '_c/main/components/header-bar'
import User from '_c/mainGuider/components/user'
import Fullscreen from '_c/mainGuider/components/fullscreen'
import Language from '_c/mainGuider/components/language'
import userNotices from '_c/user_notices'
import ErrorStore from '_c/mainGuider/components/error-store'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import mapState from '@/mixins/UserMixin'
import ABackTop from '../a-back-top'

export default {
  name: 'mainGuider',
  mixins: [mapState],
  components: {
    Fullscreen,
    // HeaderBar,
    Language,
    // TagsNav,
    // Fullscreen,
    ErrorStore,
    User,
    userNotices,
    ABackTop
  },
  data () {
    return {
      // collapsed: false,
      // minLogo,
      // maxLogo,
      isFullscreen: false,
      // activity_name: 'consult_apply'
      activity_name: 'my_form',
      mobile_res: undefined,
      is_mobile: false
    }
  },
  computed: {
    ...mapGetters([
      'errorCount'
    ]),
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userAvator () {
      return this.$store.state.user.avatorImgPath
    },
    cacheList () {
      return this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []
    },
    menuList () {
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    },
    hasReadErrorPage () {
      return this.$store.state.app.hasReadErrorPage
    }
  },
  methods: {
    onMenuSelect: function (name) {
      if (this.$route.path === '/_guider') {
        this.$router.push({ path: '/_guider/' + name })
      } else {
        this.$router.push({ path: '/_guider/' + name })
      }
    },
    highlightMenu () {
      let path = this.$route.path
      if (path === '/_guider/judge') {
        this.activity_name = 'judge'
      } else if (path === '/_guider/attend') {
        this.activity_name = 'attend'
      } else if (path === '/_guider/consult_apply') {
        this.activity_name = 'consult_apply'
      } else if (path === '/_guider/lesson_form') {
        this.activity_name = 'lesson_form'
      }
    },
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setCurrentAccess'
    ]),
    ...mapActions([
      'handleLogin'
    ]),
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleClickToAdmin (value) {
      this.setCurrentAccess(value)
      if (value === '督导') {
        this.$router.push({ name: '督导我的提交', query: { time: new Date().getTime() } })
      } else if (value === '教师') {
        this.$router.push({ name: 'guider_active_attend', query: { time: new Date().getTime() } })
      } else {
        this.$router.push({ name: 'home' })
      }
    },
    getBtnType: function (value) {
      if (value === this.current_role) {
        return 'info'
      }
    },
    handleMobile: function (x) {
      if (x.matches) {
        this.is_mobile = true
      } else {
        this.is_mobile = false
      }
    }
  },
  watch: {
    '$route' (newRoute) {
      this.highlightMenu()
    }
  },
  mounted () {
    if (this.current_role === '大组长' || this.current_role === '小组长' || this.current_role === '管理员' || this.current_role === '学院领导' ||this.current_role==='校级管理员') {
      this.$router.push({ name: 'home' })
    }
    if (this.$route.path === '/_guider') {
      if(this.current_role==='督导'){
        this.$router.replace('/_guider/my_form')
      }
      else{
        this.$router.push({ name: 'guider_active_attend', query: { time: new Date().getTime() } })
      }

      // this.$router.replace('/_guider/consult_apply')
    }
    this.highlightMenu()
    /**
       * @description 初始化设置面包屑导航和标签导航
       */
    this.setBreadCrumb(this.$route)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    this.mobile_res = window.matchMedia('(max-width: 900px)')
    this.handleMobile(this.mobile_res)
    this.mobile_res.addListener(this.handleMobile)

  },

  destroyed () {
    this.mobile_res = undefined
  }
}
</script>
<style>
  .top{
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
  }
</style>
