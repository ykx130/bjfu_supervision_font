<style>
</style>
<template>
  <Form :model="value" :label-width="80">
    <Row :gutter="8">
      <Col span="6">
        <FormItem label="听课督导" :required="true">
          <Select v-model="value.guider" style="width:200px" @on-change="onGuiderSelectChange" :disabled="guider_disable">
            <Option v-for="(item,index) in users" :value="item.username" :key="item.username + index"   >{{item.name}}</Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="学期" prop="term" :required="true">
          <Select v-model="value.term" style="width:190px" @on-change="onTermSelectChange">
            <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="课程级别" prop="term" :required="true">
          <Input  style="width:200px" v-model="value.lesson.lesson_level" disabled></Input>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="16">
      <!--<FormItem label="课程属性">-->
      <!--<Input v-model="value.attr" disabled></Input>-->
      <!--</FormItem>-->
      <Col span="6">
        <FormItem label="课程名字" :required="true">
          <Select v-model="value.lesson.id" style="width:200px" @on-query-change="" @on-change="onSelectedLessonChange" :disabled="lesson_disabled" filterable>
            <Option v-for="(item,index) in lessons" :value="item.id" :key="item.lesson_name + index">{{
              item.lesson_name+'___' + item.lesson_teacher_name+ '___'+item.lesson_class+'___'}}
            </Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="任课教师	" :required="true">
          <Input v-model="value.lesson.lesson_teacher_name" disabled></Input>
        </FormItem>
      </Col>

      <Col span="6">
        <FormItem label="上课班级" :required="true">
          <Input v-model="value.lesson.lesson_class" disabled style="width:200px"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="16">

      <Col span="6">
        <FormItem label="听课时间" :required="true">
          <DatePicker style="width:200px" type="date" :value="value.lesson.lesson_date" format="yyyy-MM-dd" @on-change="onSelectedLessonCaseChange" :options="getLessonDatePickerOption()"></DatePicker>
        </FormItem>
      </Col>

      <Col span="6">
        <FormItem label="上课地点" :required="true">
          <Input :value="value.lesson.lesson_room" disabled></Input>
        </FormItem>
      </Col>

      <Col span="6">
        <FormItem label="上课节次" :required="true">
          <Select v-model="value.lesson.lesson_times"  multiple style="width:200px">
            <Option v-for="item in lesson_times" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row> {{this.selected_lesson}}
  </Form>

</template>
<script>
  import {queryLessons,getLesson} from '@/service/api/lesson'
  import {querySupervisors} from '@/service/api/user'
  import {dateToString} from 'Libs/tools'
  import {queryTerms, getCurrentTerms} from '@/service/api/term'
  import {transTimeToSelectedData} from 'Libs/tools'
  import {currentUser} from "../../../service/api/user";
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
        guider: {},
        lesson_times: [],
        allow_select_data: [],
        terms: [],
        selected_lesson:  {lesson_cases: []},
        selected_lesson_case: {},
        lesson_disabled: false, //禁用课程的表单,
        guider_disable: false,
      }
    },
    computed:{
      currentUser: function () {
        return this.$store.getters.userInfo
      }
    },
    watch : {
      value: {
        deep:true,
        handler:function (val, oldVal) {
          this.$emit('input', this.value)
        }
      }
    },
    mounted () {
      queryTerms().then((resp) => {
        this.terms = resp.data.terms
      })

      // 处理课程的逻辑
      let lesson_id = this.$store.getters.lesson_id
      if (lesson_id){
        // 从课程表跳转
        getLesson(lesson_id).then((resp)=>{
          // 读取课程
          this.selected_lesson = resp.data.lesson
          // 处理case
          this.value.lesson.lesson_date = undefined
          this.lesson_times = []
          this.allow_select_data = this.selected_lesson.lesson_cases.map((item) => {
            return item.lesson_date
          })
          // 选择case
          if (this.allow_select_data) {
            this.onSelectedLessonCaseChange(this.allow_select_data[0])
          }
          // 处理表单的附加值
          this.value.term = this.selected_lesson.term
          this.lessons = [this.selected_lesson]
          this.lesson_disabled = true
          querySupervisors({user_roles:{term:this.value.term}}).then((resp) => {
            this.users = resp.data.users
          })
        })
      } else {
        getCurrentTerms().then((termResp) => {
          this.value.term = termResp.data.term.name
          queryLessons({term:this.value.term}).then((resp) => {
            this.lessons = resp.data.lessons
          })
          querySupervisors({user_roles:{term:this.value.term}}).then((resp) => {
            this.users = resp.data.users
          })
        })
      }
      // 处理用户
      if (this.currentUser.guider && !this.currentUser.role_names.includes("管理员")) {
        this.value.guider = this.currentUser.username
        this.value.guider_name = this.currentUser.name
        this.value.guider_group = this.currentUser.guider_group
      }

      this.$store.commit('setLessonId', undefined)
    },
    methods: {
      restValue: function(){
        this.value.lesson = {}
      },
      onLessonQueryChange: function (value){
         queryLessons({lesson_name_like:value}).then((resp)=>{
           this.lessons = resp.data.lessons
        })
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

        if (this.value.lesson.id) {
          let flag = this.lessons.findIndex((item) => {
            return item.id === this.value.lesson.id
          })
          this.selected_lesson =  this.lessons[flag]
        } else {
          this.selected_lesson =  {lesson_cases: []}
        }// 查看选的那个

        this.value.lesson.lesson_date = undefined
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
        let flag = this.selected_lesson.lesson_cases.findIndex((item) => {
          return item.lesson_date === value
        })
        if (flag !== -1) {
          this.lesson_times = transTimeToSelectedData(this.selected_lesson.lesson_cases[flag].lesson_time)
          this.selected_lesson_case = this.selected_lesson.lesson_cases[flag]
        } else {
          this.lesson_times = []
          this.selected_lesson_case =  {}
        }

        this.value.lesson = {
          ...this.value.lesson.lesson_date,
          id: this.selected_lesson.id,
          lesson_id: this.selected_lesson.lesson_id,
          lesson_name: this.selected_lesson.lesson_name,
          lesson_teacher_name: this.selected_lesson.lesson_teacher_name,
          lesson_class: this.selected_lesson.lesson_class,
          lesson_teacher_unit: this.selected_lesson.lesson_teacher_unit,
          lesson_attribute: this.selected_lesson.lesson_attribute,
          assign_group: this.selected_lesson.assign_group,
          lesson_year: this.selected_lesson.lesson_year,
          lesson_level: this.selected_lesson.lesson_level,
          lesson_model: this.selected_lesson.lesson_model,
          lesson_date:value,
          lesson_room: this.selected_lesson_case.lesson_room
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
