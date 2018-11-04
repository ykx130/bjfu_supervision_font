<template>
  <Modal
    :value="show"
    title="Title"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange">
    <Form :model="user">
      <FormItem prop="username">
        <Input type="text" v-model="user.username" placeholder="用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="name">
        <Input type="text" v-model="user.name" placeholder="名字">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="group">
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
import {getUserByName, queryRoles, queryGroups} from '../../../service/api/user'
import {updateWithinField} from 'Libs/tools'
export default {
  name: 'UserProfileModal',
  props: {
    show: Boolean,
    onCancel: Function,
    onOK: Function,
    username: ''
  },
  data: function () {
    return {
      user: {
        id: undefined,
        name: undefined,
        username: undefined,
        group: undefined,
        role_names: []
      },
      roles: [],
      groups: []
    }
  },
  mounted: function () {
    queryRoles().then((resp) => {
      this.roles = resp.data.roles
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
    },
    onShowChange: function (show) {
      if (show) {
        // 显示的时候拉数据
        getUserByName(this.username).then((resp) => {
          updateWithinField(this.user, resp.data.user)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
