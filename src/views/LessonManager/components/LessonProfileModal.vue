<template>
  <Modal
    :value="show"
    title="Title"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange">
    <Form :model="lesson">
      <FormItem prop="name">
        <Input type="text" v-model="lesson.name" placeholder="名字">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
  import {getLesson} from '../../../service/api/lesson'
  import {updateWithinField} from '../../../utils/tools'
  export default {
    name: "UserProfileModal",
    props: {
      show: Boolean,
      onCancel:Function,
      onOK: Function,
      lesson_id:""
    },
    data: function () {
      return {
        lesson: {
          id:"",
          name:"",
          lesson_id: "",
          group:"",
          role_names: []
        },
        roles: [],
        groups:[]
      }
    },
    mounted: function () {
      queryRoles().then((resp)=>{
        this.roles = resp.data.roles
      })
      queryGroups().then((resp)=>{
        this.groups = resp.data.groups
      })
    },
    methods: {
      handleOK: function () {
        this.$emit('onOK', this.lesson)
      },
      handleCancel: function () {
        this.$emit('onCancel')
      },
      onShowChange: function (show) {
        if(show){
          // 显示的时候拉数据
          getLesson(this.lesson_id).then((resp)=>{
            updateWithinField(this.lesson, resp.data.lesson)
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
