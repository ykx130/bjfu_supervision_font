<template>
  <div>
    <Card>
      <Row>
        <Col span="6">
          问卷名字：
              <Input style="width: 180px" v-model="query.name" ></Input>
        </Col>
        <Col span="6">
          <Button type="primary" style="margin-left: 20px;width: 80px" @click=" onSearch">查询</Button>
        </Col>
      </Row>

    </Card>
    <Row :gutter="16"  class="form_content">
      <Col span="6" v-for="meta in data" style="margin-bottom: 30px">
        <form_meta_card :key="meta._id" :meta="meta" @click.native="onCardClick(meta.name, meta.version)"></form_meta_card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getCurrentTerms } from '@/service/api/term'
import { queryFormMetas } from '../../service/api/dqs'
import { queryWorkPlanDetail } from '@/service/api/work_plan'
import form_meta_card from 'Views/components/form_meta_card/form_meta_card'
export default {
  components: { form_meta_card },
  name: 'index.vue',
  data: function () {
    return {
      data: [],
      query: {},
      term: ''
    }
  },
  methods: {
    onCardClick: function (name, version) {
      this.$router.push({
        name: 'guider_form_fill',
        params: {
          'name': name,
          'version': version
        },
        query: this.$route.query
      })
    },
    onSearch (query) {
      // 查询变化 当点提交查询条件生效
      queryFormMetas({ ...query }).then((resp) => {
        this.data = resp.data.form_metas
      })
    }
  },
  mounted: function () {
    getCurrentTerms().then((termResp) => {
      this.term = termResp.data.term.name
      queryWorkPlanDetail(this.term).then((resp) => {
        this.data = resp.data.work_plans.map((item) => {
          return item.form_meta
        })
      })
    })
  }
}
</script>

<style scoped>

  .form_content{
    padding-top: 30px ;
  }
</style>
