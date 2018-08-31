<template>
  <Card>
    <h1>活动报名</h1>
    <br>
    <Tabs @on-click="onTypeTabClick">
      <TabPane label="可报名" name="可报名"></TabPane>
      <TabPane label="已报名" name="已报名"></TabPane>
    </Tabs>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="活动名称：" prop="activity">
        <Input style="width: 180px" v-model="query.name" ></Input>
      </FormItem>
      <FormItem label="学期：" :prop="'activity.term'">
        <Select v-model="query.term" style="width:200px">
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem >
        <Button type="primary" @click="onSearch(query)">查询</Button>
      </FormItem>
    </Form>

    <already-registered v-if="select_tag==='已报名'"></already-registered>
    <can-register v-else-if="select_tag==='可报名'"></can-register>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
      </div>
    </div>
  </Card>
</template>

<script>
  import {queryCurrentuserActives, putActive, postActive} from '../../service/api/actives'
  import {queryTerms, getCurrentTerms} from '../../service/api/term'
  import alreadyRegistered from './components/alreadyRegistered'
  import canRegister from './components/canRegister'

  export default {
    components:{
      alreadyRegistered,
      canRegister
    },
    data: function() {
      return {
        select_tag: '可报名',
        query: {}, // 查询用的参数
        total: 0, // 总数量
        data: [{
          activity:{},
          activity_user:{}
        }], //数据
        terms: [],
        selected_activity_id:"", //选中编辑的课程ids
        pages: {
          _page: 1,
          _per_page: 10
        }//分页
      }
    },
    methods: {
      onTableChange(query, pages) {
        //数据表发生变化请求数据
        let args = {...query, ...pages};
        queryCurrentuserActives(args).then((resp)=>{
          this.data = resp.data.activities;
          this.total = resp.data.total;
          this.$router.push({path: '/active/help', query: {...args, ...this.query}});
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
      onTypeTabClick(value) {
        this.select_tag = value
      }
    },
    mounted: function () {
      const args = this.$route.query;
      queryTerms().then((resp)=>{
        this.terms = resp.data.terms
      });
      getCurrentTerms().then((termResp)=>{
        this.query.term = termResp.data.term.name;
        queryCurrentuserActives(args).then((resp)=>{
          this.data = resp.data.activities;
          this.total = resp.data.total;
          this.$router.push({path: '/attend', query: {...args, ...this.query}});
        })
      })
    }
  }
</script>

<style scoped>

</style>

