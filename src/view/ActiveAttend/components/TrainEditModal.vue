<template>
<div>
  <Modal
    :value="show"
    title="修改"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange"
    style="width: 600px;">
    <Form :label-width="100" style="width: 90%" ref="activity_form" :model="activity" :rules="ruleValidate">
      <form-item label="题目:" prop="title">
        <Row>
          <Col>
            <Input v-model="activity.title" placeholder="题目" disabled></Input>
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
      <FormItem label="学期：" prop="term" v-role ="['教师','教发管理员']">
        <Select v-model="activity.term" style="width:200px">
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <form-item label="培训时间:" prop="start_time">
        <Row>
          <Col span="11">
            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始日期" v-model="activity.start_time"></DatePicker>
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
      <FormItem label="活动图片：" prop="image" v-role="['教师']" >
        <div class="demo-upload-list" v-for="(item,index) in imageUrlList" :key="index">
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
    </Form>
  </Modal>
</div>
</template>

<script>
import {getUserByName} from "@/service/api/user";
import {dateToString, updateWithinField} from "Libs/tools";
import {getActiveUser, queryActivityUsers, uploadPictureApi} from "@/service/api/actives";
import {getCurrentTerms, queryTerms} from "@/service/api/term";

export default {
  name: "TrainEditModal",
  props: {
    show: {
      type:Boolean,
      default:false
    },
    onCancel: Function,
    onOK: Function,
    edit_activity: Object,
    activity_user: Object,

 },
  data(){
    return{
      uploadPictureApi:uploadPictureApi,
      imageUrlList: [],
      showImageUrl: '',
      visible: false,
      i:0,
      terms:[],


      active_user:{
        username: '',
        activity_id:undefined,
        activity_time:undefined,
        user_unit:undefined,
        picpaths:[],
        fin_state:undefined,
        state:undefined,
        activity_type:'培训'
      },
      activity:{
        id:this.active_id,
        title: '',
        presenter: '',
        organizer:'',
        attend_num:undefined,
        apply_state:undefined,
        all_num:undefined,
        remainder_num: undefined,
        place: '',
        period: undefined,
        term:'',
        module: '',
        is_obligatory:undefined,
        start_time: undefined,
        path:'',

      },
      ruleValidate: {
        title: [{required: true, trigger: 'blur', message: '请填写活动名称'}],
        presenter: [{required: true, trigger: 'blur', message: '请填写主讲人姓名'}],
        start_time: [{required:true,type:'date', trigger:'blur',message:'请选择培训时间'}],
        place: [{required: true, trigger: 'blur', message: '请填写培训地点'}],
        organizer: [{required: true, trigger: 'blur', message: '请填写主办单位'}],
        term: [{required: true, trigger: 'change', message: '请选择学期'}],
        period: [{required: true, type: 'number', min: 0.001, trigger: 'change',message:'学时必须大于0'}],

      }
    }
  },
  created() {
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })
    getCurrentTerms().then((termResp) => {
      this.activity.term = termResp.data.term.name
    })
  },
  methods:{

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
      this.imageUrlList.splice(index, 1)
    },
    handleSuccessList:function (res, file) {
      if(res.code===500) {
        this.imageUrlList.push(res.path)
        this.i++

      }
    },
    handleOK: function () {
      this.$refs.activity_form.validate((valid) => {
        this.active_user.picpaths = this.imageUrlList
        if (this.active_user.picpaths.length === 0) {
          valid = false
        }
        if(valid){
          this.activity.start_time = dateToString(this.activity.start_time, 'yyyy-MM-dd hh:mm:ss')
          this.active_user.activity_time=this.activity.start_time
          this.active_user.fin_state='待审核'
          this.$emit('onOK',this.activity,this.active_user)
        }else {
          this.$Message.error('请填写完整信息!')
        }

      })
    },
    handleCancel: function () {
      this.$emit('onCancel')
    },
    // onShowChange: function (show) {
    //   if (show) {
    //     // 显示的时候拉数据
    //    queryActivityUsers({'activity_type':'培训','activity_id':this.active_id,'username':this.current_username}).then((resp) => {
    //       /* 用于更新src_obj的字典用另一个 */
    //      updateWithinField(this.activity, resp.data.activity_users[0].activity)
    //      updateWithinField(this.active_user,resp.data.activity_users[0])
    //      this.imageUrlList=resp.data.activity_users[0].picpaths
    //     })
    //   }
    // },

    onShowChange: function (show) {
      if (show) {
        this.imageUrlList=this.activity_user.picpaths
        updateWithinField(this.active_user,this.activity_user)
        updateWithinField(this.activity, this.edit_activity)
      }
    },
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
