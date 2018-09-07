<template>
  <Submenu :name="sub_route.name">
    <template slot="title">
      <Icon type="ios-analytics" />
      {{sub_route.name}}
    </template>
      <template v-for="child_route in sub_route.children">
        <template v-if="hasChildren(child_route)">
          <sub-menu-item :sub_route="child_route" ></sub-menu-item>
        </template>
        <template v-else-if="child_route.name">
          <MenuItem :name="child_route.name" :to="child_route">{{child_route.name}}</MenuItem>
        </template>
      </template>
  </Submenu>
</template>

<script>
  import mixin from "./mixin";

  export default {
        name: "sub-menu-item",
      mixins: [mixin],
        props: {
          sub_route: Object
        }
    }
</script>

<style scoped>

</style>
