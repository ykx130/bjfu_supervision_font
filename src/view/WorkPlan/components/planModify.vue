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
      <FormItem prop="form_meta_version" label="体系版本">
        <Select  :lable="plan.form_meta_version" v-model="plan.form_meta_version" >
          <Option v-for="item in meta_versions"
                  :value="item.version"
                  :key="item.version"
          >{{ item.version }}</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { queryFormMetas,getFormMetaHistory } from '@/service/api/dqs'
import { updateWithinField } from 'Libs/tools'
export default {
  name: 'PlanProfile',
  props: {
    show: Boolean,
    onCancel: Function,
    onOK: Function,
    plan: {type:Object, default:{}}
  },
  data: function () {
    return {
      form_metas:[],
      meta_versions: []
    }
  },
  methods: {
    fetchMetas() {
      // 数据表发生变化请求数据
      queryFormMetas({_page:1, _per_page: 30}).then((resp) => {
        this.form_metas = resp.data.form_metas
        this.total = resp.data.total
      })
    },
    handleMetaChange(value) {
      getFormMetaHistory({name:value}).then((resp)=>{
        this.meta_versions = resp.data.form_metas
      })
    },
    handleQueryChange(v){
      queryFormMetas({name_like:v}).then((resp) => {
        this.form_metas = resp.data.form_metas
      })
    },
    handleOK: function () {
      this.$emit('onOK', this.plan)
    },
    handleCancel: function () {
      this.$emit('onCancel')
    },
    onShowChange: function (show) {
    }
  },
  mounted() {
    this.fetchMetas()
  }
}
</script>

<style scoped>

</style>
