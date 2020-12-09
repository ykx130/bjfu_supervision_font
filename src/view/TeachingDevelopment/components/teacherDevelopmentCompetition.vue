<template>
  <div>
    <h1>教师教学发展比赛</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="名称查询：" prop="module">
        <AutoComplete v-model="query.name_like" :data="name"
                      style="width:180px"
                      @on-search="handleSearchName"></AutoComplete>
      </FormItem>
      <FormItem label="状态查询：" prop="activity">
        <AutoComplete v-model="query.state_like" :data="stateName"
                      style="width:180px"
                      @on-search="handleSearchStateName"></AutoComplete>
      </FormItem>
      <FormItem>
        <Button type="primary" @click=" onSearch">查询</Button>
      </FormItem>
    </Form>

    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page"
              @on-change="onPageChange"></Page>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'teacherDevelopmentCompetition',
  data () {
    return {
      query: {
        name_like: '',
        state_like: ''
      },
      name: [],
      stateName: [],
      pages: {
        _page: 1,
        _per_page: 10
      }, // 分页
      columns: [
        {
          title: '奖项名称'
        },
        {
          title: '获奖时间'
        },
        {
          title: '主办单位'
        },
        {
          title: '级别'
        },
        {
          title: '获奖等级'
        },
        {
          title: '排名'
        },
        {
          title: '附件'
        },
        {
          title: '状态'
        },
        {
          title: '操作'
        }
      ]
    }
  },
  methods: {
    fetchData () {
      // 数据表发生变化请求数据
      let args = { ...this.query, ...this.pages }
      return queryCurrentuserActives(args).then((resp) => {
        this.data = resp.data.activities
        this.total = resp.data.total
      })
    },
    onPageChange (page) {
      // 分页变化
      this.pages._page = page
      this.fetchData()
    },
    handleSearchName () {},
    handleSearchStateName () {},
    onSearch () {}
  }

}
</script>

<style scoped>

</style>
