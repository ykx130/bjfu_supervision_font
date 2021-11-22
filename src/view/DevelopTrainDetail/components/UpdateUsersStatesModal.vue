<template>
  <Modal
    :value="show"
    title="批量修改状态"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    style="width: 600px;">

    <Form v-model="active_user_state">
      <FormItem label="报名状态">
        <Select v-model="active_user_state.state" >
          <Option v-for="state in attend_states" :value="state" :key="state">{{ state }}</Option>
        </Select>
      </FormItem>
      <FormItem label="参加状态">
        <Select v-model="active_user_state.fin_state">
          <Option v-for="fin_state in fin_states" :value="fin_state" :key="fin_state">{{ fin_state }}</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { AttendState, FinAttendState } from '../marcos'
export default {
  name: 'UpdateUsersStatesModal',
  props: {
    onOk: Function,
    onCancel: Function,
    show: Boolean,
  },
  data () {
    return {
      active_user_state:{
        activity_type:'培训', //必须加
        state: '',
        fin_state: ''
      },
      attend_states: AttendState,
      fin_states: FinAttendState,
    }
  },


  methods: {
    handleOK () {
      this.$emit('onOK', this.active_user_state)
    },
    handleCancel () {
      this.$emit('onCancel')
    },

  },
  mounted: function () {

  }
}
</script>

