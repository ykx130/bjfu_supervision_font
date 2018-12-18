<template>
  <Card>
    <h1>用户管理</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <Form :label-width="80" :model="query" inline>
        <FormItem label="用户名字：" prop="name">
         <AutoComplete style="width: 180px" v-model="query.name_like" placeholder="请输入用户名字">
           <Option v-for="d in data" :value="d.username" :key="d.username">{{ d.username }}</Option>
         </AutoComplete>
        </FormItem>

        <FormItem >
          <Button type="primary" @click=" onSearch">查询</Button>
        </FormItem>
      </Form>
    </Form>

    <UserProfileModal
      :show="showUserProfileModal"
      @onOK="onProfileModalOK"
      @onCancel="onProfileModalCancel"
      :username="this.selected_username"
    ></UserProfileModal>

    <UserAddModal
      :show="showUserAddModal"
      @onOK="onAddModalOK"
      @onCancel="onAddModalCancel"
    ></UserAddModal>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
      </div>
    </div>
    <Button type="primary" @click="()=>{this.showUserAddModal=true}" >
      新增
    </Button>
  </Card>
</template>

<script>
import UserProfileModal from './components/UserProfileModal'
import UserAddModal from './components/UserAddModal'
import {queryTerms, getCurrentTerms} from '../../service/api/term'
import {queryUsers, putUser, postUser} from '../../service/api/user'
import {updateWithinField} from 'Libs/tools'

export default {
  components: {UserProfileModal, UserAddModal},
  data: function () {
    return {
      query: {
        name_like:undefined
      }, // 查询用的参数
      total: 0, // 总数量
      data: [], // 数据
      terms: [],
      selected_username: '', // 选中编辑的用户的name
      showUserProfileModal: false, // 展示编辑弹窗
      showUserAddModal: false,
      pages: {
        _page: 1,
        _per_page: 10
      }, // 分页
      columns: [
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '名字',
          key: 'name'
        },
        {
          title: '性别',
          key: 'sex'
        },
        {
          title: '学院',
          key: 'unit'
        },
        {
          title: '专业',
          key: 'skill'
        },
        {
          title: '职称',
          key: 'prorank'
        },
        {
          title: '在职状态',
          key: 'state'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '身份',
          minWidth: 80,
          render: function (h, params) {
            let tags = params.row.role_names.map((item) => {
              return h('Tag', item)
            })
            return h('span', tags)
          }
        },
        {
          title: '电子邮箱',
          key: 'email'
        },
        {
          title: '电话',
          key: 'phone'
        },
        {
          title: '大事件',
          align: 'center',
          render: (h, params) => {
            return h('a', {
              on: {
                click: () => {
                  this.$router.push({path: `/user/events/${params.row.username}`})
                }
              }}, '查看')
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
                    this.selected_username = params.row.username

                    this.showUserProfileModal = true
                  }
                }
              }, '修改')
            ])
          }
        }
      ]
    }
  },
  methods: {
     fetchData: function() {
      // 数据表发生变化请求数据
       let args = {...this.query, ...this.pages}
      queryUsers(args).then((resp) => {
        this.data = resp.data.users
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
    },
    onProfileModalOK (user) {
      // 更新框确定 关闭
      putUser(user).then((resp) => {
        this.showUserProfileModal = false
        this.pages._page = 1
        this.fetchData( )
      })
    },
    onProfileModalCancel () {
      this.showUserProfileModal = false
    },
    onAddModalOK (user) {
      // 更新框确定 关闭
      postUser(user).then((resp) => {
        this.showUserAddModal = false
        this.pages._page = 1
        this.fetchData( )
      })
    },
    onAddModalCancel () {
      this.showUserAddModal = false
    }
  },
  mounted: function () {
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })
    queryUsers({...this.pages, ...this.query}).then((resp) => {
      this.data = resp.data.users
      this.total = resp.data.total
    })
  }
}
</script>

<style scoped>

</style>
