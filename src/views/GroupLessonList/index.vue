<template>
  <div>
    <h1>课程管理</h1>
    <br>
    <Tabs @on-click="onTypeTabClick">
      <TabPane label="全部" name="全部"></TabPane>
      <TabPane label="关注课程" name="关注课程"></TabPane>
      <TabPane label="自主听课" name="自主听课"></TabPane>
    </Tabs>
    <Table  @on-selection-change="selectLessons" border stripe :columns="columns" :data="data"></Table>
    <div style="float: right;">
      <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
    </div>
  </div>
</template>

<script>
  import LessonProfileModal from './components/LessonProfileModal'
  import BatchLessonWatchModal from './components/BatchLessonWatchModal'
  import {queryLessons, putLesson} from '../../service/api/lesson'
  import {queryTerms, getCurrentTerms} from '../../service/api/term'
  import  FloatBar from '../../components/float_bar/float_bar'
  export default {
    components:{},
    data: function() {
      return {

        query: {}, // 查询用的参数
        total: 0, // 总数量
        data: [], //数据
        terms: [],
        pages: {
          _page: 1,
          _per_page: 10
        }, //分页
        columns: [
          {
            title: '课程名字',
            render: function (h, params) {
              return (
                <span>{ params.row.lesson_name }</span>
            )
            }
          },
          {
            title: '课程属性',
            render: function (h, params) {
              return (
                <span>{ params.row.lesson_attribute }</span>
            )
            }
          },
          {
            title: '课程状态',
            render: function (h, params) {
              return (
                <span>{ params.row.lesson_state }</span>
            )
            }
          },
          {
            title: '课程级别',
            render: function (h, params) {
              return (
                <span>{ params.row.lesson_level }</span>
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
                      this.selected_lesson_id = params.row.id;
                      this.showLessonProfileModal=true
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
        queryLessons(args).then((resp)=>{
          this.selected_lesson_ids = []
          this.data = resp.data.lessons;
          this.total = resp.data.total;
          this.$router.push({path: '/lesson/manager', query: {...args, ...this.query}});
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
      onTypeTabClick: function (name) {
        // 切换标签触发
        if (name === "全部") {
          this.query.lesson_level = undefined
        } else  {
          this.query.lesson_level = name
        }
        this.pages._page = 1;
        this.onTableChange(this.query, this.pages)
      },
    },
    mounted: function () {
      const args = this.$route.query;
      queryTerms().then((resp)=>{
        this.terms = resp.data.terms
      });
      getCurrentTerms().then((termResp)=>{
        this.query.term = termResp.data.term.name;
        queryLessons( {...args, ...this.pages}).then((resp)=>{
          this.data = resp.data.lessons;
          this.total = resp.data.total;
          this.$router.push({path: '/lesson/manager', query: {...args, ...this.query}});
        })
      });

    }
  }
</script>

<style scoped>

</style>
