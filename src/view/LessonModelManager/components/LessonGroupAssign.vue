<template>
  <Modal
    :value="show"
    title="分配督导"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange">
    <Select v-model="guiders" multiple style="width:260px" >
      <Option v-for="item in Supervisors" v-if="item.group_name===lesson.group_name" :value="item.user.name" :key="item.user.name">{{ item.user.name }}</Option>
    </Select>

  </Modal>
</template>

<script>
import { getModelLesson } from '../../../service/api/lesson'
import { updateWithinField } from 'Libs/tools'
import { querySupervisors } from '../../../service/api/user'

export default {
  name: 'LessonGroupAssign',
  props: {
    show: Boolean,
    onCancel: Function,
    onOK: Function,
    lesson_id: Number
  },
  data: function () {
    return {
      lesson: {
        id: '',
        group_name: '',
        guiders: []
      },
      guiders: [],
      Supervisors: [] // 所有的督导
    }
  },
  methods: {
    handleOK: function () {
      this.lesson.guiders = this.guiders
      console.log(JSON.stringify(this.lesson.guiders))
      this.$emit('onOK', this.lesson)
    },
    handleCancel: function () {
      this.$emit('onCancel')
    },
    onShowChange: function (show) {
      if (show) {
        // 显示的时候拉数据
        getModelLesson(this.lesson_id).then((resp) => {
          updateWithinField(this.lesson, resp.data.model_lesson)
        })
        // console.log(this.lesson)
        console.log(this.Supervisors)
      }
    }
  },
  mounted: function () {
    querySupervisors().then((resp) => {
      this.Supervisors = resp.data.supervisors
    })
  }
}
</script>

<style scoped>

</style>
