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
import UserProfileModal from './UserProfileModal'
import {updateWithinField} from 'Libs/tools'
import UserAddModal from './UserAddModal'
import FloatBar from '_c/float_bar/float_bar'
import {queryTerms, getCurrentTerms} from '../../../service/api/term'
import {querySupervisors, putUser, postUser, supervisorsRenew} from '../../../service/api/user'
export default {
  components: {UserProfileModal, UserAddModal, FloatBar},
  data: function () {
    return {
      query: {
        term: '',
        name_like:undefined
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
          title: '小组',
          render: function (h, params) {
            return h('span', params.row.guider.group)
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
      postUser(user).then((resp) => {
        this.pages._page = 1
        this.fetchData( )
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
      supervisorsRenew({usernames: this.selected_guider_ids}).then((resp)=>{
        this.showDelayGuiderModal = true
      })
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
