<template>
  <Modal
    :value="show"
    title="新增"
    @on-ok="handleOK"
    @on-cancel="handleCancel">
  <Form :model="user">

    <FormItem prop="name" label="名字:" :label-width="40">
      <Select v-model="user.name" placeholder="名字" filterable>
        <Option v-for="item in users" :value="item.name" :key="item.name">{{ item.name }}</Option>
      </Select>
      <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
    </FormItem>
    <FormItem label="小组:" :label-width="40" prop="group">
      <Select v-model="user.group" >
        <Option v-for="item in groups" :value="item.name" :key="item.name">{{ item.name }}</Option>
      </Select>
    </FormItem>

    <FormItem label="督导级别:" :label-width="40" prop="group">
      <RadioGroup v-model="guider_role">
        <Radio label="普通督导" >普通督导</Radio>
        <Radio label="小组长">小组长(会替换之前的)</Radio>
        <Radio label="大组长">大组长(会替换之前的)</Radio>
      </RadioGroup>
    </FormItem>
    </Form>
  </Modal>
</template>

<script>
  import { queryUsers, queryRoles, queryGroups} from '@/service/api/user'
export default {
  name: 'UserAddModal',
  props: {
    show: Boolean,
    onCancel: Function,
    onOK: Function
  },
  data: function () {
    return {
      user: {},
      users:[],
      roles: [],
      groups: [],
      guider_role: ""
    }
  },
  mounted: function () {
    queryUsers().then((resp) => {
      this.users = resp.data.users
    })
    queryGroups().then((resp) => {
      this.groups = resp.data.groups
    })
  },
  methods: {
    handleOK: function () {
      this.$emit('onOK', this.user)
    },
    handleCancel: function () {
      this.$emit('onCancel')
    }
  }
}
</script>

<style scoped>

</style>
