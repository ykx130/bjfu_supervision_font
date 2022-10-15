<template>
  <Card>
    <Table :show-header="false" :data="data" :columns="columns"></Table>
  </Card>
</template>

<script>
  import { queryForms } from '@/service/api/dqs'
  export default {
    name: "lesson_judge_forms",
    props: {
      lesson_id: String,
    },
    data: function () {
      return {
        data:[],
        columns: [
          {
            title: '课程名字',
            render: function (h, params) {
              return (
                <span>{ params.row.meta.lesson.lesson_name }</span>
            )
            }
          },
          {
            title: '上课教师',
            render: function (h, params) {
              return (
                <span>{ params.row.meta.lesson.lesson_teacher_name }</span>
            )
            }
          },
          {
            title: '课程属性',
            render: function (h, params) {
              return (
                <span>{ params.row.meta.lesson.lesson_attribute }</span>
            )
            }
          },
          {
            title: '课程等级',
            render: function (h, params) {
              return (
                <span>{ params.row.meta.lesson.lesson_level }</span>
            )
            }
          },
          {
            title: '班级',
            render: function (h, params) {
              return (
                <span>{ params.row.meta.lesson.lesson_class }</span>
            )
            }
          },
          {
            title: '听课督导',
            render: function (h, params) {
              return (
                <span>{ params.row.meta.guider_name }</span>
            )
            }
          },
          {
            title: '督导所在小组',
            render: function (h, params) {
              return (
                <span>{ params.row.meta.guider_group }</span>
            )
            }
          },
          {
            title: '创建时间',
            render: function (h, params) {
              return (
                <span>{ params.row.meta.created_at }</span>
            )
            }
          },
          {
            title: '状态',
            render: (h, params) => {
              if (params.row.status === '待提交'){
                return h('Tag', { props: {color:"red"}}, params.row.status)
              } else if (params.row.status === '已完成') {
                return h('Tag', { props: {color:"blue"}}, params.row.status)
              }  else {
                return h('Tag',{}, params.row.status)
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
                      this.$router.push({path: `/dresult/form_show/${params.row._id}`})
                    }
                  }
                }, '查看'),
              ])
            }
          }
        ]
      }
    },
    methods: {
    },
    mounted: function () {
      debugger
      queryForms({meta:{lesson:{lesson_id: this.lesson_id}}}).then((resp)=>{
        this.data = resp.data.forms
      })
    }
  }
</script>

<style scoped>
</style>
