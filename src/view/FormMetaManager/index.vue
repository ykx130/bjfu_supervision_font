<template>
  <Card>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="问卷名字：" prop="name">
        <Input style="width: 180px" v-model="query.name" @on-change=" onSearch"></Input>
      </FormItem>
    </Form>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
      </div>
    </div>
  </Card>
</template>
<script>
import { queryFormMetas } from '@/service/api/dqs'
import formMetaHistory from './components/form_meta_history'
export default {
  components:{formMetaHistory},
  data: function () {
    return {
      columns: [
        {
          type: 'expand',
          title:"评价",
          width: 70,
          render: (h, params) => {
            return h(formMetaHistory, {
              props: {
                meta_name: params.row.name
              }
            })
          }
        },
        {
          title: '问卷名',
          render: function (h, params) {
            return (
              <span>{ params.row.name }</span>
            )
          }
        },
        {
          title: '版本',
          render: function (h, params) {
            return (
              <span>{ params.row.version }</span>
            )
          }
        },
        {
          title: '创建时间',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.created_at }</span>
            )
          }
        },
        {
          title: '创建人',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.created_by }</span>
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
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({path: `/dqs/form_fill/${params.row.name}/${params.row.version}`})
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({path: `/dqs/meta_editor/${params.row.name}/${params.row.version}`})
                  }
                }
              }, '编辑')
            ])
          }
        }
      ],
      data: [],
      total: 0,
      query: {
        meta:{},
      },
      pages: {
        _page: 1,
        _per_page: 10
      }
    }
  },
  methods: {
     fetchData() {
      // 数据表发生变化请求数据
       let args = {...this.query, ...this.pages}
      queryFormMetas(args).then((resp) => {
        this.data = resp.data.form_metas
        this.total = resp.data.total
      })
    },
    onPageChange (page) {
      // 分页变化
      this.pages._page = page
      this.fetchData( )
    },
    onSearch (query) {
      // 查询变化 当点提交查询条件生效
      this.pages._page = 1
      this.fetchData( )
    }
  },
  mounted: function () {
    let args = this.$route.query
    queryFormMetas({...args, ...this.query}).then((resp) => {
      this.data = resp.data.form_metas
      this.total = resp.data.total
  })
  }
}
</script>
