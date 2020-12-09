<template>
  <div>
    <h1>已完成培训</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="活动名称：" prop="activity">
        <AutoComplete v-model="query.name_like" :data="activityName"
                      style="width:180px"
                      @on-search="handleSearchActivateName"></AutoComplete>
      </FormItem>
      <FormItem label="学期：" :prop="'activity.term'" v-role="['管理员']">
        <Select v-model="query.term" style="width:200px">
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click=" onSearch">查询</Button>
      </FormItem>
    </Form>

    <ActivesAddModal
      :modal="showActiveAddModal"
      :id="id"
      @onOK="onAddModalOK"
      @onCancel="onAddModalCancel">
    </ActivesAddModal>
    <ActivesUserModifyModal
      :modal="showActiveModifyModal"
      @onOK="onModifyModalOK"
      @onCancel="onModifyModalCancel"
      :id="selected_activity_id">
    </ActivesUserModifyModal>

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
import {deleteActive, postActive, queryCurrentuserActives} from '../../../service/api/actives'
import { queryTerms, getCurrentTerms } from '../../../service/api/term'
import ActivesAddModal from 'Views/ActiveManager/components/ActivesAddModal'
import ActivesUserModifyModal from "Views/ActiveDetail/components/ActivesUserModifyModal";
export default {
  name: 'alreadyRegistered',
  components: { ActivesAddModal, ActivesUserModifyModal },
  data: function () {
    return {
      query: {
        state: 'hasAttended',
        term: undefined
      }, // 查询用的参数
      showActiveAddModal: false,
      showActiveModifyModal: false,
      total: 0, // 总数量
      data: [{
        activity: {},
        activity_user: {}
      }], // 数据
      terms: [],
      id: Number,
      activityName: [],
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
              < span > {params.row.activity.title} < /span>
            )
          }
        },
        {
          title: '主讲人',
          render: function (h, params) {
            return (
              < span > {params.row.activity.presenter} < /span>
            )
          }
        },
        {
          title: '所属模块',
          render: function (h, params) {
            return (
              < span > {params.row.activity.module} < /span>
            )
          }
        },
        {
          title: '培训时间',
          render: function (h, params) {
            return (
              < span > {params.row.activity.start_time} < /span>
            )
          }
        },
        {
          title: '培训地点',
          render: function (h, params) {
            return (
              < span > {params.row.activity.place} < /span>
            )
          }
        },
        {
          title: '学时',
          render: function (h, params) {
            return (
              < span > {params.row.activity.period} < /span>
            )
          }
        },
        {
          title: '主办单位',
          render: function (h, params) {
            return (
              < span > {params.row.activity.organizer} < /span>
            )
          }
        },
        {
          title: '是否必修',
          render: function (h, params) {
            if (params.row.activity.is_obligatory === false) {
              return h('Tag', { props: { color: 'grey' } }, '非必修')
            } else {
              return h('Tag', { props: { color: 'red' } }, '必修')
            }
          }
        },
        {
          title: '报名状态',
          render: function (h, params) {
            return (
              < span > {params.row.activity_user.state} < /span>
            )
          }
        },
          {
            title: '参加状态',
            render: function (h, params) {
            return (
            < span > {params.row.activity_user.fin_state} < /span>
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
            disabled: !(params.row.activity_user.fin_state === '待审核')
          },
            style: {
            marginRight: '2px'
          },
            on: {
            click: () => {
              this.selected_activity_id = params.row.activity.id
              this.showActiveModifyModal = true
          }
          }
          }, '编辑'),
            h('Button', {
            props: {
            type: 'error',
            size: 'small',
            disabled: !(params.row.activity.apply_state === '待提交')
          },
            style: {
            marginRight: '2px'
          },

            on: {
            click: () => {
            deleteActive(params.row.activity.id).then(() => {
            this.$Message.success('删除成功！')
            this.fetchData()
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
        this.data.forEach((activity) => {
          this.activityName.push(activity.title)
        })
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
          this.activityName.push(activity.name)
        })
      })
    },
    onAddModalOK (activity) {
      postActive(activity).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({ content: '培训项目添加成功' })
          this.fetchData()
        }
        this.showActiveAddModal = false
      })
    },
    onAddModalCancel () {
      this.showActiveAddModal = false
    },
    onModifyModalOK(){
      this.showActiveModifyModal = false
      this.fetchData()
    },
    onModifyModalCancel(){
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
