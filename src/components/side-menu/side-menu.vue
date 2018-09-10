<template>
  <div class="side-menu-wrapper">
    <Menu ref="menu" style="width: 100%" :active-name="active_name" mode="vertical" @on-select="onSelectMenuChange" :open-names="opened_names" theme="dark">
      <template v-for="route in menuList">
        <sub_menu_item v-if="hasChildren(route)" :sub_route="route"></sub_menu_item>
        <MenuItem v-else-if="route.name" :name="route.name" :to="route">{{route.name}}</MenuItem>
      </template>
    </Menu>
  </div>
</template>

<script>
    import sub_menu_item from './sub-menu-item'
    import mixin from "./mixin";

    export default {
        name: "side-menu",
        components:{sub_menu_item},
        mixins: [mixin],
        data: function(){
          return {
            opened_names:[]
          }
        },
        computed: {
          active_name: function () {
            return this.$route.name
          }
        },
        watch: {
          active_name: function (name) {
            this.opened_names = this.getOpenedNamesByActiveName(name);
          },
          opened_names() {
            this.$nextTick(() => {
              this.$refs.menu.updateOpened();
            });
         }
        },
        props:{
          menuList:Array
        },
        methods: {
          onSelectMenuChange: function (name) {
            this.$router.push({name:name})
          },
          getOpenedNamesByActiveName(name) {
            return this.$route.matched
              .map(item => item.name)
              .filter(item => item !== name);
          }
        }
    }
</script>

<style lang="less">
  @import "./side-menu.less";
</style>
