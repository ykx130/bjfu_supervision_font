<template>
  <div>
    <p style="color: #647797; font-size: 18px;font-weight: bold;text-align: center">最新评价课程</p>
    <div style="padding-top: 10px"></div>
    <Table   stripe :columns="columns" :data="data"></Table>
  </div>
</template>
<script>
  import {queryForms} from '@/service/api/dqs'
  import {getCurrentTerms} from '@/service/api/term'

  export default {
        name: "lesson_table",
        data: function () {
          return {
            data: [], // 数据
            query: {}, // 查询用的参数
            pages: {
              _page: 1,
              _per_page: 10
            },
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
                title: '教师名字',
                render: function (h, params) {
                  return (
                    <span>{ params.row.meta.lesson.lesson_teacher_name }</span>
                )
                }
              },

              {
                title: '评价督导',
                render: function (h, params) {
                  return (
                    <span>{ params.row.meta.guider_name }</span>
                )
                }
              },
              {
                title: '学院',
                render: function (h, params) {
                  return (
                      <span>{ params.row.meta.lesson.lesson_teacher_unit }</span>
                )
                }
              },
              {
                title: '问卷状态',
                render: (h, params) => {
                  if (params.row.status === '待提交'){
                    return h('Tag', { props: {color:"red"}}, params.row.status)
                  } else if(params.row.status === '已完成'){
                    return h('Tag', { props: {color:"blue"}}, params.row.status)
                  } else if(params.row.status === '草稿'){
                    return h('Tag', params.row.status)
                  }
                }
              }
            ]
          }
        },
    mounted: function () {
      getCurrentTerms().then((termResp) => {
        this.query.term = termResp.data.term.name
        queryForms(this.pages).then((resp) => {
          this.data = resp.data.forms.slice(0, 4)
          this.total = resp.data.total
        })
      })
        }
    }
</script>

<style scoped>

</style>
