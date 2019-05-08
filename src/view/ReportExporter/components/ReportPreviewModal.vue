<template>
  <div>
    <Modal
      :value="show"
      width="800px"
      title="预览"
      ok-text="导出"
      :loading="modalLoading"
      @on-ok="handleSubmit"
      @on-cancel="handleCancel">
    <div ref="printPart"><Display :code="code"></Display></div>
    </Modal>
  </div>
</template>
<script>
import Display from '@/view/components/display'
import { getPDF } from '@/service/api/templates'

export default {
  name: 'ReportPreviewModal',
  components: { Display },
  data () {
    return {
      modalLoading: false
    }
  },
  props: {
    show: Boolean,
    code: String,
    onClose: Function
  },
  methods: {
    handleSubmit () {
      let printer = this.$print(this.$refs.printPart)
      let htmls = printer.init()
      this.modalLoading = true
      getPDF({ code: htmls }).then((res) => {
        let fileurl = '/data_report/' + res.data.path
        window.open(fileurl)
        this.modalLoading = false
        this.$emit('onClose', fileurl)
      })
    },
    handleCancel () {
      this.$emit('onClose', null)
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
