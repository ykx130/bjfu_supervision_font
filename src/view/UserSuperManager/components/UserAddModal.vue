<template>
  <Modal
    :value="show"
    title="新增"
    @on-ok="handleOK"
    @on-cancel="handleCancel">
  <Form :model="user">
    <FormItem prop="username">
      <Select v-model="user.username" placeholder="名字" filterable>
        <Option v-for="item in users" :value="item.username" :key="item.username">{{ item.username }}</Option>
      </Select>
      <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
    </FormItem>
  </Form>
  </Modal>
</template>

<script>
import { queryUsers, queryRoles} from '../../../service/api/user'
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
      roles: []
    }
  },
  mounted: function () {
    queryUsers().then((resp) => {
      this.users = resp.data.users
    })
    queryRoles().then((resp) => {
      this.roles = resp.data.roles
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
