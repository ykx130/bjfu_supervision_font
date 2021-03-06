<template>
  <Card>
    <h1>课程管理</h1>
    <br>
    <Tabs @on-click="onTypeTabClick">
      <TabPane label="全部" name="全部"></TabPane>
      <TabPane label="关注课程" name="关注课程"></TabPane>
      <TabPane label="自主听课" name="自主听课"></TabPane>
    </Tabs>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="课程名字：" prop="lesson_name">
        <Input style="width: 180px" v-model="query.lesson_name_like" placeholder="请输入课程名字">
        </Input>
      </FormItem>
      <FormItem label="学期：" prop="term" v-role ="['管理员']">
        <Select v-model="query.term" style="width:200px">
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="教师：" prop="lesson_teacher_name">
        <TeacherSelector v-model="query.lesson_teacher_name"></TeacherSelector>
      </FormItem>
      <FormItem >
        <Button type="primary" @click=" onSearch">查询</Button>
        </FormItem>
    </Form>

    <LessonProfileModal
      :show="showLessonProfileModal"
      @onOK="onProfileModalOK"
      @onCancel="onProfileModalCancel"
      :lesson_id="this.selected_lesson_id"
    ></LessonProfileModal>

    <BatchLessonWatchModal
      :show="showBatchLessonWatchModal"
      @onOK="onBatchWatchModalOK"
      @onCancel="onBatchWatchModalCancel"
    ></BatchLessonWatchModal>

    <Table  @on-selection-change="selectLessons" border stripe :columns="columns" :data="data"></Table>
      <Row>
        <Page style="float: right" :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
      </Row>
    <div style="padding-bottom: 10px"></div>
    <!--<FloatBar><Button type="primary" @click="onBatchWatchClick">批量关注课程</Button>-->
    <!--</FloatBar>-->
  </Card>
</template>

<script>
import LessonProfileModal from './components/LessonProfileModal'
import BatchLessonWatchModal from './components/BatchLessonWatchModal'
import { queryLessons, putLesson } from '../../service/api/lesson'
import { queryTerms, getCurrentTerms } from '../../service/api/term'
import FloatBar from '_c/float_bar/float_bar'
import { updateWithinField } from 'Libs/tools'
import LessonJudgeForms from 'Views/components/lesson_judge/lesson_judge_forms'
import TeacherSelector from '@/view/components/teacher_selector'

export default {
  components: { LessonJudgeForms, LessonProfileModal, FloatBar, BatchLessonWatchModal, TeacherSelector },
  data: function () {
    return {
      query: {
        lesson_name: undefined,
        term: undefined,
        lesson_teacher_name: undefined
      }, // 查询用的参数
      total: 0, // 总数量
      data: [], // 数据
      terms: [],
      selected_lesson_ids: [],
      selected_lesson_id: '', // 选中编辑的课程ids
      showLessonProfileModal: false, // 展示编辑弹窗
      showBatchLessonWatchModal: false,

      pages: {
        _page: 1,
        _per_page: 10
      }, // 分页
      columns: [
        {
          type: 'expand',
          title: '评价',
          width: 70,
          render: (h, params) => {
            return h(LessonJudgeForms, {
              props: {
                lesson_id: params.row.lesson_id
              }
            })
          }
        },
        {
          title: '课程名字',
          render: function (h, params) {
            return h('span', params.row.lesson_name)
          }
        },
        {
          title: '课程属性',
          render: function (h, params) {
            return h('span', params.row.lesson_attribute)
          }
        },
        {
          title: '课程状态',
          render: (h, params) => {
            if (params.row.lesson_state === '未完成') {
              return h('Tag', { props: { color: 'red' } }, params.row.lesson_state)
            } else {
              return h('Tag', { props: { color: 'blue' } }, params.row.lesson_state)
            }
          }
        },
        {
          title: '课程级别',
          render: function (h, params) {
            return h('span', params.row.lesson_level)
          }
        },
        {
          title: '上课教师',
          render: function (h, params) {
            return h('span', params.row.lesson_teacher_name)
          }
        },
        {
          title: '上课学院',
          render: function (h, params) {
            return h('span', params.row.lesson_unit )
          }
        },
        {
          title: '上课班级',
          render: function (h, params) {
            return h('span', params.row.lesson_class )
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
              directives: [{
                name: 'role',
                value: ['管理员','大组长']
              }],
              style: {
                marginRight: '2px',
              },
              on: {
                click: () => {
                  this.selected_lesson_id = params.row.lesson_id
                  this.showLessonProfileModal = true
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
    fetchData () {
      // 数据表发生变化请求数据
      let args = { ...this.query, ...this.pages }
      return queryLessons(args).then((resp) => {
        this.selected_lesson_ids = []
        this.data = resp.data.lessons
        this.total = resp.data.total
      })
    },
    onPageChange (page) {
      // 分页变化
      this.pages._page = page
      this.fetchData()
    },
    onSearch () {
      // 查询变化
      this.pages._page = 1
      this.fetchData()

    },
    onProfileModalOK (lesson) {
      // 更新框确定 关闭
      putLesson(lesson).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({ content: '课程更新成功' })
          this.fetchData()
        }
        this.showLessonProfileModal = false
        this.pages._page = 1
      })
    },

    onProfileModalCancel () {
      this.showLessonProfileModal = false
    },
    onBatchWatchModalOK (lesson) {
      this.showBatchLessonWatchModal = false
    },
    onBatchWatchModalCancel () {
      this.showBatchLessonWatchModal = false
    },
    selectLessons: function (selection) {
      // 批量选择触发
      this.selected_lesson_ids = selection.map((item) => {
        return item.id
      })
    },
    onBatchWatchClick: function () {
      // 批量关注触发
      this.showBatchLessonWatchModal = true
      console.log('selected lessons id : ', this.selected_lesson_ids)
    },

    onTypeTabClick: function (name) {
      // 切换标签触发
      if (name === '全部') {
        this.query.lesson_level = undefined
      } else {
        this.query.lesson_level = name
      }
      this.pages._page = 1
      this.fetchData()
    }
  },
  mounted: function () {
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })
    getCurrentTerms().then((termResp) => {
      this.query.term = termResp.data.term.name
      queryLessons({ ...this.query, ...this.pages }).then((resp) => {
        this.data = resp.data.lessons
        this.total = resp.data.total
      })
    })
  }
}
</script>

<style scoped>

</style>
