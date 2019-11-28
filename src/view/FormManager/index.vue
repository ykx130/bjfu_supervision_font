<template>
  <Card>
    <h1>表单管理</h1>
    <Tabs v-model="query.status" type="line" size="small" @on-click="onTabClick">
      <TabPane name="全部" label="全部"></TabPane>
      <TabPane  name="已完成" label="已完成"></TabPane>
      <TabPane name="待提交" label="待提交"></TabPane>
      <TabPane  name="草稿" label="草稿"></TabPane>
    </Tabs>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="学期：" prop="meta.term" v-role ="['管理员']">
        <Select v-model="query.meta.term" style="width:200px" clearable	>
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>

      <FormItem label="组别：" prop="meta.guider_group">
        <Select v-model="query.meta.guider_group" style="width:200px" 	>
          <Option v-for="item in groups" :value="item.group_name" :key="item.group_name">{{ item.group_name }}</Option>
        </Select>
      </FormItem>

      <FormItem label="问卷名字：" prop="bind_meta_name" clearable	>
        <Input style="width: 180px" v-model="query.bind_meta_name" ></Input>
      </FormItem>
      <FormItem label="上课教师：" prop="meta.lesson.lesson_teacher_name" clearable	>
        <Input style="width: 180px" v-model="query.meta.lesson.lesson_teacher_name" ></Input>
      </FormItem>
      <FormItem label="听课督导：" prop="meta.guider_name" clearable	>
        <Input  style="width: 180px" v-model="query.meta.guider_name"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" style="margin-left: 20px;width: 80px" @click=" onSearch">查询</Button>
      </FormItem>
      <Button @click="export_option_visible=true" icon="ios-cloud-download-outline" type="primary" label="导出" v-role="['管理员','小组长']">导出</Button>
    </Form>
    <FormExportChoose :show="export_option_visible" @onConfirm="onExportExcel" @onCancel="()=>{ this.export_option_visible=false}"></FormExportChoose>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
        </div>
    </div>
  </Card>
</template>

<script>
import { queryForms, putForm, exporFormsExcel, deleteForm } from '../../service/api/dqs'
import { updateWithinField } from 'Libs/tools'
import { getCurrentTerms, queryTerms } from '@/service/api/term'
import { queryGroups } from '@/service/api/user'
import FormExportChoose from './components/form_export_choose'
import UserMixin from '@/mixins/UserMixin.js'

export default {
  components: { FormExportChoose },
  mixins: [UserMixin],
  data: function () {
    return {
      query: {
        bind_meta_name: undefined,
        meta: {
          create_by: undefined,
          guider_group:undefined,
          lesson: {
            lesson_teacher_name: undefined
          }
        },
        status: undefined,

      },
      total: 0,
      terms: [],
      groups: [],
      export_option_visible: false,
      mate_name: '',
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
          title: '更新时间',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.updated_at }</span>
            )
          }
        },
        {
          title: '状态',
          width: '100px',
          render: (h, params) => {
            if (params.row.status === '待提交') {
              return h('Tag', { props: { color: 'red' } }, params.row.status)
            } else if (params.row.status === '已完成') {
              return h('Tag', { props: { color: 'blue' } }, params.row.status)
            } else {
              return h('Tag', {}, params.row.status)
            }
          }
        },
        {
          title: '操作',
          align: 'center',
          width: '200px',
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
                    const {href}=this.$router.resolve({
                      path: `/dqs/form_show/${params.row._id}`
                    });
                    window.open(href,'_blank')
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: !(params.row.status === '已完成')
                },
                style: {
                  marginRight: '2px'
                },
                directives: [{
                  name: 'role',
                  value: ['管理员']
                }],
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '确认打回问卷?',
                      onOk: () => {
                        this.putBack(params.row)
                      }
                    })
                  }
                }
              }, '打回'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: (params.row.status === '已完成')
                },
                style: {
                  marginRight: '4px'
                },
                directives: [{
                  name: 'role',
                  value: ['管理员']
                }],
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '确认删除问卷?',
                      onOk: () => {
                        deleteForm(params.row._id).then((res) => {
                          this.fetchData()
                          if (res.data.code === 200) {
                            this.$Message.success('删除成功！')
                          } else {
                            this.$Message.error('删除失败！')
                          }
                        })
                      }
                    })
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data: []
    }
  },
  methods: {
    putBack (form) {
      putForm(form._id, {
        status: '待提交'
      }).then(() => {
        this.pages._page = 1
        this.fetchData()
      })
    },
    onTabClick: function (name) {
      if (name === '全部') {
        this.query.status = undefined
      } else {
        this.query.status = name
      }
      this.pages._page = 1
      this.fetchData()
    },
    fetchData () {
      // 数据表发生变化请求数据
      let args = { ...this.query, ...this.pages }
      return queryForms(args).then((resp) => {
        this.data = resp.data.forms
        this.total = resp.data.total
      })
    },
    onPageChange (page) {
      // 分页变化
      this.pages._page = page
      this.fetchData()
    },
    onSearch () {
      // 查询变化 当点提交查询条件生效
      this.pages._page = 1
      this.fetchData()
    },
    onExportExcel: function (form_choose) {
      if(this.current_role==='小组长'){
        this.query.meta.guider_group=this.userInfo.userInfo.guider.group_name
      }
      exporFormsExcel({
        'meta.term': this.query.meta.term,
        'bind_meta_name': form_choose,
        'status': '已完成',
        'meta.guider_group':this.query.meta.guider_group
      }).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({ content: '导出成功' })
          window.open('/api/' + resp.data.filename)
        }
      })
      this.export_option_visible = false
    }
  },
  mounted: function () {
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })
    queryGroups().then((resp) => {
      this.groups = resp.data.groups
    })
    getCurrentTerms().then((termResp) => {
      this.query.meta.term = termResp.data.term.name
      queryForms({ ...this.pages, ...this.query }).then((resp) => {
        this.data = resp.data.forms
        this.total = resp.data.total
      })
    })
  }
}
</script>

<style scoped>

</style>
