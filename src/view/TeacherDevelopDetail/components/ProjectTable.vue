<template>
  <div>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="教师：" prop="teacher_name">
        <Input style="width: 180px" v-model="query.user.name" placeholder="请输入教师姓名" ></Input>
      </FormItem>
      <FormItem label="状态：" prop="activity_status" >
        <Select v-model="query.activity_status" style="width:200px">
          <Option v-for="item in activity_statuss" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>


      <FormItem>
        <Button type="primary" @click="onSearch">查询</Button>
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

export default {
name: "ProjectTable",

  data:function () {
    return{

      query:{
        activity_status:undefined,
        teacher_name:undefined,
      },
      activity_statuss:[],
      data:[],

      pages: {
        _page: 1,
        _per_page: 10
      }, // 分页

      columns: [
        {
          title: '教师姓名',
          align: 'center',
          render: function (h, params) {
            return (
              <span>{ params.row.teacher_name }</span>
            )
          }
        },
        {
          title: '项目名称',
          align: 'center',
          render: function (h, params) {
            return (
              <span>{ params.row.title }</span>
            )
          }
        },
        {
          title: '级别',
          align: 'center',
          render: function (h, params) {
            return (
              <span>{ params.row.level}</span>
            )
          }
        },
        {
          title: '上级单位',
          align: 'center',
          render: function (h, params) {
            return (
              <span>{ params.row.superior_units}</span>
            )
          }
        },
        {
          title: '开始时间',
          align: 'center',
          render: function (h, params) {
            return (
              <span>{ params.row.start_time }</span>
            )
          }
        },

        {
          title: '结束时间',
          align: 'center',
          render: function (h, params) {
            return (
              <span>{ params.row.end_time }</span>
            )
          }
        },

        {
          title: '负责人',
          align: 'center',
          render: function (h, params) {
            return (
              <span>{ params.row.leader }</span>
            )
          }
        },
        {
          title: '附件',
          align: 'center',
          render: function (h, params) {
            return (
              <span>{ params.row.enclosure }</span>
            )
          }
        },
        {
          title: '状态',
          align: 'center',
          render: (h, params) => {
            if (params.row.activity_status === '待审核') {
              return h('Tag', { props: { color: 'red' } }, params.row.activity_status)
            } else {
              return h('Tag', { props: { color: 'blue' } }, params.row.activity_status)
            }
          }
        },
      ]
    }
  },

  methods:{
    onPageChange (page) {
      // 分页变化
      this.pages._page = page
      this.fetchData()
    },
  }
}
</script>

<style scoped>

</style>
