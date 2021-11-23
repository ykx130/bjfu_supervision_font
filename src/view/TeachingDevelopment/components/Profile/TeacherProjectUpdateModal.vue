<template>
  <Modal
    :value="show"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="InitData"
    style="width: 600px;">
    <p slot="header">
      <span v-if="title_code===1">查看</span>
      <span v-else-if="title_code===2">编辑</span>
    </p>
    <Form ref="project_user_form" :model="project_user" :rules="project_user_ruleValidate" style="width: 80%" :label-width="100">
      <div v-if="this.current_role === '教发管理员'">
        <FormItem label="教师工号:">
          <Input v-model="project_user.username"></Input>
        </FormItem>
        <FormItem label="教师姓名:">
          <Input v-model="project_user.user.name"></Input>
        </FormItem>
        <FormItem label="所属学院:">
          <Input v-model="project_user.user_unit"></Input>
        </FormItem>
      </div>
      <FormItem label="项目名称:" prop="activity.title">
        <Input v-model="project_user.activity.title" placeholder="项目名称" clearable></Input>
      </FormItem>
      <FormItem label="项目级别:" prop="activity.level">
        <Input v-model="project_user.activity.level" placeholder="项目级别"  clearable></Input>
      </FormItem>
      <FormItem label="上级单位:" prop="activity.superior_units">
        <Input v-model="project_user.activity.superior_units" placeholder="上级单位"  ></Input>
      </FormItem>
      <FormItem label="负责人:" prop="activity.leader">
        <Input v-model="project_user.activity.leader" placeholder="负责人"  ></Input>
      </FormItem>
      <FormItem label="学期：" prop="activity.term">
        <Select v-model="project_user.activity.term" style="width:200px">
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="开始时间:" prop="activity.start_time">
        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" v-model="project_user.activity.start_time"></DatePicker>
      </FormItem>
      <FormItem label="结束时间:" prop="activity.end_time">
        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间" v-model="project_user.activity.end_time"></DatePicker>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import UserMixin from "@/mixins/UserMixin";
import {uploadPictureApi} from "@/service/api/actives";
import {getCurrentTerms, queryTerms} from "@/service/api/term";
import {dateToString, updateWithinField} from "Libs/tools";

export default {
  name: "TeacherProjectUpdateModal",
  mixins: [UserMixin],
  props: {
    onOk: Function,
    onCancel: Function,
    activity_id: Number,
    active_user: Object,
    title_code: Number,
    show: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      uploadPictureApi:uploadPictureApi,
      terms: [],
      valid1: false,
      valid2: false,
      project_user: {
        user_unit: '',
        username: '',
        picpaths: [],
        fin_state: '',
        state: '',
        activity_id: 0,
        activity_title: '',
        activity_type: '项目',
        activity: {
          id: 0,
          title: '',
          start_time: '',
          end_time:'',
          level: '',
          superior_units:'',
          leader:'',
          path: '',
          term: '',
        },
        user:{
          username: '',
          name: '',
        }
      },

      project_user_ruleValidate: {
        'activity.title': [{required: true, trigger: 'blur', message: '请填写项目名称'}],
        'activity.level': [{required: true, trigger: 'blur', message: '请填写项目级别'}],
        'activity.superior_units': [{required: true, trigger: 'blur', message: '请填写上级单位'}],
        'activity.leader': [{required: true, trigger: 'blur', message: '请填写负责人'}],
        'activity.term': [{required: true, trigger: 'change', message: '请选择学期'}],
        'activity.start_time': [{required:true,message:'请选择开始时间'}],
        'activity.end_time': [{required:true,message:'请选择结束时间'}],
      },
    }


  },
  methods: {
    InitData(value){
      if(value){
        updateWithinField(this.project_user,this.active_user)
      }
    },
    handleOK(){
      this.project_user.activity.start_time = dateToString(this.project_user.activity.start_time, 'yyyy-MM-dd hh:mm:ss')
      this.project_user.activity.end_time = dateToString(this.project_user.activity.end_time, 'yyyy-MM-dd hh:mm:ss')
      this.$refs.project_user_form.validate((valid1) => {
        if(valid1){
          console.log('valid',valid1)
          this.$emit('onOK',this.project_user)
        }else {
          this.$Message.error('请填写完整信息')
          this.$emit('onCancel')
        }
      })
    },
    handleCancel(){
      this.$emit('onCancel')
    },

  },
  created() {
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })
    getCurrentTerms().then((termResp) => {
      this.project_user.activity.term = termResp.data.term.name
    })
  },
}
</script>

<style scoped>

</style>


