<template>
<div>
  <Card>
    <h1>教师学分详情</h1>
    <br>
    <Form inline :label-width="80">
      <FormItem label="教师姓名：" >
        <Select v-model="query.username" style="width: 200px" clearable>
          <Option v-for="item in users" :value="item.username" :key="item.username">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="onSearch">查询</Button>
      </FormItem>
    </Form>
    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page"
              @on-change="onPageChange"></Page>
      </div>
    </div>
  </Card>
</div>
</template>

<script>
import { queryUsersScore} from '../../service/api/actives'
import {queryUsers} from "@/service/api/user";

export default {
name: "index",
  data(){
  return{
    data:[],
    users: [],
    query: {
      username: undefined,
    },
    pages: {
      _page: 1,
      _per_page: 10
    }, // 分页
    total: 0,

    columns:[
      {
        title: '教师工号',
        align: 'center',
        render: function (h, params) {
          return (
            <span>{ params.row.username }</span>
          )
        }
      },
      {
        title: '教师姓名',
        align: 'center',
        render: function (h, params) {
          return (
            <span>{ params.row.user.name }</span>
          )
        }
      },
      {
        title: '教师学院',
        align: 'center',
        render: function (h, params) {
          return (
            <span>{ params.row.user.unit }</span>
          )
        }
      },
      {
        title: '工作时间',
        align: 'center',
        render: function (h, params) {
          return (
            <span>{ params.row.worktime }</span>
          )
        }
      },
      {
        title: '已修学分',
        align: 'center',
        render: function (h, params) {
          return (
            <span>{ params.row.score }</span>
          )
        }
      },
      {
        title: '联系方式',
        align: 'center',
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
    fetchData(){
       return queryUsersScore({ ...this.query, ...this.pages }).then((resp) => {
         this.data = resp.data.users_score
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
  },
  mounted() {
    queryUsers().then((resp) => {
      this.users = resp.data.users
    })

  },
  created() {
    this.fetchData()
  }

}
</script>

<style scoped>

</style>
