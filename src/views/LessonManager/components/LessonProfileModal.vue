<template>
  <Modal
    v-model="show"
    title="Title"
    @on-ok="handleOK">
    <Form :model="lesson">
      <FormItem prop="name">
        <Input type="text" v-model="user.name" placeholder="Username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
    import {getLesson} from '../../../service/api/lesson'
    export default {
        name: "LessonProfileModal",
        props: {
          show: Boolean,
          onCancel:Function,
          onOK: Function,
          lesson_id:""
        },
        data: function () {
          return {
            lesson: {}
          }
        },
        mounted: function () {
          getLesson(this.lesson_id).then((resp)=>{
              this.lesson = resp.lesson
          })
        },
        methods: {
          handleOK: function () {
            this.$emit('onOK', this.lesson)
          }
        }
    }
</script>

<style scoped>

</style>
