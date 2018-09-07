<template>
  <div class="side-menu-wrapper">
    <Menu style="width: 100%" :active-name="active_name" mode="vertical" @on-select="onSelectMenuChange" theme="dark">
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
      data: function () {
          return {
            active_name:""
          }
        },
      props:{
        menuList:Array
      },
        methods: {
          onSelectMenuChange: function (name) {
            this.active_name = name
            this.$router.push({name:name})
          }
        }
    }
</script>

<style lang="less">
  @import "./side-menu.less";
</style>
