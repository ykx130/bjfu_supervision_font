<template>
  <Row>
    <Col span="12">
      <Card>
        <h1>用户详情</h1>
        <br>
        <Form :model="user" ref="current_user" :rules="userValidate" style="width: 50%">
          <h3>用户名</h3>
          <FormItem prop="username">
            <Input type="text" style="width: 300px;" v-model="user.username"></Input>
          </FormItem>
          <br>
          <h3>性别</h3>
          <FormItem>
            <Input type="text" style="width: 300px;" v-model="user.sex"></Input>
          </FormItem>
          <br>
          <h3>邮箱</h3>
          <FormItem prop="email">
            <Input type="email" style="width: 300px;" v-model="user.email"></Input>
          </FormItem>
          <br>
          <h3>联系方式</h3>
          <FormItem prop="phone">
            <Input type="text" style="width: 300px;" v-model="user.phone"></Input>
          </FormItem>
          <br>
          <h3>学院</h3>
          <FormItem prop="unit">
            <Input type="text" style="width: 300px;" v-model="user.unit"></Input>
          </FormItem>
          <br>
          <h3>专业</h3>
          <FormItem prop="skill">
            <Input type="text" style="width: 300px;" v-model="user.skill"></Input>
          </FormItem>
          <br>
          <h3>职称</h3>
          <FormItem prop="prorank">
            <Input type="text" style="width: 300px;" v-model="user.prorank"></Input>
          </FormItem>
          <br>
          <FormItem>
            <Button type="primary">更新基本信息</Button>
          </FormItem>
        </Form>
      </Card>
    </Col>
  </Row>

</template>

<script>
  import {getUserByName} from '@/service/api/user'

  export default {
    data: function () {
      return {
        user: {},
        userValidate: {
          email: [{type: 'email', message: 'Invalid email format', trigger: 'blur'}],
          phone: [{
              validator (rule, value, callback) {
                if (!value) {
                  return callback(new Error('the phone can not be empty'))
                } else if (!/^[1][34578][0-9]{9}$/.test(value)) {
                  callback('手机号格式不正确')
                } else {
                  callback()
                }
              }
            }]
        }
      }
    },
    mounted: function () {
      let username = this.$route.params.username;
      getUserByName(username).then((resp) => {
        this.user = resp.data.user
      })
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success！')
          } else {
            this.$Message.error('Fail!')
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
