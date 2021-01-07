<template>
  <div>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="比赛名称：" prop="award_name">
        <Input style="width: 180px" v-model="query.award_name" placeholder="请输入比赛名称" ></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="onSearch">查询</Button>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="showCompetitionAddModal=true">新增比赛</Button>
      </FormItem>
      <FormItem v-role ="['教发管理员']">
        <Upload :action="uploadCompetitionUserApi"
                :on-success="handleImportCompetitionUserExcelSucc"
                name="filename">
          <Button  icon="ios-cloud-upload-outline" type="primary"  >批量导入比赛人员</Button>
        </Upload>
      </FormItem>
    </Form>

    <AddCompetition
      :modal="showCompetitionAddModal"
      @onOK="onAddModalOK"
      @onCancel="onAddModalCancel">
    </AddCompetition>
    <AddCompetitionUserModal
      :show="showAddCompetitionUser"
      @onCancel="onAddCompetitionUserCancel"
      @onOK="onAddCompetitionUserOK">
    </AddCompetitionUserModal>
    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
      </div>
    </div>
  </div>
</template>

<script>


  import {
    postActiveUser,
    postCompetition,
    queryActivityUsers,
    queryCompetition,
    deleteCompetition,
    uploadCompetitionUserApi,
  } from "@/service/api/actives";
  import {currentUser, queryUsers} from "@/service/api/user";
  import AddCompetition from "Views/TeachingDevelopment/components/Add/AddCompetition";
  import CompetitionUsers from "Views/TeachingDevelopment/components/CompetitionUsers";
  import AddCompetitionUserModal from "Views/TeacherDevelopDetail/components/AddCompetitionUserModal";


  export default {
    name: "CompetitionTable",
    components:{AddCompetitionUserModal, AddCompetition,CompetitionUsers},
    data:function () {
      return{
        uploadCompetitionUserApi:uploadCompetitionUserApi,
        showCompetitionAddModal:false,
        showAddCompetitionUser:false,
        selected_competition_id:undefined,
        data:[],
        query: {
          title: undefined,
          term: undefined,
          user:{
            name:'',
            username:'',
          },
        }, // 查询用的参数

        total:0,

        pages: {
          _page: 1,
          _per_page: 10
        }, // 分页

        columns: [

          {
            type: 'expand',
            title: '比赛',
            width: 70,
            render: (h, params) => {
              return h(CompetitionUsers, {
                props: {
                  competition_id: params.row.id
                }
              })
            }
          },
          {
            title: '比赛名称',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.award_name }</span>
            )
            }
          },

          {
            title: '比赛时间',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.start_time }</span>
            )
            }
          },
          {
            title: '主办单位',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.organizer}</span>
            )
            }
          },
          {
            title: '级别',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.level }</span>
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
                  directives: [{
                    name: 'role',
                    value: ['教发管理员']
                  }],
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
                    type: 'primary',
                    size: 'small'
                  },
                  directives: [{
                    name: 'role',
                    value: ['教发管理员']
                  }],
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.selected_competition_id=params.row.id
                      this.showAddCompetitionUser=true
                    }
                  }
                }, '新增人员'),

                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  directives: [{
                    name: 'role',
                    value: ['教发管理员']
                  }],
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '是否确认删除?',
                        onOk: () => {
                          deleteCompetition(params.row.id).then((res) => {
                            this.fetchData()
                            if (res.data.code === 200) {
                              this.$Message.success('删除成功！')
                            } else {
                              this.$Message.error('删除失败！')
                            }
                          })
                        },
                        onCancel: () => {}
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
        let args = { ...this.query, ...this.pages }
        return queryCompetition(args).then((res) => {
          this.data = res.data.competitions
          this.total = res.data.total
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

      //活动的批量导入
      handleImportCompetitionUserExcelSucc: function (response, file, fileList) {
        if (response.code !== 200) {
          this.$Message.warning({ content: '部分导入失败' })
          window.open('/api/' + response.fail_excel_path)
        } else {
          this.$Message.success({ content: '导入成功' })
        }
      },

      onAddModalOK (activity) {
        postCompetition(activity).then((resp) => {
          if (resp.data.code === 200) {
            this.$Message.success({ content: '比赛添加成功' })
            this.fetchData()
            this.showCompetitonAddModal = false
          }
        })

      },
      onAddModalCancel () {
        this.showCompetitionAddModal = false
      },

      onAddCompetitionUserOK: function (active_user) {
        postActiveUser(this.selected_competition_id, active_user).then((resp) => {
          if (resp.data.code === 200) {
            this.$Message.success({ content: '添加成功' })
            this.fetchData()
          }
          this.showAddCompetitionUser = false
        })
      },
      onAddCompetitionUserCancel: function () {
        this.showAddCompetitionUser = false
      },
    },
    created() {
      queryCompetition().then((resp)=>{
        this.data=resp.data.competitions
        this.total=resp.data.total
      })

    },
    mounted: function () {

    }
  }
</script>

<style scoped>

</style>
