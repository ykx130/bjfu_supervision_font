<template>
<div>
  <Modal
    :value="show"
    title="请填写手机号码"
    @on-ok="handleOK"
    @on-cancel="handleCancel">
    <Form ref="user_form" :rules="ruleValidate">
      <FormItem prop="phone">
        <Input type="text" v-model="tel" placeholder="手机号码">
          <Icon type="ios-call" slot="prepend"/>
        </Input>
      </FormItem>
    </Form>
  </Modal>
</div>
</template>

<script>
export default {
  name: "AddPhoneModal",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    user:Object,
    onCancel: Function,
    onOK: Function
  },
  data(){
    return{
     tel:'',
      newuser:{
       phone:'',
      },
      ruleValidate:{
        tel:[{ required: true, message: '手机号不能为空!', trigger: 'blur' },
               { type: 'string', pattern: /^1[3456789]\d{9}$/, message: '手机号格式有误', trigger: 'blur' }]
      }
    }
  },
  methods:{
    handleOK(){
      this.$refs.user_form.validate((valid) => {
        //this.changeLoading()
        if (valid) {
          this.newuser=this.user
          this.newuser.phone=this.tel
          this.$emit('onOK',this.newuser, valid)
        } else {
          this.$Message.error('信息填写错误请检查!')
          this.$emit('onCancel')
        }
      })
    },
    handleCancel(){
      this.$emit('onCancel')
    }
  }
}
</script>

<style scoped>

</style>
