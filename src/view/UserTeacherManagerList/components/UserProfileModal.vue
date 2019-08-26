<template>
  <Modal
    :value="show"
    title="Title"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange">
    <Form :model="guider">
      <FormItem label="姓名" prop="user.name">
        <Input type="text" v-model="guider.user.name" placeholder="名字" disabled="">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem label="组别" prop="group_name">
        <Select v-model="guider.group_name">
          <Option v-for="item in groups" :value="item.group_name" :key="item.group_name">{{ item.group_name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="工作状态" prop="work_state">
        <Select v-model="guider.work_state">
          <Option v-for="item in workStateList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem label="小组长" prop="is_grouper">
          <Checkbox v-model="guider.is_grouper">
            <span>小组长</span>
          </Checkbox>
      </FormItem>
      <FormItem label="大组长" prop="is_main_grouper">
        <Checkbox v-model="guider.is_main_grouper">
          <span>大组长</span>
        </Checkbox>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { getUserByName, queryGroups, getSupervisor } from '../../../service/api/user'
import { updateWithinField } from 'Libs/tools'

export default {
  name: 'UserProfileModal',
  props: {
    show: Boolean,
    onCancel: Function,
    onOK: Function,
    id: Number
  },
  data: function () {
    return {
      guider: {
        user: {}
      },
      workStateList: ['兼职', '全职'],
      roles: ['小组长', '大组长'],
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
      this.$emit('onOK', { ...this.guider, user: undefined })
    },
    handleCancel: function () {
      this.$emit('onCancel')
    },
    onShowChange: function (show) {
      if (show) {
        // 显示的时候拉数据
        getSupervisor(this.id).then((resp) => {
          this.guider = resp.data.supervisor
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
