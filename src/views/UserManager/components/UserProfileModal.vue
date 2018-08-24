<template>
  <Modal
    :value="show"
    title="查看"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
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

      <FormItem label="性别:" prop="sex">
        <Select v-model="user.sex"  style="width:448px">
          <Option v-for="item in sexList " :value="item" :key="item ">{{ item }}</Option>
        </Select>
      </FormItem>

      <FormItem label="学院:" prop="unit">
        <Select v-model="user.unit"  style="width:448px">
          <Option v-for="item in unitList " :value="item" :key="item ">{{ item }}</Option>
        </Select>
      </FormItem>

      <FormItem prop="skill">
        <Input type="text" v-model="user.skill" placeholder="专业">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>

      <FormItem label="职称:" prop="prorank">
        <Select v-model="user.prorank"  style="width:448px">
          <Option v-for="item in prorankList " :value="item" :key="item ">{{ item }}</Option>
        </Select>
      </FormItem>

      <FormItem label="在职状态:" prop="state">
        <Select v-model="user.state"  style="width:423px">
          <Option v-for="item in stateList " :value="item" :key="item ">{{ item }}</Option>
        </Select>
      </FormItem>

      <FormItem label="工作状态:" prop="work_state">
        <Select v-model="user.work_state"  style="width:423px">
          <Option v-for="item in workStateList " :value="item" :key="item ">{{ item }}</Option>
        </Select>
      </FormItem>

      <FormItem label="任期开始:" prop="start_time">
        <DatePicker type="date" format="yyyy-MM-dd" v-model="user.start_time" placeholder="请选择" style="width: 423px"></DatePicker>
      </FormItem>

      <FormItem label="任期结束:" prop="end_time">
        <DatePicker type="date"  format="yyyy-MM-dd" v-model="user.end_time" placeholder="请选择" style="width: 423px"></DatePicker>
      </FormItem>

      <FormItem label="状态:" prop="status">
        <Select v-model="user.status"  style="width:448px">
          <Option v-for="item in statusList " :value="item" :key="item ">{{ item }}</Option>
        </Select>
      </FormItem>

      <span>身份:</span>
      <FormItem prop="role_names">
        <CheckboxGroup v-model="user.role_names">
          <Checkbox v-for="role in roles" :label="role.name" :key="'key_'+role.name">
            <span>{{ role.name }}</span>
          </Checkbox>
        </CheckboxGroup>
      </FormItem>

      <FormItem label="小组:" prop="group">
        <Select v-model="user.group" style="width:448px">
          <Option v-for="item in groups" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>

      <FormItem prop="email">
        <Input type="text" v-model="user.email" placeholder="电子邮箱">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>

      <FormItem prop="phone">
        <Input type="text" v-model="user.phone" placeholder="电话">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>

    </Form>
  </Modal>
</template>

<script>
  import {getUserByName, queryRoles,queryGroups} from '../../../service/api/user'
  import {updateWithinField} from '../../../utils/tools'
  import {dateToString} from '../../../utils/tools'
  import { sexList,  unitlist, prorankList, stateList, workStatelist, statusList} from '../marcos'
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
        user: {
          id:"",
          name:"",
          username: "",
          skill:"",
          start_time: "",
          end_time: "",
          group:"",
          email:"",
          phone:"",
          role_names: []
        },
        roles: [],
        groups: [],
        sexList: sexList,
        unitList: unitlist,
        prorankList: prorankList,
        stateList: stateList,
        workStateList: workStatelist,
        statusList: statusList
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
        this.$emit('onOK', {...this.user,
          start_time: dateToString(this.user.start_time, 'yyyy-MM-dd hh:mm:ss'),
          end_time: dateToString(this.user.end_time, 'yyyy-MM-dd hh:mm:ss') })
      },
      handleCancel: function () {
        this.$emit('onCancel')
      },
      onShowChange: function (show) {
        if(show){
          // 显示的时候拉数据
          getUserByName(this.username).then((resp)=>{
            updateWithinField(this.user, resp.data.user)
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
