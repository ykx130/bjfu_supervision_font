<template>
  <div>
    <Modal
      :value="modal"
      title="增加一项培训活动"
      @on-ok="handleOK"
      @on-cancel="handleCancel"
      :loading="loading"
      style="width: 600px;"><!--:load="loading"-->
      <Form :label-width="100" style="width: 90%" ref="activity_form" :model="activity" :rules="ruleValidate">
        <form-item label="题目:" prop="title">
          <Row>
            <Col>
              <Input v-model="activity.title" placeholder="题目"></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="主讲人:" prop="presenter">
              <Input v-model="activity.presenter" placeholder="主讲人姓名"  filterable>
              </Input>
        </form-item>
        <FormItem label="学期：" prop="term" v-role ="['教师','教发管理员']">
          <Select v-model="activity.term" style="width: 190px">
            <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <form-item label="培训时间:" prop="start_time">
          <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始日期" v-model="activity.start_time"></DatePicker>
        </form-item>
        <form-item label="参与人数:" prop="all_num" v-role="['教发管理员']">
          <Row>
            <Col>
              <InputNumber v-model="activity.all_num"></InputNumber>
            </Col>
          </Row>
        </form-item>
<!--        <form-item label="所属模块:" prop="module">-->
<!--          <Row>-->
<!--            <Col>-->
<!--              <Input v-model="activity.module" placeholder="填写所属模块" />-->
<!--            </Col>-->
<!--          </Row>-->
<!--        </form-item>-->
        <FormItem label="所属模块:" prop="module">
          <Select v-model="activity.module" >
            <Option v-for="item in moduleList" :value="item.module" :key="item.module">{{ item.module }}</Option>
          </Select>
        </FormItem>
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
        <FormItem label="是否必修：" prop="is_obligatory" v-role="['教发管理员']">
          <RadioGroup v-model="activity.is_obligatory">
            <Radio v-for="item in isMajorList" :label="item.value" :key="item.value" style="margin-right: 35px">{{item.label}}</Radio>
          </RadioGroup>
          <!--          <RadioGroup v-model="activity.is_obligatory" >-->
          <!--            <Radio v-for="item in activity.List" :label="item.value" :key="item.value">-->
          <!--              <span>{{item.label}}</span>-->
          <!--            </Radio>-->
          <!--          </RadioGroup>-->
        </FormItem>

        <FormItem label="请上传活动图片" prop="image" v-role="['教师']">
          <div class="demo-upload-list" v-for="(item,index) in picpaths" :key="index">
            <img :src="'/api/static/images/'+item"  />
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemoveList(index)"></Icon>
            </div>
          </div>
          <Upload
            :show-upload-list="false"
            name="filename"
            :on-exceeded-size="handleMaxSize"
            :on-success="handleSuccessList"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            multiple
            type="drag"
            :action="uploadPictureApi"
            style="display: inline-block;width:100px;">
            <div style="width: 100px;height:100px;line-height: 100px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal title="图片预览" v-model="visible">
            <img :src="showImageUrl" v-if="visible" style="width: 100%" />
          </Modal>

        </FormItem>


        <FormItem label="请上传活动文件" prop="path" v-role="['教发管理员']">
          <Upload :action="uploadFileApi"
                  :format="['doc','docx','pdf']"
                  :on-success="handleImportFileSucc"
                  name="filename"
                  style="display: block">
            <Button  icon="ios-cloud-upload-outline" type="primary" size="small">上传文件</Button>
          </Upload>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import { queryUsers } from '../../../service/api/user'
  import { queryTerms, getCurrentTerms } from '../../../service/api/term'
  import {queryActives, uploadPictureApi, uploadFileApi, queryActivityModules} from '../../../service/api/actives'
  import {isMajor, ModuleList} from '../marcos'
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
        uploadFileApi:uploadFileApi,
        isMajorList: isMajor,
        loading: true,
        //modal: false,
        // loading: true,
        date: new Date(),
        query: {}, // 查询用的参数
        terms: [],
        users: [],
        data: [],
        moduleList: [],
        showImageUrl: '',
        visible: false,
        i:0,

        total: 0,
        picpaths:[],
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
          path:'',
        },
        addActivity: {},
        ruleValidate: {
          title: [{required: true, trigger: 'blur', message: '请填写活动名称'}],
          presenter: [{required: true, trigger: 'blur', message: '请填写主讲人姓名'}],
          start_time: [{required:true,type:'date',message:'请选择培训时间'}],
          all_num: [{required: true, type: 'number', min: 1, trigger: 'change', message: '参与人数必须大于等于1'}],
          place: [{required: true, trigger: 'blur', message: '请填写培训地点'}],
          organizer: [{required: true, trigger: 'blur', message: '请填写主办单位'}],
          module: [{trigger: 'change', message: '请选择所属模块'}],
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
          if(this.picpaths.length===0&& this.current_role!=='教发管理员'){
            valid=false
          }

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

            this.$emit('onOK', this.addActivity,this.picpaths)
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

      handleImportFileSucc: function (response, file, fileList) {
        if (response.code === 500) {
          this.$Message.success({ content: '上传成功' })
          this.activity.path=response.path
        } else {
          this.$Message.warning({ content: '上传失败' })
          this.activity.path=''
        }
      },
      // handleImportPicSucc: function (response, file, fileList) {
      //   if (response.code === 500) {
      //     this.$Message.success({ content: '上传成功' })
      //     this.picpath=response.path
      //   } else {
      //     this.$Message.warning({ content: '上传失败' })
      //     this.picpath=''
      //   }
      // },

//--------
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '图片大小限制',
          desc: '文件 ' + file.name + '太大,不能超过 2M.'
        })
      },
      handleView (imageUrl) {
        this.showImageUrl = '/api/static/images/'+imageUrl
        this.visible = true
      },
      handleRemoveList (index) {
        // 删除
        this.picpaths.splice(index, 1)

      },
      handleSuccessList:function (res, file) {
        if(res.code===500) {
          this.picpaths.push(res.path)
          this.i++


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
      queryActivityModules().then((resp) => {
        this.moduleList = resp.data.activity_modules
      })
    }
  }
</script>
<style scoped>
.demo-upload-list {
  display: inline-block;width: 100px;height: 100px;text-align: center;line-height: 100px;
  border: 1px solid transparent;border-radius: 4px;overflow: hidden;background: #fff;
  position: relative;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;height: 100%;
}
.demo-upload-list-cover {
  display: none;position: absolute;top: 0;bottom: 0;
  left: 0;right: 0;background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;font-size: 20px;cursor: pointer;margin: 0 2px;
}
</style>
