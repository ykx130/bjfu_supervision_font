<template>
  <div>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="教师：" prop="user.name">
        <Input style="width: 180px" v-model="query.user.name" placeholder="请输入教师姓名" ></Input>
      </FormItem>
      <FormItem label="状态：" prop="activity_status" >
        <Select v-model="query.fin_state" style="width:200px"  clearable>
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

  import {State} from "Views/TeacherDevelopDetail/marcos";
  import {queryUsers} from "@/service/api/user";
  import {putActiveUser, queryActivityUsers} from "@/service/api/actives";

  export default {
    name: "ProjectTable",
    components:{},
    data:function () {
      return{
        query:{
          fin_state:undefined,
          user:{
            name:undefined,
            username:undefined
          }
        },
        showProjectProfileModal:false,
        selected_active_user: {},
        activity_statuss:State,
        data:[],
        total:0,
        activity_type:'项目',
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
            title: '项目名称',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.title }</span>
            )
            }
          },
          {
            title: '级别',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.level}</span>
            )
            }
          },
          {
            title: '上级单位',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.superior_units}</span>
            )
            }
          },
          {
            title: '开始时间',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.start_time }</span>
            )
            }
          },

          {
            title: '结束时间',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.end_time }</span>
            )
            }
          },

          {
            title: '负责人',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.leader }</span>
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
                // h('Button', {
                //   props: {
                //     type: 'primary',
                //     size: 'small'
                //   },
                //   style: {
                //     marginRight: '2px'
                //   },
                //   on: {
                //     click: () => {
                //       this.selected_active_user = params.row
                //       this.showProjectProfileModal = true
                //     }
                //   }
                // }, '查看'),


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
          queryUsers({'name_like': this.query.user.name}).then((userresp) => {
            this.query.user.username = userresp.data.users[0].username
            queryActivityUsers({
              username: this.query.user.username,
              fin_state: this.query.fin_state,
              fin_state_ne: '待修改',
              activity_type:this.activity_type,
              ...this.pages
            }).then((newresp) => {
              this.data = newresp.data.activity_users
              this.total = newresp.data.total

            })
          })
        }
        else{
          queryActivityUsers({activity_type:this.activity_type,
            fine_state:this.query.fin_state,fin_state_ne: '待修改',...this.pages}).then((newresp)=>{
            this.data=newresp.data.activity_users
            this.total=newresp.data.total
          })
        }
      },
      putBack(active_user){
        this.activity_id=active_user.activity_id
        active_user.fin_state='待修改'
        active_user.activity_type='项目'
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
        active_user.activity_type='项目'
        putActiveUser(this.activity_id, active_user).then((resp) => {
          if (resp.data.code === 200) {
            this.$Message.success({content: '审核通过成功'})
            this.fetchData()
          }
        })

      },
      onSearch () {
        // 查询变化
        this.pages._page = 1
        this.fetchData()

      },
      onPageChange (page) {
        // 分页变化
        this.pages._page = page
        this.fetchData()
      },

      onProfileModalOK(){
        this.showProjectProfileModal=false
        this.fetchData()

      },
      onProfileModalCancel(){
        this.showProjectProfileModal=false
        this.fetchData()
      }
    },
    mounted: function () {
      queryActivityUsers({fin_state: this.query.fin_state,
        fin_state_ne: '待修改', activity_type:this.activity_type,...this.pages}).then((userresp) => {
        this.data = userresp.data.activity_users
        this.total=userresp.data.total
      })
    }
  }
</script>

<style scoped>

</style>
