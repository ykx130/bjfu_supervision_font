  <template>
  <Card>
    <h1>关注课程</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="教师名字：" prop="lesson_teacher_name">
        <Input style="width: 180px" v-model="query.lesson_teacher_name_like" placeholder="请输入教师姓名">
        </Input>
      </FormItem>
      <FormItem label="课程名字：" prop="lesson_name">
        <Input style="width: 180px" v-model="query.lesson_name_like" placeholder="请输入课程名字">
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
      <FormItem >
        <Button @click="onExportExcel" icon="ios-cloud-download-outline" type="primary" >导出</Button>
      </FormItem>
      <FormItem v-role ="['管理员']" >
        <Upload :action="uploadNoticeLessonApi"
                :on-success="handleImportExcelSucc"
                :show-upload-list="false"
                name="filename" style="display:inline-block;">
          <Button  icon="ios-cloud-upload-outline" type="primary" >导入</Button>
        </Upload>
        <a href="/api/static/template/notice_lesson_import_template.xlsx" download="关注课程导入模板.xlsx"
           style=" margin-left: 25px; display: inline-block;">
          关注课程导入模板下载</a>
      </FormItem>
    </Form>
    <LessonProfileModal
            :show="showLessonProfileModal"
            @onOK="onProfileModalOK"
            @onCancel="onProfileModalCancel"
            :lesson_teacher_id="this.selected_lesson_id"
    ></LessonProfileModal>

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
import UserMixin from '@/mixins/UserMixin'
import { deleteNoticeLesson, queryNoticeTeacher } from '../../service/api/lesson'

export default {
  mixins: [UserMixin],
  components: { LessonJudge, LessonProfileModal, FloatBar, BatchLessonWatchModal: BatchLessonRemoveModal },
  data: function () {
    return {
      uploadNoticeLessonApi: uploadNoticeLessonApi,
      query: {
        lesson_teacher_name_like: undefined,
        term: undefined
      }, // 查询用的参数
      total: 0, // 总数量
      data: [], // 数据
      terms: [],
      showLessonProfileModal: false,
      selected_lesson_ids: [],
      selected_lesson_id: '', // 选中编辑的课程ids
      showBatchLessonWatchModal: false,
      pages: {
        _page: 1,
        _per_page: 10
      }, // 分页
      columns: [

        // {
        //   type: 'selection',
        //   width: 60,
        //   align: 'center'
        // },
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
        },
        {
          title: '分配组别',
          render: function (h, params) {
            return (
              <span>{ params.row.group_name }</span>
            )
          }
        },
        {
          title: '关注原因',
          render: function (h, params) {
            return h('span', params.row.lesson_attention_reason)
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
                  value: ['管理员']
                }],
                style: {
                  marginRight: '2px'
                },
                on: {
                  click: () => {
                    this.selected_lesson_id = params.row.lesson_teacher_id
                    this.showLessonProfileModal = true
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                directives: [{
                  name: 'role',
                  value: ['管理员']
                }],
                style: {
                  marginRight: '2px'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '是否确认删除?',
                      onOk: () => {
                        deleteNoticeLesson(params.row.lesson_teacher_id).then((res) => {
                          this.fetchData()
                          if (res.data.code === 200) {
                            this.$Message.success('删除成功！')
                          } else {
                            this.$Message.error('删除失败！')
                          }
                        })
                      },
                      onCancel: () => {}
                    })
                  }
                }
              }, '删除')
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
      return queryNoticeTeacher(args).then((res) => {
        this.data = res.data.teachers
        this.total = res.data.total
      })
    },
    onPageChange (page) {
      // 分页变化
      this.pages._page = page
      this.fetchData()
    },
    onProfileModalOK (lesson) {
      // 更新框确定 关闭
      putNoticeLesson(lesson).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({ content: '更新成功' })
          this.fetchData()
        }
        this.showLessonProfileModal = false
      })
    },
    onProfileModalCancel () {
      this.showLessonProfileModal = false
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
    },
    onExportExcel: function () {
      exporNoticeLessonExcel({ 'term': this.query.term }).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({ content: '导出成功' })
          window.open('/api/' + resp.data.filename)
        }
      })
    },
    handleImportExcelSucc: function (response, file, fileList) {
      if (response.code !== 200) {
        this.$Message.warning({ content: '部分导入失败' })
        window.open('/api/' + response.fail_excel_path)
      } else {
        this.$Message.success({ content: '导入成功' })
      }
    },
    itemShow (columns) {
      if (this.current_role !== '管理员') {
        for (let i = 0; i < columns.length; i++) {
          if (columns[i]['title'] === '锁定状态') {
            columns.splice(i, 1)
          }
          if (columns[i]['title'] === '操作') {
            columns.splice(i, 1)
          }
        }
      }
    } },
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
    })
    this.itemShow(this.columns)
  }
}
</script>

<style scoped>

</style>
