<template>
  <div>
    <h1>课程管理</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="课程名字：" prop="lesson">
        <Input style="width: 180px" v-model="query.lesson" ></Input>
      </FormItem>
    </Form>

    <LessonProfileModal
      :show="showUserProfileModal"
      :onOK="onProfileModalOK"
      :onCancel="onProfileModalCancel"
      :lesson_id="this.selected_lesson_id"
    ></LessonProfileModal>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import LessonProfileModal from './components/LessonProfileModal'
  import {queryLessons, putLesson} from '../../service/api/lesson'
  export default {
    components:{LessonProfileModal},
    data: function() {
      return {
        query: {}, // 查询用的参数
        total: 0, // 总数量
        data: [], //数据
        selected_lesson_id:"", //选中编辑的课程ids
        showUserProfileModal: false, // 展示编辑弹窗
        pages: {
          _page: 1,
          _per_page: 10
        }, //分页
        columns: [
          {
            title: '课程名字',
            render: function (h, params) {
              return (
                <span>{ params.row.meta.lesson }</span>
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
                      this.selected_username = params.username
                      this.showUserProfileModal=true
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
          this.showUserProfileModal = false
        })
      },
      onProfileModalCancel() {
        this.showUserProfileModal = false
      }
    },
    mounted: function () {
      const args = this.$route.query;
      queryLessons(args).then((resp)=>{
        this.data = resp.lessons
      })
    }
  }
</script>

<style scoped>

</style>
