<template>
  <Modal
    :value="show"
    title="新增"
    @on-ok="handleSubmit('user')"
    @on-cancel="handleCancel">
  <Form :model="user" ref="user" :rules="ruleValidate">
    <Row :gutter="16">
      <Col span="12">
       <FormItem prop="username">
           <Select v-model="user.username" placeholder="用户名" filterable>
             <Option v-for="item in users" :value="item.username" :key="item.username">{{ item.username }}</Option>
           <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
           </Select>
       </FormItem>
      </Col>
      <Col span="12">
        <FormItem prop="name">
          <Input type="text" v-model="user.name" placeholder="名字"></Input>
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </FormItem>
      </Col>
    </Row>

    <Row >
      <Col span="10" >
          <FormItem label="性别:" :label-width="50" prop="sex">
            <Select  v-model="user.sex">
              <Option v-for="item in sexList " :value="item" :key="item ">{{ item }}</Option>
            </Select>
          </FormItem>
      </Col>
      <Col span="13" offset="1">
      <!--<span >身份:</span>-->
      <FormItem label="身份:" prop="role_names">
        <CheckboxGroup v-model="user.role_names">
          <Checkbox v-for="role in roles" :label="role.name" :key="'key_'+role.name">
            <span>{{ role.name }}</span>
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
      <Col span="8">
        <FormItem label="工作状态:" :label-width="75" prop="work_state">
          <Select v-model="user.work_state"  >
            <Option v-for="item in workStateList " :value="item" :key="item ">{{ item }}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>

    <Row :gutter="16">
      <Col span="12">
        <FormItem label="任期开始:" :label-width="75" prop="start_time">
        <DatePicker type="date" format="yyyy-MM-dd" v-model="user.start_time" placeholder="请选择" ></DatePicker>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="任期结束:" :label-width="75" prop="end_time">
          <DatePicker type="date" format="yyyy-MM-dd" v-model="user.end_time" placeholder="请选择" ></DatePicker>
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
import { queryUsers, queryRoles, queryGroups} from '../../../service/api/user'
import {dateToString} from 'Libs/tools'
import { sexList, unitlist, prorankList, stateList, workStatelist, statusList } from '../marcos'
export default {
  name: 'UserAddModal',
  props: {
    show: Boolean,
    onCancel: Function,
    onOK: Function
  },
  data: function () {
    return {
      user: {
        name: '',
        email: '',
        phone: '',
        skill: '',
        start_time: '',
        end_time: ''
      },
      users: [],
      roles: [],
      groups: [],
      sexList: sexList,
      unitList: unitlist,
      prorankList: prorankList,
      stateList: stateList,
      workStateList: workStatelist,
      statusList: statusList,
      ruleValidate: {
        username: [{required: true, message: 'the username can not be empty', trigger: 'blur'}],
        name: [{required: true, message: 'the name can not be empty', trigger: 'blur'}],
        sex: [{required: true, message: 'the sex can not be empty', trigger: 'change'}],
        role_names: [{required: true, type: 'array', min: 1, message: 'choose at least one role name', trigger: 'change'}],
        unit: [{required: true, message: 'the unit can not be empty', trigger: 'change'}],
        skill: [{required: true, message: 'the skill can not be empty', trigger: 'blur'}],
        prorank: [{required: true, message: 'the prorank can not be empty', trigger: 'change'}],
        state: [{required: true, message: 'the state can not be empty', trigger: 'change'}],
        work_state: [{required: true, message: 'the work state can not be empty', trigger: 'change'}],
        start_time: [{required: true, type: 'date', message: 'the start time can not be empty', trigger: 'change'}],
        end_time: [{required: true, type: 'date', message: 'the end time can not be empty', trigger: 'change'}],
        status: [{required: true, message: 'the status can not be empty', trigger: 'change'}],
        email: [{required: true, message: 'the email can not be empty', trigger: 'blur'},
          {type: 'email', message: 'Invalid email format', trigger: 'blur'}],
        phone: [{required: true, message: 'the phone can not be empty', trigger: 'blur'},
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
    queryUsers().then((resp) => {
      this.users = resp.data.users
    })
    queryRoles().then((resp) => {
      this.roles = resp.data.roles
    })
    queryGroups().then((resp) => {
      this.groups = resp.data.groups
    })
  },
  methods: {
    /* handleOK: function () {
      this.$emit('onOK', {...this.user,
        start_time: dateToString(this.user.start_time, 'yyyy-MM-dd hh:mm:ss'),
        end_time: dateToString(this.user.end_time, 'yyyy-MM-dd hh:mm:ss') })
    }, */
    handleCancel: function () {
      this.$emit('onCancel')
    },
    handleSubmit (name) {
      this.$emit('onOK', {...this.user,
        start_time: dateToString(this.user.start_time, 'yyyy-MM-dd hh:mm:ss'),
        end_time: dateToString(this.user.end_time, 'yyyy-MM-dd hh:mm:ss') }),
      this.$refs[name].validate((valid) => {
        if (valid) {
          // alert("Success！");
          this.$Message.success('Success！')
        } else {
          // alert("Fail!");
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
