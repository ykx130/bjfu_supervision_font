<template>
  <Card>
    <Table :show-header="true" :data="data" :columns="columns"></Table>

  </Card>
</template>

<script>
import LessonProfileModal from '../../LessonNoticeManager/components/LessonProfileModal'
import { queryForms } from '@/service/api/dqs'
import { queryNoticeLessons, deleteNoticeLesson ,queryLessons} from '@/service/api/lesson'
import { putNoticeLesson } from '../../../service/api/lesson'
import FormMixin from '@/mixins/FormMixin.js'

export default {
  name: 'lesson_judge',
  mixins: [FormMixin],
  props: {
    lesson_teacher_id: String
  },
  components: { LessonProfileModal },

  data: function () {
    return {
      showLessonProfileModal: false, // 展示编辑弹窗
      selected_lesson_id: '',
      selected_lesson_ids: [],
      data: [],
      columns: [
        {
          title: '课程名字',
          render: function (h, params) {
            return (
              <span>{ params.row.lesson_name }</span>
            )
          }
        },
        {
          title: '课程属性',
          render: function (h, params) {
            return (
              <span>{ params.row.lesson_attribute }</span>
            )
          }
        },
        {
          title: '班级',
          render: function (h, params) {
            return (
              <span>{ params.row.lesson_class }</span>
            )
          }
        },

        {
          title: '状态',
          render: (h, params) => {
            if (params.row.lesson_state === '待提交') {
              return h('Tag', { props: { color: 'red' } }, params.row.lesson_state)
            } else if (params.row.lesson_state === '已完成') {
              return h('Tag', { props: { color: 'blue' } }, params.row.lesson_state)
            } else {
              return h('Tag', {}, params.row.lesson_state)
            }
          }
        },
        {
          title: '评价次数',
          render: function (h, params) {
            return (
              <span>{ params.row.notices }</span>
            )
          }
        },
        // {
        //   title: '关注原因',
        //   render: function (h, params) {
        //     return (
        //       <span>{ params.row.lesson_attention_reason }</span>
        //     )
        //   }
        // },
        {
          title: '操作',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                directives: [{
                  name: 'role',
                  value: ['督导']
                }],
                style: {
                  marginRight: '2px'
                },
                on: {
                  click: () => {
                    this.selected_lesson_id = params.row.id,
                    this.showLessonProfileModal = false,
                    // this.judge(params.row.lesson_id, params.row.terms)
                    this.formjudge(params.row.lesson_id, params.row.terms, params.row.lesson_attribute)
                  }
                }
              }, '进行评价')
            ])
          }
        }
      ]
    }
  },
  methods: {
    fetchData () {
      // 数据表发生变化请求数据
      let args = { ...this.query, ...this.pages, ...this.lesson_teacher_name }
      return queryNoticeLessons({ lesson_teacher_name: this.lesson_teacher_name }).then((resp) => {
        this.selected_lesson_ids = []
        this.data = resp.data.notice_lessons
        this.total = resp.data.total
      })
    },
    onProfileModalOK (lesson) {
      // 更新框确定 关闭
      putNoticeLesson(lesson).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({ content: '更新成功' })
          this.fetchData()
        }
        this.showLessonProfileModal = false
      })
    },
    onProfileModalCancel () {
      this.showLessonProfileModal = false
    }
  },
  mounted: function () {
    // console.log(this.lesson_teacher_name)
    queryNoticeLessons({ lesson_teacher_id: this.lesson_teacher_id }).then((resp) => {
      this.data = resp.data.notice_lessons
    })
  }

}
</script>

<style scoped>

</style>
