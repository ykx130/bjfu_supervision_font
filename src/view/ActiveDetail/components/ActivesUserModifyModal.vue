<template>
  <div>
    <Modal
      :value="modal"
      title="修改活动"
      @on-ok="handleOK"
      @on-cancel="handleCancel"
      :loading="loading"
      @on-visible-change="onShowChange"
      style="width: 600px;"><!--:load="loading"-->
      <Form :label-width="100" style="width: 400px" ref="activity_form" :model="activity" :rules="ruleValidate">
        <form-item label="题目:" prop="title">
          <Row>
            <Col>
              <Input v-model="activity.title" placeholder="题目"></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="主讲人:" prop="presenter">
          <Row>
            <Col>
              <Input v-model="activity.presenter" placeholder="主讲人"></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="培训时间:" prop="start_time">
          <Row>
            <Col span="11">
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="培训日期" v-model="activity.start_time"></DatePicker>
            </Col>
          </Row>
        </form-item>
        <form-item label="培训地点:" prop="place">
          <Row>
            <Col>
              <Input v-model="activity.place" placeholder="请填写培训地点"></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="学时:" prop="period">
          <Row>
            <Col>
              <InputNumber v-model="activity.period"></InputNumber>
            </Col>
          </Row>
        </form-item>
        <form-item label="主办单位:" prop="organizer">
          <Row>
            <Col>
              <Input v-model="activity.organizer" placeholder="请填写主办单位"></Input>
            </Col>
          </Row>
        </form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {dateToString, updateWithinField} from '@/libs/tools'
import {getActive, putActive} from "../../../service/api/actives"
export default {
  name: 'ActivesUserModifyModal',
  props: {
    modal: Boolean,
    onCancel: Function,
    onOK: Function,
    id: Number
  },
  data () {
    return {
      loading: true,
      modal: false,
      // loading: true,
      date: new Date(),
      query: {}, // 查询用的参数
      terms: [],
      users: [],
      data: [],
      total: 0,
      activity: {
        id:'',
        period: Number,
        title:'',
        presenter:'',
        place: '',
        organizer: '',
        start_time:'',
      },
      addActivity: {},
      ruleValidate: {
        title: [{ required: true, trigger: 'blur', message: '请填写活动名称' }],
        presenter: [{ required: true, trigger: 'blur', message: '请填写主讲人' }],
        period: [{ required: true, type: 'number', min: 1, trigger: 'change', message: '学时大于等于1' }],
        place: [{ required: true, trigger: 'blur', message: '请填写活动地点' }],
        organizer: [{ required: true, trigger: 'blur', message: '请填写活动地点' }]
      }
    }
  },
  methods: {
    changeLoading: function () {
      setTimeout(() => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500)
    },
    handleOK: function () {
      this.changeLoading()
      this.$refs.activity_form.validate((valid) => {
        if (valid) {
          this.activity.start_time = dateToString(this.activity.start_time, 'yyyy-MM-dd hh:mm:ss')
          putActive(this.activity).then((resp) => {
            if (resp.data.code === 200) {
              this.$Message.success({ content: '修改成功' })
              getActive(this.id).then((new_resp) => {
                updateWithinField(this.activity, new_resp.data.activity)
              })
            }
          })
          this.$emit('onOK', this.activity)
          this.modal = false
        } else {
          this.$Message.error('请填写完整信息!')
        }
      })
    },
    handleCancel: function () {
      this.$emit('onCancel')
    },
    onShowChange(){
      getActive(this.id).then((resp) => {
        this.activity = resp.data.activity
      })
    }
  }
}
</script>
