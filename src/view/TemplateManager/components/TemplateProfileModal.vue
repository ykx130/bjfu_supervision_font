<template>
  <Modal
    :value="show"
    title="修改"
    @on-ok="handleSubmit('templateForm')"
    @on-cancel="handleCancel">
    <Form :model="template" ref="templateForm" :rules="rules">
      <FormItem label="模板名" prop="title">
        <Input v-model="template.title" placeholder="请输入"/>
      </FormItem>
      <FormItem label="内容" prop="content">
        <Input v-model="template.content" type="textarea" :autosize="{minRows: 2,maxRows: 6}" placeholder="请输入"/>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { getTemplate } from '../../../service/api/templates'
import { updateWithinField } from '@/libs/tools'
export default {
  name: 'TemplateProfileModal',
  props: {
    show: Boolean,
    id: Number,
    onCancel: Function,
    onOK: Function
  },
  data: function () {
    return {
      template: {
        title: undefined,
        content: undefined
      },
      rules: {
        title: [{ required: true, message: '模板名不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '模板内容不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleCancel: function () {
      this.$emit('onCancel')
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$emit('onOK', this.template)
        } else {
          return false
        }
      })
    }
  },
  watch: {
    id (val) {
      if (val) {
        getTemplate(this.id).then(res => {
          updateWithinField(this.template, res.data.template)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
