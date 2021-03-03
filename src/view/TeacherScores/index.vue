<template>
<div>
  <Card>
    <h1>教师学分详情</h1>
    <br>
    <Table border stripe :columns="columns" :data="data"></Table>
  </Card>
</div>
</template>

<script>
import {queryUsersScore} from '../../service/api/actives'
export default {
name: "index",
  data(){
  return{
    data:[],
    user:{
    },

    columns:[
      {
        title: '教师学院',
        render: function (h, params) {
          return (
            <span>{ params.row.user.unit }</span>
          )
        }
      },
      {
        title: '教师工号',
        render: function (h, params) {
          return (
            <span>{ params.row.username }</span>
          )
        }
      },
      {
        title: '教师姓名',
        render: function (h, params) {
          return (
            <span>{ params.row.user.name }</span>
          )
        }
      },
      {
        title: '工作时间',
        render: function (h, params) {
          return (
            <span>{ params.row.worktime }</span>
          )
        }
      },
      {
        title: '已修学分',
        render: function (h, params) {
          return (
            <span>{ params.row.score }</span>
          )
        }
      },
      {
        title: '联系方式',
        render: function (h, params) {
          return (
            <span>{ params.row.user.phone }</span>
          )
        }
      },
    ]

  }
  },
  methods:{

  },
  created() {
  queryUsersScore().then((resp)=>{
    this.data=resp.data.users_score
  })
  }

}
</script>

<style scoped>

</style>
