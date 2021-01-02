<template>
  <div>
    <Modal
      :value="modal"
      title="增加一个项目"
      @on-ok="handleOK"
      @on-cancel="handleCancel"
      :loading="loading"
      style="width: 600px;">
      <Form :label-width="100" style="width: 400px" ref="activity_form" :model="activity" :rules="ruleValidate">
        <form-item label="项目名称:" prop="title">
          <Row>
            <Col>
              <Input v-model="activity.title" placeholder="项目名称"></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="级别:" prop="level">
          <Row>
            <Col>
              <Input v-model="activity.level" placeholder="级别" style="width:200px" filterable>
              </Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="上级单位:" prop="superior_units">
          <Row>
            <Col>
              <Input v-model="activity.superior_units" placeholder="上级单位" style="width:200px" filterable>
              </Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="负责人:" prop="leader">
          <Row>
            <Col>
              <Input v-model="activity.leader" placeholder="负责人" style="width:200px" filterable>
              </Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="开始时间:" prop="start_time">
          <Row>
            <Col span="11">
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始时间" v-model="activity.start_time"></DatePicker>
            </Col>
          </Row>
        </form-item>
        <form-item label="结束时间:" prop="end_time">
          <Row>
            <Col span="11">
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束时间" v-model="activity.end_time"></DatePicker>
            </Col>
          </Row>
        </form-item>

        <form-item label="学期：" prop="term" >
          <Select v-model="activity.term" style="width:200px">
            <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </form-item>

      </Form>
    </Modal>
  </div>
</template>

<script>



import { dateToString } from '@/libs/tools'
import {getCurrentTerms, queryTerms} from "@/service/api/term";
import {queryProject} from "@/service/api/actives";

export default {
  name: "AddProject",
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
      query: {

      }, // 查询用的参数
      terms: [],
      users: [],
      data: [],
      total: 0,
      activity: {
        title: '',
        level:'',
        superior_units:'',
        leader:'',
        start_time:'',
        end_time:'',
        term: '',
        created_at: '',
        updated_at: ''
      },
      addActivity: {},
      ruleValidate: {
        title: [{required: true, trigger: 'blur', message: '请填写项目名称'}],
        level: [{required: true, trigger: 'blur', message: '请填写项目级别'}],
        superior_units: [{required: true, trigger: 'blur', message: '请填写上级单位'}],
        leader: [{required: true, trigger: 'blur', message: '请填写项目负责人'}],
        start_time: [{required:true,type:'date', trigger:'blur',message:'请选择项目开始时间'}],
        end_time: [{required:true,type:'date', trigger:'blur',message:'请选择项目结束时间'}],
        term: [{required: true, trigger: 'blur', message: '请选择学期'}],
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
          this.activity.end_time = dateToString(this.activity.end_time, 'yyyy-MM-dd hh:mm:ss')
          this.activity.created_at = dateToString(this.date, 'yyyy-MM-dd hh:mm:ss')
          this.activity.updated_at = dateToString(this.date, 'yyyy-MM-dd hh:mm:ss')
          if (this.activity.start_time > this.activity.end_time) {
            this.$Message.error('项目开始日期应该在结束日期之前！')
            return
          }
          // this.loading= true;
          this.addActivity = {
            title: this.activity.title,
            level: this.activity.level,
            superior_units:this.activity.superior_units,
            leader:this.activity.leader,
            start_time:this.activity.start_time,
            end_time:this.activity.end_time,
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

    queryProject(args).then((resp) => {
      this.data = resp.data.projects
      this.total = resp.data.total
    })
  }
}
</script>

<style scoped>

</style>
