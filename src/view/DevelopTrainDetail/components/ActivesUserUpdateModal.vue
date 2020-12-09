<!--<template>-->
<!--  <Modal-->
<!--    :value="show"-->
<!--    title="修改一个活动"-->
<!--    @on-ok="handleOK"-->
<!--    @on-cancel="handleCancel"-->
<!--    @on-visible-change="onShowChange"-->
<!--    style="width: 600px;">-->

<!--    <Form v-model="activity_user">-->
<!--      <FormItem label="报名状态">-->
<!--        <Select v-model="activity_user.state">-->
<!--          <Option v-for="state in attend_states" :value="state" :key="state">{{ state }}</Option>-->
<!--        </Select>-->
<!--      </FormItem>-->
<!--      <FormItem label="参加状态">-->
<!--        <Select v-model="activity_user.fin_state">-->
<!--          <Option v-for="fin_state in fin_states" :value="fin_state" :key="fin_state">{{ fin_state }}</Option>-->
<!--        </Select>-->
<!--      </FormItem>-->
<!--    </Form>-->
<!--  </Modal>-->
<!--</template>-->

<!--<script>-->
<!--import {getActiveUser} from '../../../service/api/actives'-->
<!--import { AttendState, FinAttendState } from '../marcos'-->
<!--export default {-->
<!--  name: 'ActivesUserUpdateModal',-->

<!--  data () {-->
<!--    return {-->

<!--     -->
<!--      attend_states: AttendState,-->
<!--      fin_states: FinAttendState,-->

<!--    }-->
<!--  },-->
<!--  props: {-->
<!--    onOk: Function,-->
<!--    onCancel: Function,-->
<!--    show: Boolean,-->
<!--    active_id: Number,-->
<!--    username: String-->
<!--  },-->

<!--  methods: {-->
<!--    handleOK () {-->
<!--      console.log(101010101010)-->
<!--      console.log(this.activity_user)-->
<!--      console.log(this.username,this.active_id)-->

<!--      this.$emit('onOK', this.activity_user)-->
<!--    },-->
<!--    handleCancel () {-->
<!--      this.$emit('onCancel')-->
<!--    },-->
<!--    onShowChange: function (show) {-->

<!--      if (show) {-->
<!--        // 显示的时候拉数据-->
<!--        getActiveUser(this.active_id, this.username).then((resp) => {-->
<!--          console.log(5555,resp)-->
<!--          this.activity_user = resp.data.activity_users-->



<!--        })-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  mounted: function () {}-->
<!--}-->
<!--</script>-->


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
      console.log(22,this.activity_user)
      console.log(33,this.active_user)
      this.$emit('onOK', this.activity_user)
    },
    handleCancel () {
      console.log(22,this.activity_user)
      this.$emit('onCancel')
    },

    },
  mounted: function () {

  }
}
</script>
