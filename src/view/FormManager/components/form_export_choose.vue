<template>
  <Modal
    :value="show"
    title="选择导出评价表类型："
    @on-ok="handleOK"
    @on-cancel="handleCancel"
>
    <RadioGroup v-model="form_choose">
      <Radio label="理论课评价用表第2版">
        <span>理论课</span>
      </Radio>
      <Radio label="实践课评价用表第2版">
        <span>实践课</span>
      </Radio>
      <Radio label="体育课评价用表第2版">
        <span>体育课</span>
      </Radio>
    </RadioGroup>
  </Modal>
</template>

<script>
  export default {
      name: "FormExportChoose",
      props: {
        show: Boolean,
      },
      data:function () {
          return{
            form_choose:'',
          }
        },
      methods:{
        handleOK: function () {
          this.$emit('onConfirm', this.form_choose)
        },
        handleCancel: function () {
          this.$emit('onCancel')
        }
      }
    }
</script>

<style scoped>

</style>
