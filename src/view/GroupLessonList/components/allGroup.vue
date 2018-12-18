<template>
  <div>
    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
      </div>
    </div>
  </div>
</template>

<script>
import {queryGroupLesson, putLesson} from '../../../service/api/lesson'
import {queryGroups} from '../../../service/api/user'

export default {
  name: 'allGroup',
  data: function () {
    return {
      query: {}, // 查询用的参数
      total: 0, // 总数量
      data: [], // 数据
      terms: [],
      groups: [],
      selected_group_name: '第一组',
      pages: {
        _page: 1,
        _per_page: 10
      }, // 分页
      columns: [
        {
          title: '用户号码',
          render: function (h, params) {
            return (
              <span>{ params.row.id }</span>
            )
          }
        },
        {
          title: '用户名称',
          render: function (h, params) {
            return (
              <span>{ params.row.username }</span>
            )
          }
        },
        {
          title: '所在分组',
          render: function (h, params) {
            return (
              <span>{ params.row.group_name }</span>
            )
          }
        },
        {
          title: '未提交',
          render: function (h, params) {
            return (
              <span>{ params.row.to_be_submitted }</span>
            )
          }
        },
        {
          title: '已提交',
          render: function (h, params) {
            return (
              <span>{ params.row.has_submitted }</span>
            )
          }
        },
        {
          title: '提交总次数',
          render: function (h, params) {
            return (
              <span>{ params.row.total_times }</span>
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
                    this.selected_group_name = params.row.group_name
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
     fetchData() {
      // 数据表发生变化请求数据
       let args = {...this.query, ...this.pages}
      queryGroupLesson(args).then((resp) => {
        this.data = resp.data.lesson_records
        this.total = resp.data.total
      })
    },
    onPageChange (page) {
      // 分页变化
      this.pages._page = page
      this.fetchData( )
    },
    onSearch () {
      // 查询变化
      this.pages._page = 1
      this.fetchData( )
    }
  },
  mounted: function () {
    const args = this.$route.query
    queryGroups().then((resp) => {
      this.groups = resp.data.groups
      // this.selected_group_name = this.groups[0].name;
      queryGroupLesson(args).then((resp) => {
        this.data = resp.data.lesson_records
        this.total = resp.data.total
        // this.$router.push({path:'/dqs/lesson_records',query:{group_name: this.selected_group_name}})
      })
    })
  }
}
</script>

<style scoped>

</style>
