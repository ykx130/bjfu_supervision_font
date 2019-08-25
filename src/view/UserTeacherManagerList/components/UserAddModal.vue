<template>
  <Modal
    :value="show"
    title="新增"
    @on-ok="handleOK"
    @on-cancel="handleCancel">
  <Form :model="guider">

    <FormItem prop="name" label="名字:" :label-width="40">
      <Select v-model="guider.username" placeholder="名字" filterable on-query-change="onUserSelectQueryChange">
        <Option v-for="item in users" :value="item.username" :key="item.name">{{ item.name }}</Option>
      </Select>
      <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
    </FormItem>
    <FormItem label="小组:" :label-width="40" prop="group_name">
      <Select v-model="guider.group_name" >
        <Option v-for="item in groups" :value="item.group_name" :key="item.id">{{ item.group_name }}</Option>
      </Select>
    </FormItem>

    <FormItem label="工作状态" prop="work_state">
      <Select v-model="guider.work_state" >
        <Option v-for="item in workStateList" :value="item" :key="item">{{ item }}</Option>
      </Select>
    </FormItem>

    <FormItem label="身份:">
        <Checkbox  v-model="guider.is_grouper" label="小组长">
          <span>小组长</span>
        </Checkbox>
        <Checkbox  v-model="guider.is_main_grouper" label="大组长">
          <span>大组长</span>
        </Checkbox>
    </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { queryUsers, queryGroups } from '@/service/api/user'
export default {
  name: 'UserAddModal',
  props: {
    show: Boolean,
    onCancel: Function,
    onOK: Function
  },
  data: function () {
    return {
      guider: {
        is_grouper: false,
        is_main_grouper: false
      },
      users: [],
      roles: ['小组长', '大组长'],
      groups: [],
      workStateList: ['兼职', '全职']
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
    onUserSelectQueryChange (value) {
      queryUsers({ name_like: value }).then((resp) => {
        this.users = resp.data.users
      })
    },
    handleOK: function () {
      this.$emit('onOK', this.guider)
    },
    handleCancel: function () {
      this.$emit('onCancel')
    }
  }
}
</script>

<style scoped>

</style>
