<template>
  <div>
    <h1>教师教学发展交流</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="名称查询：" prop="module">
        <AutoComplete v-model="query.name_like" :data="name"
                      style="width:180px"
                      @on-search="handleSearchName"></AutoComplete>
      </FormItem>
      <FormItem label="状态查询：" prop="fin_state">
        <Select v-model="query.fin_state" style="width:200px"  clearable>
          <Option v-for="item in activity_statuss" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click=" onSearch">查询</Button>
      </FormItem>
    </Form>

    <AddResearch
      :modal="showResearchAddModal"
      @onOK="onAddModalOK"
      @onCancel="onAddModalCancel">
    </AddResearch>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page"
              @on-change="onPageChange"></Page>
      </div>
      <float_bar>
        <Button type="primary" @click="showResearchAddModal=true">新增</Button>
      </float_bar>
    </div>
  </div>
</template>

<script>
  import {currentUser} from "@/service/api/user";
  import {
    putResearch,
    deleteResearch,
    postActiveUser,
    postResearch,
    queryActivityUsers,
    queryResearch
  } from "@/service/api/actives";
  import float_bar from "_c/float_bar/float_bar";
  import AddResearch from "Views/TeachingDevelopment/components/Add/AddResearch";
  import {State} from "Views/TeacherDevelopDetail/marcos";

  export default {
    name: 'teacherDevelopmentResearch',
    components:{AddResearch,float_bar},
    data () {
      return {
        query: {
          username:undefined,
          activity_type:'研究'
        },
        showResearchAddModal:false,
        activity_statuss:State,
        total:0,
        data:[],
        name: [],
        stateName: [],
        pages: {
          _page: 1,
          _per_page: 10
        }, // 分页
        columns: [
          {
            title: '论文题目',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.title }</span>
            )
            }
          },
          {
            title: '发表时间',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.start_time}</span>
            )
            }
          },
          {
            title: '发表刊物',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.journal }</span>
            )
            }
          },
          {
            title: '作者',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.author }</span>
            )
            }
          },

          {
            title: '学期',
            align: 'center',
            render: function (h, params) {
              return (
                <span>{ params.row.activity.term }</span>
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
                    disabled: !(params.row.fin_state === '待审核')
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      // this.selected_activity_title = params.row.activity.title
                      // this.showActiveAddModal = true
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
                      deleteResearch(params.row.activity.id).then(() => {
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
        postResearch(activity).then((resp) => {
          queryResearch({"title": activity.title}).then((newresp) => {
            this.activity_id = newresp.data.researchs[0].id
            currentUser().then((usrresp) => {
              postActiveUser(this.activity_id, {
                username: usrresp.data.current_user.username,
                fin_state: "待审核",
                state: "已报名",
                activity_type:"研究"
              }).then((esp) => {
                if (esp.data.code === 200) {
                  this.$Message.success({content: '研究添加成功'})
                  this.fetchData()
                }
              })
            })
            this.showResearchAddModal = false
          })
        })
      },
      onAddModalCancel () {
        this.showResearchAddModal = false
      },
      handleSearchName () {},
      handleSearchStateName () {},
      onSearch () {
        // 查询变化
        this.pages._page = 1
        this.fetchData()
      }
    },
    mounted:function (){
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
