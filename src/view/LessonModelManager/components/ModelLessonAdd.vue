<template>
  <Modal
    :value="show"
    title="Title"
    @on-ok="handleOK"
    @on-cancel="handleCancel">
    <Form :model="lesson">
      <FormItem prop="lesson_attention_reason" label="课程名字">
        <Select v-model="lesson.lesson_id"
                @on-query-change="onLessonQueryChange"
                clearable
                filterable>
          <Option v-for="(item,index) in lessons" :value="item.lesson_id"
                  :key="item.lesson_id + item.lesson_name + item.id">
            {{ "'"+item.lesson_name+'___' + item.lesson_teacher_name+ '___'+item.lesson_class+'___'+"'"}}
          </Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { queryGroups } from '../../../service/api/user'
import {queryLessons} from '../../../service/api/lesson'
import { lessonLevel, lessonWatchReason } from '../marcos'
export default {
  name: 'AddModelLesson',
  props: {
    show: Boolean,
    term: String
  },
  data: function () {
    return {
      lessons: [],
      lesson: {},
      lesson_name_like: ''
    }
  },
  methods: {
    fetchLesson: function () {
      this.lessons = {}
      return queryLessons({ term: this.term, lesson_or_teacher_name_or: this.lesson_name_like }).then((resp) => {
        resp.data.lessons.map((item) => {
          this.$set(this.lessons, item.lesson_id, item)
        })
      })
    },
    onLessonQueryChange: function (value) {
      if (!(value.startsWith("'") && value.endsWith("'"))) {
        this.lesson_name_like = value
        this.fetchLesson()
      }
    },
    onSelectedLessonChange: function(lesson_id) {
      this.lesson = this.lessons[lesson_id]
    },
    handleOK: function () {
      this.$emit('onOK', this.lesson)
    },
    handleCancel: function () {
      this.$emit('onCancel')
    }
  },
  mounted: function () {
    queryGroups().then((resp) => {
      this.groups = resp.data.groups
    })
    this.fetchLesson()
  }
}
</script>

<style scoped>

</style>
