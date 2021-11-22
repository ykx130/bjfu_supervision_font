<template>
    <Modal
      :value="show"
      title="增加一个活动参与者"
      @on-ok="handleOk"
      @on-cancel="handleCancel"
      style="width: 600px;">
      <Form ref="activity_user_form" :model="activity_user" :rules="ruleValidate">
        <FormItem label="参加教师" prop="username" >
          <Select v-model="activity_user.username" filterable>
            <Option v-for="user in users" :value="user.username" :key="user.username" @on-query-change="onSelectUserChange">{{user.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="报名状态" prop="state" disabled>
          <Select v-model="activity_user.state">
            <Option v-for="state in attend_states" :value="state" :key="state">{{ state }}</Option>
          </Select>
        </FormItem>
        <FormItem label="参加状态" prop="fin_state" >
          <Select v-model="activity_user.fin_state">
            <Option v-for="fin_state in fin_states" :value="fin_state" :key="fin_state">{{ fin_state }}</Option>
          </Select>
        </FormItem>

      </Form>
    </Modal>
</template>

<script>
import { queryUsers } from '../../../service/api/user'
import {AttendState, FinAttendState} from '../marcos'
export default {
  name: 'ActivesUserAddModal',
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
        username:'',
        activity_type:'培训'
      },

      users: [],
      attend_states: AttendState,
      fin_states: FinAttendState,
      ruleValidate: {
        // user: [{
        //   required: true,
        //   trigger: 'change',
        //   type: 'object',
        //   message: '请选择教师',
        //   fields: { username: { type: 'string', required: true, message: '请选择教师' } }
        // }],
        username: [{ required: true, trigger: 'change', message: '请选择教师'}],
        state: [{ required: true, trigger: 'change', message: '请选择报名状态' }],
        fin_state: [{ required: true, trigger: 'change', message: '请选择参加状态' }]
      }
    }
  },

  methods: {
    handleOk () {
      this.$refs.activity_user_form.validate((valid) => {
        if (valid) {
          this.$emit('onOK', { username: this.activity_user.username, state: this.activity_user.state, fin_state: this.activity_user.fin_state ,
          activity_type:this.activity_user.activity_type})
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
