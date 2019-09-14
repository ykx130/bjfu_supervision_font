<template>
  <Modal
    :value="show"
    title="Title"
    :loading="loading"
    @on-ok="handleOK"
    @on-cancel="handleCancel">
    <Form :model="lesson" ref="model_lesson" :rules="ruleValidate">
      <FormItem prop="group_name" label="分配督导小组">
        <Select v-model="lesson.group_name" >
          <Option v-for="item in groups" :value="item.group_name" :key="item.group_name">{{ item.group_name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="lesson_id" label="课程名字">
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
import { queryLessons } from '../../../service/api/lesson'
import { lessonLevel, lessonWatchReason } from '../marcos'
export default {
  name: 'AddModelLesson',
  props: {
    show: Boolean,
    term: String,
    onCancel: Function,
    onOK: Function
  },
  data: function () {
    return {
      lessons: [],
      lesson: {},
      lesson_name_like: '',
      loading: true,
      groups: [],
      ruleValidate: {
        group_name: [{ required: true, message: '请分配该课程的组别', trigger: 'blur' }],
        lesson_id: [{ required: true, message: '课程名不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    term: function () {
      this.fetchLesson()
    }
  },
  methods: {
    fetchLesson: function () {
      this.lessons = {}
      return queryLessons({ term: this.term, lesson_or_teacher_name_or: this.lesson_name_like }).then((resp) => {
        this.lessons = {}
        resp.data.lessons.map((item) => {
          this.$set(this.lessons, item.lesson_id, item)
        })
      })
    },
    validate: function (f) {
      return this.$refs.model_lesson.validate(f)
    },
    changeLoading: function () {
      setTimeout(() => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500)
    },
    onLessonQueryChange: function (value) {
      if (!(value.startsWith("'") && value.endsWith("'"))) {
        this.lesson_name_like = value
        this.fetchLesson()
      }
    },
    onSelectedLessonChange: function (lesson_id, group_name) {
      this.lesson = this.lessons[lesson_id]
      this.lesson = this.lessons[group_name]
    },
    handleOK: function () {
      this.$refs.model_lesson.validate((valid) => {
        this.changeLoading()
        if (valid) {
          this.$emit('onOK', { ...this.lesson }, valid)
        } else {
          this.$Message.error('信息填写错误请检查!')
        }
      })
      // this.changeLoading()
      // this.$emit('onOK', this.lesson)
    },
    handleCancel: function () {
      this.$emit('onCancel')
    }
  },
  mounted: function () {
    queryGroups().then((resp) => {
      this.groups = resp.data.groups
      this.fetchLesson()
    })
  }
}
</script>

<style scoped>

</style>
