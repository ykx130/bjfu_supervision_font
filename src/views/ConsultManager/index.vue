<template>
  <div>
    <h1>活动报名</h1>
    <br>
    <Tabs @on-click="onTypeTabClick">
      <TabPane label="未协调" name="未协调"></TabPane>
      <TabPane label="已协调" name="已协调"></TabPane>
    </Tabs>

    <Form :label-width="80" :model="query" inline>
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
    components:{},
    data: function() {
      return {
        select_tag: '未协调',
        query: {}, // 查询用的参数
        total: 0, // 总数量
        data: [], //数据
        terms: [],
        selected_consult_id:"", //选中答复的活动
        pages: {
          _page: 1,
          _per_page: 10
        }, //分页
        columns: []
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
      onTypeTabClick(value) {
        this.select_tag = value
      }
    },
    mounted: function () {
      const args = this.$route.query;
    }
  }
</script>

<style scoped>

</style>

