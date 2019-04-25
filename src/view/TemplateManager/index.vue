<template>
  <Card>
    <h1>模板管理</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="模板名：" prop="title">
        <Input style="width: 180px" v-model="query.title_like" placeholder="请输入模板名">
        </Input>
      </FormItem>

      <FormItem >
        <Button type="primary" @click="onSearch">查询</Button>
      </FormItem>
    </Form>

    <TemplateProfileModal
      :show="showTemplateProfileModal"
      @onOK="onProfileModalOK"
      @onCancel="onProfileModalCancel"
      :id="this.selected_id"
    ></TemplateProfileModal>

    <TemplateAddModal
      :show="showTemplateAddModal"
      @onOK="onAddModalOK"
      @onCancel="onAddModalCancel"
    ></TemplateAddModal>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
      </div>
    </div>
    <Button type="primary" @click="()=>{this.showTemplateAddModal=true}" >
      新增
    </Button>
  </Card>
</template>

<script>
import TemplateProfileModal from './components/TemplateProfileModal'
import TemplateAddModal from './components/TemplateAddModal'
import { queryTemplates, deleteTemplate, updateTemplate, createTemplate } from '../../service/api/templates'

export default {
  components: { TemplateProfileModal, TemplateAddModal },
  data: function () {
    return {
      query: {
        title_like: undefined
      }, // 查询用的参数
      total: 0, // 总数量
      data: [], // 数据
      selected_id: undefined, // 选中编辑的用户的name
      showTemplateProfileModal: false, // 展示编辑弹窗
      showTemplateAddModal: false,
      pages: {
        _page: 1,
        _per_page: 10
      }, // 分页
      columns: [
        {
          title: '模板名',
          key: 'title'
        },
        {
          title: '创建时间',
          key: 'created_at'
        },
        {
          title: '修改时间',
          key: 'updated_at'
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
                    this.selected_id = params.row.id
                    this.showTemplateProfileModal = true
                  }
                }
              }, '修改'),
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
                    this.handleDelete(params.row.id)
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
    fetchData: function () {
      // 数据表发生变化请求数据
      let args = { ...this.query, ...this.pages }
      return queryTemplates(args).then((resp) => {
        this.data = resp.data.templates
        this.total = resp.data.total
      })
    },
    onPageChange (page) {
      // 分页变化
      this.pages._page = page
      this.fetchData()
    },
    onSearch (query) {
      // 查询变化 当点提交查询条件生效
      this.pages._page = 1
      this.fetchData()
    },
    onProfileModalOK (template) {
      // 更新框确定 关闭
      updateTemplate(this.selected_id, template).then((res) => {
        this.showTemplateProfileModal = false
        this.fetchData()
        if (res.data.code === 200) {
          this.$Message.success('修改成功！')
        } else {
          this.$Message.error('修改失败！')
        }
      })
    },
    onProfileModalCancel () {
      this.showTemplateProfileModal = false
    },
    onAddModalOK (template) {
      // 更新框确定 关闭
      createTemplate(template).then((res) => {
        this.showTemplateAddModal = false
        this.pages._page = 1
        this.fetchData()
        if (res.data.code === 200) {
          this.$Message.success('创建成功！')
        } else {
          this.$Message.error('创建失败！')
        }
      })
    },
    onAddModalCancel () {
      this.showTemplateAddModal = false
    },
    handleDelete (id) {
      deleteTemplate(id).then(res => {
        this.fetchData()
        if (res.data.code === 200) {
          this.$Message.success('删除成功！')
        } else {
          this.$Message.error('删除失败！')
        }
      })
    }
  },
  mounted: function () {
    queryTemplates({ ...this.pages, ...this.query }).then((resp) => {
      this.data = resp.data.templates
      this.total = resp.data.total
    })
  }
}
</script>

<style scoped>

</style>
