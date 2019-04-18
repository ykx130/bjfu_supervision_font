<template>
  <Modal
    :value="show"
    title="Title"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange">
    <Form :model="plan">
      <FormItem prop="form_meta_name" label="体系名称">
        <Select v-model="plan.form_meta_name" @on-change="handleMetaChange" @on-query-change="handleQueryChange" :filterable="true" >
          <Option v-for="item in form_metas"
                  :value="item.name"
                  :key="item.name"
          >{{ item.name }}</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { queryFormMetas, getFormMetaHistory } from '@/service/api/dqs'
export default {
  props: {
    term_name: String,
    show: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      plan: {},
      form_metas: [],
      meta_versions: []
    }
  },
  watch: {
    term_name: function () {
      this.plan.term = this.term_name
    }
  },
  methods: {
    fetchMetas () {
      // 数据表发生变化请求数据
      queryFormMetas({ _page: 1, _per_page: 30 }).then((resp) => {
        this.form_metas = resp.data.form_metas
      })
    },
    handleMetaChange (value) {
    },
    handleQueryChange (v) {
      queryFormMetas({ name_like: v }).then((resp) => {
        this.form_metas = resp.data.form_metas
      })
    },
    handleOK: function () {
      this.plan.term = this.term_name
      this.$emit('onOK', this.plan)
    },
    handleCancel: function () {
      this.$emit('onCancel')
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
