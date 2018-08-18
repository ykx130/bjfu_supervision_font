<template>
  <div>
    <h1>大佬管理</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <Form :label-width="80" :model="query" inline>
        <FormItem label="用户名字：" prop="lesson">
          <Input style="width: 180px" v-model="query.lesson" ></Input>
        </FormItem>
      </Form>
    </Form>

    <UserProfileModal
      :show="showUserProfileModal"
      :onOK="onProfileModalOK"
      :onCancel="onProfileModalCancel"
      :username="this.selected_username"
    ></UserProfileModal>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import UserProfileModal from './components/ActivesProfileModal'
  import {queryUsers, putUser} from '../../service/api/user'
  export default {
    comments:[UserProfileModal],
    data: function() {
      return {
        query: {}, // 查询用的参数
        total: 0, // 总数量
        data: [], //数据
        selected_username:"", //选中编辑的用户的name
        showUserProfileModal: false, // 展示编辑弹窗
        pages: {
          _page: 1,
          _per_page: 10
        }, //分页
        columns: [
          {
            title: '用户名',
            render: function (h, params) {
              return (
                <span>{ params.row.meta.lesson }</span>
            )
            }
          },
          {
            title: '身份',
            render: function (h, params) {
              return (
                <span>{ params.row.meta.lesson }</span>
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
                      this.selected_username = params.username
                      this.showUserProfileModal=true
                    }
                  }
                }, '查看')
              ]);
            }
          }
        ]
      }
    },
    methods: {
      onTableChange(query, pages) {
        //数据表发生变化请求数据
        let args = {...query, ...pages};
      },
      onPageChange(page) {
        //分页变化
        this.pages._page = page;
        this.onTableChange(this.query, this.pages)
      },
      onSearch() {
        //查询变化
        this.pages._page = 1;
        this.onTableChange(this.query, this.pages)
      },
      onProfileModalOK(user) {
        // 更新框确定 关闭
        putUser(user).then((resp)=>{
          this.showUserProfileModal = false
        })
      },
      onProfileModalCancel() {
        this.showUserProfileModal = false
      }
    },
    mounted: function () {
      const args = this.$route.query;
      queryUsers(args).then((resp)=>{
        this.data = resp.users
      })
    }
  }
</script>

<style scoped>

</style>
