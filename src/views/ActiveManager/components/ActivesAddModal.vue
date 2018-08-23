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
              <Input v-model="inputtplace" placeholder="Enter something..."></Input>
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
  </div>
</template>

<script>
  import {queryTerms, getCurrentTerms} from '../../../service/api/term'
    export default {
      name: "add_activity",
      data () {
        return {
          query: {
            user_roles: {term: ""}
          }, // 查询用的参数
          total: 0, // 总数量
          data: [], //数据
          terms:[],
          flag:false,
          InputUsr:[{
            index:1,
            status:1,
            id:'',
            user_id:'',
            name:'',
            starttime:'null',
            endtime:'null',
            sex:'',
            email:'',
            phone:'',
            state:'',
            unit:'',
            u_status:'',
            group:'',
            workstate:'',
            prorank:'',
            skill:'',
            created_at:'null',
            updated_at:'',
            alias:'null'
          }],
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
        handleAdd () {
          this.index++;
          this.qsInputOptions.push({
            label:'',
            value: '',
            index: this.index,
            status: 1
          });
        },
        ok(){
          this.activity.id='';
          this.activity.name=this.inputname;
          this.activity.teacher=this.inputteacher;
          this.activity.time=this.inputtime;
          this.activity.state=this.inputstate;
          this.activity.place=this.inputplace;
          this.activity.information=this.inputinfo;

          this.$emit('onOk',this.activity);
          this.inputname='';
          this.inputteacher='';
          this.inputtime='';
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

