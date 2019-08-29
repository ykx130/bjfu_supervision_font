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
        <Input type="text" v-model="lesson.lesson_attribute" placeholder="课程属性" :disabled="true">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <span>课程状态:</span>
      <FormItem prop="lesson_state">
        <Input type="text" v-model="lesson.lesson_state" placeholder="课程状态" :disabled="true">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="lesson_level">
        <span>课程级别:</span>
        <Select v-model="lesson.lesson_level" >
          <Option v-for="item in lessonLevel" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="group_name"  v-if="lesson.lesson_level === '关注课程'">
        <span>分配督导小组:</span>
        <Select v-model="lesson.group_name"  :disabled="disable_notice_info">
          <Option v-for="item in groups" :value="item.group_name" :key="item.group_name" >{{ item.group_name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="lesson_attention_reason" v-if="lesson.lesson_level === '关注课程'" >
        <span>关注原因:</span>
        <Select v-model="lesson.lesson_attention_reason" :disabled="disable_notice_info" >
          <Option v-for="item in lessonWatchReason" :value="item" :key="item" >{{ item }}</Option>
        </Select>
      </FormItem>

    </Form>
  </Modal>
</template>

<script>
import { getLesson } from '../../../service/api/lesson'
import { updateWithinField } from 'Libs/tools'
import { queryGroups } from '../../../service/api/user'
import { lessonLevel, lessonWatchReason } from '../marcos'
export default {
  name: 'LessonProfileModal',
  props: {
    show: Boolean,
    onCancel: Function,
    onOK: Function,
    lesson_id: String
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
        lesson_attention_reason: '',
        group_name: '',
      },
      disable_notice_info: false, // 禁用
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
        this.disable_notice_info = false
        getLesson(this.lesson_id).then((resp) => {
            if (resp.data.lesson['lesson_level']==='关注课程'){
              this.disable_notice_info = true
            }
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
