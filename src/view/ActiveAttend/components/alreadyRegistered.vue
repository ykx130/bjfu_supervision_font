<template>
  <div>
    <h1>已完成培训</h1>
    <br>
<!--    <Form :label-width="80" :model="query" inline>-->
<!--      <FormItem label="活动名称：" prop="title">-->
<!--        <Input v-model="query.title"-->
<!--               style="width:180px"></Input>-->
<!--      </FormItem>-->
<!--      <FormItem label="学期：" prop="term">-->
<!--        <Select v-model="query.term" style="width:200px">-->
<!--          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>-->
<!--        </Select>-->
<!--      </FormItem>-->
<!--      <FormItem>-->
<!--        <Button type="primary" @click=" onSearch">查询</Button>-->
<!--      </FormItem>-->
<!--    </Form>-->

    <ActivesAddModal
      :modal="showActiveAddModal"
      @onOK="onAddModalOK"
      @onCancel="onAddModalCancel">
    </ActivesAddModal>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page"
              @on-change="onPageChange"></Page>
      </div>
    </div>
    <float_bar>
      <Button type="primary" @click="showActiveAddModal=true">新增</Button>
    </float_bar>
  </div>

</template>

<script>
import { deleteActive, postActive, postActiveUser, queryActives, queryActivityUsers, queryCurrentuserActives } from '../../../service/api/actives'
import { queryTerms, getCurrentTerms } from '../../../service/api/term'
import ActivesAddModal from 'Views/DevelopTrainManage/components/ActivesAddModal'
import ActivesUserModifyModal from 'Views/ActiveDetail/components/ActivesUserModifyModal'
import float_bar from '_c/float_bar/float_bar'
import { currentUser } from '@/service/api/user'
export default {
  name: 'alreadyRegistered',
  components: { float_bar, ActivesAddModal, ActivesUserModifyModal },
  data: function () {
    return {
      query: {
        state: 'hasAttended',
        term: undefined,
        username: undefined,
        activity_type: '培训'
      }, // 查询用的参数
      showActiveAddModal: false,
      total: 0, // 总数量
      // data: [{
      //   activity: {},
      //   activity_user:{}
      // }], // 数据

      data: [],
      fin_state: '',
      terms: [],
      id: Number,
      activityName: [],
      selected_activity_title: '', // 选中编辑的课程ids
      pages: {
        _page: 1,
        _per_page: 10
      }, // 分页
      columns: [
        {
          title: '题目',
          render: function (h, params) {
            return (
              <span>{params.row.activity.title}</span>
            )
          }
        },
        {
          title: '主讲人',
          render: function (h, params) {
            return (
              <span>{params.row.activity.presenter} </span>
            )
          }
        },
        {
          title: '所属模块',
          render: function (h, params) {
            return (
              <span>{params.row.activity.module}</span>
            )
          }
        },
        {
          title: '培训时间',
          width: '200px',
          render: function (h, params) {
            return (
              <span>{params.row.activity.start_time}</span>
            )
          }
        },
        {
          title: '培训地点',
          render: function (h, params) {
            return (
              <span>{params.row.activity.place}</span>
            )
          }
        },
        {
          title: '学时',
          render: function (h, params) {
            return (
              <span>{params.row.activity.period}</span>
            )
          }
        },
        {
          title: '主办单位',
          render: function (h, params) {
            return (
              <span>{params.row.activity.organizer}</span>
            )
          }
        },
        {
          title: '是否新进教师必修',
          width: '150px',
          render: function (h, params) {
            if (params.row.activity.is_obligatory === false) {
              return h('Tag', { props: { color: 'blue' } }, '非必修')
            } else {
              return h('Tag', { props: { color: 'red' } }, '必修')
            }
          }
        },
        {
          title: '报名状态',
          render: function (h, params) {
            return (
              <span> {params.row.activity_user.state} </span>
            )
          }
        },

        {
          title: '参加状态',
          render: function (h, params) {
            return (
              <span> {params.row.activity_user.fin_state} </span>
            )
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
                  size: 'small',
                  disabled: !(params.row.activity_user.fin_state === '待修改')
                },
                style: {
                  marginRight: '2px'
                },
                on: {
                  click: () => {
                    // this.selected_activity_title = params.row.activity.title
                    // this.showActiveAddModal = true
                  }
                }
              }, '编辑'),

              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: (params.row.activity_user.fin_state === '已完成')
                },
                style: {
                  marginRight: '2px'
                },
                on: {
                  click: () => {
                    if (params.row.activity_user.fin_state === '待审核') {
                      deleteActive(params.row.activity.id).then(() => {
                        this.$Message.success('删除成功！')
                        this.fetchData()
                      })
                    }
                  }
                }
              }, '删除')
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
      return queryCurrentuserActives({ ...this.query, ...this.pages }).then((resp) => {
        this.data = resp.data.activities
        this.total = resp.data.total
        // this.data.forEach((activity) => {
        //   this.activityName.push(activity.title)
        // })
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
      queryCurrentuserActives({ name_like: value }).then((resp) => {
        this.activityName.splice(0, this.activityName.length)
        resp.data.activities.forEach((activity) => {
          this.activityName.push(activity.title)
        })
      })
    },
    onAddModalOK (activity) {
      activity.apply_state = '待审核活动'
      postActive(activity).then((resp) => {
        queryActives({ 'title': activity.title }).then((newresp) => {
          this.activity_id = newresp.data.activities[0].id
          currentUser().then((usrresp) => {
            postActiveUser(this.activity_id, {
              username: usrresp.data.current_user.username,
              fin_state: '待审核',
              state: '已报名',
              activity_type: '培训'
            }).then((esp) => {
              if (esp.data.code === 200) {
                this.$Message.success({ content: '培训项目添加成功' })

                this.fetchData()
              }
            })
          })
          this.showActiveAddModal = false
        })
      })
    },
    onAddModalCancel () {
      this.showActiveAddModal = false
    },
    onModifyModalOK () {
      this.showActiveModifyModal = false
      this.fetchData()
    },
    onModifyModalCancel () {
      this.showActiveModifyModal = false
    }
  },
  mounted: function () {
    this.query.state = 'hasAttended'
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
      getCurrentTerms().then((termResp) => {
        this.query.term = termResp.data.term.name
        queryCurrentuserActives({ ...this.query, ...this.pages }).then((resp) => {
          this.data = resp.data.activities
          this.total = resp.data.total
          this.fetchData()
        })
      })
    })
  }
}
</script>

<style scoped>

</style>
