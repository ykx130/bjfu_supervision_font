
<template>
  <div>
    <Form :model="value" :label-width="80" label-position="left">
      <Row :gutter="16">
        <Col span="6">
          <FormItem label="章节目录" :required="true" >
            <Input v-model="value.lesson.content" class="inline-form-item" :disabled="disabled"> </Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="听课督导" :required="true">
            <Select :value="value.guider"
                    filterable
                    clearable
                    remote
                    :loading="false"
                    @on-query-change="onGuiderQueryChange"
                    @on-change="onGuiderSelectChange"
                    :disabled="guider_disable || disabled"
                    class="inline-form-item">
              <Option v-for="(item, key) in users" :value="item.username" :key="item.username + item.name + item.id"   >{{'     ' + item.username + '     '}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem  label="听课学期" prop="term" >
            <Select v-model="value.term"  @on-change="onTermSelectChange" class="inline-form-item" :disabled="disabled">
              <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem  label="听课级别" prop="lesson.lesson_level">
            <Input   v-model="value.lesson.lesson_level" disabled class="inline-form-item"></Input>
          </FormItem>
        </Col>
      </Row>

    </Form>

    <Form :model="value">
      <table class="table-border meta-table" >
        <tbody>
        <tr>
          <th>课程名字</th>
          <th>任课教师</th>
          <th>上课班级</th>
          <th>听课时间</th>
          <th>上课地点</th>
          <th>上课节次</th>
        </tr>
        <tr>
          <td>
            <FormItem :required="true" class="table-form-item">
              <Select v-model="value.lesson.id"
                      :remote="true"
                      @on-query-change="onLessonQueryChange"
                      clearable
                      :label="value.lesson.lesson_name"
                      @on-change="onSelectedLessonChange"
                      :disabled="disabled"
                      filterable>
                <Option v-for="(item,index) in lessons" :value="item.id" :key="item.lesson_id + item.lesson_name + item.id">
                  {{ '     '+item.lesson_name+'___' + item.lesson_teacher_name+ '___'+item.lesson_class+'___'+'     '}}
                </Option>
              </Select>
            </FormItem>
          </td>
          <td>
            <FormItem  :required="true" class="table-form-item">
              <Input v-model="value.lesson.lesson_teacher_name"
                     :disabled="disabled"></Input>
            </FormItem>
          </td>
          <td>
            <FormItem  :required="true" class="table-form-item">
              <Input v-model="value.lesson.lesson_class" :disabled="disabled" ></Input>
            </FormItem>
          </td>
          <td>
            <FormItem :required="true" class="table-form-item">
              <DatePicker  width="100%" type="date"
                           :value="value.lesson.lesson_date"
                           format="yyyy-MM-dd"
                           @on-change="onSelectedLessonCaseChange"
                           :options="getLessonDatePickerOption()"
                           :disabled="disabled"></DatePicker>
            </FormItem>
          </td>
          <td>
            <FormItem :required="true" class="table-form-item">
              <Input v-model="value.lesson.lesson_room" :disabled="disabled"></Input>
            </FormItem>
          </td>
          <td>
            <FormItem  :required="true" class="table-form-item">
              <Select v-model="value.lesson.lesson_times"  multiple :disabled="disabled">

                <Option v-for="item in lesson_times"
                        :value="item.value"
                        :key="item.value + item.key">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </td>
        </tr>
        </tbody>
      </table>

    </Form>
  </div>
</template>
<script>
import { queryLessons, getLesson } from '@/service/api/lesson'
import { querySupervisors } from '@/service/api/user'
import { dateToString } from 'Libs/tools'
import { queryTerms, getCurrentTerms } from '@/service/api/term'
import { transTimeToSelectedData } from 'Libs/tools'
export default {
  props: {
    value: {
      default: { lesson: {} }
    },
    input: Function,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      lessons: {},
      users: {},
      lesson_times: [],
      allow_select_data: [],
      terms: [],
      selected_lesson: { lesson_cases: [] },
      select_guider: {},
      selected_lesson_case: {},
      lesson_disabled: '', // 禁用课程的表单,
      guider_disable: '',
      guider_name_like: '',
      user_name_like: ''
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.getters.userInfo
    }
  },
  watch: {
    value: {
      deep: true,
      handler: function (val, oldVal) {
        this.$emit('input', this.value)
      }
    }
  },
  mounted () {
    // 处理当前用户
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    }).then(() => {
      let lesson_id = this.$route.query.lesson_id
      if (lesson_id) {
        // 课程表跳转
        getLesson(lesson_id).then((resp) => {
          // 读取课程
          this.selected_lesson = resp.data.lesson
          // 处理case
          this.lessons[this.selected_lesson.id] = this.selected_lesson
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

          this.lesson_disabled = true

          this.lesson_disabled = false
          this.fetchUser()
        })
      } else {
        getCurrentTerms().then((resp) => {
          this.value.term = resp.data.term.name
          if (this.lesson_disabled || this.disabled) {
            this.selected_lesson = this.value.lesson
            this.$set(this.lessons, this.selected_lesson.id, this.selected_lesson)
            this.lesson_times = this.value.lesson.lesson_times.map((item) => {
              return {
                label: `第${item}节`,
                value: item
              }
            })
          } else {
            this.fetchLesson()
          }

          if (this.guider_disable || this.disabled) {
            this.$set(this.users, this.value.guider, {
              'username': this.value.guider,
              'name': this.value.guider_name
            })
          } else {
            this.fetchUser()
          }
        })
      }
    })
    if (this.currentUser.guider && !this.currentUser.role_names.includes('管理员')) {
      this.value.guider = this.currentUser.username
      this.value.guider_name = this.currentUser.name
      this.value.guider_group = this.currentUser.guider.group
    }
  },
  methods: {
    // 获取所有用户
    fetchUser: function () {
      this.users = {}
      return querySupervisors({ term: this.value.term, username_like: this.guider_name_like }).then((resp) => {
        resp.data.supervisors.map((item) => {
          this.$set(this.users, item.username, item)
        })
      })
    },

    // 获取所有课程
    fetchLesson: function () {
      this.lessons = {}
      return queryLessons({ term: this.value.term, lesson_name_like: this.lesson_name_like }).then((resp) => {
        resp.data.lessons.map((item) => {
          this.$set(this.lessons, item.id, item)
        })
      })
    },

    restValue: function () {
      this.value.lesson = {}
    },

    onGuiderQueryChange: function (value) {
      if (!(value.startWith('     ') &&value.endsWith('     '))) {
        this.guider_name_like = value
        this.fetchUser()
      }
    },

    onLessonQueryChange: function (value) {
      if (!(value.startWith('     ')&&value.endsWith('     '))) {
        this.lesson_name_like = value
        this.fetchLesson()
      }
    },

    onGuiderSelectChange: function (value) {
      if (value) {
        this.select_guider = this.users[value]
        if (this.select_guider) {
          this.value.guider_name = this.select_guider.name
          this.value.guider_group = this.select_guider.group
        }
      } else {
        this.value.guider_name = undefined
        this.value.guider_group = undefined
      }
    },

    onTermSelectChange: function (value) {
      this.fetchLesson().then(() => {
        this.restValue()
      })
      this.fetchUser()
    },

    onSelectedLessonChange: function (id) {
      /* 选择的课程发生变化 */
      if (id) {
        this.selected_lesson = this.lessons[id]
      } else {
        this.selected_lesson = { lesson_cases: [] }
      }// 查看选的那个

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
      let flag = this.selected_lesson.lesson_cases.findIndex((item) => {
        return item.lesson_date === value
      })
      if (flag !== -1) {
        this.lesson_times = transTimeToSelectedData(this.selected_lesson.lesson_cases[flag].lesson_time)
        this.selected_lesson_case = this.selected_lesson.lesson_cases[flag]
      } else {
        this.lesson_times = []
        this.selected_lesson_case = {}
      }

      this.value.lesson = {
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
        lesson_date: value,
        lesson_room: this.selected_lesson_case.lesson_room,
        lesson_times: this.value.lesson.lesson_times ? this.value.lesson.lesson_times : []
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
  },
  created () {

  }
}
</script>

<style scoped lang="less">

  .table-border {
    border:1px solid #ddd;
    border-collapse: collapse;
    border-spacing: 0;
    tbody>tr{
      text-align:left;
      border:1px solid #ddd;
    };
    tbody>tr>th {
      padding: 8px;
      border:1px solid #ddd;
    };
    tbody>tr>td {
      padding: 8px;
      border:1px solid #ddd;
      height: 30px;
    };
    .table-form-item {
      width: 160px;
      vertical-align:middle;
      margin-bottom: 3px;
    }
  }
  .meta-table{
    width: 100%;
  }
  .inline-form-item {
    width: 184px;
  }
</style>
