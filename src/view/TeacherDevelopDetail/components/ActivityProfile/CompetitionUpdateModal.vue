<template>
  <div>
    <Modal
      :value="modal"
      title="查看或修改比赛信息"
      @on-ok="handleOK"
      @on-cancel="handleCancel"
      @on-visible-change="InitData"
      style="width: 600px;">
      <Form :label-width="100" style="width: 400px" ref="activity_form" :model="activity" :rules="ruleValidate">

        <FormItem label="比赛名称:" prop="award_name">
          <Input v-model="activity.award_name" placeholder="比赛名称"></Input>
        </FormItem>
        <FormItem label="比赛级别:" prop="level">
          <Input v-model="activity.level" placeholder="比赛级别" style="width:200px" filterable></Input>
        </FormItem>
        <FormItem label="主办单位:" prop="organizer">
          <Input v-model="activity.organizer" placeholder="主办单位" style="width:200px" filterable></Input>
        </FormItem>
        <FormItem label="比赛时间:" prop="start_time">
          <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="获奖时间" v-model="activity.start_time"></DatePicker>
        </FormItem>
        <FormItem label="学期：" prop="term" v-role="['教发管理员']">
          <Select v-model="activity.term" style="width:200px">
            <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </FormItem>

      </Form>
    </Modal>
  </div>
</template>

<script>


import {dateToString, updateWithinField} from '@/libs/tools'
import {getCurrentTerms, queryTerms} from "@/service/api/term";
import {queryCompetition,uploadFileApi} from "@/service/api/actives";
import {queryUsers} from "@/service/api/user";

export default {
  name: "CompetitionUpdateModal",
  props: {
    modal: {
      type:Boolean,
      default:false
    },
    onCancel: Function,
    onOK: Function,
    competition: Object,
  },
  data: function () {
    return {
      uploadFileApi:uploadFileApi,
      loading: true,
      date: new Date(),
      query: {
      }, // 查询用的参数
      terms: [],
      users: [],
      data: [],
      total: 0,
      activity: {
        award_name:'',
        level:'',
        organizer:'',
        start_time:'',
        term:'',
        path:'',
        id:0,
      },

      addActivity: {},
      ruleValidate: {
        award_name: [{required: true, trigger: 'blur', message: '请填写奖项名称'}],
        level: [{required: true, trigger: 'blur', message: '请填写获奖级别'}],
        organizer: [{required: true, trigger: 'blur', message: '请填写主办单位'}],
        term: [{required: true, trigger: 'blur', message: '请选择学期'}],
        start_time: [{required:true,type:'date', trigger:'blur',message:'请选择获奖时间'}],
      }
    }
  },
  methods: {

    handleOK: function () {

      this.$refs.activity_form.validate((valid) => {

        if (valid) {
          this.activity.start_time = dateToString(this.activity.start_time, 'yyyy-MM-dd hh:mm:ss')
          this.$emit('onOK', this.activity)
          this.activity = {}

        } else {
          this.$Message.error('请填写完整信息!')

        }
      })
    },
    handleCancel: function () {
      this.$emit('onCancel')
    },
    InitData(value){
      if(value){
        updateWithinField(this.activity,this.competition)
      }
    }

  },
  created() {
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })
    getCurrentTerms().then((termResp) => {
      this.query.term = termResp.data.term.name
      this.activity.term = termResp.data.term.name
    })
    queryUsers().then((resp) => {
      this.users = resp.data.users
    })
  },
  mounted: function () {
    let args = this.$route.query

    queryCompetition(args).then((resp) => {
      this.data = resp.data.researchs
      this.total = resp.data.total
    })
  }
}
</script>

<style scoped>

</style>


