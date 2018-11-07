<template>
  <Modal
    :value="show"
    title="Title"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange">
    <Form :model="user">
      <FormItem label="姓名" prop="name">
        <Input type="text" v-model="user.name" placeholder="名字">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem label="组别" prop="guider.group">
        <Select v-model="user.guider.group" >
          <Option v-for="item in groups" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="工作状态" prop="guider.work_state">
        <Select v-model="user.guider.work_state" >
          <Option v-for="item in workStateList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem label="身份:" prop="role_names">
        <CheckboxGroup v-model="user.role_names">
          <Checkbox v-for="role in roles" :label="role" :key="'key_'+role">
            <span>{{ role }}</span>
          </Checkbox>
        </CheckboxGroup>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import {getUserByName, queryGroups} from '../../../service/api/user'
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
        guider: {
          work_state: "",
          group: undefined,
        },
        role_names: []
      },
      workStateList: ['兼职', '全职'],
      roles: ["督导", "小组长", "大组长"],
      groups: []
    }
  },
  mounted: function () {
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
          updateWithinField(this.user, {...resp.data.user,
            ...resp.data.user.guider, guider: undefined})
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
