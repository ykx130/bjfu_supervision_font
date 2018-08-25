<!--<template>-->
  <!--<div>-->
  <!--<div>-->
    <!--<h1>活动详情</h1>-->
  <!--</div>-->
    <!--<Form :label-width="80" :model="query" inline>-->
      <!--<Form :label-width="80" :model="query" inline>-->

        <!--<FormItem label="学期：">-->
          <!--<Select v-model="query.user_roles.term" style="width:200px">-->
            <!--<Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>-->
          <!--</Select>-->
        <!--</FormItem>-->

        <!--<FormItem >-->
          <!--<Button type="primary" @click="onSearch(query)">查询</Button>-->
        <!--</FormItem>-->
      <!--</Form>-->
    <!--</Form>-->
    <!--<ActivesProfileModal-->
      <!--:show="showActiveProfileModal"-->
      <!--@onOK="onProfileModalOK"-->
      <!--@onCancel="onProfileModalCancel"-->
      <!--:username="this.selected_username">-->
    <!--</ActivesProfileModal>-->

    <!--<ActivesAddModal @onOk="addActives">-->

    <!--</ActivesAddModal>-->
    <!--<div>{{this.activity}}</div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import ActivesProfileModal from './components/ActivesProfileModal'-->
  <!--import ActivesAddModal from './components/ActivesAddModal'-->
  <!--import {queryTerms, getCurrentTerms} from '../../service/api/term'-->
  <!--export default {-->
    <!--components:{ActivesAddModal,ActivesProfileModal},-->
  <!--data: function() {-->
    <!--return {-->
      <!--query: {-->
        <!--user_roles: {term: ""}-->
      <!--}, // 查询用的参数-->
      <!--total: 0, // 总数量-->
      <!--data: [], //数据-->
      <!--terms:[],-->
      <!--activity:{},-->
      <!--showActiveProfileModal:false,-->
    <!--//   selected_username:"", //选中编辑的用户的name-->
    <!--//   showUserProfileModal: false, // 展示编辑弹窗-->
    <!--//   showUserAddModal: false,-->
    <!--//   pages: {-->
    <!--//     _page: 1,-->
    <!--//     _per_page: 10-->
    <!--//   }, //分页-->
    <!--//   columns: [-->
    <!--//     {-->
    <!--//       title: '用户名',-->
    <!--//       key: 'username'-->
    <!--//     },-->
    <!--//     {-->
    <!--//       title: '名字',-->
    <!--//       key: 'name'-->
    <!--//     },-->
    <!--//     {-->
    <!--//       title: '身份',-->
    <!--//       render: function (h, params) {-->
    <!--//         let tags = params.row.role_names.map((item)=>{-->
    <!--//           return h('Tag', item)-->
    <!--//         })-->
    <!--//         return h('span',tags)-->
    <!--//       }-->
    <!--//     },-->
    <!--//     {-->
    <!--//       title: '小组',-->
    <!--//       render: function (h, params) {-->
    <!--//         return h('span',params.row.group)-->
    <!--//       }-->
    <!--//     },-->
    <!--//     {-->
    <!--//       title: '操作',-->
    <!--//       align: 'center',-->
    <!--//       render: (h, params) => {-->
    <!--//         return h('div', [-->
    <!--//           h('Button', {-->
    <!--//             props: {-->
    <!--//               type: 'primary',-->
    <!--//               size: 'small'-->
    <!--//             },-->
    <!--//             style: {-->
    <!--//               marginRight: '2px'-->
    <!--//             },-->
    <!--//             on: {-->
    <!--//               click: () => {-->
    <!--//                 this.selected_username = params.row.username-->
    <!--//-->
    <!--//                 this.showUserProfileModal=true-->
    <!--//               }-->
    <!--//             }-->
    <!--//           }, '查看')-->
    <!--//         ]);-->
    <!--//       }-->
    <!--//     }-->
    <!--//   ]-->
    <!--}-->
  <!--},-->
  <!--methods: {-->
    <!--addActives:function(value){-->
      <!--this.activity={};-->
      <!--console.log("");-->
      <!--this.activity=value;-->

    <!--},-->

    <!--onTableChange(query, pages) {-->
      <!--//数据表发生变化请求数据-->
      <!--let args = {...query, ...pages};-->
      <!--queryUsers(args).then((resp)=>{-->
        <!--this.data = resp.data.users;-->
        <!--this.total = resp.data.total;-->
        <!--this.$router.push({path: '/user/guiders', query: query})-->
      <!--})-->
    <!--},-->
    <!--// onPageChange(page) {-->
    <!--//   //分页变化-->
    <!--//   this.pages._page = page;-->
    <!--//   this.onTableChange(this.query, this.pages)-->
    <!--// },-->
    <!--// onSearch(query) {-->
    <!--//   //查询变化 当点提交查询条件生效-->
    <!--//   this.pages._page = 1;-->
    <!--//   this.onTableChange(query, this.pages)-->
    <!--// },-->
    <!--onProfileModalOK(user) {-->
      <!--// 更新框确定 关闭-->
      <!--putUser(user).then((resp)=>{-->
        <!--this.showActiveProfileModal = false;-->
        <!--this.onTableChange(this.query, this.pages)-->
      <!--})-->
    <!--},-->
    <!--onProfileModalCancel() {-->
      <!--this.showActiveProfileModal = false-->
    <!--},-->
    <!--// onAddModalOK(user) {-->
    <!--//   // 更新框确定 关闭-->
    <!--//   postUser(user).then((resp)=>{-->
    <!--//     this.showUserAddModal = false-->
    <!--//     this.onTableChange(this.query, this.pages)-->
    <!--//   })-->
    <!--// },-->
    <!--// onAddModalCancel() {-->
    <!--//   this.showUserAddModal = false-->
    <!--// }-->
  <!--},-->
  <!--mounted: function () {-->
    <!--let args = this.$route.query;-->
    <!--queryTerms().then((resp)=>{-->
      <!--this.terms = resp.data.terms-->
    <!--});-->
    <!--getCurrentTerms().then((termResp)=>{-->
      <!--this.query.user_roles.term = termResp.data.term.name-->
      <!--// queryUsers({...args, ...this.query}).then((resp)=>{-->
      <!--//   this.data = resp.data.users-->
      <!--//   this.total = resp.data.total-->
      <!--//   this.$router.push({path: '/user/guiders', query: {...args, ...this.query}})-->
      <!--// })-->
    <!--})-->
  <!--}-->
  <!--}-->
<!--</script>-->



<!--<template>-->
  <!--<div>-->
    <!--<h1>活动详情</h1>-->
    <!--<br>-->
    <!--<Form :label-width="80" :model="query" inline>-->
      <!--<Form :label-width="80" :model="query" inline>-->
        <!--<FormItem label="学期：">-->
          <!--<Select v-model="query.user_roles.term" style="width:200px">-->
            <!--<Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>-->
          <!--</Select>-->
        <!--</FormItem>-->

        <!--<FormItem >-->
          <!--<Button type="primary" @click="onSearch(query)">查询</Button>-->
        <!--</FormItem>-->
      <!--</Form>-->
    <!--</Form>-->

    <!--<ActiveProfileModal-->
      <!--v-if="showActiveProfileModal"-->
      <!--@onOK="onProfileModalOK"-->
      <!--@onCancel="onProfileModalCancel"-->
      <!--:id="this.selected_activityid"-->
    <!--&gt;</ActiveProfileModal>-->


    <!--&lt;!&ndash;<ActiveAddModal&ndash;&gt;-->
      <!--&lt;!&ndash;v-if="showActiveAddModal"&ndash;&gt;-->
      <!--&lt;!&ndash;@onOK="addActives"&ndash;&gt;-->
      <!--&lt;!&ndash;@onCancel="onAddModalCancel"&ndash;&gt;-->
    <!--&lt;!&ndash;&gt;</ActiveAddModal>&ndash;&gt;-->

    <!--<Table border stripe :columns="columns" :data="data"></Table>-->
    <!--<div style="margin: 10px;overflow: hidden">-->
      <!--<div style="float: right;">-->
        <!--<Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>-->
      <!--</div>-->
    <!--</div>-->
    <!--<Button type="primary" @click="()=>{this.showActiveAddModal=true}" >-->
      <!--新增-->
    <!--</Button>-->
    <!--{{this.showActiveAddModal}}-->
    <!--<ActiveAddModal-->
      <!--v-if="showActiveAddModal"-->
    <!--&gt;</ActiveAddModal>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import ActiveProfileModal from './components/ActivesProfileModal'-->
  <!--import ActiveAddModal from './components/ActivesAddModal'-->
  <!--import {queryTerms, getCurrentTerms} from '../../service/api/term'-->
  <!--import {queryActives, putActive, postActive} from '../../service/api/actives'-->
  <!--export default {-->
    <!--components:{ActiveProfileModal,ActiveAddModal},-->
    <!--data: function() {-->
      <!--return {-->
        <!--query: {-->
          <!--user_roles: {term: ""}-->
        <!--}, // 查询用的参数-->
        <!--total: 0, // 总数量-->
        <!--data: [], //数据-->
        <!--terms:[],-->
        <!--selected_activityid:"", //选中编辑的活动的id-->
        <!--showActiveProfileModal: false, // 展示编辑弹窗-->
        <!--showActiveAddModal: false,-->
        <!--pages: {-->
          <!--_page: 1,-->
          <!--_per_page: 10-->
        <!--}, //分页-->
        <!--columns: [-->
          <!--{-->
            <!--title: '活动ID',-->
            <!--key: 'id'-->
          <!--},-->
          <!--{-->
            <!--title: '活动名称',-->
            <!--key: 'name'-->
          <!--},-->
          <!--// {-->
          <!--//   title: '身份',-->
          <!--//   render: function (h, params) {-->
          <!--//     let tags = params.row.role_names.map((item)=>{-->
          <!--//       return h('Tag', item)-->
          <!--//     })-->
          <!--//     return h('span',tags)-->
          <!--//   }-->
          <!--// },-->
          <!--// {-->
          <!--//   title: '小组',-->
          <!--//   render: function (h, params) {-->
          <!--//     return h('span',params.row.group)-->
          <!--//   }-->
          <!--// },-->
          <!--{-->
            <!--title: '操作',-->
            <!--align: 'center',-->
            <!--render: (h, params) => {-->
              <!--return h('div', [-->
                <!--h('Button', {-->
                  <!--props: {-->
                    <!--type: 'primary',-->
                    <!--size: 'small'-->
                  <!--},-->
                  <!--style: {-->
                    <!--marginRight: '2px'-->
                  <!--},-->
                  <!--on: {-->
                    <!--click: () => {-->
                      <!--this.selected_activityid = params.row.id;-->

                      <!--this.showActiveProfileModal=true-->
                    <!--}-->
                  <!--}-->
                <!--}, '查看')-->
              <!--]);-->
            <!--}-->
          <!--}-->
        <!--]-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--addActives:function(value){-->
        <!--this.activity={};-->
        <!--console.log("");-->
        <!--this.activity=value;-->
        <!--},-->
      <!--onTableChange(query, pages) {-->
        <!--//数据表发生变化请求数据-->
        <!--let args = {...query, ...pages};-->
        <!--queryActives(args).then((resp)=>{-->
          <!--this.data = resp.data.activites;-->
          <!--this.total = resp.data.total;-->
          <!--this.$router.push({path: '/user/guiders', query: query})-->
        <!--})-->
      <!--},-->
      <!--onPageChange(page) {-->
        <!--//分页变化-->
        <!--this.pages._page = page;-->
        <!--this.onTableChange(this.query, this.pages)-->
      <!--},-->
      <!--onSearch(query) {-->
        <!--//查询变化 当点提交查询条件生效-->
        <!--this.pages._page = 1;-->
        <!--this.onTableChange(query, this.pages)-->
      <!--},-->
      <!--onProfileModalOK(activity) {-->
        <!--// 更新框确定 关闭-->
        <!--putActive(activity).then((resp)=>{-->
          <!--this.showActiveProfileModal = false;-->
          <!--this.onTableChange(this.query, this.pages)-->
        <!--})-->
      <!--},-->
      <!--onProfileModalCancel() {-->
        <!--this.showActiveProfileModal = false-->
      <!--},-->
      <!--onAddModalOK(activity) {-->
        <!--// 更新框确定 关闭-->
        <!--postActive(activity).then((resp)=>{-->
          <!--this.showActiveAddModal = false-->
          <!--this.onTableChange(this.query, this.pages)-->
        <!--})-->
      <!--},-->
      <!--onAddModalCancel() {-->
        <!--this.showActiveAddModal = false-->
      <!--}-->
    <!--},-->
    <!--mounted: function () {-->
      <!--let args = this.$route.query;-->
      <!--queryTerms().then((resp)=>{-->
        <!--this.terms = resp.data.terms-->
      <!--});-->
      <!--getCurrentTerms().then((termResp)=>{-->
        <!--this.query.user_roles.term = termResp.data.term.name;-->
        <!--queryActives({...args, ...this.query}).then((resp)=>{-->
          <!--this.data = resp.data.activites;-->
          <!--this.total = resp.data.total;-->
          <!--this.$router.push({path: '/user/guiders', query: {...args, ...this.query}})-->
        <!--})-->
      <!--})-->
    <!--}-->
  <!--}-->
<!--</script>-->

<template>
  <div>
    <h1>活动管理</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="活动名称：" prop="activity">
        <Input style="width: 180px" v-model="query.name" ></Input>
      </FormItem>
      <FormItem label="学期：" :prop="'activity.term'">
        <Select v-model="query.term" style="width:200px">
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <!--<FormItem label="教师：" prop="teacher">-->
        <!--<Input style="width: 180px" v-model="query.teacher" ></Input>-->
      <!--</FormItem>-->
      <FormItem >
        <Button type="primary" @click="onSearch(query)">查询</Button>
      </FormItem>
    </Form>

    <!--<ActivesProfileModal-->
      <!--:show="showActivityProfileModal"-->
      <!--@onOK="onProfileModalOK"-->
      <!--@onCancel="onProfileModalCancel"-->
      <!--:activity_id="this.selected_activity_id"-->
    <!--&gt;</ActivesProfileModal>-->

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
      </div>
    </div>
    <ActivesAddModal></ActivesAddModal>
  </div>
</template>

<script>
  import ActivesProfileModal from './components/ActivesProfileModal'
  import ActivesAddModal from'./components/ActivesAddModal'
  import {queryActives, putActive} from '../../service/api/actives'
  import {queryTerms, getCurrentTerms} from '../../service/api/term'
  export default {
    components:{ActivesProfileModal,ActivesAddModal},
    data: function() {
      return {
        query: {}, // 查询用的参数
        total: 0, // 总数量
        data: [], //数据
        terms: [],
        selected_activity_id:"", //选中编辑的课程ids
        showActivityProfileModal: false, // 展示编辑弹窗
        pages: {
          _page: 1,
          _per_page: 10
        }, //分页
        columns: [
          {
            title: '活动名称',
            render: function (h, params) {
              return (
                <span>{ params.row.name }</span>
            )
            }
          },
          {
            title: '活动地点',
            render: function (h, params) {
              return (
                <span>{ params.row.place }</span>
            )
            }
          },
          {
            title: '活动状态',
            render: function (h, params) {
              return (
                <span>{ params.row.state }</span>
            )
            }
          },
          {
            title: '开始时间',
            render: function (h, params) {
              return (
                <span>{ params.row.start_time }</span>
            )
            }
          },
          {
            title: '结束时间',
            render: function (h, params) {
              return (
                <span>{ params.row.end_time }</span>
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
                      this.selected_activity_id = params.row.id;
                      // this.showActivityProfileModal=true;
                      // const route=this.selected_activity_id;
                      // this.$router.push({path: `:id/${route}`})
                      this.$router.push({path: ':id/',query:{id:this.selected_activity_id} });
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
        queryActives(args).then((resp)=>{
          this.data = resp.data.activities;
          this.total = resp.data.total;
          this.$router.push({path: '/active/help', query: {...args, ...this.query}});
        })
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
      onProfileModalOK(activity) {
        // 更新框确定 关闭
        putActive(activity).then((resp)=>{
          this.showActivityProfileModal = false
        })
      },
      onProfileModalCancel() {
        this.showActivityProfileModal = false
      }
    },
    mounted: function () {
      const args = this.$route.query;
      queryTerms().then((resp)=>{
        this.terms = resp.data.terms
      });
      getCurrentTerms().then((termResp)=>{
        this.query.term = termResp.data.term.name;
        queryActives(args).then((resp)=>{
            this.data = resp.data.activities;
            this.total = resp.data.total;
            this.$router.push({path: '/active/help', query: {...args, ...this.query}});
        })
      })
    }
  }
</script>

<style scoped>

</style>

