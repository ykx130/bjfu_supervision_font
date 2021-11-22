<template>
  <Modal
    :value="show"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="InitData"
    style="width: 600px;">
    <p slot="header">
      <span v-if="title_code===1">查看</span>
      <span v-else-if="title_code===2">修改</span>
    </p>
    <Form ref="competition_user_form" :model="competition_user" :rules="competition_user_ruleValidate" style="width: 90%" :label-width="100">
      <div v-if="this.current_role === '教发管理员'">
      <FormItem label="教师工号:">
        <Input v-model="competition_user.username"></Input>
      </FormItem>
      <FormItem label="教师姓名:">
        <Input v-model="competition_user.user.name"></Input>
      </FormItem>
      <FormItem label="所属学院:">
        <Input v-model="competition_user.user_unit"></Input>
      </FormItem>
      </div>
      <FormItem label="比赛名称:" prop="activity.award_name">
        <Input v-model="competition_user.activity.award_name" placeholder="比赛名称" clearable></Input>
      </FormItem>
      <FormItem label="比赛级别:" prop="activity.level">
        <Input v-model="competition_user.activity.level" placeholder="比赛级别"  clearable></Input>
      </FormItem>
      <FormItem label="主办单位:" prop="activity.organizer">
        <Input v-model="competition_user.activity.organizer" placeholder="主办单位"  ></Input>
      </FormItem>
      <FormItem label="学期：" prop="activity.term">
        <Select v-model="competition_user.activity.term" style="width:200px">
          <Option v-for="item in terms" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="比赛时间:" prop="activity.start_time">
        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="获奖时间" v-model="competition_user.activity.start_time"></DatePicker>
      </FormItem>
      <FormItem label="比赛名次：" prop="state" >
        <Input v-model="competition_user.state" clearable></Input>
      </FormItem>
      <FormItem label="比赛图片：" prop="picpaths">
        <div class="demo-upload-list" v-for="(item,index) in competition_user.picpaths" :key="index">
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
</template>

<script>
import UserMixin from "@/mixins/UserMixin";
import {uploadPictureApi} from "@/service/api/actives";
import {getCurrentTerms, queryTerms} from "@/service/api/term";
import {dateToString, updateWithinField} from "Libs/tools";

export default {
  name: "TeacherCompetitionProfile",
  mixins: [UserMixin],
  props: {
    onOk: Function,
    onCancel: Function,
    activity_id: Number,
    active_user: Object,
    title_code: Number,
    show: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      uploadPictureApi:uploadPictureApi,
      terms: [],
      valid1: false,
      valid2: false,
      competition_user: {
        user_unit: '',
        username: '',
        picpaths: [],
        fin_state: '',
        state: '',
        activity_id: 0,
        activity_type: '比赛',
        activity: {
          award_name: '',
          start_time: '',
          level: '',
          organizer: '',
          path: '',
          term: '',
        },
        user:{
          username: '',
          name: '',
        }
      },

      showImageUrl: '',
      i: 0,
      visible: false,
      competition_user_ruleValidate: {
        state: [{ required: true, trigger: 'blur', message: '请填写比赛名次' }],
        picpaths: [{type: 'array', required: true, message: '请上传证明图片' }],
        'activity.award_name': [{required: true, trigger: 'blur', message: '请填写奖项名称'}],
        'activity.level': [{required: true, trigger: 'blur', message: '请填写获奖级别'}],
        'activity.organizer': [{required: true, trigger: 'blur', message: '请填写主办单位'}],
        'activity.term': [{required: true, trigger: 'change', message: '请选择学期'}],
        'activity.start_time': [{required:true,message:'请选择获奖时间'}],
      },
    }


  },
  methods: {
    InitData(value){
      console.log(value)
      updateWithinField(this.competition_user,this.active_user)
    },
    handleOK(){
      this.competition_user.activity.start_time = dateToString(this.competition_user.activity.start_time, 'yyyy-MM-dd hh:mm:ss')

      this.$refs.competition_user_form.validate((valid1) => {
        if(valid1){
          this.$emit('onOK',this.competition_user)
        }else {
          this.$Message.error('请填写完整信息')
          this.$emit('onCancel')
        }
      })
    },
    handleCancel(){
      this.$emit('onCancel')
    },
    //--------图片上传预览删除
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '图片大小限制',
        desc: '文件 ' + file.name + '太大,不能超过 2M.'
      })
    },
    handleView(imageUrl) {
      this.showImageUrl = '/api/static/images/' + imageUrl
      this.visible = true
    },
    handleRemoveList(index) {
      // 删除
      this.competition_user.picpaths.splice(index, 1)

    },
    handleSuccessList: function (res, file) {
      if (res.code === 500) {
        this.competition_user.picpaths.push(res.path)
        this.i++
      }
    }
  },
  created() {
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })
    getCurrentTerms().then((termResp) => {
      this.competition_user.activity.term = termResp.data.term.name
    })
  },
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

