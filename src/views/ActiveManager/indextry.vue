<template>
  <div>
  <div>
    <h1>活动详情</h1>
  </div>
    <Form :label-width="80" :model="query" inline>
      <Form :label-width="80" :model="query" inline>

        <FormItem label="学期：">
          <Select v-model="query.user_roles.term" style="width:200px">
            <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </FormItem>

        <FormItem >
          <Button type="primary" @click="onSearch(query)">查询</Button>
        </FormItem>
      </Form>
    </Form>
    <ActivesProfileModal>

    </ActivesProfileModal>

    <ActivesAddModal @onOk="addActives">

    </ActivesAddModal>
    <div>{{this.activity}}</div>
  </div>
</template>

<script>
  import ActivesProfileModal from './components/ActivesProfileModal'
  import ActivesAddModal from './components/ActivesAddModal'
  import {queryTerms, getCurrentTerms} from '../../service/api/term'
  export default {
    components:{ActivesAddModal,ActivesProfileModal},
  data: function() {
    return {
      query: {
        user_roles: {term: ""}
      }, // 查询用的参数
      total: 0, // 总数量
      data: [], //数据
      terms:[],
      activity:{},
    //   selected_username:"", //选中编辑的用户的name
    //   showUserProfileModal: false, // 展示编辑弹窗
    //   showUserAddModal: false,
    //   pages: {
    //     _page: 1,
    //     _per_page: 10
    //   }, //分页
    //   columns: [
    //     {
    //       title: '用户名',
    //       key: 'username'
    //     },
    //     {
    //       title: '名字',
    //       key: 'name'
    //     },
    //     {
    //       title: '身份',
    //       render: function (h, params) {
    //         let tags = params.row.role_names.map((item)=>{
    //           return h('Tag', item)
    //         })
    //         return h('span',tags)
    //       }
    //     },
    //     {
    //       title: '小组',
    //       render: function (h, params) {
    //         return h('span',params.row.group)
    //       }
    //     },
    //     {
    //       title: '操作',
    //       align: 'center',
    //       render: (h, params) => {
    //         return h('div', [
    //           h('Button', {
    //             props: {
    //               type: 'primary',
    //               size: 'small'
    //             },
    //             style: {
    //               marginRight: '2px'
    //             },
    //             on: {
    //               click: () => {
    //                 this.selected_username = params.row.username
    //
    //                 this.showUserProfileModal=true
    //               }
    //             }
    //           }, '查看')
    //         ]);
    //       }
    //     }
    //   ]
    }
  },
  methods: {
    addActives:function(value){
      this.activity={};
      console.log("");
      this.activity=value;

    },
    // onTableChange(query, pages) {
    //   //数据表发生变化请求数据
    //   let args = {...query, ...pages};
    //   queryUsers(args).then((resp)=>{
    //     this.data = resp.data.users
    //     this.total = resp.data.total
    //     this.$router.push({path: '/user/guiders', query: query})
    //   })
    // },
    // onPageChange(page) {
    //   //分页变化
    //   this.pages._page = page;
    //   this.onTableChange(this.query, this.pages)
    // },
    // onSearch(query) {
    //   //查询变化 当点提交查询条件生效
    //   this.pages._page = 1;
    //   this.onTableChange(query, this.pages)
    // },
    // onProfileModalOK(user) {
    //   // 更新框确定 关闭
    //   putUser(user).then((resp)=>{
    //     this.showUserProfileModal = false
    //     this.onTableChange(this.query, this.pages)
    //   })
    // },
    // onProfileModalCancel() {
    //   this.showUserProfileModal = false
    // },
    // onAddModalOK(user) {
    //   // 更新框确定 关闭
    //   postUser(user).then((resp)=>{
    //     this.showUserAddModal = false
    //     this.onTableChange(this.query, this.pages)
    //   })
    // },
    // onAddModalCancel() {
    //   this.showUserAddModal = false
    // }
  },
  mounted: function () {
    let args = this.$route.query;
    queryTerms().then((resp)=>{
      this.terms = resp.data.terms
    });
    getCurrentTerms().then((termResp)=>{
      this.query.user_roles.term = termResp.data.term.name
      // queryUsers({...args, ...this.query}).then((resp)=>{
      //   this.data = resp.data.users
      //   this.total = resp.data.total
      //   this.$router.push({path: '/user/guiders', query: {...args, ...this.query}})
      // })
    })
  }
  }
</script>
