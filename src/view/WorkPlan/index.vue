<template>
  <Card shadow>
    <h1 style="text-align: center">工作计划管理</h1>
    <Row>
        <Carousel v-model="term_index" style="height: 400px;">
          <CarouselItem v-for="term in terms" :key="term.name" >
            <Card style="height: 400px;width: 100%">
              <div slot="title" style="text-align: center">学期: {{term.name}}</div>
              <plan :work_plans="work_plans"></plan>
              <div style="float: right;padding-top: 100px">
                <Button type="primary" @click="handlePlanAdd(term.name)">新增</Button>
              </div>
            </Card>
          </CarouselItem>
        </Carousel>
    </Row>
    <PlanAddModal  :term_name="current_term.name"
                   :show="show_plan_add_modal"
                   @onCancel="show_plan_add_modal= false"
                   @onOK="handlePlanAddOK"
    ></PlanAddModal>
  </Card>
</template>

<script>
import Plan from './components/plan'
import PlanAddModal from './components/planAdd'
import { queryTerms, getCurrentTerms } from '@/service/api/term'
import { postWorkPlan, queryWorkPlan } from '@/service/api/work_plan'
import CollapsedMenu from '../../components/main/components/side-menu/collapsed-menu'
export default {
  name: 'WorkPlan',
  components: { CollapsedMenu, Plan, PlanAddModal },
  data: function () {
    return {
      term_index: 0,
      show_plan_add_modal: false,
      terms: [],
      work_plans: [
        {
          'id': 822,
          'term': '2015-08-10',
          'meta_name': 'ss$4',
          'meta_version': '!u$b',
          'status': true
        },
        {
          'id': 313,
          'term': '2009-07-31',
          'meta_name': '4e7*Sc',
          'meta_version': 'ztKH',
          'status': false
        }
      ]
    }
  },
  computed: {
    current_term: function () {
      return this.terms[this.term_index]
    }
  },
  methods: {
    handlePlanAdd (term_name) {
      this.show_plan_add_modal = true
    },
    handlePlanAddOK (plan) {
      postWorkPlan(plan).then((resp) => {

      })
    }
  },
  mounted: function () {
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })
  }
}
</script>

<style scoped>

</style>
