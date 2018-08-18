<template>
  <Modal
    :value="show"
    title="Title"
    @on-ok="handleOK"
    @on-cancel="onCancel"
    @on-visible-change="onShowChange">
  <Form :model="user">
    <FormItem prop="username">
      <Input type="text" v-model="user.username" placeholder="用户名">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
      <FormItem prop="name">
        <Input type="text" v-model="user.name" placeholder="名字">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
    <span>身份:</span>
    <FormItem prop="roles">
      <CheckboxGroup v-model="user.roles">
        <Checkbox v-for="role in roles" :label="role.name" :key="'key_'+role.name">
          <span>{{ role.name }}</span>
        </Checkbox>
      </CheckboxGroup>
    </FormItem>
    </Form>
  </Modal>
</template>

<script>
    import {getUserByName, queryRoles} from '../../../service/api/user'
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
            user: {},
            roles: []
          }
        },
        mounted: function () {
          queryRoles().then((resp)=>{
            this.roles = resp.data.roles
          })
        },
        methods: {
          handleOK: function () {
            this.$emit('onOK', this.user)
          },
          onShowChange: function (show) {
            if(show){
              // 显示的时候拉数据
              getUserByName(this.username).then((resp)=>{
                this.user = resp.data.user
              })
            }
          }
        }
    }
</script>

<style scoped>

</style>
