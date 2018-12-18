<template>
  <Card>
    <Tabs :value="select_tag" @on-click="onTypeTabClick">
      <TabPane label="未协调" name="未协调"></TabPane>
      <TabPane label="已协调" name="已协调"></TabPane>
    </Tabs>
     <already-reply v-if="select_tag === '已协调'"></already-reply>
    <wait-reply v-if="select_tag === '未协调'"></wait-reply>
  </Card>
</template>

<script>
import alreadyReply from './components/alreadyReply'
import waitReply from './components/waitReply'
export default {
  components: {alreadyReply, waitReply},
  data: function () {
    return {
      select_tag: '未协调'
    }
  },
  computed: {
    currentPath:function () {
      return this.$route.path
    }
  },
  methods: {
    onTypeTabClick (value) {
      this.select_tag = value
    }
  }
}
</script>

<style scoped>

</style>
