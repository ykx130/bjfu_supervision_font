<template>
  <Modal
    :value="show"
    title="新增"
    @on-ok="handleOK"
    @on-cancel="handleCancel">
  <Form :model="user">
    <FormItem prop="username">
      <Select v-model="user.username" placeholder="名字" filterable on-query-change="onUserSelectQueryChange">
        <Option v-for="item in users" :value="item.username" :key="item.username" >{{ item.username }}</Option>
      </Select>
      <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
    </FormItem>
  </Form>
  </Modal>
</template>

<script>
import { queryUsers} from '../../../service/api/user'
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
    }
  },
  mounted: function () {
    queryUsers().then((resp) => {
      this.users = resp.data.users
    })
  },
  methods: {
    onUserSelectQueryChange(value){
      queryUsers({name_like:value}).then((resp) => {
        this.users = resp.data.users
      })
    },
    handleOK: function () {
      this.user.role_names.push("领导")
      this.$emit('onOK', {role_names: this.users.role_names})
    },
    handleCancel: function () {
      this.$emit('onCancel')
    }
  }
}
</script>

<style scoped>

</style>
