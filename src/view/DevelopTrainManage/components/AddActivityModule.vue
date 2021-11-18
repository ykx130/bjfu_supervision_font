<template>
  <div>
  <Modal
    :value="show"
    title="新增培训模块"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    width="35%">
    <Form ref="module_form" :model="activity_module" :rules="ruleValidate" :label-width="100">
      <!--      注意加prop,不然验证不生效-->
      <FormItem label="培训模块名称:" prop="module">
        <Input v-model="activity_module.module" style="width: 200px;"></Input>
      </FormItem>
    </Form>
  </Modal>
  </div>
</template>

<script>
export default {
  name: "AddActivityModule",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    onCancel: Function,
    onOK: Function
  },
  data() {
    return{
      activity_module: {
        module: ''
      },
      ruleValidate: {
        module: [{ required: true, trigger: 'blur', message: '请填写需要添加的培训模块名称' }],
      }
    }
  },
  methods: {
    handleOK (){
      this.$refs.module_form.validate((valid) => {
        if (valid) {
          this.AddModuleName = {
            module: this.activity_module.module
          }
          this.$emit('onOK', this.AddModuleName)
          this.activity_module.module = ''
        } else {
          this.$Message.error('请填写完整信息')
        }
      })
    },
    handleCancel() {
      this.activity_module.module = ''
      this.$emit('onCancel')
    }
  }
}
</script>

<style scoped>

</style>
