<style>
</style>
<template>
  <Form :model="meta" :label-width="80">
    <Row :gutter="16">
      <Col span="6">
        <FormItem label="听课督导">
          <Select v-model="meta.create_by" style="width:200px">
            <Option v-for="(item,index) in users" :value="item.username" :key="item.username + index">{{item.name}}</Option>
          </Select>
        </FormItem>
      </Col>
      <!--<FormItem label="课程属性">-->
      <!--<Input v-model="meta.attr" disabled></Input>-->
      <!--</FormItem>-->
      <Col span="6">
        <FormItem label="课程名字">
          <Select v-model="meta.lesson.id" style="width:200px" @on-change="onSelectedLessonChange">
            <Option v-for="(item,index) in lessons" :value="item.id" :key="item.lesson_name + index">{{
              item.lesson_name+'___' + item.lesson_teacher_name+ '___'+item.lesson_class+'___'}}
            </Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="16">
      <Col span="6">
        <FormItem label="任课教师	">
          <Input v-model="meta.lesson.lesson_teacher_name" disabled></Input>
        </FormItem>
        <Col span="6">
          <FormItem label="上课班级">
            <Input v-model="meta.lesson.lesson_class" disabled style="width:200px"></Input>
          </FormItem>
        </Col>
      </Col>
      <Col span="6">
        <FormItem label="听课时间">
          <DatePicker type="date" :value="meta.create_at" format="yyyy-MM-dd" @on-change="onSelectedLessonCaseChange" :options="getLessonDatePickerOption()"></DatePicker>
        </FormItem>
      </Col>

      <Col span="6">
        <FormItem label="上课地点">
          <Input :value="meta.lesson.lesson_room" disabled></Input>
        </FormItem>
      </Col>

      <Col span="6">
        <FormItem label="上课节次">
          <Select v-model="meta.lesson.lesson_times"  multiple style="width:200px">
            <Option v-for="item in lesson_times" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import {queryLessons} from '../../../service/api/lesson'
  import {queryUsers} from '../../../service/api/user'
  import {transTimeToSelectedData} from '../../../utils/lesson_time'
  import {dateToString} from '../../../utils/tools'
  export default {
    data() {
      return {
        lessons: [],
        selected_lesson_case: {}, //选中的lesson的case
        meta: this.value,
        users: [],
        lesson_times:[],
        allow_select_data: [],
      }
    },
    computed: {
      selected_lesson: function () {
        if (this.meta.lesson.id) {
          let flag = this.lessons.findIndex((item) => {
            return item.id === this.meta.lesson.id
          })
          return this.lessons[flag]
        } else {
          return {lesson_cases: []}
        }
      }
    },
    props: {
      value: {
        type: Object,
        default: {lesson: {}}
      },
      input: Function
    },
    mounted() {
      queryLessons().then((resp) => {
        this.lessons = resp.data.lessons
      })
      queryUsers().then((resp) => {
        this.users = resp.data.users
      })
    },
    methods: {
      onSelectedLessonChange: function (id) {
        this.meta.create_at = undefined
        this.meta.lesson = {
          id: id,
          lesson_name: this.selected_lesson.lesson_name,
          lesson_teacher_name: this.selected_lesson.lesson_teacher_name,
          lesson_class: this.selected_lesson.lesson_class,
        }
        this.lesson_times = []
        this.$emit('input',{
          ...this.value,
          ...this.meta,
          lesson: this.meta.lesson
        })
        this.allow_select_data = this.selected_lesson.lesson_cases.map((item)=>{
          return item.lesson_date
        })
      },
      onSelectedLessonCaseChange: function (value) {
        this.meta.create_at = value
        let flag = this.selected_lesson.lesson_cases.findIndex((item) => {
          return item.lesson_date === this.meta.create_at})
        if (flag!==-1){
          this.selected_lesson_case =  this.selected_lesson.lesson_cases[flag];
          this.lesson_times = transTimeToSelectedData(this.selected_lesson_case.lesson_time);
        } else {
          this.selected_lesson_case = {}
        }
        this.meta.lesson = {
          ...this.meta.lesson, lesson_room: this.selected_lesson_case.lesson_room
        }
        this.$emit('input',{
          ...this.value,
          lesson: this.meta.lesson
        })
      },

      getLessonDatePickerOption: function () {
        let self = this
        return {
          disabledDate (value) {
            let d = dateToString(value, "yyyy-MM-dd")
            let flag = self.allow_select_data.findIndex((item)=>{return item === d})
            return (flag === -1)
          }
        }
      }
    }
  }
</script>
