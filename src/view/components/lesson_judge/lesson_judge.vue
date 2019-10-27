<template>
  <Card>
    <Table :show-header="true" :data="data" :columns="columns"></Table>
    <LessonProfileModal
      :show="showLessonProfileModal"
      @onOK="onProfileModalOK"
      @onCancel="onProfileModalCancel"
      :lesson_id="this.selected_lesson_id"
    ></LessonProfileModal>
  </Card>
</template>

<script>
  import LessonProfileModal from '../../LessonNoticeManager/components/LessonProfileModal'
  import { queryForms } from '@/service/api/dqs'
  import { queryNoticeLessons,deleteNoticeLesson } from '@/service/api/lesson'
  import {putNoticeLesson} from "../../../service/api/lesson";

  export default {
    name: "lesson_judge",
    props: {
      lesson_teacher_name: String,
    },
    components: { LessonProfileModal },

    data: function () {
      return {
        showLessonProfileModal: false, // 展示编辑弹窗
        selected_lesson_id: '',
        selected_lesson_ids :[],
        data:[],
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
            title: '分配组别',
            render: function (h, params) {
              return (
                <span>{ params.row.group_name }</span>
            )
            }
          },
          {
            title: '状态',
            render: (h, params) => {
              if (params.row.lesson_state === '待提交'){
                return h('Tag', { props: {color:"red"}}, params.row.lesson_state)
              } else if (params.row.lesson_state === '已完成') {
                return h('Tag', { props: {color:"blue"}}, params.row.lesson_state)
              }  else {
                return h('Tag',{}, params.row.lesson_state)
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
          {
            title: '关注原因',
            render: function (h, params) {
              return (
                <span>{ params.row.lesson_attention_reason }</span>
            )
            }
          },
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
                      style: {
                        marginRight: '2px'
                      },
                      on: {
                        click: () => {
                          this.selected_lesson_id = params.row.id
                          this.showLessonProfileModal = true
                        }
                      }
                    }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '是否确认删除?',
                        onOk: () => {
                          deleteNoticeLesson(params.row.id).then((res) => {
                            this.fetchData()
                            if (res.data.code === 200) {
                              this.$Message.success('删除成功！')
                            } else {
                              this.$Message.error('删除失败！')
                            }
                          })
                        },
                        onCancel:()=>{}
                      })

                    }
                  }
                }, '删除')
              ])
            }
          }
        ]
      }
    },
    methods: {
      fetchData () {
        // 数据表发生变化请求数据
        let args = { ...this.query, ...this.pages ,...this.lesson_teacher_name}
        return queryNoticeLessons({lesson_teacher_name: this.lesson_teacher_name}).then((resp) => {
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
          this.pages._page = 1
        })
      },
      onProfileModalCancel () {
        this.showLessonProfileModal = false
      }
    },
    mounted: function () {
      // console.log(this.lesson_teacher_name)
      queryNoticeLessons({lesson_teacher_name: this.lesson_teacher_name}).then((resp)=>{
        this.data = resp.data.notice_lessons
      })
    }

  }
</script>

<style scoped>

</style>
