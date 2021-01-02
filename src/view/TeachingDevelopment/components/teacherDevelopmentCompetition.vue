<template>
  <div>
    <h1>教师教学发展比赛</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="名称查询：" prop="module">
        <AutoComplete v-model="query.name_like" :data="name"
                      style="width:180px"
                      @on-search="handleSearchName"></AutoComplete>
      </FormItem>
      <FormItem label="状态查询：" prop="activity">
        <AutoComplete v-model="query.state_like" :data="stateName"
                      style="width:180px"
                      @on-search="handleSearchStateName"></AutoComplete>
      </FormItem>
      <FormItem>
        <Button type="primary" @click=" onSearch">查询</Button>
      </FormItem>
    </Form>

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
  import {queryActivityUsers} from "@/service/api/actives";

  export default {
    name: 'teacherDevelopmentCompetition',
    data () {
      return {
        query: {
          //name_like: '',
          //state_like: ''
          username:undefined,
          activity_type:'比赛',
          state:'已报名'
        },
        name: [],
        stateName: [],
        total:0,
        data:[],
        pages: {
          _page: 1,
          _per_page: 10
        }, // 分页
        columns: [

          {
            title: '获奖时间',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.start_time }</span>
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
            title: '级别',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.level }</span>
            )
            }
          },
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
            title: '比赛名次',
            align: 'center',
            render: (h, params) => {
              return(
                <span>{params.row.fin_state}</span>
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
          }
        ]
      }
    },
    methods: {
      fetchData () {
        // 数据表发生变化请求数据
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
      handleSearchName () {},
      handleSearchStateName () {},
      onSearch () {}
    },
    mounted:function () {

      currentUser().then((userResp)=>{
        this.query.username=userResp.data.current_user.username
        queryActivityUsers({ ...this.query, ...this.pages }).then((resp) => {
          this.data = resp.data.activity_users
          this.total = resp.data.total
        })
      })
    }
  }
</script>

<style scoped>

</style>
