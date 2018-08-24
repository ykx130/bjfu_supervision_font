<template>
  <div>
    <h1>课程管理</h1>
    <br>
    <Tabs @on-click="onTypeTabClick">
      <TabPane label="全部" name="全部"></TabPane>
      <TabPane label="关注课程" name="关注课程"></TabPane>
    </Tabs>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="课程名字：" prop="lesson_name">
        <Input style="width: 180px" v-model="query.lesson_name" ></Input>
      </FormItem>
      <FormItem label="学期：" prop="term">
        <Select v-model="query.term" style="width:200px">
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="教师：" prop="lesson_teacher_name">
        <Input style="width: 180px" v-model="query.lesson_teacher_name" ></Input>
      </FormItem>
      <FormItem >
        <Button type="primary" @click="onSearch(query)">查询</Button>
        </FormItem>
    </Form>

    <LessonProfileModal
      :show="showLessonProfileModal"
      @onOK="onProfileModalOK"
      @onCancel="onProfileModalCancel"
      :lesson_id="this.selected_lesson_id"
    ></LessonProfileModal>

    <Table  @on-selection-change="selectLessons" border stripe :columns="columns" :data="data"></Table>
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
      </div>
    <FloatBar><Button type="primary" @click="onBatchWatchClick">批量关注课程</Button>
    </FloatBar>
  </div>
</template>

<script>
  import LessonProfileModal from './components/LessonProfileModal'
  import {queryLessons, putLesson} from '../../service/api/lesson'
  import {queryTerms, getCurrentTerms} from '../../service/api/term'
  import  FloatBar from '../../components/float_bar/float_bar'
  export default {
    components:{LessonProfileModal, FloatBar},
    data: function() {
      return {

        query: {}, // 查询用的参数
        total: 0, // 总数量
        data: [], //数据
        terms: [],
        selected_lesson_ids: [],
        selected_lesson_id:"", //选中编辑的课程ids
        showLessonProfileModal: false, // 展示编辑弹窗
        pages: {
          _page: 1,
          _per_page: 10
        }, //分页
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
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
      onProfileModalOK(lesson) {
        // 更新框确定 关闭
        putLesson(lesson).then((resp)=>{
          this.showLessonProfileModal = false
        })
      },
      onProfileModalCancel() {
        this.showLessonProfileModal = false
      },
      selectLessons: function (selection) {
        // 批量选择触发
        this.selected_lesson_ids = selection.map((item)=>{
          return item.id
        })
      },
      onBatchWatchClick: function () {
        // 批量关注触发
        console.log("selected lessons id : ", this.selected_lesson_ids)
      },
      onTypeTabClick: function (name) {
        // 切换标签触发
        if (name === "全部") {
          this.query.lesson_level = undefined
        } else if (name === "关注课程") {
          this.query.lesson_level = "关注课程"
        }
        this.pages._page = 1;
        this.onTableChange(this.query, this.pages)
      }
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
