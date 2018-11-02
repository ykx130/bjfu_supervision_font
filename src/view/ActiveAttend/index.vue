<template>
  <Card>
    <Tabs @on-click="onTypeTabClick">
      <TabPane label="可报名" name="可报名"></TabPane>
      <TabPane label="已报名" name="已报名"></TabPane>
    </Tabs>

    <template v-if="select_tag==='已报名'">
      <already-registered ></already-registered>
    </template>
    <template v-else-if="select_tag==='可报名'">
      <can-register ></can-register>
    </template>
  </Card>
</template>

<script>
import {queryCurrentuserActives, putActive, postActive} from '../../service/api/actives'
import {queryTerms, getCurrentTerms} from '../../service/api/term'
import alreadyRegistered from './components/alreadyRegistered'
import canRegister from './components/canRegister'

export default {
  components: {
    alreadyRegistered,
    canRegister
  },
  data: function () {
    return {
      select_tag: '可报名'
    }
  },
  methods: {
    onTypeTabClick (value) {
      this.select_tag = value
      if (this.select_tag === '可报名'){
        this.$router.push({path: '/active/attend', query: {state:'canAttend'}})
      } else if (this.select_tag === '已报名'){
        this.$router.push({path: '/active/attend', query: {state:'hasAttended'}})
      }
    }
  },
  created: function () {
    const args = this.$route.query
    if (args.state){
      if (args.state === 'canAttend'){
       this.select_tag = '可报名'
      } else if (args.state === 'hasAttended'){
       this.select_tag = '已报名'
      }
    } else {
      this.onTypeTabClick("可报名")
    }
  }
}
</script>

<style scoped>

</style>
