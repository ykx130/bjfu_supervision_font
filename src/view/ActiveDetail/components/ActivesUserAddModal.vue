<template>
    <Modal
      :value="show"
      title="增加一一个活动参与这"
      @on-ok="handleOk"
      @on-cancel="handleCancel"
      style="width: 600px;">
      <Form>
        <FormItem label="参加教师">
          <Select v-model="activity_user.user.username" filterable>
            <Option v-for="user in users" :value="user.username" :key="user.username">{{ user.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="报名状态">
          <Select v-model="activity_user.state">
            <Option v-for="state in attend_states" :value="state" :key="state">{{ state }}</Option>
          </Select>
        </FormItem>
        <FormItem label="参加状态">
          <Select v-model="activity_user.fin_state">
            <Option v-for="fin_state in fin_states" :value="fin_state" :key="fin_state">{{ fin_state }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
</template>

<script>
import {queryUsers} from '../../../service/api/user'
import {AttendState, FinAttendState} from '../marcos'
export default {
  name: 'ActivesAddModal',
  data () {
    return {
      activity_user: {
        user: {}
      },
      users: [],
      attend_states: AttendState,
      fin_states: FinAttendState
    }
  },
  props: {
    onOk: Function,
    onCancel: Function,
    show: Boolean
  },
  methods: {
    handleOk () {
      this.$emit('onOK', {username: this.activity_user.user.username, state: this.activity_user.state, fin_state: this.activity_user.fin_state})
    },
    handleCancel () {
      this.$emit('onCancel')
    }
  },
  mounted: function () {
    queryUsers().then((resp) => {
      this.users = resp.data.users
    })
  }
}
</script>
