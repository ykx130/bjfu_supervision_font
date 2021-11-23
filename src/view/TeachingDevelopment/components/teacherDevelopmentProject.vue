<template>
  <div>
    <h1>教师教学发展项目</h1>
    <br>
    <Form :label-width="100" :model="query" inline>
      <FormItem label="名称查询：" >
        <Input v-model="query.activity_title_like" style="width:200px"></Input>
      </FormItem>
      <FormItem label="状态查询：" >
        <Select v-model="query.fin_state" style="width:200px"  clearable>
          <Option v-for="item in activity_statuss" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click=" onSearch">查询</Button>
      </FormItem>
    </Form>
    <TeacherProjectUpdateModal
      :show="showUpdateProjectModal"
      :active_user="selected_active_user"
      :title_code="2"
      @onOK="onUpdateModalOK"
      @onCancel="onUpdateModalCancel"
    ></TeacherProjectUpdateModal>

    <AddProject
      :modal="showProjectAddModal"
      @onOK="onAddModalOK"
      @onCancel="onAddModalCancel">
    </AddProject>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page"
              @on-change="onPageChange"></Page>
      </div>
      <float_bar>
        <Button type="primary" @click="showProjectAddModal=true">新增</Button>
      </float_bar>
    </div>
  </div>
</template>

<script>
  import {currentUser} from "@/service/api/user";
  import {
    deleteProject,
    postActiveUser,
    postProject,
    queryActivityUsers,
    queryProject,
    putProject,
    putCompetition, putActiveUser
  } from "@/service/api/actives";
  import AddProject from "Views/TeachingDevelopment/components/Add/AddProject";
  import float_bar from "_c/float_bar/float_bar";
  import UserMixin from "@/mixins/UserMixin";
  import TeacherProjectUpdateModal from "Views/TeachingDevelopment/components/Profile/TeacherProjectUpdateModal";

  export default {
    name: 'teacherDevelopmentProject',
    components: {TeacherProjectUpdateModal,  AddProject,float_bar},
    mixins: [UserMixin],
    data () {
      return {
        query: {
          fin_state: '',
          activity_type:'项目',
          activity_title_like: '',
        },
        activity_statuss:['待审核','已完成','待修改'],
        selected_active_user:{},
        showUpdateProjectModal: false,
        total:0,
        showProjectAddModal:false,
        data:[],
        name: [],
        stateName: [],
        pages: {
          _page: 1,
          _per_page: 10
        }, // 分页
        columns: [
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
            title: '学期',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.term}</span>
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
            width: '200px',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: (params.row.fin_state !== '待修改')
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.selected_active_user = params.row
                      this.showUpdateProjectModal = true
                    }
                  }
                }, '编辑'),

                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    disabled: (params.row.fin_state === '已完成')
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {

                      deleteProject(params.row.activity.id).then(() => {
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
    methods: {
      fetchData () {
        // 数据表发生变化请求数据
        this.query.username = this.userInfo.userInfo.username
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
      onAddModalOK (activity) {
        activity.apply_state="待审核活动"
        postProject(activity).then((resp) => {
          queryProject({"title": activity.title}).then((newresp) => {
            this.activity_id = newresp.data.projects[0].id

            currentUser().then((usrresp) => {

              postActiveUser(this.activity_id, {
                username: usrresp.data.current_user.username,
                fin_state: "待审核",
                state: "已报名",
                activity_type:"项目"
              }).then((esp) => {
                if (esp.data.code === 200) {
                  this.$Message.success({content: '项目添加成功'})
                  this.fetchData()
                }
              })
            })
            this.showProjectAddModal = false
          })
        })
      },
      onAddModalCancel () {
        this.showProjectAddModal = false
      },
      onUpdateModalOK(data) {
        console.log('project',data)
        let new_data = {
          username: data.username,
          fin_state: '待审核',
          activity_type: '项目',
          activity_id: data.activity_id,
        }
        putProject(data.activity_id,data.activity).then((res1=>{
          putActiveUser(data.activity_id,new_data).then((res2=>{
            if(res1.data.code === 200 && res2.data.code === 200){
              this.$Message.success('修改成功')
              this.fetchData()
            }else {
              this.$Message.error('失败')
            }
          }))
        }))
        this.showUpdateProjectModal = false
      },
      onUpdateModalCancel(){
        this.showUpdateProjectModal = false
      },
      onSearch () {
        // 查询变化
        this.pages._page = 1
        this.fetchData()
      }
    },
    mounted:function (){
     this.fetchData()
    }
  }
</script>
<style scoped>

</style>
