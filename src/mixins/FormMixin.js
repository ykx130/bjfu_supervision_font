
import { queryWorkPlan } from '../service/api/work_plan'

export default {

  methods: {
    formjudge: function (lesson_id, term, lesson_attribute) {
      queryWorkPlan({ 'lesson_attribute': lesson_attribute, 'term': term }).then((resp) => {
        this.$router.push(
          { name: 'guider_form_fill',
            params: {
              'name': resp.data.work_plans[0]['form_meta_name'],
              'version': resp.data.work_plans[0]['form_meta_version']
            },
            query: { 'lesson_id': lesson_id }
          })
      })
    }
  }
}
