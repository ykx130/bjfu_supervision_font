<template>
  <Card>
    <h1>关注课程</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="课程名字：" prop="lesson_name">
        <Input style="width: 180px" v-model="query.lesson_name_like" placeholder="请输入课程名字">
        </Input>
      </FormItem>
      <FormItem label="教师姓名：" prop="lesson_teacher_name">
        <Input style="width: 180px" v-model="query.lesson_teacher_name_like" placeholder="请输入教师姓名">
        </Input>
      </FormItem>
      <FormItem label="学期：" prop="term" v-role ="['管理员']">
        <Select v-model="query.term" style="width:200px">
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem >
        <Button type="primary" @click=" onSearch">查询</Button>
      </FormItem>
      <!--
      <FormItem >
        <Button @click="onExportExcel" icon="ios-cloud-download-outline" type="primary" >导出</Button>
      </FormItem>
      <FormItem >
        <Upload :action="uploadNoticeLessonApi"
                :on-success="handleImportExcelSucc"
                :show-upload-list="false"
                name="filename">
          <Button  icon="ios-cloud-upload-outline" type="primary" >导入</Button>
        </Upload>
      </FormItem>
      -->
    </Form>

<!--    <LessonProfileModal-->
<!--      :show="showLessonProfileModal"-->
<!--      @onOK="onProfileModalOK"-->
<!--      @onCancel="onProfileModalCancel"-->
<!--      :lesson_id="this.selected_lesson_id"-->
<!--    ></LessonProfileModal>-->

    <BatchLessonWatchModal
      :show="showBatchLessonWatchModal"
      @onOK="onBatchRemoveModalOK"
      @onCancel="onBatchRemoveModalCancel"
    ></BatchLessonWatchModal>

    <Table  @on-selection-change="selectLessons" border stripe :columns="columns" :data="data"></Table>
    <Row >
      <Page style="float: right;" :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
    </Row>
    <FloatBar>
      <!--<Button type="error" @click="onBatchWatchClick">批量取消关注</Button>-->
    </FloatBar>
  </Card>
</template>

<script>
import LessonProfileModal from './components/LessonProfileModal'
import BatchLessonRemoveModal from './components/BatchLessonWatchModal'
import { queryNoticeLessons, putLesson, uploadNoticeLessonApi, putNoticeLesson, exporNoticeLessonExcel } from '@/service/api/lesson'
import { queryTerms, getCurrentTerms } from '../../service/api/term'
import FloatBar from '_c/float_bar/float_bar'
import { updateWithinField } from 'Libs/tools'
import LessonJudge from 'Views/components/lesson_judge/lesson_judge'
import FormMixin from '@/mixins/FormMixin.js'
import { queryNoticeTeacher } from '../../service/api/lesson'

export default {
  components: { LessonJudge, LessonProfileModal, FloatBar, BatchLessonWatchModal: BatchLessonRemoveModal },
  mixins: [FormMixin],
  data: function () {
    return {
      uploadNoticeLessonApi: uploadNoticeLessonApi,
      query: {
        lesson_name_like: undefined,
        term: undefined
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
            return h(LessonJudge, {
              props: {
                lesson_teacher_id: params.row.lesson_teacher_id
              }
            })
          }
        },
        {
          title: '教师名字',
          render: function (h, params) {
            return (
              <span>{ params.row.lesson_teacher_name }</span>
            )
          }
        },
        {
          title: '上课学院',
          render: function (h, params) {
            return h('span', params.row.lesson_teacher_unit)
          }
        }
      ]
    }
  },
  methods: {
    fetchData () {
      // 数据表发生变化请求数据
      let args = { ...this.query, ...this.pages }
      return queryNoticeTeacher(args).then((res) => {
        this.data = res.data.teachers
        this.total = res.data.total
      })
      // return queryNoticeLessons(args).then((resp) => {
      //   this.selected_lesson_ids = []
      //   this.data = resp.data.notice_lessons
      //   this.total = resp.data.total
      // })
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
    onBatchRemoveModalOK (lesson) {
      this.showBatchLessonWatchModal = false
    },
    onBatchRemoveModalCancel () {
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
    }
  },
  mounted: function () {
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })
    getCurrentTerms().then((termResp) => {
      this.query.term = termResp.data.term.name
      queryNoticeTeacher({ ...this.pages, ...this.query }).then((res) => {
        this.data = res.data.teachers
        this.total = res.data.total
      })
      // queryNoticeLessons({ ...this.pages, ...this.query }).then((resp) => {
      //   this.data = resp.data.notice_lessons
      //   this.total = resp.data.total
      // })
    })
  }

}
</script>

<style scoped>

</style>
