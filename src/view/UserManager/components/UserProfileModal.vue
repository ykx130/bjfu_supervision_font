<template>
  <Modal
    :value="show"
    title="查看"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange">
    <Form :model="user" ref="user" :rules="ruleValidate">
      <Row :gutter="16">
        <Col span="12">
        <FormItem prop="username">
          <Input type="text" v-model="user.username" placeholder="用户名" disabled="true">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem prop="name">
          <Input type="text" v-model="user.name" placeholder="名字" disabled="true">
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
        <FormItem label="小组:" :label-width="50" prop="group">
          <Select v-model="user.group" >
            <Option v-for="item in groups" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
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
import {getUserByName, queryRoles, queryGroups} from '../../../service/api/user'
import {updateWithinField} from '@/libs/tools'
import {dateToString} from '@/libs/tools'
import { sexList, unitlist, prorankList, stateList, workStatelist, statusList} from '../marcos'
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
        id: '',
        name: '',
        username: '',
        skill: '',
        start_time: '',
        end_time: '',
        group: '',
        email: '',
        phone: '',
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
        username: [{required: true, message: 'the username can not be empty', trigger: 'blur'}],
        name: [{required: true, message: 'the name can not be empty', trigger: 'blur'}],
        sex: [{required: true, message: 'the sex can not be empty', trigger: 'blur'}],
        role_names: [{required: true, message: 'the role name can not be empty', trigger: 'blur'}],
        unit: [{required: true, message: 'the unit can not be empty', trigger: 'blur'}],
        skill: [{required: true, message: 'the skill can not be empty', trigger: 'blur'}],
        prorank: [{required: true, message: 'the prorank can not be empty', trigger: 'blur'}],
        state: [{required: true, message: 'the state can not be empty', trigger: 'blur'}],
        work_state: [{required: true, message: 'the work state can not be empty', trigger: 'blur'}],
        start_time: [{required: true, message: 'the start time can not be empty', trigger: 'blur'}],
        end_time: [{required: true, message: 'the end time can not be empty', trigger: 'blur'}],
        status: [{required: true, message: 'the status can not be empty', trigger: 'blur'}],
        email: [{required: true, message: 'the email can not be empty', trigger: 'blur'},
          {type: 'email', message: 'Invalid email format', trigger: 'blur'}],
        phone: [{required: true, message: 'the phone can not be empty', trigger: 'blur'},
          {type: 'number', message: 'Invalid phone format', trigger: 'blur'}]
      }
    }
  },
  mounted: function () {
    queryRoles().then((resp) => {
      this.roles = resp.data.roles
    })
    queryGroups().then((resp) => {
      this.groups = resp.data.groups
    })
  },
  methods: {
    handleOK: function () {
      this.$emit('onOK', {...this.user,
        start_time: dateToString(this.user.start_time, 'yyyy-MM-dd hh:mm:ss'),
        end_time: dateToString(this.user.end_time, 'yyyy-MM-dd hh:mm:ss') })
    },
    handleCancel: function () {
      this.$emit('onCancel')
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
