<template>
  <div>

    <br>
    <Form :label-width="80" :model="query" inline>
      <Form :label-width="80" :model="query" inline>
        <FormItem label="用户名字：" prop="name">
          <AutoComplete style="width: 180px" v-model="query.name_like" placeholder="请输入用户名字">
            <Option v-for="d in data" :value="d.username" :key="d.username">{{ d.username }}</Option>
          </AutoComplete>
        </FormItem>

        <FormItem label="学期：" prop="term">
          <Select v-model="query.term" style="width:200px">
            <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
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
  </div>

</template>

<script>
import UserProfileModal from './UserProfileModal'
import {updateWithinField} from 'Libs/tools'
import UserAddModal from './UserAddModal'
import {queryTerms, getCurrentTerms} from '../../../service/api/term'
import {querySupervisors, putUser, postUser,postSupervisors} from '../../../service/api/user'
export default {
  components: {UserProfileModal, UserAddModal},
  data: function () {
    return {
      query: {
        term: '',
        name_like: undefined
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
          title: '工作状态',
          render: function (h, params) {
            return h('span', params.row.guider.work_state)
          }
        },

        {
          title: '小组长',
          width: 75,
          render: function (h, params) {
            if (params.row.guider.is_grouper){
              return h('Icon', {props:{
                  type:"md-checkmark-circle"
                },
                style: {
                  color: "#19be6b",
                  fontSize: '30px',
                  textAlign: 'center'
                }
              })
            } else {
              return h('span')
            }
          }
        },
        {
          title: '大组长',
          width: 75,
          render: function (h, params) {
            if (params.row.guider.is_main_grouper){
              return h('Icon', {props:{
                  type:"md-checkmark-circle",
                },
                style: {
                  color: "#19be6b",
                  fontSize: '30px',
                  textAlign: 'center'
                }
              })
            } else {
              return h('span')
            }
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
     fetchData() {
      // 数据表发生变化请求数据
       let args = {...this.query, ...this.pages}
      querySupervisors(args).then((resp) => {
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
        this.pages._page = 1
        this.fetchData( )
        this.showUserProfileModal = false
      })
    },
    onProfileModalCancel () {
      this.showUserProfileModal = false
    },
    onAddModalOK (user) {
      // 更新框确定 关闭
      user.term =this.query.term
      postSupervisors(user).then((resp) => {
        this.pages._page = 1
        this.fetchData( )
        this.showUserAddModal = false
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
    getCurrentTerms().then((termResp) => {
      this.query.term = termResp.data.term.name
      querySupervisors({ ...this.query, ...this.pages}).then((resp) => {
        this.data = resp.data.users
        this.total = resp.data.total
      })
    })
  }
}
</script>

<style scoped>

</style>
