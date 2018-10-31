<template>
  <Card>
    <!--<h>hi{{this.total}}!!!</h>-->
    <h1>活动管理</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="活动名称：" prop="name">
        <AutoComplete v-model="query.name" :data="activityName" :filter-method="filterMethod" style="width:180px"></AutoComplete>
      </FormItem>
      <FormItem label="学期：">
        <Select v-model="query.term" style="width:200px">
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem >
        <Button type="primary" @click="onSearch(query)">查询</Button>
      </FormItem>
    </Form>

    <ActivesAddModal
      :modal="showActiveAddModal"
      @onOK="onAddModalOK"
      @onCancel="onAddModalCancel">
    </ActivesAddModal>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
      </div>
    </div>

    <float_bar>
      <Button type="primary" @click="()=>{this.showActiveAddModal=true}">新增</Button>
    </float_bar>
    <!--{{this.activity}}-->
    <!--{{this.showActiveAddModal}}-->
  </Card>
</template>

<script>
import ActivesAddModal from './components/ActivesAddModal'
import {queryActives, putActive, postActive, deleteActive} from '../../service/api/actives'
import {queryTerms, getCurrentTerms} from '../../service/api/term'
import Float_bar from '_c/float_bar/float_bar'
import {updateWithinField} from 'Libs/tools'

export default {
  components: {Float_bar, ActivesAddModal},
  data: function () {
    return {
      query: {
        name: undefined
      }, // 查询用的参数
      activityName: [],
      total: 0, // 总数量
      data: [], // 数据
      terms: [],
      activity: {},
      selected_activity_id: '', // 选中编辑的课程ids
      showActivityProfileModal: false, // 展示编辑弹窗
      showActiveAddModal: false,
      pages: {
        _page: 1,
        _per_page: 10
      }, // 分页
      columns: [
        {
          title: '活动名称',
          render: function (h, params) {
            return h('span', params.row.name)
          }
        },
        {
          title: '活动地点',
          render: function (h, params) {
            return h('span', params.row.place)
          }
        },
        {
          title: '活动状态',
          render: function (h, params) {
            return h('span', params.row.state)
          }
        },
        {
          title: '开始时间',
          render: function (h, params) {
            return h('span', params.row.start_time)
          }
        },
        {
          title: '结束时间',
          render: function (h, params) {
            return h('span', params.row.end_time)
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
                style: {
                  marginRight: '2px'
                },
                on: {
                  click: () => {
                    this.selected_activity_id = params.row.id
                    // this.showActivityProfileModal=true;
                    // const route=this.selected_activity_id;
                    // this.$router.push({path: `:id/${route}`})
                    this.$router.push({path: `/active/detail/${params.row.id}` })
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '2px'
                },
                on: {
                  click: () => {
                    this.selected_activity_id = params.row.id
                    deleteActive(params.row.id).then(() => {
                      this.$Message.success('删除成功！')
                      this.onTableChange(this.query, this.pages)
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
    onTableChange (query, pages) {
      // 数据表发生变化请求数据
      let args = {...query, ...pages}
      queryActives(args).then((resp) => {
        this.data = resp.data.activities
        this.total = resp.data.total
        this.activityName = []
        this.data.forEach((activity) => {
          this.activityName.push(activity.name)
        })
        this.$router.push({path: '/active/manager', query: {...args, ...this.query}})
      })
    },
    filterMethod (value, option) {
      return option.indexOf(value) !== -1
    },
    onPageChange (page) {
      // 分页变化
      this.pages._page = page
      this.onTableChange(this.query, this.pages)
    },
    onSearch () {
      // 查询变化
      this.pages._page = 1
      this.onTableChange(this.query, this.pages)
    },
    onProfileModalOK (activity) {
      // 更新框确定 关闭
      postActive(activity).then((resp) => {
        this.showActivityProfileModal = false
      })
      this.onTableChange(this.query, this.pages)
    },
    onProfileModalCancel () {
      this.showActivityProfileModal = false
    },
    onAddModalOK (activity) {
      this.activity = activity // ???
      postActive(activity).then(() => {
        this.onTableChange(this.query, this.pages)
      })
      this.showActiveAddModal = false
      this.onTableChange(this.query, this.pages)
    },
    onAddModalCancel () {
      this.showActiveAddModal = false
    }
  },
  mounted: function () {
    const args = this.$route.query
    updateWithinField(this.query, args)
    updateWithinField(this.pages, args)
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })
    getCurrentTerms().then((termResp) => {
      this.query.term = termResp.data.term.name
      queryActives({ ...this.query, ...this.pages}).then((resp) => {
        this.data = resp.data.activities
        this.total = resp.data.activities.length
        this.activityName = []
        this.data.forEach((activity) => {
          this.activityName.push(activity.name)
        })
        this.$router.push({path: '/active/manager', query: { ...this.query, ...this.pages}})
      })
    })
  }
}
</script>

<style scoped>

</style>
