<template>
  <div>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="教师：" prop="user.name">
        <Input style="width: 180px" v-model="query.user.name" placeholder="请输入教师姓名" ></Input>
      </FormItem>
      <FormItem label="状态：" prop="fin_state" >
        <Select v-model="query.fin_state" style="width:200px" clearable>
          <Option v-for="item in activity_statuss" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>


      <FormItem>
        <Button type="primary" @click="onSearch">查询</Button>
      </FormItem>
    </Form>
    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
      </div>
    </div>
  </div>
</template>

<script>


  import {putActiveUser, queryActivityUsers} from "@/service/api/actives";
  import {queryUsers} from "@/service/api/user";
  import {State} from "Views/TeacherDevelopDetail/marcos";
  export default {
    name: "DevelopmentExchangeTable",

    data:function () {
      return{

        query:{
          activity_id:undefined,
          fin_state:undefined,
          user:{
            name:undefined,
            username:undefined
          }
        },

        activity_statuss:State,
        data:[],
        activity_type:'交流',
        total:0,
        pages: {
          _page: 1,
          _per_page: 10
        }, // 分页

        columns: [
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
            title: '交流时间',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.start_time }</span>
            )
            }
          },
          {
            title: '受邀高校',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.invited_university}</span>
            )
            }
          },
          {
            title: '交流题目',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.title }</span>
            )
            }
          },
          {
            title: '参与人数',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.number }</span>
            )
            }
          },

          {
            title: '学期',
            align: 'center',
            width: '170px',
            render: function (h, params) {
              return (
                <span>{params.row.activity.term}</span>
            )
            }
          },

          {
            title: '状态',
            align: 'center',
            render: (h, params) => {
              if (params.row.fin_state === '待审核') {
                return h('Tag', { props: { color: 'red' } }, params.row.fin_state)
              } else {
                return h('Tag', { props: { color: 'blue' } }, params.row.fin_state)
              }
            }
          },
          {
            title: '操作',
            align: 'center',
            width: '170px',
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

                    }
                  }
                }, '查看'),


                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    disabled: !(params.row.fin_state === '待审核')
                  },
                  style: {
                    marginRight: '2px'
                  },
                  directives: [{
                    name: 'role',
                    value: ['教发管理员']
                  }],


                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '确认打回此活动?',
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
                    disabled: !(params.row. fin_state=== '待审核')
                  },
                  style: {
                    marginRight: '4px'
                  },
                  directives: [{
                    name: 'role',
                    value: ['教发管理员']
                  }],


                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '确认审核通过此活动?',
                        onOk: () => {
                          this.pass(params.row)
                        }
                      })
                    }
                  }
                }, '通过')
              ])
            }
          }

        ]
      }
    },

    methods:{
      fetchData(){
        if(this.query.user.name) {
          queryUsers({'name': this.query.user.name}).then((userresp) => {
            this.query.user.username = userresp.data.users[0].username
            queryActivityUsers({
              'username': this.query.user.username,
              'fin_state': this.query.fin_state,
              'activity_type':this.activity_type,
              ...this.pages
            }).then((newresp) => {
              console.log(5555, newresp)
              this.data = newresp.data.activity_users
              this.total = newresp.data.total

            })
          })
        }
        else{
          queryActivityUsers({'activity_type':this.activity_type,...this.query,...this.pages}).then((newresp)=>{

            this.data=newresp.data.activity_users
            this.total=newresp.data.total
          })
        }
      },

      putBack(active_user){
        this.activity_id=active_user.activity_id
        active_user.fin_state='待审核'
        active_user.activity_type='交流'
        putActiveUser(this.activity_id,active_user).then((resp) => {
          if(resp.data.code===200){
            this.$Message.success({content:'已打回'})
            this.pages._page = 1
            this.fetchData()
          }

        })
      },
      pass(active_user){
        this.activity_id=active_user.activity_id
        active_user.fin_state='已完成'
        active_user.activity_type='交流'
        putActiveUser(this.activity_id, active_user).then((resp) => {
          if (resp.data.code === 200) {
            this.$Message.success({content: '审核通过成功'})
            this.fetchData()
          }
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
      queryActivityUsers({'activity_type':this.activity_type,...this.pages}).then((userresp) => {
        this.data = userresp.data.activity_users
        this.total=userresp.data.total
      })
    }
  }
</script>

<style scoped>

</style>
