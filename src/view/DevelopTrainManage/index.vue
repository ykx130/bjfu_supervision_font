<template>
  <Card>
    <!--<h>hi{{this.total}}!!!</h>-->
    <h1>培训管理</h1>
    <br>
    <Form :label-width="80" :model="query" inline>

      <FormItem label="题目：" prop="title">
        <AutoComplete v-model="query.title_like" :data="activityName " clearable
                      style="width:160px"
                      @on-search="handleSearchActivateName"></AutoComplete>
      </FormItem>

      <FormItem label="模块：" prop="module">
        <Input   v-model="query.module"
                 style="width:160px"
                 placeholder="请输入模块名称">

        </Input>
      </FormItem>

      <FormItem label="学期：" >
        <Select v-model="query.term" style="width:160px">
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="onSearch">查询</Button>
      </FormItem>




      <FormItem>
        <Button type="primary" @click="showActiveAddModal=true" v-role="['管理员']">新增</Button>
      </FormItem>


      <FormItem v-role ="['管理员']">
        <Upload :action="uploadActivitiesApi"
                :on-success="handleImportActivityExcelSucc"
                name="filename">
          <Button  icon="ios-cloud-upload-outline" type="primary"  >批量导入</Button>
        </Upload>
      </FormItem>




    </Form>

    <ActivesAddModal
      :modal="showActiveAddModal"
      @onOK="onAddModalOK"
      @onCancel="onAddModalCancel">
    </ActivesAddModal>

    <Table border stripe :columns="columns" :data="data" ></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page"
              @on-change="onPageChange"></Page>
      </div>
    </div>

    <Form inline>
      <FormItem>
        <Button type="primary" @click="showActivityPlan=true" v-role="['管理员']">教学研修计划</Button>
      </FormItem>
      <FormItem>
        <Upload :action="uploadPlanApi"
                :on-success="handleImportPlanSucc"
                name="filename"
                style="display: inline ;margin-left: 75px">
          <Button  icon="ios-cloud-upload-outline" type="primary">上传研修计划附件</Button>
        </Upload>
      </FormItem>
    </Form>
    <ActivityPlanTable
      :show="showActivityPlan"
      @onOK="onActivityPlanOK"
      @onCancle="onActivityPlanCancle">
    </ActivityPlanTable>
  </Card>
</template>

<script>
  import ActivesAddModal from './components/ActivesAddModal'
  import ActivityPlanTable from "./components/ActivityPlanTable"
  import {
    queryActives,
    putActive,
    postActive,
    deleteActive,
    uploadActivitiesApi,
    uploadPlanApi,
    getActive
  } from '../../service/api/actives'
  import { queryTerms, getCurrentTerms } from '../../service/api/term'
  import Float_bar from '_c/float_bar/float_bar'
  import {dateToString, updateWithinField} from 'Libs/tools'


  export default {
    components: {ActivityPlanTable, Float_bar, ActivesAddModal,updateWithinField},

    data: function () {
      return {
        uploadActivitiesApi:uploadActivitiesApi,
        uploadPlanApi:uploadPlanApi,
        query: {
          title_like: undefined,
          apply_state_ne:'待审核活动'
        }, // 查询用的参数
        activityName: [],
        total: 0, // 总数量
        data: [], // 过滤后的数据
        terms: [],
        activity: {},
        now:new Date(),
        selected_activity_id: '', // 选中编辑的课程ids
        showActivityProfileModal: false, // 展示编辑弹窗
        showActiveAddModal: false,
        showActivityPlan:false,
        pages: {
          _page: 1,
          _per_page: 10
        }, // 分页
        columns: [
          {
            title: '题目',
            align: 'center',
            render: function (h, params) {
              return h('span', params.row.title)
            }
          },
          {
            title: '主讲人',
            align: 'center',
            render: function (h, params) {
              return h('span', params.row.presenter)
            }
          },
          {
            title: '所属模块',
            align: 'center',
            render: function (h, params) {
              return h('span', params.row.module)
            }
          },
          {
            title: '培训时间',
            align: 'center',
            render: function (h, params) {
              return h('span', params.row.start_time)
            },
          },
          {
            title: '培训地点',
            align: 'center',
            render: function (h, params) {
              return h('span', params.row.place)
            }
          },
          {
            title: '主办单位',
            align: 'center',
            render: function (h, params) {
              return h('span', params.row.organizer)
            }
          },
          {
            title: '学时',
            align: 'center',
            width: '80px',
            render: function (h, params) {
              return h('span', params.row.period)
            }
          },
          {
            title: '活动状态',
            render: function (h, params) {

              return h('span', params.row.apply_state)

            }
          },
          {
            title: '是否必修',
            align: 'center',
            width: '90px',
            render: (h, params) => {
              if (params.row.is_obligatory === true) {
                return h('Tag',{ props: { color: 'red' } }, '是')
              } else {
                return h('Tag',{ props: { color: 'blue' } }, '否')
              }
            }
          },
          {
            title: '操作',
            align: 'center',
            width:'130px',
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
                      this.selected_activity_id = params.row.id
                      // this.showActivityProfileModal=true;
                      // const route=this.selected_activity_id;
                      // this.$router.push({path: `:id/${route}`})
                      this.$router.push({ path: `/develop/detaill/${params.row.id}` })//查看的跳转activity->develop
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  directives: [{
                    name: 'role',
                    value: ['管理员']
                  }],
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.selected_activity_id = params.row.id
                      deleteActive(params.row.id).then(() => {
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
        return queryActives({ ...this.query, ...this.pages }).then((resp) => {
          this.data= resp.data.activities

          this.total = resp.data.total
          this.activityName = []
          console.log(resp)

          this.data.forEach((activity) => {
            this.date = dateToString(this.now, 'yyyy-MM-dd hh:mm:ss')
            if(this.date>activity.start_time&&activity.apply_state==='报名进行中'){
              activity.apply_state='报名已结束'
              putActive(activity)
            }
            this.activityName.push(activity.title)//name->title,push()将activity.title依次加入activityName[]数组末尾

          })

          //this.total=this.data.length
        })
      },


      filterMethod (value, option) {
        return option.indexOf(value) !== -1
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
      handleSearchActivateName (value) {
        queryActives({ title_like: value }).then((resp) => {
          this.activityName.splice(0, this.activityName.length)
          resp.data.activities.forEach((activity) => {
            this.activityName.push(activity.title)
          })
        })
      },
      onProfileModalOK (activity) {
        // 更新框确定 关闭
        postActive(activity).then((resp) => {
          this.showActivityProfileModal = false
        })
        this.fetchData()
      },
      onProfileModalCancel () {
        this.showActivityProfileModal = false
      },

      onAddModalOK (activity) {
        postActive(activity).then((resp) => {
          if (resp.data.code === 200) {
            this.$Message.success({ content: '活动添加成功' })
            this.fetchData()
          }
          this.showActiveAddModal = false

        })
      },
      onAddModalCancel () {
        this.showActiveAddModal = false
      },
      onActivityPlanOK(){
        this.showActivityPlan=false
      },
      onActivityPlanCancle(){
        this.showActivityPlan=false
      },
      //活动的批量导入
      handleImportActivityExcelSucc: function (response, file, fileList) {
        if (response.code !== 200) {
          this.$Message.warning({ content: '部分导入失败' })
          window.open('/api/' + response.fail_excel_path)
        } else {
          this.$Message.success({ content: '导入成功' })
        }
      },

      //上传研修计划的附件
      handleImportPlanSucc: function (response, file, fileList) {
        if (response.code !== 200) {
          this.$Message.warning({ content: '导入失败' })
          window.open('/api/' + response.fail_path)
        } else {
          this.$Message.success({ content: '导入成功' })
        }
      },
    },


    mounted: function () {
      queryTerms().then((resp) => {
        this.terms = resp.data.terms
        getCurrentTerms().then((termResp) => {
          this.query.term = termResp.data.term.name
          this.fetchData()

        })
      })
    }
  }
</script>

<style scoped>

</style>
