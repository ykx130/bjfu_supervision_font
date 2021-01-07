<template>
  <div>
    <Modal
      :value="modal"
      title="增加一项教师交流活动"
      @on-ok="handleOK"
      @on-cancel="handleCancel"
      :loading="loading"
      style="width: 600px;">
      <Form :label-width="100" style="width: 400px" ref="activity_form" :model="activity" :rules="ruleValidate">
        <form-item label="交流题目:" prop="title">
          <Row>
            <Col>
              <Input v-model="activity.title" placeholder="交流题目"></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="受邀高校:" prop="invited_university">
          <Row>
            <Col>
              <Input v-model="activity.invited_university" placeholder="受邀高校名称" style="width:200px" filterable>
              </Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="交流时间:" prop="start_time">
          <Row>
            <Col span="11">
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="交流日期" v-model="activity.start_time"></DatePicker>
            </Col>
          </Row>
        </form-item>
        <form-item label="参与人数:" prop="number">
          <Row>
            <Col>
              <InputNumber v-model="activity.number"></InputNumber>
            </Col>
          </Row>
        </form-item>
        <form-item label="学时:" prop="period">
          <Row>
            <Col>
              <InputNumber v-model="activity.period" placeholder="填写学时"></InputNumber>
            </Col>
          </Row>
        </form-item>

        <FormItem label="学期：" prop="term" v-role ="['教发管理员']">
          <Select v-model="activity.term" style="width:200px">
            <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </FormItem>

      </Form>
    </Modal>
  </div>
</template>

<script>



import { dateToString } from '@/libs/tools'
import {getCurrentTerms, queryTerms} from "@/service/api/term";

export default {
  name: "AddExchange",
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
      loading: true,
      //modal: false,
      // loading: true,
      date: new Date(),
      query: {}, // 查询用的参数
      terms: [],
      users: [],
      data: [],
      total: 0,
      activity: {
        title: '',
        invited_university:'',
        start_time:'',
        number:0,
        period: 0,
        term: '',
        created_at: '',
        updated_at: ''

      },
      addActivity: {},
      ruleValidate: {
        title: [{required: true, trigger: 'blur', message: '请填写交流题目'}],
        invited_university: [{required: true, trigger: 'blur', message: '请填写受邀高校名称'}],
        start_time: [{required:true,type:'date', trigger:'blur',message:'请选择交流时间'}],
        period: [{required: true, type: 'number', min: 0.001, trigger: 'change',message:'学时必须大于0'}]
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
        console.log(valid)
        if (valid) {
          this.activity.start_time = dateToString(this.activity.start_time, 'yyyy-MM-dd hh:mm:ss')
          this.activity.created_at = dateToString(this.date, 'yyyy-MM-dd hh:mm:ss')
          this.activity.updated_at = dateToString(this.date, 'yyyy-MM-dd hh:mm:ss')

          // this.loading= true;
          this.addActivity = {
            title: this.activity.title,
            invited_university: this.activity.invited_university,
            start_time:this.activity.start_time,
            period: this.activity.period,
            number: this.activity.number,
            term: this.activity.term,
            created_at: this.activity.created_at,
            updated_at: this.activity.updated_at,
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

  },
  mounted: function () {
    let args = this.$route.query
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })
    getCurrentTerms().then((termResp) => {
      this.query.term = termResp.data.term.name
      this.activity.term = termResp.data.term.name
    })
  }
}
</script>

<style scoped>

</style>
