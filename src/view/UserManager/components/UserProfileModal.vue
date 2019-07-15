<template>
  <Modal
    :value="show"
    title="查看"
    @on-ok="handleSubmit('user')"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange">
    <Form :model="user" ref="user" :rules="ruleValidate">
      <Row :gutter="16">
        <Col span="12">
        <FormItem prop="username">
          <Input type="text" v-model="user.username" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem prop="name">
          <Input type="text" v-model="user.name" placeholder="名字">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        </Col>
      </Row>

      <Row >
        <Col span="10" >
        <FormItem label="性别:" :label-width="40" prop="sex">
          <Select  v-model="user.sex">
            <Option v-for="item in sexList " :value="item" :key="item ">{{ item }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="13" offset="1">
        <!--<span >身份:</span>-->
        <FormItem label="身份:" prop="role_names">
          <CheckboxGroup v-model="user.role_names">
            <Checkbox v-for="role in roles" :label="role" :key="'key_'+role">
              <span>{{ role }}</span>
            </Checkbox>
          </CheckboxGroup>
        </FormItem>
        </Col>
      </Row>

      <Row :gutter="16">
        <Col span="12">
        <FormItem label="学院:" :label-width="50" prop="unit">
          <Select v-model="user.unit" >
            <Option v-for="item in unitList " :value="item" :key="item ">{{ item }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem prop="skill">
          <Input type="text" v-model="user.skill" placeholder="专业">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="8">
        <FormItem label="职称:" :label-width="50" prop="prorank">
          <Select v-model="user.prorank"  >
            <Option v-for="item in prorankList " :value="item" :key="item ">{{ item }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="在职状态:" :label-width="75" prop="state">
          <Select v-model="user.state"  >
            <Option v-for="item in stateList " :value="item" :key="item ">{{ item }}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>

      <Row :gutter="16">
        <Col span="12">
        <FormItem label="状态:" :label-width="50" prop="status">
          <Select v-model="user.status" >
            <Option v-for="item in statusList " :value="item" :key="item ">{{ item }}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>

      <Row :gutter="16">
        <Col span="12">
        <FormItem prop="email">
          <Input type="text" v-model="user.email" placeholder="电子邮箱">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem prop="phone">
          <Input type="text" v-model="user.phone" placeholder="电话">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>

<script>
import { getUserByName, queryGroups } from '../../../service/api/user'
import { updateWithinField } from '@/libs/tools'
import { dateToString } from '@/libs/tools'
import { sexList, unitlist, prorankList, stateList, workStatelist, statusList } from '../marcos'
export default {
  name: 'UserProfileModal',
  props: {
    show: Boolean,
    onCancel: Function,
    onOK: Function,
    username: ''
  },
  data: function () {
    return {
      user: {
        id: undefined,
        name: undefined,
        username: undefined,
        skill: undefined,
        start_time: undefined,
        end_time: undefined,
        group: undefined,
        email: undefined,
        phone: undefined,
        role_names: []
      },
      roles: [],
      groups: [],
      sexList: sexList,
      unitList: unitlist,
      prorankList: prorankList,
      stateList: stateList,
      workStateList: workStatelist,
      statusList: statusList,
      ruleValidate: {
        username: [{ required: true, message: 'the username can not be empty', trigger: 'blur' }],
        name: [{ required: true, message: 'the name can not be empty', trigger: 'blur' }],
        sex: [{ required: true, message: 'the sex can not be empty', trigger: 'change' }],
        role_names: [{
          required: true,
          type: 'array',
          min: 1,
          message: 'choose at least one role name',
          trigger: 'change'
        }],
        unit: [{ required: true, message: 'the unit can not be empty', trigger: 'change' }],
        skill: [{ required: true, message: 'the skill can not be empty', trigger: 'blur' }],
        prorank: [{ required: true, message: 'the prorank can not be empty', trigger: 'change' }],
        state: [{ required: true, message: 'the state can not be empty', trigger: 'change' }],
        status: [{ required: true, message: 'the status can not be empty', trigger: 'change' }],
        email: [{ required: true, message: 'the email can not be empty', trigger: 'blur' },
          { type: 'email', message: 'Invalid email format', trigger: 'blur' }],
        phone: [{ required: true, message: 'the phone can not be empty', trigger: 'blur' },
          {
            validator (rule, value, callback) {
              if (!value) {
                return callback(new Error('the phone can not be empty'))
              } else if (!/^[1][34578][0-9]{9}$/.test(value)) {
                callback('手机号格式不正确')
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  mounted: function () {
    this.roles = ['管理员', '学院领导']
    queryGroups().then((resp) => {
      this.groups = resp.data.groups
    })
  },
  methods: {
    /* handleOK: function () {
      this.$emit('onOK', {
        ...this.user,
        start_time: dateToString(this.user.start_time, 'yyyy-MM-dd hh:mm:ss'),
        end_time: dateToString(this.user.end_time, 'yyyy-MM-dd hh:mm:ss')
      })
    }, */
    handleCancel: function () {
      this.$emit('onCancel')
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // alert("Success！");
          this.$emit('onOK', { ...this.user })
          this.$Message.success('Success！')
        } else {
          // alert("Fail!");
          this.$Message.error('信息错误')
        }
      })
    },
    onShowChange: function (show) {
      if (show) {
        // 显示的时候拉数据
        getUserByName(this.username).then((resp) => {
          updateWithinField(this.user, resp.data.user)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
