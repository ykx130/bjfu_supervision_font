<template>
  <div>
    <Card>
      <Row>
        <Col span="6">
        学期：
        <Select v-model="query.term" style="width:200px">
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
        </Col>
        <Col span="6">
        <Button type="primary" style="margin-left: 20px;width: 80px" @click=" onSearch">查询</Button>
        </Col>
      </Row>

    </Card>
    <Row :gutter="16"  class="form_content">
      <Col span="6" v-for="meta in data" style="margin-bottom: 30px">
        <my_form_meta_card :meta="meta" ></my_form_meta_card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {queryMyForms} from '../../service/api/dqs'
  import {getCurrentTerms, queryTerms} from '../../service/api/term'
  import my_form_meta_card from './components/my_form_meta_card'

  export default {
    components: {my_form_meta_card},
    name: 'index.vue',
    data: function () {
      return {
        data: [],
        terms: [],
        query: {}
      }
    },
    methods: {
      // onCardClick: function (name, version) {
      //   this.$router.push({ path: `/dqs/form_fill/${name}/${version}` })
      // }
    },
    mounted: function () {
      queryTerms().then((resp) => {
        this.terms = resp.data.terms
      })
      queryMyForms({...this.query}).then((resp) => {
        this.data = resp.data.forms
      })
    },
     onSearch() {
      // 查询变化 当点提交查询条件生效
      queryMyForms({...this.query}).then((resp) => {
        this.data = resp.data.forms
      })
    }
  }
</script>

<style scoped>

  .form_content{
    padding-top: 30px;
  }
</style>
