<template>
  <Card>
    <Tabs :value="selected_group_name" @on-click="onTypeTabClick">
      <TabPane v-for="(item, index) in groups" :label="item.name" :name="item.name" :key="item.name + index"></TabPane>
    </Tabs>
  </Card>
</template>

<script>
  import {queryLessons, putLesson} from '../../service/api/lesson'
  import {queryTerms, getCurrentTerms} from '../../service/api/term'
  import {queryGroups} from '../../service/api/user'
  import  FloatBar from '../../components/float_bar/float_bar'
  export default {
    components:{},
    data: function() {
      return {

        query: {}, // 查询用的参数
        total: 0, // 总数量
        data: [], //数据
        terms: [],
        groups:[],
        selected_group_name: '',
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
          this.data = resp.data.lessons;
          this.total = resp.data.total;
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
        this.selected_group_name = name
        this.onTableChange(this.query, this.pages)
      },
    },
    mounted: function () {
      const args = this.$route.query;
      queryTerms().then((resp)=>{
        this.terms = resp.data.terms
      });
      queryGroups().then((resp)=>{
        this.groups = resp.data.groups
        this.selected_group_name = this.groups[0].name
      })
      getCurrentTerms().then((termResp)=>{
        this.query.term = termResp.data.term.name;
      });

    }
  }
</script>

<style scoped>

</style>
