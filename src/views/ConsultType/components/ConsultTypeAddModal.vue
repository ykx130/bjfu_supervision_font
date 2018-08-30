<template>
  <Modal
    :value="show"
    title="新增"
    @on-ok="handleOK"
    @on-cancel="handleCancel">
    <Form :model="consult_types">
      <FormItem prop="name">
        <Input type="text" v-model="consult_types.name" placeholder="咨询类型名称">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
  import { queryConsult_types } from '../../../service/api/consult'
  export default {
    name: "ConsultTypeAddModal",
    props: {
      show: Boolean,
      onCancel:Function,
      onOK: Function,
    },
    data: function () {
      return {
        consult_types: {
          name:"",
        },
      }
    },
    mounted: function () {
      queryConsult_types().then((resp)=>{
        this.consult_types = resp.data.consult_types
      })
    },
    methods: {
      handleOK: function () {
        this.$emit('onOK', this.consult_types)
      },
      handleCancel: function () {
        this.$emit('onCancel')
      }
    }
  }
</script>

<style scoped>

</style>
