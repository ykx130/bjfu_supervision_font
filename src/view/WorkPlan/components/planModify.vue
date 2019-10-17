<template>
  <Modal
    :value="show"
    title="Title"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange">
    <Form :model="plan">
      <FormItem prop="form_meta_name" label="体系名称">
        <Select :lable="plan.form_meta_name"
                v-model="plan.form_meta_name"
                @on-change="handleMetaChange"
                @on-query-change="handleQueryChange" :filterable="true" >
          <Option v-for="item in form_metas"
                  :value="item.name"
                  :key="item.name"
          >{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="lesson_attribute" label="课程属性">
        <Select :lable="plan.lesson_attribute"
                v-model="plan.lesson_attribute"
                @on-change="handleMetaChange"
                >
          <Option v-for="item in attributes"
                  :value="item"
                  :key="item"
          >{{ item }}</Option>
        </Select>
      </FormItem>

    </Form>
  </Modal>
</template>

<script>
import { queryFormMetas, getFormMetaHistory } from '@/service/api/dqs'
import { updateWithinField } from 'Libs/tools'
export default {
  name: 'PlanProfile',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    plan: { type: Object, default: {} }
  },
  data: function () {
    return {
      form_metas: [],
      meta_versions: [],
      attributes: ['普通课', '实验课', '体育课']
    }
  },
  methods: {
    fetchMetas () {
      // 数据表发生变化请求数据
      queryFormMetas({ _page: 1, _per_page: 30 }).then((resp) => {
        this.form_metas = resp.data.form_metas
        this.total = resp.data.total
      })
    },
    handleMetaChange (value) {
      // getFormMetaHistory({name:value}).then((resp)=>{
      //   this.meta_versions = resp.data.form_metas
      // })
    },
    handleQueryChange (v) {
      queryFormMetas({ name_like: v }).then((resp) => {
        this.form_metas = resp.data.form_metas
      })
    },
    handleOK: function () {
      console.log(this.plan)
      this.$emit('noModifyOK', this.plan)
    },
    handleCancel: function () {
      this.$emit('onModifyCancel')
    },
    onShowChange: function (show) {
    }
  },
  mounted () {
    this.fetchMetas()
  }
}
</script>

<style scoped>

</style>
