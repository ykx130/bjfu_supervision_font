<template>
  <div>
    <p style="color: #647797; font-size: 18px;font-weight: bold;text-align: center">关注课程列表</p>
    <div style="padding-top: 10px"></div>
    <Table   stripe :columns="columns" :data="data"></Table>
  </div>
</template>
<script>
  import {queryNoticeLessons} from '@/service/api/lesson'
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
                title: '分配组别',
                render: function (h, params) {
                  return (
                    <span>{ params.row.assign_group }</span>
                )
                }
              },
              {
                title: '关注原因',
                render: function (h, params) {
                  return (
                    <span>{ params.row.reason }</span>
                )
                }
              },
              {
                title: '课程状态',
                render: (h, params) => {
                  if (params.row.lesson_state === '未完成'){
                    return h('Tag', { props: {color:"red"}}, params.row.lesson_state)
                  } else {
                    return h('Tag', { props: {color:"blue"}}, params.row.lesson_state)
                  }
                }
              }
            ]
          }
        },
    mounted: function () {
      getCurrentTerms().then((termResp) => {
        this.query.term = termResp.data.term.name
        queryNoticeLessons  (this.pages).then((resp) => {
          this.data = resp.data.notice_lessons
          this.total = resp.data.total
        })
      })
        }
    }
</script>

<style scoped>

</style>
