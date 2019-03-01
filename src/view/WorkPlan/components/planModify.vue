<template>
  <Modal
    :value="show"
    title="Title"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange">
    <Form :model="plan">
      <FormItem prop="meta_name" label="体系名称">
        <Input type="text" disabled v-model="plan.lesson_name" >
        </Input>
      </FormItem>
      <FormItem prop="meta_version" label="体系版本">
        <Input type="text" disabled v-model="plan.lesson_attribute">
        </Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
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

    }
  },
  methods: {
    handleOK: function () {
      this.$emit('onOK', this.plan)
    },
    handleCancel: function () {
      this.$emit('onCancel')
    },
    onShowChange: function (show) {
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped>

</style>
