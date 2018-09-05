<template>
  <Card>
    <h1>咨询管理</h1>
    <br>
    <Tabs @on-click="onTypeTabClick">
      <TabPane label="未协调" name="未协调"></TabPane>
      <TabPane label="已协调" name="已协调"></TabPane>
    </Tabs>

    <Form :label-width="80" :model="query" inline>
      <FormItem label="学期：" prop="term">
        <Select v-model="query.term" style="width:200px">
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
        </FormItem>
      <FormItem >
        <Button type="primary" @click="onSearch(query)">查询</Button>
      </FormItem>
    </Form>

    <ConsultManagerModal
      :show="showConsultManagerModal"
      @onOK="onReplyModalOK"
      @onCancel="onReplyModalCancel"
      :id="this.selected_consult_id"
    ></ConsultManagerModal>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
      </div>
    </div>
  </Card>
</template>

<script>
  import {queryTerms, getCurrentTerms} from '../../service/api/term'
  import {queryConsults,putConsults,postConsults} from '../../service/api/consult'
  import ConsultManagerModal from './components/ConsultManagerModal'
  export default {
    components:{ConsultManagerModal},
    data: function() {
      return {
        select_tag: '已协调',
        query: {}, // 查询用的参数
        total: 0, // 总数量
        data: [], //数据
        terms: [],
        selected_consult_id:"", //选中答复的活动
        showConsultManagerModal: false, // 展示编辑弹窗
        pages: {
          _page: 1,
          _per_page: 10
        }, //分页
        columns: [
          {
            title: '序号',
            key: 'id'
          },
          {
            title: '咨询类型',
            render: function (h, params) {
              return (
                <span>{ params.row.type_id }</span>
            )
            }
          },
          {
            title: '申请人姓名',
            render: function (h, params) {
              return (
                <span>{ params.row.requester_username }</span>
            )
            }
          },
          {
            title: '提交时间',
            render: function (h, params) {
              return (
                <span>{ params.row.submit_time }</span>
            )
            }
          },
          {
            title: '学期',
            render: function (h, params) {
              return (
                <span>{ params.row.term }</span>
            )
            }
          },
          {
            title: '状态',
            render: function (h, params) {
              return (
                <span>{ params.row.state }</span>
            )
            }
          },
          {
            title: '联系方式',
            render: function (h, params) {
              return (
                <span>{ params.row.phone}</span>
            )
            }
          },
          {
            title: '回复时间',
            render: function (h, params) {
              return (
                <span>{ params.row.answer_time }</span>
            )
            }
          },
          {
            title: '回复人姓名',
            render: function (h, params) {
              return (
                <span>{ params.row.meta_description }</span>
            )
            }
          },
          {
            title: '回复内容',
            render: function (h, params) {
              return (
                <span>{ params.row.content }</span>
            )
            }
          },
          {
            title: '咨询详情',
            align: 'center',
            render: (h, params) => {
              return h('a', {
                on: {
                  click: () => {
                    this.selected_consult_id = params.row.id;
                    this.showConsultManagerModal=true
                  }
                }}, '详细信息');
            }
          },
        ]
      }
    },
    methods: {
      onTableChange(query, pages) {
        //数据表发生变化请求数据
        let args = {...query, ...pages};
        queryConsults(args).then((resp)=>{
          this.data = resp.data.consults;
          this.total = resp.data.total;
          this.$router.push({path: '/consult/manager', query: {...args, ...this.query}});
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
      onTypeTabClick(value) {
        this.select_tag = value
      },
      onReplyModalOK(consult) {
        // 更新框确定 关闭
        putConsults(consult).then((resp)=>{
          this.showConsultManagerModal = false
          this.onTableChange(this.query, this.pages)
        })
      },
      onReplyModalCancel() {
        this.showConsultManagerModal = false
      },
    },
    mounted: function () {
      const args = this.$route.query;
      queryTerms().then((resp)=>{
        this.terms = resp.data.terms
      });
      getCurrentTerms().then((termResp)=>{
        this.query.term = termResp.data.term.name;
        queryConsults({...args, ...this.query}).then((resp)=>{
          this.data = resp.data.consults;
          this.total = resp.data.total;
          this.$router.push({path: '/consult/manager', query: {...args, ...this.query}})
        })
      })
    }
  }
</script>

<style scoped>

</style>

