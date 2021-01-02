<template>
  <Modal
    :value="show"
    title="修改一个活动"
    @on-ok="handleOK"
    @on-cancel="handleCancel"

    style="width: 600px;">

    <Form v-model="active_user">
      <FormItem label="报名状态">
        <Select v-model="active_user.state">
          <Option v-for="state in attend_states" :value="state" :key="state">{{ state }}</Option>
        </Select>
      </FormItem>
      <FormItem label="参加状态">
        <Select v-model="active_user.fin_state">
          <Option v-for="fin_state in fin_states" :value="fin_state" :key="fin_state">{{ fin_state }}</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import {getActiveUser} from '../../../service/api/actives'
import { AttendState, FinAttendState } from '../marcos'
export default {
  name: 'ActivesUserUpdateModal',
  props: {
    onOk: Function,
    onCancel: Function,
    show: Boolean,
    active_user:Object,
    // active_id: Number,
    // username: String
  },
  data () {
    return {
      activity_user:{
        activity_type:''//必须加
      },
      attend_states: AttendState,
      fin_states: FinAttendState,
    }
  },


  methods: {
    handleOK () {
      this.activity_user=this.active_user
      this.activity_user.activity_type='培训'
      this.$emit('onOK', this.activity_user)
    },
    handleCancel () {
      this.$emit('onCancel')
    },

    },
  mounted: function () {

  }
}
</script>
