<template>
  <Card>
    <Table :show-header="true" :data="data" :columns="columns"></Table>

  </Card>
</template>

<script>
import {deleteActiveUser, queryActivityUsers} from "@/service/api/actives";


export default {
name: "CompetitionUsers",
  props: {
    competition_id: Number,
    term:String
  },
  data:function (){
  return{
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
            <span>{ params.row.fin_state }</span>
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
                  deleteActiveUser({activity_id:params.row.activity_id,username:params.row.user.username,activity_type:'比赛'}).then(()=>{
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

  methods:{
  fetchData(){

    return queryActivityUsers({activity_id:this.competition_id,activity_type:'比赛'}).then((resp) => {
      //this.selected_usernames=[]
      this.data = resp.data.activity_users
      this.total = resp.data.total
    })
  }
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
