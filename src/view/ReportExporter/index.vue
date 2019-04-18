<template>
  <Card>
    <h1>报告导出</h1>
    <br>
    <Form :label-width="80" :model="reportArgs" ref="reportForm" :rules="rules">
      <FormItem label="学期" prop="term">
        <Input v-model="reportArgs.term" placeholder="请输入"/>
      </FormItem>
      <FormItem label="模板" prop="template_id">
        <Select
          v-model.number="reportArgs.template_id"
          filterable
          clearable
          remote
          :remote-method="remoteMethodOfTemplate"
          :loading="templateSelecting">
          <Option v-for="(template, index) in templates" :value="template.id" :key="index">{{template.title}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleDisplay('reportForm')">预览</Button>
      </FormItem>
    </Form>

    <ReportPreviewModal
      :code="code"
      :show="reportPreviewShow"
      @onClose="onPreviewModalClose">
    </ReportPreviewModal>
  </Card>
</template>
<script>
import ReportPreviewModal from './components/ReportPreviewModal'
import { queryTemplates, getReport } from '../../service/api/templates'

export default {
  name: 'ReportExporter',
  components: { ReportPreviewModal },
  data: function () {
    return {
      reportArgs: {
        term: undefined,
        template_id: undefined
      },
      templateSelecting: false,
      templates: [],
      code: undefined,
      reportPreviewShow: false,
      rules: {
        term: [{ required: true, message: '学期不能为空', trigger: 'blur,change' }],
        template_id: [{ required: true, type: 'number', message: '请选择模板', trigger: 'change' }]
      }
    }
  },
  methods: {
    remoteMethodOfTemplate (query) {
      if (query !== '') {
        this.templateSelecting = true
        setTimeout(() => {
          this.templateSelecting = false
          queryTemplates({ _like_title: query, _page: 1, _per_page: 30 }).then(res => {
            this.templates = res.data.templates
          })
        }, 200)
      }
    },
    onPreviewModalClose () {
      this.reportPreviewShow = false
    },
    handleDisplay (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          getReport(this.reportArgs.template_id, { term: this.reportArgs.term }).then(res => {
            this.code = res.data
            this.reportPreviewShow = true
          })
        } else {
          return false
        }
      })
    }
  },
  mounted: function () {
    queryTemplates({ _page: 1, _per_page: 30 }).then(res => {
      this.templates = res.data.templates
    })
  }
}
</script>
<style scoped>

</style>
