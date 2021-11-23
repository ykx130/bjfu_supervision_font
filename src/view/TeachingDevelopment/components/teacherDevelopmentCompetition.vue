<template>
  <div>
    <h1>教师教学发展比赛</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="名称查询：">
        <Input v-model="query.activity_title_like" style="width: 160px;"></Input>
      </FormItem>
      <FormItem label="状态：" prop="fin_state" >
        <Select v-model="query.fin_state" clearable style="width:120px">
          <Option v-for="item in fin_stateList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click=" onSearch">查询</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="showTeacherCompetitionAddModal=true">新增</Button>
      </FormItem>
    </Form>
    <TeacherAddCompetitionModal
      :show="showTeacherCompetitionAddModal"
      @onOK="onAddCompetitionOK"
      @onCancel="onAddCompetitionCancel">
    </TeacherAddCompetitionModal>
    <TeacherCompetitionProfile
    :show="showTeacherCompetitionProfile"
    :active_user="selected_active_user"
    :title_code="1"
    @onOK="onCompetitionProfileOK"
    @onCancel="onCompetitionProfileCancel">
    </TeacherCompetitionProfile>
    <TeacherCompetitionProfile
      :show="showUpdateTeacherCompetition"
      :active_user="update_active_user"
      :title_code="2"
      @onOK="onUpdateCompetitionOK"
      @onCancel="onUpdateCompetitionCancel">
    </TeacherCompetitionProfile>

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
  import {currentUser} from "@/service/api/user";
  import {
    deleteActiveUser,
    deleteCompetition, postActiveUser,
    postCompetition, putActiveUser, putCompetition,
    queryActivityUsers,
    queryCompetition
  } from "@/service/api/actives";
  import TeacherAddCompetitionModal
    from "Views/TeacherDevelopDetail/components/ActivityProfile/TeacherAddCompetitionModal";
  import TeacherCompetitionProfile
    from "Views/TeacherDevelopDetail/components/ActivityProfile/TeacherCompetitionProfile";
  import UserMixin from "@/mixins/UserMixin";

  export default {
    name: 'teacherDevelopmentCompetition',
    components: {TeacherCompetitionProfile, TeacherAddCompetitionModal},
    mixins: [UserMixin],
    data () {
      return {
        selected_active_user: {},
        update_active_user: {},
        showTeacherCompetitionAddModal: false,
        showTeacherCompetitionProfile: false,
        showUpdateTeacherCompetition: false,
        query: {
          activity_type:'比赛',
          activity_title_like:'',
          fin_state: '',
        },
        fin_stateList: ['已完成','待审核','待修改'],
        total:0,
        data:[],
        pages: {
          _page: 1,
          _per_page:10
        }, // 分页
        columns: [
          {
            title: '奖项名称',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.award_name }</span>
              )
            }
          },
          {
            title: '级别',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.level }</span>
              )
            }
          },
          {
            title: '获奖时间',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity_time }</span>
            )
            }
          },
          {
            title: '主办单位',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.organizer}</span>
            )
            }
          },
          {
            title: '比赛名次',
            align: 'center',
            render: (h, params) => {
              return(
                <span>{params.row.state}</span>
            )
            }
          },
          {
            title: '学期',
            align: 'center',
            render: (h, params) => {
              return(
                <span>{params.row.activity.term}</span>
            )

            }
          },
          {
            title: '状态',
            align: 'center',
            key:'fin_state',
            render: (h, params) => {
              if (params.row.fin_state === '待审核') {
                return h('Tag', {props: {color: 'red'}}, params.row.fin_state)
              } else if (params.row.fin_state === '已完成') {
                return h('Tag', {props: {color: 'blue'}}, params.row.fin_state)
              }else
                return h('Tag',{},params.row.fin_state)
            }
          },
          {
            title: '操作',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    disabled: !(params.row.fin_state === '待审核')
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      deleteActiveUser({activity_id:params.row.activity_id,
                        username:params.row.user.username,activity_type:'比赛'}).then((resp1=>{
                          deleteCompetition(params.row.activity_id).then((resp2=>{
                            if(resp1.data.code === 200 && resp2.data.code === 200){
                              this.$Message.success('删除成功')
                              this.fetchData()
                            }else {
                              this.$Message.error('删除失败')
                            }
                          }))
                      }))
                    }
                  }
                }, '删除'),
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
                      this.selected_active_user = params.row
                      this.showTeacherCompetitionProfile = true
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                    disabled: !(params.row.fin_state === '待修改')
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.update_active_user = params.row
                      this.showUpdateTeacherCompetition = true
                    }
                  }
                }, '修改')
              ])
            }
          }
        ]
      }
    },
    methods: {
      fetchData () {
        // 数据表发生变化请求数据---当前用户
        this.query.username=this.userInfo.userInfo.username
        let args = { ...this.query, ...this.pages }
        return queryActivityUsers(args).then((resp) => {
          this.data = resp.data.activity_users
          this.total = resp.data.total
        })
      },
      onPageChange (page) {
        // 分页变化
        this.pages._page = page
        this.fetchData()
      },
      onAddCompetitionOK(competition,competition_user){
        console.log(competition,competition_user)
        postCompetition(competition).then((resp=>{
          if(resp.data.code === 200){
            queryCompetition(competition).then(resp1=>{
              if(resp1.data.code === 200 && resp1.data.total!==0){
                let id = resp1.data.competitions[0].id
                postActiveUser(id,competition_user).then((resp2=>{
                  if(resp2.data.code === 200){
                    this.$Message.success('成功')
                    this.fetchData()
                  }else {
                    this.$Message.error('失败')
                  }
                }))
              }else {
                this.$Message.error('失败')
              }
            })
          }else {
            this.$Message.error('失败')
          }
        }))
        this.showTeacherCompetitionAddModal = false
      },
      onAddCompetitionCancel(){
        this.showTeacherCompetitionAddModal = false
      },
      onCompetitionProfileOK(active_user){
        console.log(active_user)

        this.showTeacherCompetitionProfile = false
      },
      onCompetitionProfileCancel(){
        this.showTeacherCompetitionProfile = false
      },
      onUpdateCompetitionOK(data){
        let new_data = {
          username: data.username,
          fin_state: '待审核',
          activity_type: '比赛',
          activity_id: data.activity_id,
          state: data.state,
        }
        putCompetition(data.activity_id,data.activity).then((res1=>{
          putActiveUser(data.activity_id,new_data).then((res2=>{
            if(res1.data.code === 200 && res2.data.code === 200){
              this.$Message.success('修改成功')
              this.fetchData()
            }else {
              this.$Message.error('失败')
            }
          }))
        }))
        this.showUpdateTeacherCompetition = false
      },
      onUpdateCompetitionCancel(){
        this.showUpdateTeacherCompetition = false
      },
      onSearch () {
        this.pages._page = 1
        this.fetchData()
      }
    },
    mounted:function () {
     this.fetchData()
    }
  }
</script>

<style scoped>

</style>
