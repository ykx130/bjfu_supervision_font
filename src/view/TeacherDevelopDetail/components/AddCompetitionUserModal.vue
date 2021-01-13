<template>
  <Modal
    :value="show"
    title="增加一个比赛参与者"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    style="width: 600px;">
    <Form ref="activity_user_form" :model="activity_user" :rules="ruleValidate">
      <FormItem label="参加教师" prop="user.username" >
        <Select v-model="activity_user.user.username" filterable>
          <Option v-for="user in users" :value="user.username" :key="user.username" @on-query-change="onSelectUserChange">{{user.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="比赛名次" prop="fin_state" >
        <Input v-model="activity_user.fin_state">
        </Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { queryUsers } from '../../../service/api/user'

export default {
  name: 'AddCompetitionUserModal',
  props: {
    onOk: Function,
    onCancel: Function,
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activity_user: {
        user: {
          username: ''
        },
        activity_type: '比赛',
        state: '已报名'
      },

      users: [],

      ruleValidate: {
        user: [{
          required: true,
          trigger: 'change',
          type: 'object',
          message: '请选择教师',
          fields: { username: { type: 'string', required: true, message: '请选择教师' } }
        }],
        fin_state: [{ required: true, trigger: 'blur', message: '请填写比赛名次' }]
      }
    }
  },

  methods: {
    handleOK () {
      this.$refs.activity_user_form.validate((valid) => {
        if (valid) {
          this.$Message.success('添加成功！')

          this.$emit('onOK', { username: this.activity_user.user.username,
            state: this.activity_user.state,
            fin_state: this.activity_user.fin_state,
            activity_type: this.activity_user.activity_type })
          this.activity_user = {}
        } else {
          this.$Message.error('请填写完整信息!')
        }
      })
    },
    handleCancel () {
      this.$emit('onCancel')
    },
    onSelectUserChange: function (query) {
      this.queryUsers({ name_like: query }).then((resp) => {
        this.users = resp.data.users
      })
    }
  },
  mounted: function () {
    queryUsers().then((resp) => {
      this.users = resp.data.users
    })
  }
}
</script>
