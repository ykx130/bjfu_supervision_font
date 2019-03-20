<template>
  <Card title="预览">
    <div   ref="printPart"><Display :code="code"></Display></div>
    <div>
      <Button @click="handleSubmit" type="primary">导出</Button><Button @click="handleCancel">取消</Button>
    </div>
  </Card>
</template>
<script>
import Display from '@/view/components/display'

export default {
  name: 'ReportPreview',
  components: { Display },
  data: function () {
    return {
      code: ''
    }
  },
  methods: {
    handleSubmit () {
      this.$print(this.$refs.printPart)
    },
    handleCancel () {
      this.$router.push({ name: '模板管理' })
    }
  },
  mounted: function () {
    this.code = this.$route.query.code
  }
}
</script>
<style scoped>

</style>
