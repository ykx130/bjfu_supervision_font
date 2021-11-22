<template>
  <div>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="教师："  clearable>
<!--        <Input style="width: 120px" v-model="query.user.name" placeholder="请输入教师姓名" >-->
<!--        </Input>-->
        <Select
          filterable
          v-model="userSearch.modal"
          @on-change="UserOptionChange"
          :remote-method="UserRemoteMethod"
          :loading="this.userSearch.loading"
          style="width: 150px" clearable>
          <Option v-for="(option, index) in this.userSearch.codes" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
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
      <FormItem label="时间范围:" >
        <DatePicker :value="activity_time_range"  type="datetimerange" format="yyyy-MM-dd HH:mm:ss"
                    placement="bottom-end" placeholder="Select datetime range"
                    @on-change="DateTimeChange" @on-clear="ClearDateTimeRange"
                    clearable style="width: 250px"></DatePicker>
      </FormItem>
<!--      <FormItem label="活动状态：" prop="apply_state" >-->
<!--        <Select v-model="query.apply_state" clearable style="width:120px">-->
<!--          <Option v-for="item in apply_stateList" :value="item" :key="item">{{ item }}</Option>-->
<!--        </Select>-->
<!--      </FormItem>-->

<!--      <FormItem label="時間查詢：">-->
<!--        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="query_finstate.activity_time_gte"></DatePicker>-->
<!--        &nbsp;—&nbsp;-->
<!--        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="query_finstate.activity_time_lte"></DatePicker>-->
<!--      </FormItem>-->

      <FormItem>
        <Button type="primary" @click="onSearch">查询</Button>
      </FormItem>

    </Form>

    <TrainProfileModal
      :show="showTrainProfileModal"
      @onOk="onProfileModalOK"
      @onCancel="onProfileModalCancel"
      :active_id="this.selected_activity_id"
      :now_username="this.selected_username"
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


  import {StateList,ApplyStateList} from "Views/TeacherDevelopDetail/marcos";
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
        activity_time_range: [],
        query: {
          username: '',
          user_unit:'',
          activity_time_gte: undefined,
          activity_time_lte: undefined,
          fin_state: undefined,
          activity_id:undefined,
          fin_state_ne: '待修改',
          activity_type: '培训'
        },
        userSearch: {
          list: [],
          usernames: [],
          loading: false,
          modal: ''
        },

        // query_finstate:{
        //   fin_state_ne:'待修改',
        //   //activity_time_lte:undefined,
        //   //activity_time_gte:undefined
        // },
        selected_activeuser:{},
        users:[],
        selected_activity_id:undefined,
        selected_username:'',
        showTrainProfileModal:false,
        imagelist:[],
        activity_type: '培训',
        total:0,
        activity_users:[],
        data: [],
        fin_stateList: StateList,
        unitList:UNIT_LIST,
        apply_stateList:ApplyStateList,
        pages: {
          _page: 1,
          _per_page: 10
        }, // 分页
        columns: [
          {
            title: '教师姓名',
            align: 'center',
            width: 100,
            fixed: 'left',
            render: function (h, params) {
              return (
                <span>{params.row.user.name}</span>
            )
            }
          },
          {
            title: '学院',
            align: 'center',
            width: 120,
            render: function (h, params) {
              return (
                <span>{params.row.user.unit}</span>
            )
            }
          },
          {
            title: '题目',
            align: 'center',
            width: 150,
            render: function (h, params) {
              return (
                <span>{params.row.activity.title}</span>
            )
            }
          },
          {
            title: '主讲人',
            align: 'center',
            width: 90,
            render: function (h, params) {
              return (
                <span>{params.row.activity.presenter}</span>
            )
            }
          },
          {
            title: '所属模块',
            align: 'center',
            width: 180,
            render: function (h, params) {
              return (
                <span>{params.row.activity.module}</span>
            )
            }
          },
          {
            title: '培训时间',
            align: 'center',
            width: 170,
            render: function (h, params) {
              return (
                <span>{params.row.activity.start_time}</span>
            )
            }
          },
          {
            title: '培训地点',
            align: 'center',
            width: 120,
            render: function (h, params) {
              return (
                <span>{params.row.activity.place}</span>
            )
            }
          },
          {
            title: '主办单位',
            align: 'center',
            width: 120,
            render: function (h, params) {
              return (
                <span>{params.row.activity.organizer}</span>
            )
            }
          },
          {
            title: '学时',
            align: 'center',
            width: 70,
            render: function (h, params) {
              return (
                <span>{params.row.activity.period}</span>
            )
            }
          },
          {
            title: '活动状态',
            align: 'center',
            width: 100,
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
            width: 100,
            key:'fin_state',
            sortType:"asc",
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
            width: 180,
            fixed: 'right',
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
        ],


      }
    },
    methods: {
      UserOptionChange (options) {
        console.log('options',options)
        this.query.username = options
      },

      UserRemoteMethod (query) {
        if (query !== '') {
          this.userSearch.loading = true;
          setTimeout(() => {
            this.userSearch.loading = false;

            const list = this.userSearch.list.map(item => {
              return {
                value: item.username,
                label: item.name
              };
            });
            this.userSearch.codes = list.filter(item => item.label.indexOf(query) > -1);
          });
        } else {
          this.userSearch.codes = [];
        }
      },

      DateTimeChange(value){
        if(value[0]!==''&&value[1]!=='') {
          this.activity_time_range = value
        }
      },
      ClearDateTimeRange(){
        this.activity_time_range[0] = undefined
        this.activity_time_range[1] = undefined
      },
      // fetchData () {
      //   // 数据表发生变化请求数据
      //   if(this.query.user.name) {
      //     queryUsers({'name': this.query.user.name}).then((userresp) => {
      //       this.query.user.username = userresp.data.users[0].username
      //       queryActivityUsers({
      //         'username': this.query.user.username,
      //         'fin_state': this.query.fin_state,
      //         'activity_type':this.activity_type,
      //         'user_unit':this.query.user_unit,
      //         'activity_time_gte':this.query.activity_time_gte,
      //         'activity_time_lte': this.query.activity_time_lte,
      //         fin_state_ne: '待修改',
      //         ...this.pages
      //       }).then((newresp) => {
      //         this.data = newresp.data.activity_users
      //         this.total = newresp.data.total
      //
      //       })
      //     })
      //   }
      //   else{
      //     queryActivityUsers({'activity_type':this.activity_type,...this.query,...this.pages,fin_state_ne:'待修改'}).then((newresp)=>{
      //       this.data=newresp.data.activity_users
      //       this.total=newresp.data.total
      //     })
      //   }
      // },
      fetchData() {
        this.query.activity_time_gte = this.activity_time_range[0]
        this.query.activity_time_lte = this.activity_time_range[1]
        queryActivityUsers({...this.query, ...this.pages}).then((resp => {
          this.data = resp.data.activity_users
          this.total = resp.data.total
        }))
      },

      putBack(active_user){
        this.activity_id=active_user.activity_id
        active_user.fin_state='待修改'
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
    created() {

      this.fetchData()
      const initializeUserSearchList = () => {
        queryUsers().then(message => {
          this.userSearch.list = message.data.users
        })
      }
      initializeUserSearchList()
    },
    mounted: function () {

    }
  }




</script>

<style scoped>

</style>
