<template>
  <div>
    <Modal
      :value="modal"
      title="增加一项培训活动"
      @on-ok="handleOK"
      @on-cancel="handleCancel"
      :loading="loading"
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
              <Input v-model="activity.presenter" placeholder="主讲人姓名" style="width:200px" filterable>
              </Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="培训时间:" prop="start_time">
          <Row>
            <Col span="11">
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始日期" v-model="activity.start_time"></DatePicker>
            </Col>
            <!--            <Col span="2" style="text-align: center">-</Col>-->
            <!--            <Col span="11">-->
            <!--              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束日期" v-model="activity.inputtime.end_time"></DatePicker>-->
            <!--            </Col>-->
          </Row>
        </form-item>
        <form-item label="参与人数:" prop="all_num" v-role="['教发管理员']">
          <Row>
            <Col>
              <InputNumber v-model="activity.all_num"></InputNumber>
            </Col>
          </Row>
        </form-item>
        <form-item label="所属模块:" prop="module">
          <Row>
            <Col>
              <Input v-model="activity.module" placeholder="填写所属模块" />
            </Col>
          </Row>
        </form-item>
        <form-item label="培训地点:" prop="place">
          <Row>
            <Col>
              <Input v-model="activity.place" placeholder="填写培训地点" />
            </Col>
          </Row>
        </form-item>
        <form-item label="主办单位:" prop="organizer">
          <Row>
            <Col>
              <Input v-model="activity.organizer"  placeholder="填写主办单位" />
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
        <FormItem label="是否必修" prop="is_obligatory" v-role="['教发管理员']">
          <RadioGroup v-model="activity.is_obligatory" >
            <Radio :label='1'>是</Radio>
            <Radio :label='0'>否</Radio>
          </RadioGroup>
          <!--          <RadioGroup v-model="activity.is_obligatory" >-->
          <!--            <Radio v-for="item in activity.List" :label="item.value" :key="item.value">-->
          <!--              <span>{{item.label}}</span>-->
          <!--            </Radio>-->
          <!--          </RadioGroup>-->
        </FormItem>
        <FormItem label="学期：" prop="term" v-role ="['教发管理员']">
          <Select v-model="activity.term" style="width:200px">
            <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </FormItem>

        <FormItem label="请上传相关图片" prop="path" v-role="['教师']">
          <Upload :action="uploadPictureApi"
                  :format="['jpg','png','jpeg']"
                  :on-success="handleImportPictureSucc"
                  name="filename"
                  style="display: block">
            <Button  icon="ios-cloud-upload-outline" type="primary" size="small" style="">上传图片</Button>
          </Upload>
        </FormItem>
        <FormItem v-role="['教师']">
          (图片类型为：jpg,png,jpeg，图片大小)
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import { queryUsers } from '../../../service/api/user'
  import { queryTerms, getCurrentTerms } from '../../../service/api/term'
  import { queryActives,uploadPictureApi } from '../../../service/api/actives'
  import { dateToString } from '@/libs/tools'
  import UserMixin from "@/mixins/UserMixin";
  export default {
    name: 'ActiveAddModal',
    mixins:[UserMixin],
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
        uploadPictureApi:uploadPictureApi,
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
          presenter: '',
          organizer:'',
          all_num: 1,
          //attend_num:0,
          //reminder_num:0,
          place: '',
          period: 0,
          term: '',
          module: '',
          is_obligatory:0,
          created_at: '',
          updated_at: '',
          start_time: '',
          path:''
        },
        addActivity: {},
        ruleValidate: {
          title: [{required: true, trigger: 'blur', message: '请填写活动名称'}],
          presenter: [{required: true, trigger: 'blur', message: '请填写主讲人姓名'}],

          start_time: [{required:true,type:'date', trigger:'blur',message:'请选择培训时间'}],
          all_num: [{required: true, type: 'number', min: 1, trigger: 'change', message: '参与人数必须大于等于1'}],
          place: [{required: true, trigger: 'blur', message: '请填写培训地点'}],
          organizer: [{required: true, trigger: 'blur', message: '请填写主办单位'}],
          module: [{trigger: 'blur', message: '请填写所属模块'}],
          term: [{required: true, trigger: 'change', message: '请选择学期'}],
          period: [{required: true, type: 'number', min: 0.001, trigger: 'change',message:'学时必须大于0'}],
          is_obligatory:[{required:true}]
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
          if(this.activity.path===''&& this.current_role!=='教发管理员'){
            valid=false
          }
          console.log(valid)
          if (valid) {
            this.activity.start_time = dateToString(this.activity.start_time, 'yyyy-MM-dd hh:mm:ss')
            this.activity.created_at = dateToString(this.date, 'yyyy-MM-dd hh:mm:ss')
            this.activity.updated_at = dateToString(this.date, 'yyyy-MM-dd hh:mm:ss')
            this.activity.is_obligatory=Boolean(this.activity.is_obligatory)

            this.addActivity = {
              title: this.activity.title,
              //teacher: this.activity.teacher,
              presenter: this.activity.presenter,
              organizer:this.activity.organizer,
              period: this.activity.period,
              is_obligatory: this.activity.is_obligatory,
              module: this.activity.module,
              all_num: this.activity.all_num,
              place: this.activity.place,
              term: this.activity.term,
              created_at: this.activity.created_at,
              updated_at: this.activity.updated_at,
              start_time: this.activity.start_time,
              path:this.activity.path

            }

            this.$emit('onOK', this.addActivity)
            this.activity = {}

          } else {
            this.$Message.error('请填写完整信息!')
            /* setTimeout(() => {
              this.loading = false;
              this.$nextTick(() => {
                this.loading = true;
              });
            }, 2000); */
          }
        })
      },
      handleCancel: function () {
        this.$emit('onCancel')
      },
      onSelectTeacherChange: function (query) {
        this.queryUsers({ name_like: query }).then((resp) => {
          this.users = resp.data.users // 关键词编号重新加载 xxx_like 对 XXX模糊查
        })
      },

      handleImportPictureSucc: function (response, file, fileList) {
        if (response.code === 500) {
          this.$Message.success({ content: '上传成功' })
          this.activity.path=response.path
        } else {
          this.$Message.warning({ content: '上传失败' })
          this.activity.path=''
        }
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
      queryUsers().then((resp) => {
        this.users = resp.data.users
      })
      queryActives(args).then((resp) => {
        this.data = resp.data.activities
        this.total = resp.data.total
      })
    }
  }
</script>
<style scoped>

</style>
