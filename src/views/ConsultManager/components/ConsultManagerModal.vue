<template>
  <Modal
    :value="show"
    title="咨询详情"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange">
    <Form :model="consult">
      <FormItem label="咨询人姓名:" prop="requester_username">
        <span>{{consult.requester_username}}</span>
      </FormItem>

      <FormItem label="咨询类型:" prop="type_id">
        <span>{{consult.type_id}}</span>
      </FormItem>

      <FormItem label="咨询内容:" prop="meta_description">
      <span>{{consult.meta_description}}</span>
      </FormItem>

      <FormItem label="回复内容:" prop="content">
        <Input type="textarea"  style="width: 400px" :rows="8" v-model="consult.content">
        </Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
  import {getConsultById} from '../../../service/api/consult'
  import {updateWithinField} from '../../../utils/tools'
  export default {
    name: "ConsultManagerModal",
    props: {
      show: Boolean,
      onCancel:Function,
      onOK: Function,
      id:""
    },
    data: function () {
      return {
        consult: {
          id: "",
          type_id: "",
          meta_description:"",
          requester_username:"",
          content:""
        },
      }
    },
    methods: {
      handleOK: function () {
        this.$emit('onOK', this.consult)
      },
      handleCancel: function () {
        this.$emit('onCancel')
      },
      onShowChange: function (show) {
         if(show){
           // 显示的时候拉数据
           getConsultById(this.id).then((resp)=>{
             updateWithinField(this.consult, resp.data.consult)
          })
         }
      }
    }
  }
</script>

<style scoped>

</style>
