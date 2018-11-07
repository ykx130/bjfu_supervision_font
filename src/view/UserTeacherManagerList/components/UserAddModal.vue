<template>
  <Modal
    :value="show"
    title="新增"
    @on-ok="handleOK"
    @on-cancel="handleCancel">
  <Form :model="user">

    <FormItem prop="name" label="名字:" :label-width="40">
      <Select v-model="user.name" placeholder="名字" filterable on-query-change="onUserSelectQueryChange">
        <Option v-for="item in users" :value="item.username" :key="item.name">{{ item.name }}</Option>
      </Select>
      <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
    </FormItem>
    <FormItem label="小组:" :label-width="40" prop="group">
      <Select v-model="user.group" >
        <Option v-for="item in groups" :value="item.name" :key="item.name">{{ item.name }}</Option>
      </Select>
    </FormItem>

    <FormItem label="工作状态" prop="work_state">
      <Select v-model="user.work_state" >
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
  import { queryUsers, queryGroups} from '@/service/api/user'
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
      workStateList: ['兼职', '全职'],
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
    onUserSelectQueryChange(value){
      queryUsers({name_like:value}).then((resp) => {
        this.users = resp.data.users
      })
    },
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
