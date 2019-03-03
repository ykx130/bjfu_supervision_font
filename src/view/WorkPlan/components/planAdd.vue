<template>
  <Modal
    :value="show"
    title="Title"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange">
    <Form :model="plan">
      <FormItem prop="meta_name" label="体系名称">
        <Input type="text" v-model="plan.meta_name" >
        </Input>
      </FormItem>
      <FormItem prop="meta_version" label="体系版本">
        <Input type="text"  v-model="plan.meta_versione">
        </Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
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
      plan: {}
    }
  },
  watch: {
    term_name: function () {
      this.plan.term = this.term_name
    }
  },
  methods:{
    handleOK: function () {
      this.plan = this.term_name
      this.$emit('onOK', this.plan)
    },
    handleCancel: function () {
      this.$emit('onCancel')
    },
    onShowChange: function (show) {
    }
  }
}
</script>

<style scoped>

</style>
