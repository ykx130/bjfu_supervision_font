<template>
  <Card>
    <Table :show-header="true" :data="data" :columns="columns"></Table>
  </Card>
</template>

<script>

import { queryForms } from '@/service/api/dqs'

export default {
  name: 'model_judge',
  props: {
    lesson_name: String,
    lesson_teacher_name: String
  },
  data: function () {
    return {
      data: [],
      columns: [
        {
          title: '上课班级',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.lesson.lesson_class }</span>
            )
          }
        },
        {
          title: '上课地点',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.lesson.lesson_room }</span>
            )
          }
        },
        {
          title: '任课教师',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.lesson.lesson_teacher_name }</span>
            )
          }
        },
        {
          title: '听课时间',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.lesson.lesson_date }</span>
            )
          }
        },
        {
          title: '督导姓名',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.guider_name }</span>
            )
          }
        },
        {
          title: '好评状态',
          render: function (h, params) {
            if (params.row.model_lesson.recommend) {
              return h('Tag', { props: { color: 'blue' } }, '推荐')
            } else {
              return h('Tag', { props: { color: 'red' } }, '待商榷')
            }
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
                    this.$router.push({ path: `/dqs/form_show/${params.row._id}` })
                  }
                }
              }, '查看')
            ])
          }
        }
      ]
    }
  },
  methods: {

  },
  mounted: function () {
    queryForms({ meta: { lesson: { lesson_name: this.lesson_name, lesson_teacher_name: this.lesson_teacher_name } }, model_lesson: { is_model_lesson: true }, status: '已完成' }).then((resp) => {
      this.data = resp.data.forms
    })
  }

}
</script>

<style scoped>

</style>
