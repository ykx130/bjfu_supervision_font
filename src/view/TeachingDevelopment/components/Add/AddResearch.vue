<template>
  <div>
    <Modal
      :value="modal"
      title="增加一个研究项目"
      @on-ok="handleOK"
      @on-cancel="handleCancel"
      :loading="loading"
      style="width: 600px;">
      <Form :label-width="100" style="width: 400px" ref="activity_form" :model="activity" :rules="ruleValidate">
        <form-item label="论文题目:" prop="title">
          <Row>
            <Col>
              <Input v-model="activity.title" placeholder="论文题目"></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="作者:" prop="author">
          <Row>
            <Col>
              <Input v-model="activity.author" placeholder="作者" style="width:200px" filterable>
              </Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="发表刊物:" prop="journal">
          <Row>
            <Col>
              <Input v-model="activity.journal" placeholder="发表刊物" style="width:200px" filterable>
              </Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="发表时间:" prop="start_time">
          <Row>
            <Col span="11">
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始时间" v-model="activity.start_time"></DatePicker>
            </Col>
          </Row>
        </form-item>

        <form-item label="学期：" prop="term" v-role="['管理员']">
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
import { queryResearch} from "@/service/api/actives";

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
        author:'',
        journal:'',
        start_time:'',
        term:'',
        created_at: '',
        updated_at: ''
      },
      addActivity: {},
      ruleValidate: {
        title: [{required: true, trigger: 'blur', message: '请填写论文题目'}],
        author: [{required: true, trigger: 'blur', message: '请填写作者姓名'}],
        journal: [{required: true, trigger: 'blur', message: '请填写发表刊物'}],
        start_time: [{required:true,type:'date', trigger:'blur',message:'请选择发表时间'}],
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
          // if (this.activity.start_time > this.activity.end_time) {
          //   this.$Message.error('项目开始日期应该在结束日期之前！')
          //   return
          // }
          // this.loading= true;
          this.addActivity = {
            title: this.activity.title,
            author: this.activity.author,
            journal:this.activity.journal,
            start_time:this.activity.start_time,
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

    queryResearch(args).then((resp) => {
      this.data = resp.data.researchs
      this.total = resp.data.total
    })
  }
}
</script>

<style scoped>

</style>

