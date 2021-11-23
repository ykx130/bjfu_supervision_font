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
      <FormItem label="论文题目:" prop="activity.title">
        <Input v-model="project_user.activity.title" placeholder="论文题目" clearable></Input>
      </FormItem>
      <FormItem label="论文作者:" prop="activity.author">
        <Input v-model="project_user.activity.author" placeholder="论文作者"  clearable></Input>
      </FormItem>
      <FormItem label="发表刊物:" prop="activity.journal">
        <Input v-model="project_user.activity.journal" placeholder="发表刊物"  ></Input>
      </FormItem>
      <FormItem label="学期：" prop="activity.term">
        <Select v-model="project_user.activity.term" style="width:200px">
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="开始时间:" prop="activity.start_time">
        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" v-model="project_user.activity.start_time"></DatePicker>
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
  name: "TeacherResearchProfileModal",
  mixins: [UserMixin],
  props: {
    onOk: Function,
    onCancel: Function,
    active_user: Object,
    title_code: Number,
    show: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      terms: [],
      project_user: {
        user_unit: '',
        username: '',
        picpaths: [],
        fin_state: '',
        state: '',
        activity_id: 0,
        activity_title: '',
        activity_type: '研究',
        activity: {
          id: 0,
          title: '',
          start_time: '',
          author:'',
          journal: '',
          path: '',
          term: '',
        },
        user:{
          username: '',
          name: '',
        }
      },

      project_user_ruleValidate: {
        'activity.title': [{required: true, trigger: 'blur', message: '请填写论文名称'}],
        'activity.author': [{required: true, trigger: 'blur', message: '请填写作者'}],
        'activity.journal': [{required: true, trigger: 'blur', message: '请填写发表刊物'}],
        'activity.term': [{required: true, trigger: 'change', message: '请选择学期'}],
        'activity.start_time': [{required:true,message:'请选择开始时间'}],
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
      this.$refs.project_user_form.validate((valid1) => {
        if(valid1){
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


