<template>
  <Modal
    :value="show"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
    @on-visible-change="InitData"
    style="width: 600px;">
    <p slot="header" >
      <span v-if="title_code===1">新增一个比赛参与者</span>
      <span v-else-if="title_code===2">查看或编辑</span>
    </p>
    <Form ref="activity_user_form" :model="activity_user" :rules="ruleValidate" style="width: 90%" :label-width="100">
      <FormItem label="参加教师：" prop="user.username" >
        <Select v-model="activity_user.user.username" filterable clearable :disabled="look">
          <Option v-for="user in users" :value="user.username" :key="user.username" @on-query-change="onSelectUserChange">{{user.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="比赛名次：" prop="state" >
        <Input v-model="activity_user.state" clearable>
        </Input>
      </FormItem>
      <FormItem label="比赛图片：" >
        <div class="demo-upload-list" v-for="(item,index) in activity_user.picpaths" :key="index">
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
import { queryUsers } from '../../../service/api/user'
import {uploadPictureApi} from "@/service/api/actives";
import {updateWithinField} from "Libs/tools";

export default {
  name: 'AddCompetitionUserModal',
  props: {
    onOk: Function,
    onCancel: Function,
    show: {
      type: Boolean,
      default: false
    },
    active_user:{},
    title_code: Number,
  },
  data () {
    return {
      look: false,
      activity_user: {
        activity_id: 0,
        user: {
          username: ''
        },
        activity_type: '比赛',
        fin_state: '已完成', // 已完成，待审核
        state: '', //比赛名次
        picpaths: [],
      },

      users: [],
      showImageUrl: '',
      i: 0,
      visible: false,
      uploadPictureApi: uploadPictureApi,

      ruleValidate: {
        user: [{
          required: true,
          trigger: 'change',
          type: 'object',
          message: '请选择教师',
          fields: { username: { type: 'string', required: true, message: '请选择教师' } }
        }],
        state: [{ required: true, trigger: 'blur', message: '请填写比赛名次' }]
      }
    }
  },

  methods: {
    handleOK () {
      this.$refs.activity_user_form.validate((valid) => {
        if (valid) {
          this.$emit('onOK', {
            username: this.activity_user.user.username,
            activity_id: this.activity_user.activity_id,
            state: this.activity_user.state,
            fin_state: this.activity_user.fin_state,
            activity_type: this.activity_user.activity_type,
            picpaths: this.activity_user.picpaths})
          this.activity_user = {}
        } else {
          this.$Message.error('请填写完整信息!')
        }
      })
    },
    handleCancel () {
      this.$emit('onCancel')
    },
    onSelectUserChange: function (query) {
      this.queryUsers({ name_like: query }).then((resp) => {
        this.users = resp.data.users
      })
    },

    //--------图片上传预览删除
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
      this.activity_user.picpaths.splice(index, 1)

    },
    handleSuccessList:function (res, file) {
      if(res.code===500) {
        this.activity_user.picpaths.push(res.path)
        this.i++
      }
    },
    InitData(value){
      if(value){
        updateWithinField(this.activity_user,this.active_user)
        if(this.title_code === 2){
          this.look = true
        }
      }
    }
  },
  mounted: function () {
    queryUsers().then((resp) => {
      this.users = resp.data.users
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
