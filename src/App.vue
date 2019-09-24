<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      show: true
    }
  },
  watch: {
    '$route':{
      handler: function () {

      }
    }
  },
  methods: {
    registEvent: function () {
      this.$bus.$on('global.message.warning', function (arg) {
        this.$Message.warning(arg)
      })
      this.$bus.$on('global.message.error', function (arg) {
        this.$Message.error(arg)
      })
    }
  },
  mounted: function () {
    this.registEvent()

  }
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: auto;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
