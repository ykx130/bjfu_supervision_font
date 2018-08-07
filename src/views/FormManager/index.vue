<template>
  <div>
    <h1>表单管理</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="课程名字：" prop="lesson">
        <Input style="width: 180px" v-model="query.lesson" ></Input>
      </FormItem>
      <FormItem label="上课教师：" prop="teacher">
        <Input style="width: 180px" v-model="query.teacher" ></Input>
      </FormItem>
      <FormItem label="听课督导：" prop="guider">
        <Input  style="width: 180px" v-model="query.guider"></Input>
        <Button type="primary" style="margin-left: 20px;width: 80px" @click="Search">查询</Button>
      </FormItem>
    </Form>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="dataCount" show-total :page-size="pages._per_page" :current="pages._page" @on-change="changePage"></Page>
        </div>
    </div>
  </div>
</template>

<script>
    import { getForms } from '../../service/api/dqs'
    import { handleDeleteForms } from '../../service/api/dqs'
    export default {
      data: function() {
        return {
          query: {},
          dataCount: 0,
          pages: {
            _page: 1,
            _per_page: 10
          },
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
              title: '上课教师',
              render: function (h, params) {
                return (
                  <span>{ params.row.meta.teacher }</span>
                )
              }
            },
            {
              title: '课程内容',
              render: function (h, params) {
                return (
                  <span>{ params.row.meta.content }</span>
                )
              }
            },
            {
              title: '课程属性',
              render: function (h, params) {
                return (
                  <span>{ params.row.meta.lesson_attr }</span>
                )
              }
            },
            {
              title: '班级',
              render: function (h, params) {
                return (
                  <span>{ params.row.meta.class }</span>
                )
              }
            },
            {
              title: '听课督导',
              render: function (h, params) {
                return (
                  <span>{ params.row.meta.guider }</span>
                )
              }
            },
            {
              title: '创建时间',
              render: function (h, params) {
                return (
                  <span>{ params.row.meta.created_at }</span>
                )
              }
            },
            {
              title: '更新时间',
              render: function (h, params) {
                return (
                  <span>{ params.row.meta.updated_at }</span>
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
                        this.$router.push({path: `/form_show/${params.row._id}`})
                      }
                    }
                  }, '查看'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '2px'
                    },
                    on: {
                      click: () => {
                        this.remove(params.row)
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
          data: []
        }
      },
      methods: {
        onTableChange(query, pages) {
          let args = {...query, ...pages};
          getForms(args).then((resp) => {
            this.data = resp.data.forms;
            this.dataCount = this.data.total;
            Object.assign(query,pages);
            this.$router.push({path: 'form_manager', query: query})
          })
        },
        changePage(page) {
          this.pages._page = page;
          this.onTableChange(this.query, this.pages)
        },

        Search() {
          this.pages._page = 1;
          this.onTableChange(this.query, this.pages)
        },
        remove: function (params) {
          handleDeleteForms(params.meta_table_id).then(() => {
            getForms().then((resp) => {
              this.data = resp.data.forms;
              this.dataCount = this.data.total;
            })
          })
        }
      },
      created: function () {
        const args = this.$route.query;
        getForms(args).then((resp) => {
          this.data = resp.data.forms;
          this.dataCount = this.data.total;
        })
      }
    }
</script>

<style scoped>

</style>
