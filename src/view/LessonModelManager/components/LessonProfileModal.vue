<template>
  <Modal
    :value="show"
    title="Title"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange">
    <Form :model="lesson">
      <span>课程名字:</span>
      <FormItem prop="lesson_name">
        <Input type="text" v-model="lesson.lesson_name" placeholder="名字">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <span>课程属性:</span>
      <FormItem prop="lesson_attribute">
        <Input type="text" v-model="lesson.lesson_attribute" placeholder="课程属性">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <span>课程状态:</span>
      <FormItem prop="lesson_state">
        <Input type="text" v-model="lesson.lesson_state" placeholder="课程状态">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import {getLesson} from '../../../service/api/lesson'
import {updateWithinField} from 'Libs/tools'
import {queryGroups} from '../../../service/api/user'
import {lessonLevel, lessonWatchReason} from '../marcos'
export default {
  name: 'LessonProfileModal',
  props: {
    show: Boolean,
    onCancel: Function,
    onOK: Function,
    lesson_id: ''
  },
  data: function () {
    return {
      lesson: {
        id: '',
        lesson_name: '',
        lesson_attribute: '',
        lesson_id: '',
        lesson_state: '',
        lesson_teacher_name: '',
        lesson_level: '',
        lesson_attention_reason: ''
      },
      lessonLevel: lessonLevel,
      lessonWatchReason: lessonWatchReason, // 课程关注原因,
      groups: [] // 所有的小组
    }
  },
  methods: {
    handleOK: function () {
      this.$emit('onOK', this.lesson)
    },
    handleCancel: function () {
      this.$emit('onCancel')
    },
    onShowChange: function (show) {
      if (show) {
        // 显示的时候拉数据
        getLesson(this.lesson_id).then((resp) => {
          updateWithinField(this.lesson, resp.data.lesson)
        })
      }
    }
  },
  mounted: function () {
    queryGroups().then((resp) => {
      this.groups = resp.data.groups
    })
  }
}
</script>

<style scoped>

</style>
