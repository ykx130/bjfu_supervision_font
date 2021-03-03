<template>
  <div>
    <Modal
      :value="modal"
      title="增加一项比赛信息"
      @on-ok="handleOK"
      @on-cancel="handleCancel"
      :loading="loading"
      style="width: 600px;">
      <Form :label-width="100" style="width: 400px" ref="activity_form" :model="activity" :rules="ruleValidate">

        <form-item label="比赛名称:" prop="award_name">
          <Row>
            <Col>
              <Input v-model="activity.award_name" placeholder="比赛名称"></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="比赛级别:" prop="level">
          <Row>
            <Col>
              <Input v-model="activity.level" placeholder="比赛级别" style="width:200px" filterable>
              </Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="主办单位:" prop="organizer">
          <Row>
            <Col>
              <Input v-model="activity.organizer" placeholder="主办单位" style="width:200px" filterable>
              </Input>
            </Col>
          </Row>
        </form-item>
        <FormItem label="比赛时间:" prop="start_time">
          <Row>
            <Col span="11">
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="获奖时间" v-model="activity.start_time"></DatePicker>
            </Col>
          </Row>
        </FormItem>


        <form-item label="学期：" prop="term" v-role="['教发管理员']">
          <Select v-model="activity.term" style="width:200px">
            <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </form-item>
        <FormItem label="请上传比赛文件" prop="path" v-role="['教发管理员']">
          <Upload :action="uploadFileApi"
                  :format="['doc','docx','pdf']"
                  :on-success="handleImportFileSucc"
                  name="filename"
                  style="display: block">
            <Button  icon="ios-cloud-upload-outline" type="primary" size="small" style="">上传文件</Button>
          </Upload>
        </FormItem>

      </Form>
    </Modal>
  </div>
</template>

<script>



import { dateToString } from '@/libs/tools'
import {getCurrentTerms, queryTerms} from "@/service/api/term";
import {queryCompetition,uploadFileApi} from "@/service/api/actives";
import {queryUsers} from "@/service/api/user";

export default {
  name: "AddCompetition",
  props: {
    modal: {
      type:Boolean,
      default:false
    },
    onCancel: Function,
    onOK: Function
  },
  data: function () {
    return {
      uploadFileApi:uploadFileApi,
      loading: true,
      //modal: false,
      // loading: true,
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
        created_at: '',
        updated_at: '',
      },

      addActivity: {},
      ruleValidate: {
        award_name: [{required: true, trigger: 'blur', message: '请填写奖项名称'}],
        level: [{required: true, trigger: 'blur', message: '请填写获奖级别'}],
        organizer: [{required: true, trigger: 'blur', message: '请填写主办单位'}],
        term: [{required: true, trigger: 'blur', message: '请选择学期'}],
        start_time: [{required:true,type:'date', trigger:'blur',message:'请选择获奖时间'}],

        // user: [{
        //   required: true,
        //   trigger: 'change',
        //   type: 'object',
        //   message: '请选择教师',
        //   fields: { username: { type: 'string', required: true, message: '请选择教师' } }
        // }],
      }
    }
  },
  methods: {
    changeLoading: function() {
      setTimeout(()=>{
        this.loading = false;
        this.$nextTick(()=>{
          this.loading = true
        })
      }, 500)
    },
    handleOK: function () {
      this.changeLoading()
      this.$refs.activity_form.validate((valid) => {

        if (valid) {
          this.activity.start_time = dateToString(this.activity.start_time, 'yyyy-MM-dd hh:mm:ss')
          this.activity.created_at = dateToString(this.date, 'yyyy-MM-dd hh:mm:ss')
          this.activity.updated_at = dateToString(this.date, 'yyyy-MM-dd hh:mm:ss')
          // if (this.activity.start_time > this.activity.end_time) {
          //   this.$Message.error('项目开始日期应该在结束日期之前！')
          //   return
          // }
          // this.loading= true;
          this.addActivity = {
            award_name: this.activity.award_name,
            level: this.activity.level,
            organizer:this.activity.organizer,
            start_time:this.activity.start_time,
            term: this.activity.term,
            created_at: this.activity.created_at,
            updated_at: this.activity.updated_at,
            path:this.activity.path
          }

          this.$emit('onOK', this.addActivity)
          this.activity = {}

        } else {
          this.$Message.error('请填写完整信息!')

        }
      })
    },
    handleCancel: function () {
      this.$emit('onCancel')
    },
    handleImportFileSucc: function (response, file, fileList) {
      if (response.code === 500) {
        this.$Message.success({ content: '上传成功' })
        this.activity.path=response.path
      } else {
        this.$Message.warning({ content: '上传失败' })
        this.activity.path=''
      }
    },
    onSelectTeacherChange: function (query) {
      this.queryUsers({ name_like: query }).then((resp) => {
        this.users = resp.data.users // 关键词编号重新加载 xxx_like 对 XXX模糊查
      })
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
    // queryTerms().then((resp) => {
    //   this.terms = resp.data.terms
    // })
    // getCurrentTerms().then((termResp) => {
    //   this.query.term = termResp.data.term.name
    //   this.activity.term = termResp.data.term.name
    // })

    queryCompetition(args).then((resp) => {
      this.data = resp.data.researchs
      this.total = resp.data.total
    })
  }
}
</script>

<style scoped>

</style>

