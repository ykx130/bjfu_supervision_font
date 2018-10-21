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
          <Button type="primary" style="margin-left: 20px;width: 80px" @click="onSearch(query)">查询</Button>
        </Col>
      </Row>

    </Card>
    <Row :gutter="16"  class="form_content">
      <Col span="8" v-for="meta in data" style="height: 100%">
        <form_meta_card :meta="meta" style="height: 100%" @click.native="onCardClick(meta.name, meta.version)"></form_meta_card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { queryFormMetas } from '../../service/api/dqs'
import {getCurrentTerms, queryTerms} from '../../service/api/term'
import form_meta_card from 'Views/components/form_meta_card/form_meta_card'
export default {
  components: {form_meta_card},
  name: 'index.vue',
  data: function () {
    return {
      data: [],
      terms: [],
      query: {}
    }
  },
  methods: {
    onCardClick: function (name, version) {
      this.$router.push({path: `/dqs/form_fill/${name}/${version}`})
    }
  },
  mounted: function () {
    // let args = this.$route.query
    // queryTerms().then((resp) => {
    //   this.terms = resp.data.terms
    // })
    // queryFormMetas(args).then((resp) => {
    //   this.data = resp.data.form_metas
    //   this.$router.push({name: '问卷选择'})
    // })
  },
  onSearch (query) {
    // 查询变化 当点提交查询条件生效
    let args = this.$route.query
    queryFormMetas({...query, args}).then((resp) => {
      this.data = resp.data.form_metas
      this.$router.push({name: '问卷选择'})
    })
  }
}
</script>

<style scoped>

  .form_content{
    padding-top: 30px ;
    height: 240px;
  }
</style>
