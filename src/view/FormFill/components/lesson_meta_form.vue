<style>
</style>
<template>
  <Form :model="value" :label-width="80">
    <Row :gutter="8">
      <Col span="6">
        <FormItem label="听课督导">
          <Select v-model="value.guider" style="width:200px" @on-change="onGuiderSelectChange">
            <Option v-for="(item,index) in users" :value="item.username" :key="item.username + index"   >{{item.name}}</Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="学期：" prop="term">
          <Select v-model="value.term" style="width:200px" @on-change="onTermSelectChange">
            <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="16">
      <!--<FormItem label="课程属性">-->
      <!--<Input v-model="value.attr" disabled></Input>-->
      <!--</FormItem>-->
      <Col span="6">
        <FormItem label="课程名字">
          <Select v-model="value.lesson.id" style="width:200px" @on-change="onSelectedLessonChange">
            <Option v-for="(item,index) in lessons" :value="item.id" :key="item.lesson_name + index">{{
              item.lesson_name+'___' + item.lesson_teacher_name+ '___'+item.lesson_class+'___'}}
            </Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="任课教师	">
          <Input v-model="value.lesson.lesson_teacher_name" disabled></Input>
        </FormItem>
      </Col>

      <Col span="6">
        <FormItem label="上课班级">
          <Input v-model="value.lesson.lesson_class" disabled style="width:200px"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="16">

      <Col span="6">
        <FormItem label="听课时间">
          <DatePicker type="date" :value="value.lesson.lesson_date" format="yyyy-MM-dd" @on-change="onSelectedLessonCaseChange" :options="getLessonDatePickerOption()"></DatePicker>
        </FormItem>
      </Col>

      <Col span="6">
        <FormItem label="上课地点">
          <Input :value="value.lesson.lesson_room" disabled></Input>
        </FormItem>
      </Col>

      <Col span="6">
        <FormItem label="上课节次">
          <Select v-model="value.lesson.lesson_times"  multiple style="width:200px">
            <Option v-for="item in lesson_times" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
import {queryLessons} from '@/service/api/lesson'
import {querySupervisors} from '@/service/api/user'
import {dateToString} from 'Libs/tools'
import {queryTerms, getCurrentTerms} from '@/service/api/term'
import {transTimeToSelectedData} from 'Libs/tools'
export default {
  props: {
    value: {
      default: {lesson: {}}
    },
    input: Function
  },
  data () {
    return {
      lessons: [],
      users: [],
      lesson_times: [],
      allow_select_data: [],
      terms: []
    }
  },
  watch : {
    value: {
      deep:true,
      handler:function (val, oldVal) {
        this.$emit('value')
      }
    }
  },
  computed: {
    selected_lesson: function () {
      /* 被选中的课程 */
      if (this.value.lesson.id) {
        let flag = this.lessons.findIndex((item) => {
          return item.id === this.value.lesson.id
        })
        return this.lessons[flag]
      } else {
        return {lesson_cases: []}
      }
    },
    selected_lesson_case: function () {
      /* 选中的课程情况 */
      let flag = this.selected_lesson.lesson_cases.findIndex((item) => {
        return item.lesson_date === this.value.lesson.lesson_date
      })
      if (flag !== -1) {
        this.lesson_times = transTimeToSelectedData(this.selected_lesson.lesson_cases[flag].lesson_time)
        return this.selected_lesson.lesson_cases[flag]
      } else {
        this.lesson_times = []
        return {}
      }
    }
  },

  mounted () {
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })
    getCurrentTerms().then((termResp) => {
      this.value.term = termResp.data.term.name
      queryLessons({term:this.value.term}).then((resp) => {
        this.lessons = resp.data.lessons
      })
      querySupervisors({user_roles:{term:this.value.term}}).then((resp) => {
        this.users = resp.data.users
      })
    })
  },
  methods: {
    restValue: function(){
      this.value.lesson = {}
    },
    onGuiderSelectChange: function(value){
      let guider = this.users.find((ele)=>{
        return ele.username === value
      })
      if (guider){
        this.value.guider_name = guider.name
        this.value.guider_group = guider.group
      }
    },
    onTermSelectChange: function(value){
        queryLessons({term:this.value.term}).then((resp) => {
          this.lessons = resp.data.lessons
        })
      querySupervisors({user_roles:{term:this.value.term}}).then((resp) => {
          this.users = resp.data.users
        })
      this.restValue()
    },
    onSelectedLessonChange: function (id) {
      /* 选择的课程发生变化 */
      this.value.lesson.lesson_date = undefined
      this.value.lesson = {
        id: id,
        lesson_name: this.selected_lesson.lesson_name,
        lesson_teacher_name: this.selected_lesson.lesson_teacher_name,
        lesson_class: this.selected_lesson.lesson_class,
        lesson_teacher_unit: this.selected_lesson.lesson_teacher_unit,
        lesson_attribute: this.selected_lesson.lesson_attribute,
        assign_group: this.selected_lesson.assign_group,
        lesson_year: this.selected_lesson.lesson_year,
        lesson_level: this.selected_lesson.lesson_level,
        lesson_attention_reason: this.selected_lesson.lesson_attention_reason
      }
      this.lesson_times = []
      this.allow_select_data = this.selected_lesson.lesson_cases.map((item) => {
        return item.lesson_date
      })
      if (this.allow_select_data) {
        this.onSelectedLessonCaseChange(this.allow_select_data[0])
      }
    },
    onSelectedLessonCaseChange: function (value) {
      /* 选择的课程case变化 根据时间 */
      this.value.lesson.lesson_date = value

      this.value.lesson = {
        ...this.value.lesson, lesson_room: this.selected_lesson_case.lesson_room
      }
    },

    getLessonDatePickerOption: function () {
      let self = this
      return {
        disabledDate (value) {
          let d = dateToString(value, 'yyyy-MM-dd')
          let flag = self.allow_select_data.findIndex((item) => { return item === d })
          return (flag === -1)
        }
      }
    }
  }
}
</script>
