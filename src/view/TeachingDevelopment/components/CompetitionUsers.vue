<template>
  <Card>
    <Table :show-header="true" :data="data" :columns="columns"></Table>
    <TeacherCompetitionProfile
      :show="showTeacherCompetitionProfile"
      :active_user="selected_active_user"
      @onOK="onCompetitionProfileOK"
      @onCancel="onCompetitionProfileCancel">
    </TeacherCompetitionProfile>

    <AddCompetitionUserModal
      :show="showAddCompetitionUser"
      :active_user="active_user_profile"
      :title_code=2
      @onCancel="onUpdateCompetitionUserCancel"
      @onOK="onUpdateCompetitionUserOK">
    </AddCompetitionUserModal>
  </Card>
</template>

<script>
import {deleteActiveUser, postActiveUser, putActiveUser, queryActivityUsers} from "@/service/api/actives";
import TeacherCompetitionProfile from "Views/TeacherDevelopDetail/components/ActivityProfile/TeacherCompetitionProfile";
import AddCompetitionUserModal from "Views/TeacherDevelopDetail/components/AddCompetitionUserModal";


export default {
name: "CompetitionUsers",
  components: {AddCompetitionUserModal, TeacherCompetitionProfile},
  props: {
    competition_id: Number,
    term:String
  },
  data:function (){
  return{
    showAddCompetitionUser: false,
    showTeacherCompetitionProfile: false,
    selected_active_user: {},
    active_user_profile: {},
    data:[],
    selected_username: '',
    selected_usernames: [],
    columns: [
      {
        title: '教师姓名',
        render: function (h, params) {
          return (
            <span>{ params.row.user.name }</span>
          )
        }
      },
      {
        title: '教师学院',
        render: function (h, params) {
          return (
            <span>{ params.row.user_unit }</span>
          )
        }
      },
      {
        title: '比赛名次',
        render: function (h, params) {
          return (
            <span>{ params.row.state }</span>
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
                disabled: !(params.row.activity.create_by=== true)
              },
              style: {
                marginRight: '2px'
              },
              on: {
                click: () => {
                  deleteActiveUser({activity_id:params.row.activity_id,username:params.row.user.username,activity_type:'比赛'}).then(()=>{
                    this.$Message.success('删除成功！')
                    this.fetchData()
                  })
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
                  if(params.row.activity.create_by===false){
                    this.selected_active_user=params.row
                    this.showTeacherCompetitionProfile=true
                  }else {
                    this.active_user_profile = params.row
                    this.showAddCompetitionUser = true
                  }
                }
              }
            }, '查看'),
            h('Button', {
              props: {
                type: 'success',
                size: 'small',
                disabled: !(params.row.fin_state==='待审核')
              },
              style: {
                marginRight: '2px'
              },
              on: {
                click: () => {
                  this.pass(params.row)
                }
              }
            }, '通过'),
            h('Button', {
              props: {
                type: 'warning',
                size: 'small',
                disabled: !(params.row.fin_state==='待审核')
              },
              style: {
                marginRight: '2px'
              },
              on: {
                click: () => {
                  this.back(params.row)
                }
              }
            }, '打回')
          ])
        }
      }
    ]
  }
  },

  methods:{
  fetchData(){

    return queryActivityUsers({activity_id:this.competition_id,activity_type:'比赛'}).then((resp) => {
      //this.selected_usernames=[]
      this.data = resp.data.activity_users
      this.total = resp.data.total
    })
  },
    onCompetitionProfileOK(active_user){
      console.log(active_user)
      this.showTeacherCompetitionProfile = false
    },
    onCompetitionProfileCancel(){
      this.showTeacherCompetitionProfile = false
    },
    pass(active_user){
      this.activity_id=active_user.activity_id
      let new_data = {
        fin_state: '已完成',
        activity_type: '比赛',
        activity_id: active_user.activity_id,
        username: active_user.username
      }
      putActiveUser(this.activity_id, new_data).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({content: '审核通过成功'})
          this.fetchData()
        }
      })
    },
    back(active_user){
      this.activity_id=active_user.activity_id
      let new_data = {
        fin_state: '待修改',
        activity_type: '比赛',
        activity_id: active_user.activity_id,
        username: active_user.username
      }
      putActiveUser(this.activity_id, new_data).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({content: '打回成功'})
          this.fetchData()
        }
      })
    },
    onUpdateCompetitionUserOK: function (active_user) {
      this.activity_id = active_user.activity_id
      putActiveUser(this.activity_id, active_user).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({content: '修改成功'})
          this.fetchData()
        }
      })
      this.showAddCompetitionUser = false
    },
    onUpdateCompetitionUserCancel: function () {
      this.showAddCompetitionUser = false
    },
  },
  created() {
    queryActivityUsers({activity_id:this.competition_id,activity_type:'比赛'}).then((resp)=>{
      this.data=resp.data.activity_users
    })
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
