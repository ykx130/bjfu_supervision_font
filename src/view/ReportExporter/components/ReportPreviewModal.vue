<template>
  <Modal
    :value="show"
    width="800px"
    title="预览"
    ok-text="导出"
    @on-ok="handleSubmit"
    @on-cancel="handleCancel">
  <div ref="printPart"><Display :code="code"></Display></div>
  </Modal>
</template>
<script>
import Display from '@/view/components/display'

export default {
  name: 'ReportPreviewModal',
  components: { Display },
  props: {
    show: Boolean,
    code: String,
    onClose: Function
  },
  methods: {
    handleSubmit () {
      this.$print(this.$refs.printPart)
      this.$emit('onClose')
    },
    handleCancel () {
      this.$emit('onClose')
    }
  },
  watch: {
    code (val) {
      this.code = val
    }
  }
}
</script>
<style scoped>

</style>
