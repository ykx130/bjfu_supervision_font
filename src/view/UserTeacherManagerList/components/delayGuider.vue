<template>
  <div>

    <h1>督导续约</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <Form :label-width="80" :model="query" inline>
        <FormItem label="用户名字：" prop="name">
          <Input style="width: 180px" v-model="query.name" ></Input>
        </FormItem>

        <FormItem label="学期：" prop="term">
          <Select v-model="query.term" style="width:200px">
            <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
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

    <Modal
      :value="showDelayGuiderModal"
      @on-ok="onDelayGuiderModalOK"
      @on-cancel="()=>{this.showDelayGuiderModal = false}"
    >
      选中用户将被续约
    </Modal>

  <Table border stripe :columns="columns" :data="data"  @on-selection-change="selectGuider"></Table>
  <div style="margin: 10px;overflow: hidden">
    <div style="float: right;">
      <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
    </div>
  </div>

    <FloatBar><Button type="primary" @click="onShowDelayGuiderClick">批量续约</Button>
    </FloatBar>
  </div>

</template>

<script>
import { queryRoles} from '../../../service/api/user'
import UserProfileModal from './UserProfileModal'
import UserAddModal from './UserAddModal'
import FloatBar from '_c/float_bar/float_bar'
import {queryTerms, getCurrentTerms} from '../../../service/api/term'
import {queryUsers, putUser, postUser} from '../../../service/api/user'
export default {
  components: {UserProfileModal, UserAddModal, FloatBar},
  data: function () {
    return {
      query: {
        term: '',
        user_roles: {term: ''}
      }, // 查询用的参数
      total: 0, // 总数量
      data: [], // 数据
      terms: [],
      selected_guider_ids: [],
      selected_username: '', // 选中编辑的用户的name
      showUserProfileModal: false, // 展示编辑弹窗
      showUserAddModal: false,
      showDelayGuiderModal: false,
      pages: {
        _page: 1,
        _per_page: 10
      }, // 分页
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '名字',
          key: 'name'
        },
        {
          title: '身份',
          render: function (h, params) {
            let tags = params.row.roles.map((item) => {
              return h('Tag', item)
            })
            return h('span', tags)
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
      queryUsers(args).then((resp) => {
        this.data = resp.data.users
        this.total = resp.data.total
        this.$router.push({path: '/user/guiders', query: query})
      })
    },
    onPageChange (page) {
      // 分页变化
      this.pages._page = page
      this.onTableChange(this.query, this.pages)
    },
    onSearch (query) {
      // 查询变化 当点提交查询条件生效
      this.pages._page = 1
      this.onTableChange(query, this.pages)
    },
    onProfileModalOK (user) {
      // 更新框确定 关闭
      putUser(user).then((resp) => {
        this.showUserProfileModal = false
      })
    },
    onProfileModalCancel () {
      this.showUserProfileModal = false
    },
    onAddModalOK (user) {
      // 更新框确定 关闭
      postUser(user).then((resp) => {
        this.showUserAddModal = false
      })
    },
    onAddModalCancel () {
      this.showUserAddModal = false
    },
    selectGuider (selection) {
      this.selected_guider_ids = selection.map((item) => {
        return item.username
      })
    },
    onDelayGuiderModalOK () {
      console.log('续约')
      this.showDelayGuiderModal = false
    },
    onShowDelayGuiderClick () {
      this.showDelayGuiderModal = true
    }
  },
  mounted: function () {
    let args = this.$route.query
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })
    getCurrentTerms().then((termResp) => {
      this.query.user_roles.term = termResp.data.term.name
      queryUsers({...args, ...this.query}).then((resp) => {
        this.data = resp.data.users
        this.total = resp.data.total
        this.$router.push({path: '/user/teachers', query: {...args, ...this.query}})
      })
    })
  }
}
</script>

<style scoped>

</style>
