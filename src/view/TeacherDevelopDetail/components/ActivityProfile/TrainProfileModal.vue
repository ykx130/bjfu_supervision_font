<template>
  <Modal
    :value="show"
    title="查看"
    width="650"
    @on-ok="handleOk"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange">
    <Form  :modal="active_user" :label-width="80" >
      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="10">
          <FormItem prop="user.unit" label="教师学院：">
            <Input  type="text" v-model="active_user.user.unit" readonly>
            </Input>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem prop="user.name" label="教师姓名：">
            <Input  type="text" v-model="active_user.user.name" readonly>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="10">
          <FormItem prop="activity.title" label="题目：">
            <Input  type="text" v-model="active_user.activity.title" readonly>
            </Input>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem prop="activity.persenter" label="主讲人：">
            <Input type="text" v-model="active_user.activity.presenter"  readonly>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="10">
          <FormItem prop="activity.module" label="所属模块：">
            <Input type="text" v-model="active_user.activity.module" readonly>
            </Input>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem prop="activity.organizer" label="主办单位：">
            <Input type="text" v-model="active_user.activity.organizer"  readonly>
            </Input>
          </FormItem>
        </Col>
      </Row>

      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="10">
          <FormItem prop="activity.start_time" label="培训时间：">
            <DatePicker type="datetime" v-model="active_user.activity.start_time" readonly></DatePicker>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem prop="activity.period" label="学时：">
            <InputNumber v-model="active_user.activity.period" readonly>
            </InputNumber>
          </FormItem>
        </Col>

      </Row>

      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="10">
          <FormItem prop="obgatory" label="是否新教师必修：" >
            <RadioGroup v-model="obgatory">
              <Radio :label="1" disabled>必修</Radio>
              <Radio :label="0" disabled>非必修</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem prop="activity.place" label="培训地点：">
            <Input type="text" v-model="active_user.activity.place" readonly>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="10">
          <FormItem prop="path" label="图片">
            <img v-model="active_user.activity.path" :src="'/api'+this.active_user.activity.path" class="avatar">
          </FormItem>
        </Col>
      </Row>

    </Form>
  </Modal>
</template>

<script>

import { prorankList, sexList, stateList, statusList, unitlist, workStatelist } from 'Views/UserManager/marcos'
import { getUserByName, newPassword, queryGroups } from '@/service/api/user'
import { updateWithinField } from 'Libs/tools'
import { getActiveUser, queryActiveUsers, queryActivityUsers, queryTrainActiveUsers } from '@/service/api/actives'

export default {
  name: 'TrainProfileModal',

  props: {
    show: Boolean,
    onCancel: Function,
    onOk: Function,
    active_id: Number,
    active_type: String,
    username: String
  },
  data: function () {
    return {
      obgatory: -1,
      active_user: {
        activity: {
          title: '',
          module: '',
          presenter: '',
          organizer: '',
          place: '',
          term: '',
          path: '',
          period: undefined,
          start_time: undefined
        },
        user: {
          unit: '',
          name: ''
        }
      }
    }
  },

  methods: {

    handleCancel: function () {
      this.$emit('onCancel')
    },
    handleOk: function () {
      this.$emit('onOk')
    },
    onShowChange (show) {
      if (show) {
        queryActivityUsers({
          'activity_id': this.active_id,
          'username': this.username,
          'activity_type': this.active_type
        }).then((resp) => {
          this.active_user = resp.data.activity_users[0]
          if (this.active_user.activity.is_obligatory === false) {
            this.obgatory = 0
          } else {
            this.obgatory = 1
          }
        })
      }
    },

    mounted: function () {

    }

  }
}

</script>

<style scoped>
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
