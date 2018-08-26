<!--<template>-->
  <!--<div>-->
    <!--<p>111{{this.activites}}</p>-->
  <!--<Modal-->
    <!--v-model="show"-->
    <!--title="Title"-->
    <!--@on-ok="handleOK"-->
    <!--@on-visible-change="onShowChange">-->
    <!--<Form :model="activity">-->
      <!--<FormItem prop="name">-->
        <!--<Input type="text" v-model="user.name" placeholder="Username">-->
        <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
        <!--</Input>-->
      <!--</FormItem>-->
    <!--</Form>-->
  <!--</Modal>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import {queryActives} from "../../../service/api/actives"-->

    <!--import {updateWithinField} from '../../../utils/tools'-->
    <!--export default {-->
        <!--components:{queryActives},-->
        <!--name: "ActivesProfileModal",-->
        <!--props: {-->
          <!--show: Boolean,-->
          <!--onCancel:Function,-->
          <!--onOK: Function,-->
          <!--username:""-->
        <!--},-->
        <!--data: function () {-->
          <!--return {-->
            <!--user: {},-->
            <!--activity:{-->
              <!--id:'',-->
              <!--name:'',-->
              <!--teacher:'',-->
              <!--start_time:'',-->
              <!--end_time:'',-->
              <!--place:'',-->
              <!--state:'',-->
              <!--information:'',-->
              <!--all_num: 9,-->
              <!--attend_num: '',-->
              <!--remainder_num: '',-->
              <!--term: "",-->
              <!--created_at: "",-->
              <!--updated_at: "",-->
              <!--apply_start_time: "",-->
              <!--apply_end_time: "",-->
              <!--apply_state: ""-->
            <!--},-->
            <!--activites: ['123'],-->
          <!--}-->
        <!--},-->
        <!--mounted: function () {-->
          <!--queryActives().then((resp)=>{-->
            <!--this.activites= resp.data-->
          <!--})-->
        <!--},-->
        <!--methods: {-->
          <!--handleOK: function () {-->
            <!--this.$emit('onOK', this.activites)-->
          <!--},-->
        <!--}-->
    <!--}-->
<!--</script>-->

<!--<template>-->
  <!--<Modal-->
    <!--:value="show"-->
    <!--title="Title"-->
    <!--@on-ok="handleOK"-->
    <!--@on-cancel="handleCancel"-->
    <!--@on-visible-change="onShowChange">-->
    <!--<Form :model="activity">-->
      <!--<FormItem prop="id">-->
        <!--<Input type="text" v-model="activity.id" placeholder="活动ID">-->
        <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
        <!--</Input>-->
      <!--</FormItem>-->
      <!--<FormItem prop="name">-->
        <!--<Input type="text" v-model="activity.name" placeholder="活动名称">-->
        <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
        <!--</Input>-->
      <!--</FormItem>-->
    <!--</Form>-->
  <!--</Modal>-->
<!--</template>-->
<!---->
<!--<script>-->
  <!--import {getActive, queryActives} from '../../../service/api/actives'-->
  <!--import {updateWithinField} from '../../../utils/tools'-->
  <!--export default {-->
    <!--name: "ActivesProfileModal",-->
    <!--props: {-->
      <!--id:'',-->
      <!--show: Boolean,-->
      <!--onCancel:Function,-->
      <!--onOK: Function,-->
    <!--},-->
    <!--data: function () {-->
      <!--return {-->
        <!--activity: {-->
          <!--id:"",-->
          <!--name:"",-->
          <!--teacher:'',-->
          // start_time:'',
          // end_time:'',
          // place:'',
          // state:'',
          // information:'',
          // all_num: 9,
          // attend_num: '',
          // remainder_num: '',
          // term: "",
          // created_at: "",
          // updated_at: "",
          // apply_start_time: "",
          // apply_end_time: "",
          // apply_state: ""
        <!--},-->
        <!--activites:[],-->
      <!--}-->
    <!--},-->
    // mounted: function () {
    //   queryActives().then((resp)=>{
    //     this. activites= resp.data.activites
    //   })
    // },
    <!--methods: {-->
      <!--handleOK: function () {-->
        <!--this.$emit('onOK', this.activity)-->
      <!--},-->
      <!--handleCancel: function () {-->
        <!--this.$emit('onCancel')-->
      <!--},-->
      <!--onShowChange: function (show) {-->
        <!--if(show){-->
          <!--// 显示的时候拉数据-->
          <!--getActive(this.id).then((resp)=>{-->
            <!--updateWithinField(this.activity, resp.data.activites)-->
          <!--})-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->
<template>
  <div class="layout">
    <layout>
    <content style="height: 500px">
      <Row type="flex" justify="center" align="middle">
        <Col span="16">
          <div style="align-self: center">
            <!--{{this.activity_id}}-->
            <!--{{this.activity}}-->
            <!--{{this.data}}-->
            <Row>
              <Col span="24">
                <h3>基本信息：</h3>
              </Col>
            </Row>
            <Row type="flex" justify="start" align="middle" class="code-row-bg">
              <Col span="8">活动ID号：
                <Input style="width: 180px" type="text" v-model="activity.id" placeholder="活动ID" >
                </Input>
              </Col>
              <Col span="8">活动名称：
                <Input style="width: 180px" type="text" v-model="activity.name" placeholder="活动名称" >
                </Input>
              </Col>
              <Col span="8">责任老师：
                <Input style="width: 180px" type="text" v-model="activity.teacher" placeholder="责任老师" >
                </Input>
              </Col>
            </Row>
            <Row >
              <Col span="24">

              </Col>
            </Row>
            <Row type="flex" justify="start" align="middle" class="code-row-bg">
              <Col span="16">活动地点：
                <Input style="width: 370px" type="text" v-model="activity.space" placeholder="活动地点" >
                </Input>
              </Col>
            </Row>
            <Row type="flex" justify="start" align="middle" class="code-row-bg" >
              <Col span="24">活动时间：
                <Input style="width: 180px" type="text" v-model="activity.start_time" placeholder="开始时间" >
                </Input>
                -
                <Input style="width: 180px" type="text" v-model="activity.end_time" placeholder="结束时间" >
                </Input>
              </Col>
            </Row>
            <Row type="flex" justify="start" align="middle" class="code-row-bg">
              <Col span="24">活动信息：
                <Input style="width: 370px" type="textarea" v-model="activity.information" placeholder="活动信息" >
                </Input>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <h3>参与人员信息：</h3>
              </Col>
            </Row>
            <!--<Button type="primary" @click="modal1 = true">Add an activity</Button>-->
            <Row>
              <Table border stripe :columns="columns" :data="data"></Table>
            </Row>
            <Modal
              v-model="modal1"
              :value="show"
              title="Title"
              @on-ok="handleOK"
              @on-cancel="handleCancel"
              @on-visible-change="onShowChange">

              <Form :model="activity">
                <span>活动名称:</span>
                <FormItem prop="name">
                  <Input type="text" v-model="activity.name" placeholder="活动名称">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <span>责任老师:</span>
                <FormItem prop="teacher">
                  <Input type="text" v-model="activity.teacher" placeholder="责任老师">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <span>活动状态:</span>
                <FormItem prop="state">
                  <Input type="text" v-model="activity.state" placeholder="活动状态">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <span>开始时间:</span>
                <FormItem prop="start_time">
                  <Input type="text" v-model="activity.start_time" placeholder="开始时间">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <span>结束时间:</span>
                <FormItem prop="end_time">
                  <Input type="text" v-model="activity.end_time" placeholder="结束时间">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <span>活动信息:</span>
                <FormItem prop="information">
                  <Input type="text" v-model="activity.information" placeholder="活动信息">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <!--<FormItem prop="lesson_state">-->
                <!--<Input type="text" v-model="lesson.lesson_attention_reason" placeholder="关注理由">-->
                <!--<Icon type="ios-person-outline" slot="prepend"></Icon>-->
                <!--</Input>-->
                <!--</FormItem>-->
              </Form>
            </Modal>
          </div>
        </Col>
      </Row>

    </content>
    </layout>
    </layout>
  </div>
</template>

<script>
  import {getActive,getActiveUser} from '../../../service/api/actives'
  import {updateWithinField} from '../../../utils/tools'

  // import {lessonLevel} from '../marcos'
  export default {
    name: "ActiveProfileModal",
    props: {
      show: Boolean,
      onCancel:Function,
      onOK: Function,
      // activity_id:"0"
    },
    data: function () {
      return {
        activity_id: this.$route.query.id,
        data:[],
        total:0,
        activity: {
          id:"",
          name: "",
          teacher: "",
          state: "",
          start_time: "",
          end_time: "",
          information: "",
        },
        activity_user:{},
        // lessonLevel: lessonLevel
        modal1:false,

        columns: [
          {
            title: 'id',
            render: function (h, params) {
              return (
                <span>{ params.row.user.id }</span>
            )
            }
          },
          {
            title: '姓名',
            render: function (h, params) {
              return (
                <span>{ params.row.user.name }</span>
            )
            }
          },
          {
            title: '性别',
            render: function (h, params) {
              return (
                <span>{ params.row.user.sex }</span>
            )
            }
          },
          {
            title: '组别',
            render: function (h, params) {
              return (
                <span>{ params.row.user.group }</span>
            )
            }
          },
          {
            title: '职称',
            render: function (h, params) {
              return (
                <span>{ params.row.user.prorank }</span>
            )
            }
          },
          {
            title: '报名状态',
            render: function (h, params) {
              return (
                <span>{ params.row.state};
                { params.row.fin_state }</span>

            )
            }
          },
        ]

      }
    },
    methods: {
      handleOK: function () {
        this.$emit('onOK', this.activity)
      },
      handleCancel: function () {
        this.$emit('onCancel')
      },
      onShowChange: function (show) {
        if(show){
          // 显示的时候拉数据
          getActive(this.activity_id).then((resp)=>{
            updateWithinField(this.activity, resp.data.activity)
          })
        }
      }
    },
    mounted:function(){
      getActive(this.activity_id).then((resp)=>{
        updateWithinField(this.activity, resp.data.activity)
      });
      getActiveUser(this.activity_id).then((usrresp)=>{
        this.data=usrresp.data.activity_users;
        this.total = usrresp.data.total;
      });
    }
  }
</script>

<style scoped>

</style>



