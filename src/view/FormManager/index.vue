<template>
  <Card>
    <h1>表单管理</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="学期：" prop="meta.term">
        <Select v-model="query.meta.term" style="width:200px">
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="课程名字：" prop="bind_meta_name">
        <Input style="width: 180px" v-model="query.bind_meta_name" ></Input>
      </FormItem>
      <FormItem label="上课教师：" prop="meta.lesson.lesson_teacher_name">
        <Input style="width: 180px" v-model="query.meta.lesson.lesson_teacher_name" ></Input>
      </FormItem>
      <FormItem label="听课督导：" prop="meta.create_by">
        <Input  style="width: 180px" v-model="query.meta.create_by"></Input>
        <Button type="primary" style="margin-left: 20px;width: 80px" @click="onSearch(query)">查询</Button>
      </FormItem>
    </Form>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
        </div>
    </div>
  </Card>
</template>

<script>
import { queryForms, putForm } from '../../service/api/dqs'
import {getCurrentTerms, queryTerms} from '../../service/api/term'
export default {
  data: function () {
    return {
      query: {
        bind_meta_name: undefined,
        meta: {
          create_by: undefined,
          lesson: {}
        }
      },
      total: 0,
      terms: [],
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
              <span>{ params.row.meta.create_by }</span>
            )
          }
        },
        {
          title: '创建时间',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.create_at }</span>
            )
          }
        },
        {
          title: '更新时间',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.updated_at }</span>
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
                    this.$router.push({path: `/dqs/form_show/${params.row._id}`})
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
                    this.putBack(params.row._id)
                  }
                }
              }, '打回')
            ])
          }
        }
      ],
      data: []
    }
  },
  methods: {
    putBack (from_id) {
      putForm(from_id, {
        status: '代提交'
      })
    },
    onTableChange (query, pages) {
      // 数据表发生变化请求数据
      let args = {...query, ...pages}
      queryForms(args).then((resp) => {
        this.data = resp.data.forms
        this.total = resp.data.total
        this.$router.push({path: '/dqs/form_manager', query: query})
      })
    },
    onPageChange (page) {
      // 分页变化
      this.pages._page = page
      this.onTableChange(this.query, this.pages)
    },
    onSearch (query) {
      // 查询变化 当点提交查询条件生效
      this.pages._page = 1
      this.onTableChange(query, this.pages)
    }
  },
  mounted: function () {
    let args = this.$route.query
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })
    getCurrentTerms().then((termResp) => {
      queryForms({...args, ...this.query}).then((resp) => {
        this.data = resp.data.forms
        this.total = resp.data.total
        this.$router.push({path: '/dqs/form_manager', query: {...args, ...this.query}})
      })
    })
  }
}
</script>

<style scoped>

</style>
