<template>
  <div>
    <h1>活动报名</h1>
    <br>
    <Tabs @on-click="onTypeTabClick">
      <TabPane label="可报名" name="可报名"></TabPane>
      <TabPane label="已报名" name="已报名"></TabPane>
    </Tabs>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="活动名称：" prop="activity">
        <Input style="width: 180px" v-model="query.name" ></Input>
      </FormItem>
      <FormItem label="学期：" :prop="'activity.term'">
        <Select v-model="query.term" style="width:200px">
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem >
        <Button type="primary" @click="onSearch(query)">查询</Button>
      </FormItem>
    </Form>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import {queryActives, putActive, postActive} from '../../service/api/actives'
  import {queryTerms, getCurrentTerms} from '../../service/api/term'
  export default {
    components:{},
    data: function() {
      return {
        select_tag: '可报名',
        query: {}, // 查询用的参数
        total: 0, // 总数量
        data: [], //数据
        terms: [],
        selected_activity_id:"", //选中编辑的课程ids
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

                    }
                  }
                }, '报名')
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
      onTypeTabClick(value) {
        this.select_tag = value
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
          this.$router.push({path: '/attend', query: {...args, ...this.query}});
        })
      })
    }
  }
</script>

<style scoped>

</style>

