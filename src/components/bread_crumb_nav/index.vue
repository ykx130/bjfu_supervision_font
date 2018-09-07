<template>
  <div style="{padding-left: 20px}">
    <Breadcrumb>
      <BreadcrumbItem to="/" v-for="">首页</BreadcrumbItem>
      <BreadcrumbItem v-for="(item, index) in match"  :key="index" :to="item.path">{{item.name}}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
    export default {
        name: "bread_crumb_nav",
        computed: {
          match: function () {
            return this.$route.matched
          }
        }
    }
</script>

<style scoped>

</style>
