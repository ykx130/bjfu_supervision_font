<template>
  <Card>
    <h1>学院负责人管理</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <Form :label-width="80" :model="query" inline>
        <FormItem label="用户名字：" prop="name">
          <AutoComplete style="width: 180px" v-model="query.name" placeholder="请输入用户名字">
            <Option v-for="d in data" :value="d.username" :key="d.username">{{ d.username }}</Option>
          </AutoComplete>
        </FormItem>
        <FormItem >
          <Button type="primary" @click="onSearch(query)">查询</Button>
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
    <Button  type="primary" @click="(e)=>{this.showUserAddModal=true}" >
      新增
    </Button>
  </Card>
</template>

<script>
import UserProfileModal from './components/UserProfileModal'
import UserAddModal from './components/UserAddModal'
import {updateWithinField} from 'Libs/tools'
import {queryUsers, putUser, postUser} from '../../service/api/user'
export default {
  components: {UserProfileModal, UserAddModal},
  data: function () {
    return {
      query: {
        user_roles: {term: undefined},
        name:undefined
      }, // 查询用的参数
      total: 0, // 总数量
      data: [], // 数据
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
        // {
        //   title: '操作',
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Button', {
        //         props: {
        //           type: 'primary',
        //           size: 'small'
        //         },
        //         style: {
        //           marginRight: '2px'
        //         },
        //         on: {
        //           click: () => {
        //             this.selected_username = params.row.username
        //
        //             this.showUserProfileModal = true
        //           }
        //         }
        //       }, '查看')
        //     ])
        //   }
        // }
      ]
    }
  },
  methods: {
    onTableChange (query, pages) {
      // 数据表发生变化请求数据
      let args = {...query, ...pages}
      queryUsers(args).then((resp) => {
        this.data = resp.data.users
        this.total = resp.data.total
        this.$router.push({path: '/user/supers', query: query})
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
    onProfileModalOK (user) {
      // 更新框确定 关闭
      putUser(user).then((resp) => {
        this.showUserProfileModal = false
        this.onTableChange(this.query, this.pages)
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
        this.onTableChange(this.query, this.pages)
      })
    },
    onAddModalCancel () {
      this.showUserAddModal = false
    }
  },
  mounted: function () {
    const args = this.$route.query
    updateWithinField(this.query, args)
    updateWithinField(this.pages, args)
    queryUsers({ ...this.query, ...this.pages}).then((resp) => {
      this.data = resp.data.users
      this.total = resp.data.total
      this.$router.push({path: '/user/supers', query: { ...this.query, ...this.pages}})
    })
  }
}
</script>

<style scoped>

</style>
