<template>
  <Card>
    <h1>督导管理</h1>
    <br>
    <Tabs @on-click="onTypeTabClick" v-role ="['管理员']">
      <TabPane label="全部" name="全部"></TabPane>
      <TabPane label="可续约" name="可续约"></TabPane>
    </Tabs>

    <template v-if="selected_tab === '可续约'">
      <delay-guider v-role ="['管理员']"></delay-guider>
    </template>
    <template v-else-if="selected_tab === '全部'">
      <guider-manager></guider-manager>
    </template>
  </Card>
</template>

<script>
import delayGuider from './components/delayGuider'
import guiderManager from './components/guiderManager'
export default {
  components: { delayGuider, guiderManager },
  data: function () {
    return {
      selected_tab: '全部'
    }
  },
  methods: {
    onTypeTabClick (value) {
      this.selected_tab = value
    }
  }
}
</script>

<style scoped>

</style>
