<template>
  <div>
    <Button type="primary" @click="modal1 = true">Add an activity</Button>
    <Modal
      v-model="modal1"
      title="增加一项活动"
      @on-ok="ok"
      @on-cancel="cancel"
      style="width: 600px;">
      <Form :label-width="70" style="width: 400px">
        <form-item label="name:">
          <Row>
            <Col span="">
              <Input v-model="inputname" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="teacher:">
          <Row>
            <Col span="">
              <Input v-model="inputteacher" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="time:">
          <Row>
            <Col span="">
              <DatePicker type="datetimerange" placeholder="Select date" style="width: 330px" v-model="inputtime"></DatePicker>
            </Col>
          </Row>
        </form-item>
        <form-item label="place:">
          <Row>
            <Col span="">
              <Input v-model="inputplace" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="state:">
          <Row>
            <Col span="">
              <Input v-model="inputstate" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="information:">
          <Row>
            <Col span="">
              <Input v-model="inputinfo" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </form-item>
        <FormItem label="学期：">
          <Select v-model="query.user_roles.term" style="width:200px">
            <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <!--{{this.inputtime}}-->
    <!--{{this.activity.start_time}}-->
    <!--{{this.activity.end_time}}-->
  </div>
</template>

<script>
  import {queryTerms, getCurrentTerms} from '../../../service/api/term'
  // import FloatBar from '../../components/float_bar/float_bar'
  import {dateToString} from "../../../utils/tools";

  export default {
      name: "ActivesAddModal",
      data () {
        return {
          query: {
            user_roles: {term: ""}
          }, // 查询用的参数
          total: 0, // 总数量
          data: [], //数据
          terms:[],
          flag:false,
          activity:{},
          inputname:'',
          inputteacher:'',
          inputtime:'',
          inputplace:'',
          inputstate:'',
          inputinfo:'',
          inputterm:'',
          modal1: false,
        }
      },
      props:{
        onOk: Function,
        onCancel: Function
      },
      methods:{
        ok(){
          this.activity.id='';
          this.activity.name=this.inputname;
          this.activity.teacher=this.inputteacher;
          this.activity.time=this.inputtime;
          this.activity.state=this.inputstate;
          this.activity.place=this.inputplace;
          this.activity.information=this.inputinfo;
          this.activity.start_time=dateToString(this.inputtime[0],"yyyy-MM-dd hh:mm:ss");
          this.activity.end_time=dateToString(this.inputtime[1],"yyyy-MM-dd hh:mm:ss");
          this.$emit('onOk',this.activity);
          this.inputname='';
          this.inputteacher='';
          this.inputstate='';
          this.inputplace='';
          this.inputinfo='';
        },
      },
      mounted: function () {
        let args = this.$route.query;
        queryTerms().then((resp) => {
          this.terms = resp.data.terms
        });
        getCurrentTerms().then((termResp) => {
          this.query.user_roles.term = termResp.data.term.name;
        })
      }
    }
</script>

