<template>
  <Modal
    :value="show"
    title="修改一个活动"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange"
    style="width: 600px;">
    <Form>
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
import { getActiveUser } from '../../../service/api/actives'
import { AttendState, FinAttendState } from '../marcos'
export default {
  name: 'ActivesUpdateModal',
  data () {
    return {
      activity_user: {},
      attend_states: AttendState,
      fin_states: FinAttendState
    }
  },
  props: {
    onOk: Function,
    onCancel: Function,
    show: Boolean,
    active_id: Number,
    username: String
  },
  methods: {
    handleOK () {
      this.$emit('onOK', this.activity_user)
    },
    handleCancel () {
      this.$emit('onCancel')
    },
    onShowChange: function (show) {
      if (show) {
        // 显示的时候拉数据
        getActiveUser(this.active_id, this.username).then((resp) => {
          this.activity_user = resp.data.activity_user
        })
      }
    }
  },
  mounted: function () {}
}
</script>
