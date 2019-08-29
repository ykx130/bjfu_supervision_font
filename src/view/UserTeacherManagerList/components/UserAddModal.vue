<template>
  <Modal
    :value="show"
    title="新增"
    :loading="loading"
    @on-ok="handleOK"
    @on-cancel="handleCancel">
  <Form :model="guider" ref="teacher_form" :rules="ruleValidate">

    <FormItem prop="username" label="名字:" :label-width="50">
      <Select v-model="guider.username" placeholder="名字" filterable @on-query-change="onUserSelectQueryChange">
        <Option v-for="item in users" :value="item.username" :key="item.name">{{ item.name }}</Option>
      </Select>
      <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
    </FormItem>
    <FormItem label="小组:" :label-width="50" prop="group_name">
      <Select v-model="guider.group_name" >
        <Option v-for="item in groups" :value="item.group_name" :key="item.group_name">{{ item.group_name }}</Option>
      </Select>
    </FormItem>

    <FormItem label="工作状态:"  prop="work_state">
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
      loading: true,
      guider: {
        is_grouper: false,
        is_main_grouper: false
      },
      users: [],
      roles: ['小组长', '大组长'],
      groups: [],
      workStateList: ['兼职', '全职'],
      ruleValidate:{
        username: [{ required: true, message: 'the name can not be empty', trigger: 'blur' }],
        group_name: [{ required: true, message: 'the group name can not be empty', trigger: 'blur' }],
        work_state:[{ required: true, message: 'the work state can not be empty', trigger: 'blur' }]
      }
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
    changeLoading: function() {
      setTimeout(()=>{
        this.loading = false;
        this.$nextTick(()=>{
          this.loading = true
        })
      }, 500)
    },
    onUserSelectQueryChange (value) {
      queryUsers({ name_like: value }).then((resp) => {
        this.users = resp.data.users
      })
    },
    handleOK: function () {
      this.$refs.teacher_form.validate((valid) => {
        this.changeLoading()
        if (valid) {
          // alert("Success！");
          this.$emit('onOK', this.guider)
        } else {
          // alert("Fail!");
          this.$Message.error('请完整填写信息!')
        }
      })

    },
    handleCancel: function () {
      this.$emit('onCancel')
    }
  }
}
</script>

<style scoped>

</style>
