<template>
  <div>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="教师：" prop="user.name" clearable>
        <Input style="width: 120px" v-model="query.user.name" placeholder="请输入教师姓名" >
        </Input>
      </FormItem>
      <FormItem label="学院：" prop="user_unit" >
        <Select v-model="query.user_unit" clearable style="width:150px" filterable>
          <Option v-for="item in unitList" :value="item" :key="item" >{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem label="状态：" prop="fin_state" >
        <Select v-model="query.fin_state" clearable style="width:120px">
          <Option v-for="item in fin_stateList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="onSearch">查询</Button>
      </FormItem>

    </Form>

    <TrainProfileModal
      :show="showTrainProfileModal"
      @onOk="onProfileModalOK"
      @onCancel="onProfileModalCancel"
      :active_id="this.selected_activity_id"
      :username="this.selected_username"
      :active_type="this.activity_type"
    ></TrainProfileModal>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
      </div>
    </div>



  </div>
</template>

<script>


  import {StateList} from "Views/TeacherDevelopDetail/marcos";
  import {
    getActive,
    putActive,
    putActiveUser,
    queryActives,
    queryActiveUsers,
    queryActivityUsers
  } from "@/service/api/actives";
  import TrainProfileModal from "Views/TeacherDevelopDetail/components/ActivityProfile/TrainProfileModal";
  import params from "Views/argu-page/params";
  import {getUserByName, queryUsers} from "@/service/api/user";
  import {dateToString, updateWithinField} from "Libs/tools";
  import {putForm} from "@/service/api/dqs";
  import {UNIT_LIST} from "Const/index";

  export default {
    name: "TrainActivityTable",
    components:{TrainProfileModal},

    data: function () {
      return {
        query: {
          activity: {
          },
          user_unit:'',
          fin_state: undefined,
          activity_id:undefined,
          user:{
            name:undefined,
            username:undefined,
          }
        },
        selected_activeuser:{},
        users:[],
        selected_activity_id:0,
        selected_username:"",
        showTrainProfileModal:false,
        activity_type: '培训',
        total:0,
        activity_users:[],
        data: [],
        fin_stateList: StateList,
        unitList:UNIT_LIST,

        pages: {
          _page: 1,
          _per_page: 10
        }, // 分页
        columns: [
          {
            title: '教师姓名',
            align: 'center',
            width: '100px',
            render: function (h, params) {
              return (
                <span>{params.row.user.name}</span>
            )
            }
          },
          {
            title: '学院',
            align: 'center',
            width: '100px',
            render: function (h, params) {
              return (
                <span>{params.row.user.unit}</span>
            )
            }
          },
          {
            title: '题目',
            align: 'center',
            width:'170px',
            render: function (h, params) {
              return (
                <span>{params.row.activity.title}</span>
            )
            }
          },
          {
            title: '主讲人',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{params.row.activity.presenter}</span>
            )
            }
          },
          {
            title: '所属模块',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{params.row.activity.module}</span>
            )
            }
          },
          {
            title: '培训时间',
            align: 'center',
            width: '170px',
            render: function (h, params) {
              return (
                <span>{params.row.activity.start_time}</span>
            )
            }
          },
          {
            title: '培训地点',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{params.row.activity.place}</span>
            )
            }
          },
          {
            title: '主办单位',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{params.row.activity.organizer}</span>
            )
            }
          },
          {
            title: '学时',
            align: 'center',
            width: '70px',
            render: function (h, params) {
              return (
                <span>{params.row.activity.period}</span>
            )
            }
          },
          {
            title: '活动状态',
            align: 'center',
            width: '120px',
            render: function (h, params) {
              return (
                <span>{params.row.activity.apply_state}</span>
            )
            }
          },
          {
            title: '状态',
            align: 'center',
            sortable: true,
            key:'fin_state',
            sortType:"asc",
            width: '100px',
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
                      this.selected_activity_id=params.row.activity_id
                      this.selected_username=params.row.user.username
                      this.showTrainProfileModal = true
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
                    value: ['管理员']
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
                    value: ['管理员']
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
        ],


      }
    },
    methods: {
      fetchData () {
        // 数据表发生变化请求数据
        if(this.query.user.name) {
          queryUsers({'name': this.query.user.name}).then((userresp) => {
            this.query.user.username = userresp.data.users[0].username
            queryActivityUsers({
              'username': this.query.user.username,
              'fin_state': this.query.fin_state,
              'activity_type':this.activity_type,
              'user_unit':this.query.user_unit,
              ...this.pages
            }).then((newresp) => {
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
        active_user.activity_type='培训'
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
        active_user.activity_type='培训'
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
      onProfileModalOK(){
        this.showTrainProfileModal=false
        this.fetchData()

      },
      onProfileModalCancel(){
        this.showTrainProfileModal=false
        this.fetchData()
      }
    },
    mounted: function () {
      queryActivityUsers({'activity_type':this.activity_type,...this.pages}).then((userresp) => {
        this.data = userresp.data.activity_users
        this.total=userresp.data.total
      })
    }
  }




</script>

<style scoped>

</style>
