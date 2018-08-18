<template>
  <Modal
    v-model="show"
    title="Title"
    @on-ok="handleOK">
    <Form :model="active">
      <FormItem prop="name">
        <Input type="text" v-model="user.name" placeholder="Username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
    import {getUserByName} from '../../../service/api/user'
    export default {
        name: "UserProfileModal",
        props: {
          show: Boolean,
          onCancel:Function,
          onOK: Function,
          username:""
        },
        data: function () {
          return {
            user: {}
          }
        },
        mounted: function () {
          getUserByName(this.username).then((resp)=>{
              this.user = resp
          })
        },
        methods: {
          handleOK: function () {
            this.$emit('onOK', this.user)
          }
        }
    }
</script>

<style scoped>

</style>
