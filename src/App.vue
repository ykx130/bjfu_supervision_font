<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      this.bindEvents()
    },
    methods: {
      bindEvents() {
        GLOBAL.vbus.$on('global.message.info', (msg) => {
          if(msg) return
          this.$Message.info(msg);
        })
        GLOBAL.vbus.$on('global.message.success', (msg) => {
          if(msg) return
          this.$Message.success(msg);
        })
        GLOBAL.vbus.$on('global.message.error', (msg) => {
          if(msg) return
          this.$Message.error(msg);
        })
        GLOBAL.vbus.$on('global.message.warning', (msg) => {
          if(msg) return
          this.$Message.warning(msg);
        })
      }
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
    margin: 0;
    padding: 0;
  }
  #app {
    .size;
  }
</style>
