<template>
  <div>
    <!--<button type="primary" @click="modal1 = true">新增活动</button>-->
    <Modal
      :value="show"
      title="增加一项活动"
      @on-ok="handleOK"
      @on-cancel="handleCancel"
      style="width: 600px;">
      <Form :label-width="100" style="width: 400px">
        <form-item label="活动名称:">
          <Row>
            <Col span="">
              <Input v-model="activity.name" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="责任老师:">
          <Row>
            <Col span="">
              <Select v-model="activity.teacher" style="width:200px">
                <Option v-for="(item,index) in users" :value="item.username" :key="item.username + index">{{item.name}}</Option>
              </Select>
            </Col>
          </Row>
        </form-item>
        <form-item label="活动时间:">
          <Row>
            <Col span="">
              <DatePicker type="datetimerange" placeholder="Select date" style="width: 330px" v-model="inputtime"></DatePicker>
            </Col>
          </Row>
        </form-item>
        <form-item label="活动地点:">
          <Row>
            <Col span="">
              <Input v-model="activity.place" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="活动信息:">
          <Row>
            <Col span="">
              <Input v-model="activity.information" type="textarea" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </form-item>
        <FormItem label="学期：">
          <Select v-model="activity.term" style="width:200px">
            <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <form-item label="报名时间:">
          <Row>
            <Col span="">
              <DatePicker type="datetimerange" placeholder="Select date" style="width: 330px" v-model="inputapplytime"></DatePicker>
            </Col>
          </Row>
        </form-item>
      </Form>
    </Modal>

    <!--{{this.total}}-->
    <!--{{this.activity}}-->
  </div>
</template>

<script>
  import {queryUsers} from '../../../service/api/user'
  import {queryTerms, getCurrentTerms} from '../../../service/api/term'
  import {dateToString} from "../../../utils/tools";
  import {queryActives} from "../../../service/api/actives";

  export default {
      name: "ActiveAddModal",
      props:{
        show:Boolean,
        onCancel:Function,
        onOK: Function,
      },
    data () {
        return {
          date:new Date(),
          query: {}, // 查询用的参数
          terms:[],
          users:[],
          data:[],
          total:0,
          activity:{
            name:'',
            teacher:'',
            start_time:'',
            end_time:'',
            place:'',
            information:'',
            term:'',
            created_at:'',
            updated_at:'',
            apply_start_time:'',
            apply_end_time:'',
          },
          inputtime:'',
          inputapplytime:'',
          // modal1: false,
        }
      },
      methods:{
        handleOK:function(){
          this.activity.start_time=dateToString(this.inputtime[0],"yyyy-MM-dd hh:mm:ss");
          this.activity.end_time=dateToString(this.inputtime[1],"yyyy-MM-dd hh:mm:ss");
          this.activity.apply_start_time=dateToString(this.inputapplytime[0],"yyyy-MM-dd hh:mm:ss");
          this.activity.apply_end_time=dateToString(this.inputapplytime[1],"yyyy-MM-dd hh:mm:ss");
          this.activity.created_at=dateToString(this.date,"yyyy-MM-dd hh:mm:ss");
          this.activity.updated_at=dateToString(this.date,"yyyy-MM-dd hh:mm:ss");
          this.$emit('onOK',this.activity);
          this.activity={};
          this.inputtime='';
          this.inputapplytime='';
        },
        handleCancel:function(){
          this.$emit('onCancel')
        }
      },
      mounted: function () {
        let args = this.$route.query;
        queryTerms().then((resp) => {
          this.terms = resp.data.terms
        });
        getCurrentTerms().then((termResp) => {
          this.query.term = termResp.data.term.name;
        });
        queryUsers().then((resp) => {
          this.users = resp.data.users
        })
        queryActives(args).then((resp)=>{
          this.data = resp.data.activities;
          this.total = resp.data.activities.length;
        })
      }
    }
</script>

