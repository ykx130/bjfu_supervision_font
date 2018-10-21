<template>
  <div>
    <Card>
      <Row>
        <Col span="6">
        <span>
          问卷名字:
              <Select v-model="query.term" style="width:200px">
                <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
        </span>
        </Col>
      </Row>
    </Card>

    <div style="padding-top: 15px"></div>
    <Card>
      <Tabs :value="query.selected_group_name" @on-click="onTypeTabClick">
        <TabPane v-for="(item, index) in groups" :label="item.name" :name="item.name" :key="item.name + index"></TabPane>
      </Tabs>
      <br>

      <Table border stripe :columns="columns" :data="data"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
        </div>
      </div>
    </Card>
  </div>

</template>

<script>
import {queryGroupLesson, putLesson} from '../../service/api/lesson'
import {queryGroups} from '../../service/api/user'
import {getCurrentTerms, queryTerms} from '@/service/api/term'

export default {
  data: function () {
    return {
      query: {
        selected_group_name: '第一组'
      }, // 查询用的参数
      total: 0, // 总数量
      terms: [],
      data: [],
      groups: [],
      pages: {
        _page: 1,
        _per_page: 10
      }, // 分页
      columns: [
        {
          title: '用户号码',
          render: function (h, params) {
            return (
              <span>{ params.row.id }</span>
            )
          }
        },
        {
          title: '用户名称',
          render: function (h, params) {
            return (
              <span>{ params.row.username }</span>
            )
          }
        },
        {
          title: '所在分组',
          render: function (h, params) {
            return (
              <span>{ params.row.group_name }</span>
            )
          }
        },
        {
          title: '未提交',
          render: function (h, params) {
            return (
              <span>{ params.row.to_be_submitted }</span>
            )
          }
        },
        {
          title: '已提交',
          render: function (h, params) {
            return (
              <span>{ params.row.has_submitted }</span>
            )
          }
        },
        {
          title: '提交总次数',
          render: function (h, params) {
            return (
              <span>{ params.row.total_times }</span>
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
                style: {
                  marginRight: '2px'
                },
                on: {
                  click: () => {
                    this.selected_group_name = params.row.group_name
                  }
                }
              }, '查看')
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
      queryGroupLesson(args).then((resp) => {
        this.data = resp.data.lesson_records
        this.total = resp.data.total
        this.$router.push({path: '/dqs/lesson_records', query: query})
      })
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
    onTypeTabClick (value) {
      this.query.selected_group_name = value
      this.pages = {
        _page: 1,
        _per_page: 10
      }
      this.onTableChange(this.query, this.pages)
    }
  },
  mounted: function () {
    const args = this.$route.query

    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })

    getCurrentTerms().then((resp) =>{
      this.query.term = resp.data.term.name
      queryGroups().then((resp) => {
        this.groups = resp.data.groups
        // this.selected_group_name = this.groups[0].name;
        queryGroupLesson(args).then((resp) => {
          this.data = resp.data.lesson_records
          this.total = resp.data.total
          this.$router.push({path: '/dqs/lesson_records', query: {...args, ...this.query}})
        })
    })
    })
  }
}
</script>

<style scoped>

</style>
