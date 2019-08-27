<template>
  <Card>
    <div style="width: 100%;height: 101px;text-align: center"><img src="./avatar/bjfu_logo.jpeg" style="border-radius: 50%"/></div>
    <h1>用户详情</h1>
    <br>
    <Form :model="user" ref="current_user" :rules="userValidate" style="width: 50%">
      <Row>
        <Col span="8">
          <FormItem prop="id" label="督导ID">
            <Input type="text" style="width: 300px;" v-model="user.id" disabled="true"></Input>
          </FormItem>
        </Col>
        <Col span="8" offset="8">
          <FormItem prop="username" label="姓名">
            <Input type="text" style="width: 300px;" v-model="user.username" disabled="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <br>
      <Row>
        <Col span="8">
          <FormItem prop="sex" label="性别">
            <Input type="text" style="width: 300px;" v-model="user.sex"></Input>
          </FormItem>
        </Col>
        <Col span="8" offset="8">
          <FormItem prop="unit" label="所属机构">
            <Input type="text" style="width: 300px;" v-model="user.unit" disabled="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <br>
      <Row>
        <Col span="8">
          <FormItem prop="state" label="教师状态">
            <Input type="text" style="width: 300px;" v-model="user.state" disabled="true"></Input>
          </FormItem>
        </Col>
        <Col span="8" offset="8">
          <FormItem prop="email" label="邮箱">
            <Input type="email" style="width: 300px;" v-model="user.email"></Input>
          </FormItem>
        </Col>
      </Row>
      <br>
      <Row>
        <Col span="8">
          <FormItem prop="phone" label="电话号码">
            <Input type="text" style="width: 300px;" v-model="user.phone"></Input>
          </FormItem>
        </Col>
        <Col span="8" offset="8">
          <FormItem prop="group" label="组别">
            <Input type="text" style="width: 300px;" v-model="user.guider.group" disabled="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <br>
      <Row>
        <Col span="8">
          <FormItem prop="status" label="签约状态">
            <Input type="text" style="width: 300px;" v-model="user.status" disabled="true"></Input>
          </FormItem>
        </Col>
        <Col span="8" offset="8">
          <FormItem prop="prorank" label="职称">
            <Input type="text" style="width: 300px;" v-model="user.prorank" disabled="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <br>
      <Row>
        <Col span="8">
          <FormItem prop="term" label="开始学期">
            <Input type="text" style="width: 300px;" v-model="user.guider.term" disabled="true"></Input>
          </FormItem>
        </Col>
        <Col span="8" offset="8">
          <FormItem prop="term" label="结束学期">
            <Input type="text" style="width: 300px;" v-model="user.guider.term" disabled="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem prop="work_state" label="督导类型">
            <Input type="text" style="width: 300px;" v-model="user.guider.work_state" disabled="true"></Input>
          </FormItem>
        </Col>
        <Col span="8" offset="8">
          <FormItem prop="skill" label="专业领域">
            <Input type="text" style="width: 300px;" v-model="user.skill"></Input>
          </FormItem>
        </Col>
      </Row>
      <br>
      <br>
      <FormItem>
        <Button type="primary">更新基本信息</Button>
        <Button @click="newpass_visible=true">重置密码</Button>
      </FormItem>

      <change-pass :show="newpass_visible"@onOk="chanpassword"@onCancel="()=>{this.newpass_visible=false}"></change-pass>
    </Form>
  </Card>
</template>

<script>
import { getUserByName } from '@/service/api/user'
import { newPassword } from '../../service/api/user'
import ChangePass from './components/ChangePass'
export default {
  components: { ChangePass },
  data: function () {
    return {
      newpass_visible: false,
      user: {},
      userValidate: {
        email: [{ type: 'email', message: 'Invalid email format', trigger: 'blur' }],
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
    let username = this.$route.params.username
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
    chanpassword: function (passwd) {
      newPassword(this.$route.params.username, { 'password': passwd })
      this.newpass_visible = false
    }
  }
}
</script>

<style scoped>

</style>
