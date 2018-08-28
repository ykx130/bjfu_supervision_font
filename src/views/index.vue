<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    width: 100%;
    height: 100%;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .menu-icon{
    transition: all .3s;
  }
  .rotate-icon{
    transform: rotate(-90deg);
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <sideMenu
          :menuList=routes
        ></sideMenu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <userIcon style="float:right;padding-right: 30px" :current-user="currentUser"></userIcon>
        </Header>
        <Content :style="{margin: '20px', minHeight: '720px'}">
            <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  import sideMenu from '../components/side-menu/side-menu'
  import  userIcon from '../components/user_icon'
  import store from '../service/store/common'
  import {currentUser} from "../service/api/user";
  export default {
    name: "base_layout",
    components: {sideMenu, userIcon},
    created() {
      this.bindEvents()
    },
    data () {
      return {
        isCollapsed: false
      }
    },
    computed: {
      rotateIcon () {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ];
      },
      menuitemClasses () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
      routes() {
        return this.$router.options.routes
      },
      currentUser () {
        return store.state.userInfo
      }
    },
    methods: {
      collapsedSider () {
        this.$refs.side1.toggleCollapse();
      },
      bindEvents() {
        GLOBAL.vbus.$on('global.message.info', (msg) => {
          if(!msg) return
          this.$Message.info(msg);
        })
        GLOBAL.vbus.$on('global.message.success', (msg) => {
          if(!msg) return
          this.$Message.success(msg);
        })
        GLOBAL.vbus.$on('global.message.error', (msg) => {
          if(!msg) return
          this.$Message.error(msg);
        })
        GLOBAL.vbus.$on('global.message.warning', (msg) => {
          if(!msg) return
          this.$Message.warning(msg);
        })
      }
    }
  }
</script>
