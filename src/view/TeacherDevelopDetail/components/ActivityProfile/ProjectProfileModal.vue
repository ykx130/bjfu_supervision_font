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
          <FormItem prop="activity.title" label="项目名称：">
            <Input  type="text" v-model="active_user.activity.title" readonly>
            </Input>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem prop="activity.leader" label="负责人：">
            <Input type="text" v-model="active_user.activity.leader"  readonly>
            </Input>
          </FormItem>
        </Col>
      </Row>

      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="10">
          <FormItem prop="activity.level" label="项目级别：">
            <Input type="text" v-model="active_user.activity.level" readonly>
            </Input>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem prop="activity.superior_units" label="上级单位：">
            <Input type="text" v-model="active_user.activity.superior_units"  readonly>
            </Input>
          </FormItem>
        </Col>
      </Row>

      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="10">
          <FormItem prop="activity.start_time" label="开始时间：">
            <DatePicker type="datetime" v-model="active_user.activity.start_time" readonly></DatePicker>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem prop="activity.end_time" label="结束时间：">
            <DatePicker type="datetime" v-model="active_user.activity.end_time" readonly></DatePicker>
          </FormItem>
        </Col>
      </Row>

      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="10">
          <FormItem prop="activity.term" label="学期：">
            <Input type="text" v-model="active_user.activity.term" readonly>
            </Input>
          </FormItem>
        </Col>
      </Row>



    </Form>
  </Modal>
</template>

<script>

import { queryActivityUsers} from "@/service/api/actives";

export default {
  name: "ProjectProfileModal",

  props: {
    show: Boolean,
    onCancel: Function,
    onOk: Function,
    active_id:Number,
    active_type:String,
    username:String,
  },
  data: function () {
    return {

      active_user:{
        activity:{
          title:'',
          leader:'',
          level:'',
          superior_units:'',
          term:'',
          start_time:undefined,
          end_time:undefined
        },
        user:{
          unit:'',
          name:''
        }
      }
    }
  },
  methods: {

    handleCancel: function () {

      this.$emit('onCancel')
    },
    handleOk :function () {

      this.$emit('onOk')
    },
    onShowChange(show){
      if(show){
        queryActivityUsers({'activity_id':this.active_id,
          'username':this.username,
          'activity_type':this.active_type}).then((resp)=>{
          this.active_user=resp.data.activity_users[0]


        })
      }
    }

  },
  mounted: function () {


  }

}

</script>

<style scoped>

</style>
