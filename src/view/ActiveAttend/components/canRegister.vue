<template>
  <div>
    <h1>培训报名</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="题目：" prop="activity">
        <AutoComplete v-model="query.name_like" :data="activityName"
                      style="width:180px"
                      @on-search="handleSearchActivateName"></AutoComplete>
      </FormItem>
      <FormItem label="模块：" prop="activity">
        <AutoComplete v-model="query.title_like" :data="titleName"
                      style="width:180px"
                      @on-search="handleSearchModuleName"></AutoComplete>
      </FormItem>
      <FormItem>
        <Button type="primary" @click=" onSearch">查询</Button>
      </FormItem>
    </Form>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page"
              @on-change="onPageChange"></Page>
      </div>
    </div>
  </div>

</template>

<script>
import {queryCurrentuserActives, postCurrentActiveUser, queryActives} from '../../../service/api/actives'
import { queryTerms, getCurrentTerms } from '../../../service/api/term'
import { updateWithinField } from 'Libs/tools'

export default {
  name: 'canRegister',
  data: function () {
    return {
      query: {
        state: 'canAttend',
        term: undefined
      }, // 查询用的参数
      total: 0, // 总数量
      data: [{
        activity: {},
        activity_user: {}
      }], // 数据
      moduleName: [],
      activityName: [],
      titleName: [],
      terms: [],
      selected_activity_id: '', // 选中编辑的课程ids
      pages: {
        _page: 1,
        _per_page: 10
      }, // 分页
      columns: [
        {
          title: '题目',
          render: function (h, params) {
            return (
              < span > {params.row.title
              }<
              /span>
            )
          }
        },
        {
          title: '主讲人',
          render: function (h, params) {
            return (
              < span > {params.row.presenter
              }<
              /span>
            )
          }
        },
        {
          title: '所属模块',
          render: function (h, params) {
            return (
              < span > {params.row.module} < /span>
            )
          }
        },
        {
          title: '培训时间',
          render: function (h, params) {
            return (
              < span > {params.row.start_time} < /span>
            )
          }
        },
        {
          title: '培训地点',
          render: function (h, params) {
            return (
              < span > {params.row.place} < /span>
            )
          }
        },
        {
          title: '学时',
          render: function (h, params) {
            return (
              < span > {params.row.period} < /span>
            )
          }
        },
        {
          title: '主办单位',
          render: function (h, params) {
            return (
              < span > {params.row.organizer} < /span>
            )
          }
        },
        {
          title: '是否必修',
          render: function (h, params) {
            if (params.row.is_obligatory === false) {
              return h('Tag', { props: { color: 'grey' } }, '非必修')
            } else {
              return h('Tag', { props: { color: 'red' } }, '必修')
            }
          }
        },
        {
          title: '状态',
          render: function (h, params) {
            return (
              < span > {params.row.apply_state} < /span>
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
                  size: 'small',
                  disabled: (params.row.apply_state === '活动已结束')
                },
                style: {
                  marginRight: '2px'
                },
                directives: [{
                  name: 'role'
                }],
                on: {
                  click: () => {
                    this.selected_activity_id = params.row.id
                    this.$Modal.confirm({
                      title: '参加活动',
                      content: '是否参加活动?',
                      onOk: () => {
                        return postCurrentActiveUser(params.row.id).then((resp) => {
                          if (resp.data.code === 200) {
                            this.$Message.success({ content: '报名成功' })
                          }
                          return this.fetchData()
                        })
                      }
                    })
                  }
                }
              }, '报名')
            ])
          }
        }
      ]
    }
  },
  computed: {
    currentPath: function () {
      return this.$route.path
    }
  },
  methods: {
    fetchData () {
      // 数据表发生变化请求数据
      let args = { ...this.query, ...this.pages }
      return queryActives(args).then((resp) => {
        this.data = resp.data.activities
        this.total = resp.data.total
      })
    },
    onPageChange (page) {
      // 分页变化
      this.pages._page = page
      this.fetchData()
    },
    onSearch () {
      // 查询变化
      this.pages._page = 1
      this.fetchData()
    },
    handleSearchActivateName (value) {
      queryActives({ name_like: value }).then((resp) => {
        this.activityName.splice(0, this.activityName.length)
        resp.data.activities.forEach((activity) => {
          this.activityName.push(activity.title)
        })
      })
    }
  },
  mounted: function () {
    this.query.state = 'canAttend'
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
      getCurrentTerms().then((termResp) => {
        this.query.term = termResp.data.term.name
        queryActives({ ...this.query, ...this.pages }).then((resp) => {
          this.data = resp.data.activities
          this.total = resp.data.total
        })
      })
    })
  }
}
</script>

<style scoped>

</style>
