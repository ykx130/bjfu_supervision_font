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
    export default {
      handleOK: function () {
        this.$emit('onOK', this.lesson)
      },
      handleCancel: function () {
        this.$emit('onCancel')
      },
      onShowChange: function (show) {
        if (show) {
          // 显示的时候拉数
        }
      }
    }
</script>

<style scoped>

</style>
