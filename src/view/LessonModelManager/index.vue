<template>
  <Card>
    <h1>好评课堂</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="课程名字：" prop="lesson_name">
        <Input style="width: 180px" v-model="query.lesson_name_like" placeholder="请输入用户名字">
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
      <FormItem v-role ="['管理员']">
        <Upload :action="uploadModelLessonApi"
                :on-success="handleImportExcelSucc"
                name="filename">
          <Button  icon="ios-cloud-upload-outline" type="primary"  >导入</Button>
        </Upload>
      </FormItem>
    </Form>

    <LessonProfileModal
      :show="showLessonProfileModal"
      @onOK="onProfileModalOK"
      @onCancel="onProfileModalCancel"
      :lesson_id="this.selected_lesson_id"
    ></LessonProfileModal>

    <ModelLessonAdd
        :show="showAddModelLesson"
        @onOK="onModelLessonAddOK"
        :term="this.query.term"
        @onCancel="showAddModelLesson = false"
    >

    </ModelLessonAdd>

    <Table  border stripe :columns="columns" :data="data"></Table>
    <Row >
      <Page  style="float: right;" :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
    </Row>

    <Button type="primary" @click="showAddModelLesson=true" v-role="['管理员']">导入为好评课</Button>
  </Card>
</template>

<script>
import LessonProfileModal from './components/LessonProfileModal'
import ModelLessonAdd from './components/ModelLessonAdd'
import { queryModelLessons, putLesson, uploadModelLessonApi, getModelLesson, exporModelLessonExcel, putModelLesson , postModelLesson} from '@/service/api/lesson'
import { queryTerms, getCurrentTerms } from '@/service/api/term'
import FloatBar from '_c/float_bar/float_bar'
import { updateWithinField } from 'Libs/tools'
import LessonJudge from 'Views/components/lesson_judge/lesson_judge'
import ModelJudge from './components/ModelJudge'
import UserMixin from'@/mixins/UserMixin'
export default {
  mixins:[UserMixin],
  components: { ModelJudge, LessonJudge, LessonProfileModal, FloatBar,ModelLessonAdd },
  data: function () {
    return {
      showAddModelLesson: false,
      uploadModelLessonApi: uploadModelLessonApi,
      query: {
        lesson_name: undefined,
        term: undefined
      }, // 查询用的参数
      total: 0, // 总数量
      data: [], // 数据
      terms: [],
      selected_lesson_ids: [],
      selected_lesson_id: 0, // 选中编辑的课程ids
      showLessonProfileModal: false, // 展示编辑弹窗
      pages: {
        _page: 1,
        _per_page: 10
      }, // 分页
      columns: [
        {
          type: 'expand',
          title: '好评推荐',
          width: 70,
          render: (h, params) => {
            return h(ModelJudge, {
              props: {
                lesson_id: params.row.lesson_id
              }
            })
          }
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
          title: '好评状态',
          width:120,
          render: (h, params) => {
            if (params.row.status === '推荐为好评课') {
              return h('Tag', { props: { color: 'red' } }, '推荐为好评课')
            } else {
              return h('Tag', { props: { color: 'blue' } }, '待商榷')
            }
          }
        },
        {
          title: '推荐次数',
          render: function (h, params) {
            return (
              <span>{ params.row.votes }</span>
            )
          }
        },
        {
          title: '评价次数',
          render: function (h, params) {
            return (
              <span>{ params.row.notices }</span>
            )
          }
        },
        {
          title: '锁定状态',
          render: function (h, params) {
              if (params.row.is_lock) {
                return h('Tag', { props: { color: 'red' } }, '锁定')
              } else {
                return h('Tag', { props: { color: 'blue' } }, '非锁定')
              }
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
                    this.selected_lesson_id = params.row.id
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
      return queryModelLessons(args).then((resp) => {
        this.selected_lesson_ids = []
        this.data = resp.data.model_lessons
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
    onModelLessonAddOK(lesson) {
      postModelLesson({'lesson_id': lesson.lesson_id,
      }).then((resp)=>{
        if (resp.code === 200){
          this.$Message.success("添加成功！")
        }
        this.fetchData()
      })
      this.showAddModelLesson = false
    },
    onProfileModalOK (lesson) {
      // 更新框确定 关闭
      putModelLesson(lesson).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({ content: '更新成功' })
          this.fetchData()
        }
        this.showLessonProfileModal = false
        this.pages._page = 1
      })
    },
    onProfileModalCancel () {
      this.showLessonProfileModal = false
    },
    onExportExcel: function () {
      exporModelLessonExcel().then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({ content: '导出成功' })
          window.open('/api/' + resp.data.filename)
        }
      })
    },
    handleImportExcelSucc: function (response, file, fileList) {
      if (response.code !== 200) {
        this.$Message.warning({ content: '部分导出失败' })
        window.open('/api/' + response.fail_excel_path)
      } else {
        this.$Message.success({ content: '导入成功' })
      }
    },
    itemShow(columns)
    {
      if(this.current_role!=='管理员'){
        for(let i=0;i<columns.length;i++){
          if(columns[i]['title']==='锁定状态'){
            columns.splice(i,1)
          }
          if (columns[i]['title']==='操作'){
            columns.splice(i,1)
          }
            }
      }
    }
  },
  mounted: function () {
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
      getCurrentTerms().then((termResp) => {
        this.query.term = termResp.data.term.name
        queryModelLessons({ ...this.query, ...this.pages }).then((resp) => {
          this.data = resp.data.model_lessons
          this.total = resp.data.total
        })
      })
    })
    this.itemShow(this.columns)
  }
}
</script>

<style scoped>

</style>
