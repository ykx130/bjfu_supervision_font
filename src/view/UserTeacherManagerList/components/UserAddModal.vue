<template>
  <Modal
    :value="show"
    title="新增"
    @on-ok="handleOK"
    @on-cancel="handleCancel">
  <Form :model="user">

    <FormItem prop="name" label="名字:" :label-width="40">
      <Input type="text" v-model="user.name" placeholder="名字">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem label="小组:" :label-width="40" prop="group">
      <Select v-model="user.group" >
        <Option v-for="item in groups" :value="item.name" :key="item.name">{{ item.name }}</Option>
      </Select>
    </FormItem>
    </Form>
  </Modal>
</template>

<script>
  import { queryRoles, queryGroups} from '@/service/api/user'
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
    }
  }
}
</script>

<style scoped>

</style>
