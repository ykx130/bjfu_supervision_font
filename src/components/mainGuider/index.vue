<style scoped>
  .ivu-layout-header{
    padding: 0px;
    background-color: #ffffff;
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #f3fffe;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 100%;
    margin: 0 auto;
    margin-right: 0px;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>
<template>
  <div>
    <Layout>
      <Header>
        <Menu  mode="horizontal" theme="light" active-name="1">
          <div class="layout-nav">
          <MenuItem name="1">
            <Icon type="ios-paper" />
            问卷填写
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-people" />
            活动报名
          </MenuItem>
          <MenuItem name="4">
            <Icon type="ios-construct" />
            咨询申请
          </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '20px 10px', height: '680px'}">
        <router-view/>
      </Content>
      <Footer class="layout-footer-center">2011-2016 &copy; BJFU-SUPERVIERSION</Footer>
    </Layout>
  </div>
</template>
<script>
  import HeaderBar from '_c/main/components/header-bar'
  import TagsNav from 'c/main/components/tags-nav'
  import User from 'c/main/components/user'
  import Fullscreen from 'c/main/components/fullscreen'
  import Language from 'c/main/components/language'
  import userNotices from '_c/user_notices'
  import ErrorStore from 'c/main/components/error-store'
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import minLogo from '@/assets/images/logo-min.jpg'
  import maxLogo from '@/assets/images/logo.jpg'
  import { getNewTagList, getNextRoute, routeEqual } from '@/libs/util'

  export default {
      name: 'mainGuider',
      components: {
        HeaderBar,
        Language,
        TagsNav,
        Fullscreen,
        ErrorStore,
        User,
        userNotices
      },
    data () {
      return {
        collapsed: false,
        minLogo,
        maxLogo,
        isFullscreen: false
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
      ...mapMutations([
        'setBreadCrumb',
        'setTagNavList',
        'addTag',
        'setLocal'
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
      handleCollapsedChange (state) {
        this.collapsed = state
      },
      handleCloseTag (res, type, route) {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName)
        } else if (routeEqual(this.$route, route)) {
          if (type !== 'others') {
            const nextRoute = getNextRoute(this.tagNavList, route)
            this.$router.push(nextRoute)
          }
        }
        this.setTagNavList(res)
      },
      handleClick (item) {
        this.turnToPage(item)
      }
    },
    watch: {
      '$route' (newRoute) {
        const { name, query, params, meta } = newRoute
        this.addTag({
          route: { name, query, params, meta },
          type: 'push'
        })
        this.setBreadCrumb(newRoute)
        this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
        this.$refs.sideMenu.updateOpenName(newRoute.name)
      }
    },
    mounted () {
      /**
       * @description 初始化设置面包屑导航和标签导航
       */
      this.setTagNavList()
      this.addTag({
        route: this.$store.state.app.homeRoute
      })
      this.setBreadCrumb(this.$route)
      // 设置初始语言
      this.setLocal(this.$i18n.locale)
      // 如果当前打开页面不在标签栏中，跳到homeName页
      if (!this.tagNavList.find(item => item.name === this.$route.name)) {
        this.$router.push({
          name: this.$config.homeName
        })
      }
    }
  }
</script>
