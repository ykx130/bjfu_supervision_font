<template>
  <div>
    <h1>培训报名</h1>
    <br>
    <Form :model="query" inline>
      <FormItem>
        <Alert>提醒：{{current_user.name}} 老师，您好！今年您需要修 {{user_plan_data.require_score}} 学分，
          当前您已修得 {{user_plan_data.user_score}} 学分</Alert>
      </FormItem>
      <FormItem :label-width="40">
        <Button type="primary" @click="showDownloadPlanModal=true">下载研修计划附件</Button>
      </FormItem>

    </Form>

    <DownloadPlanModal
      :show="showDownloadPlanModal"
      @onOK="onshowPlanModalOK"
      @onCancel="onshowPlanModalCancel">
    </DownloadPlanModal>

    <AddPhoneModal
      :show="showAddPhoneModal"
      @onOK="onshowPhoneModalOK"
      @onCancel="onshowPhoneModalCancel"
    :user="current_user">
    </AddPhoneModal>
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
import {
  queryCurrentuserActives,
  postCurrentActiveUser,
  queryActives,
  queryUserPlan,
  downloadActivityFiles
} from '../../../service/api/actives'
import { queryTerms, getCurrentTerms } from '../../../service/api/term'
import { updateWithinField } from 'Libs/tools'
import { currentUser,putUser } from '@/service/api/user'
import DownloadPlanModal from 'Views/ActiveAttend/components/DownloadPlanModal'
import AddPhoneModal from "Views/ActiveAttend/components/AddPhoneModal";
export default {
  name: 'canRegister',
  components: { DownloadPlanModal,AddPhoneModal},
  data: function () {
    return {
      query: {
        state: 'canAttend',
        term: undefined
      }, // 查询用的参数
      showDownloadPlanModal: false,
      showAddPhoneModal:false,
      user_plan_data: {
        user_score: '',
        require_score: ''
      },

      current_user:{},
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
              <span> {params.row.activity.title}</span>
            )
          }
        },
        {
          title: '主讲人',
          render: function (h, params) {
            return (
              <span> {params.row.activity.presenter}</span>
            )
          }
        },
        {
          title: '所属模块',
          render: function (h, params) {
            return (
              <span> {params.row.activity.module} </span>
            )
          }
        },
        {
          title: '培训时间',
          width: '200px',
          render: function (h, params) {
            return (
              <span> {params.row.activity.start_time} </span>
            )
          }
        },
        {
          title: '培训地点',
          render: function (h, params) {
            return (
              <span> {params.row.activity.place} </span>
            )
          }
        },
        {
          title: '学时',
          render: function (h, params) {
            return (
              <span> {params.row.activity.period} </span>
            )
          }
        },
        {
          title: '主办单位',
          render: function (h, params) {
            return (
              <span> {params.row.activity.organizer} </span>
            )
          }
        },
        {
          title: '是否新进教师必修',
          render: function (h, params) {
            if (params.row.activity.is_obligatory === false) {
              return h('Tag', { props: { color: 'blue' } }, '非必修')
            } else {
              return h('Tag', { props: { color: 'red' } }, '必修')
            }
          }
        },
        {
          title: '活动详情附件',
          render: (h, params)=>{
            return h('div',[
              h('a',{
                on:{
                  click:()=>{
                    this.downloadFile(params.row.activity.path)
            }
                }
              },params.row.activity.path)
            ])
          }
        },
        {
          title: '状态',
          render: function (h, params) {
            return (
              <span> {params.row.activity.apply_state} </span>
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
                  disabled: (params.row.activity.apply_state === '活动已结束')
                },
                style: {
                  marginRight: '2px'
                },
                directives: [{
                  name: 'role',
                  value: ['教师']
                }],
                on: {
                  click: () => {
                    this.selected_activity_id = params.row.activity.id
                    this.$Modal.confirm({
                      title: '参加活动',
                      content: '是否参加活动?',
                      onOk: () =>{
                        if(this.current_user.phone===''){
                          this.showAddPhoneModal=true
                        }else {
                        return postCurrentActiveUser(params.row.activity.id).then((resp) => {
                              if (resp.data.code === 200) {
                                this.$Message.success({ content: '报名成功' })
                              }
                              return this.fetchData()
                            })
                      }}
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
      return queryCurrentuserActives(args).then((resp) => {
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
      queryActives({ title: value }).then((resp) => {
        this.activityName.splice(0, this.activityName.length)
        resp.data.activities.forEach((activity) => {
          this.activityName.push(activity.title)
        })
      })
    },
    onshowPlanModalOK () {
      this.showDownloadPlanModal = false
    },
    onshowPlanModalCancel () {
      this.showDownloadPlanModal = false
    },

    onshowPhoneModalOK(newuser,valid){
      if(valid) {

        putUser(newuser).then((ures)=>{
          postCurrentActiveUser(this.selected_activity_id).then((res)=>{
            if(ures.data.code===200&&res.data.code===200){
              this.$Message.success({ content: '报名成功' })
            }
            this.selected_activity_id=''
            return this.fetchData()
          })
        })
      }
      this.showAddPhoneModal=false
    },
    onshowPhoneModalCancel(){
      this.showAddPhoneModal=false
    },


    downloadFile: function (path) {
      if(path!==''){
        this.$Message.success({content:'下载成功'})
        window.open('/api/static/' + path)
      }
    }
  },
  created () {
    currentUser().then((userResp) => {
      this.current_user=userResp.data.current_user
      queryUserPlan(this.current_user.username).then((Resp) => {
        this.user_plan_data = Resp.data.user_plan_data
      })
    })
  },
  mounted: function () {
    this.query.state = 'canAttend'
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
      getCurrentTerms().then((termResp) => {
        this.query.term = termResp.data.term.name
        queryCurrentuserActives({ ...this.query, ...this.pages }).then((resp) => {
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
