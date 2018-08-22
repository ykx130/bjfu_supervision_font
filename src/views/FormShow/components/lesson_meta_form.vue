<style>
</style>
<template>
    <Form :model="meta" :label-width="80">
      <FormItem label="听课督导">
        <Input v-model="meta.create_by" disabled></Input>
      </FormItem>
      <!--<FormItem label="课程属性">-->
        <!--<Input v-model="meta.attr" disabled></Input>-->
      <!--</FormItem>-->
      <FormItem label="课程名字">
        <Select v-model="meta.lesson.lesson_name" style="width:200px" @on-change="onSelectedLessonChange">
          <Option v-for="(item,index) in lessons" :value="meta.lessons.name" :key="item.lesson_name + index">{{ item.lesson_name+'___' + lesson_teacher_name+ '___'+item.lesson_class+'___'}}</Option>
        </Select>
      </FormItem>
      <FormItem label="任课教师	">
        <Input v-model="meta.lesson.lesson_teacher_name" disabled></Input>
      </FormItem>
      <FormItem label="听课时间">
        <DatePicker type="date" v-model="meta.create_at"></DatePicker>
      </FormItem>
      <FormItem label="上课班级">
      <Select v-model="meta.lesson.selected_lesson" style="width:200px">
        <Option v-for="item in selected_lesson.lesson_cases" :value="item" :key="item.lesson_room">{{ item.lesson_room }}</Option>
      </Select>
      </FormItem>
    </Form>
</template>
<script>
  import { queryLessons } from '../../../service/api/lesson'
  export default {
    data () {
      return {
        lessons: [],
        meta: this.value
      }
    },
    computed () {
      lesson_name: function () {
          return
      }
    },
    props: {
      value: {
        type: Object,
        default: {lesson:{}}
        },
      input: Function
    },
    mounted () {
      queryLessons().then((resp)=>{
        this.lessons = resp.data.lessons
      })
    },
    methods: {
      onSelectedLessonChange: function (value) {
        this.selected_lesson = value
        this.meta.lesson.lesson_name = value.lesson_name
        this.meta.lesson.lesson_teacher_name = value.lesson_teacher_name
      }
    }
  }
</script>
