<template>
  <Card shadow>
    <h1 style="text-align: center">工作计划管理</h1>
    <Row>
      <Col span="16" offset="4">
        <Carousel v-model="term_index" style="height: 400px;" loop>
          <CarouselItem v-for="term in terms" :key="term.name" >
            <Card style="height: 400px">
              <div slot="title" style="text-align: center">学期: {{term.name}}</div>
              <plan :work_plans="work_plans"></plan>
              <div style="float: right;padding-top: 100px">
                <Button type="primary">新增</Button>
              </div>
            </Card>
          </CarouselItem>
        </Carousel>
      </Col>
    </Row>
  </Card>
</template>

<script>
import Plan from './components/plan'
import { queryTerms, getCurrentTerms } from '@/service/api/term'
import CollapsedMenu from '../../components/main/components/side-menu/collapsed-menu'
export default {
  name: 'WorkPlan',
  components: { CollapsedMenu, Plan },
  data: function () {
    return {
      term_index: 0,
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
  mounted: function () {
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })
  }
}
</script>

<style scoped>

</style>
