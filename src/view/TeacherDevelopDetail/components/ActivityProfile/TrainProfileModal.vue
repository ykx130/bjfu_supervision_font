<template>
  <Modal
    :value="show"
    title="查看"
    @on-ok="handleOk"
    @on-cancel="handleCancel"
    @on-visible-change="onShowChange" style="width: 800px">
    <Form  :modal="active_user" :label-width="90" >
      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="12">
          <FormItem prop="user.unit" label="教师学院：">
            <Input  type="text" v-model="active_user.user.unit" readonly style="width:140px">
            </Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="user.name" label="教师姓名：">
            <Input  type="text" v-model="active_user.user.name" readonly style="width:140px">
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="14">
          <FormItem prop="activity.title" label="题目：">
            <Input  type="text" v-model="active_user.activity.title" readonly style="width:220px">
            </Input>
          </FormItem>
        </Col>
      </Row>
<!--        <Col span="10">-->
<!--          <FormItem prop="activity.persenter" label="主讲人：">-->
<!--            <Input type="text" v-model="active_user.activity.presenter"  readonly style="width:200px">-->
<!--            </Input>-->
<!--          </FormItem>-->
<!--        </Col>-->

      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="10">
          <FormItem prop="activity.module" label="所属模块：">
            <Input type="text" v-model="active_user.activity.module" readonly style="width:220px">
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="12">
          <FormItem prop="activity.start_time" label="培训时间：">
            <DatePicker type="datetime" v-model="active_user.activity.start_time" readonly style="width:160px"></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="activity.period" label="学时：" >
            <InputNumber v-model="active_user.activity.period" readonly style="width:100px">
            </InputNumber>
          </FormItem>
        </Col>
      </Row>

      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="12">
          <FormItem prop="activity.presenter" label="主讲人：">
            <Input type="text" v-model="active_user.activity.presenter" readonly style="width:140px"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="activity.organizer" label="主办单位：" >
            <Input type="text" v-model="active_user.activity.organizer" readonly style="width:140px">
            </Input>
          </FormItem>
        </Col>

      </Row>

      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="10">
          <FormItem prop="activity.place" label="培训地点：">
            <Input type="text" v-model="active_user.activity.place" readonly style="width:220px">
            </Input>
          </FormItem>
        </Col>
      </Row>

      <FormItem label="活动图片：" prop="image">
        <div style="width: 500px;height: 80px" >
        <div class="demo-upload-list" v-for="(item,index) in imageUrlList" :key="index" >
          <img :src="'/api'+item"  />
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
          </div>
        </div>
        </div>

        <Modal title="图片预览" v-model="visible">
          <img :src="showImageUrl" v-if="visible" style="width: 100%" />
        </Modal>

      </FormItem>



    </Form>
  </Modal>
</template>

<script>

import { prorankList, sexList, stateList, statusList, unitlist, workStatelist } from 'Views/UserManager/marcos'
import { getUserByName, newPassword, queryGroups } from '@/service/api/user'
import { updateWithinField } from 'Libs/tools'
import { getActiveUser, queryActiveUsers, queryActivityUsers, uploadNotApi} from '@/service/api/actives'

export default {
  name: 'TrainProfileModal',

  props: {
    show: Boolean,
    onCancel: Function,
    onOk: Function,
    active_id: Number,
    now_username: String,
  },
  data: function () {
    return {
      uploadNotApi:uploadNotApi,
      imageUrlList:[],
      showImageUrl:'',
      visible:false,

      active_user: {
        activity: {
          id:undefined,
          title: '',
          module: '',
          presenter: '',
          organizer: '',
          place: '',
          term: '',
          path: '',
          period: undefined,
          start_time: undefined,
          is_obligatory:undefined
        },
        activity_id:undefined,
        activity_time: undefined,
        fin_state: '',
        picpaths: '',
        state:'',
        user: {
          id: undefined,
          name: undefined,
          username: undefined,
          skill: undefined,
          start_time: undefined,
          end_time: undefined,
          group: undefined,
          email: undefined,
          phone: undefined,
          role_names: [],
          sex: '',
          unit: '',
          status: '',
          state: '',
          prorank: ''
        },
        user_unit:''
      }
    }
  },

  methods: {

    handleCancel: function () {
      this.$emit('onCancel')
    },
    handleOk: function () {
      this.$emit('onOk')
    },
    handleView (imageUrl) {
      this.showImageUrl = '/api'+imageUrl
      this.visible = true
    },
    onShowChange (show) {
      if (show) {
        queryActivityUsers({'activity_type':'培训','activity_id':this.active_id,'username':this.now_username}).then((resp) => {
          /* 用于更新src_obj的字典用另一个 */
          updateWithinField(this.active_user, resp.data.activity_users[0])
          if(resp.data.activity_users[0].picpaths===null){
            this.imageUrlList=[""]
          }else{
            this.imageUrlList=resp.data.activity_users[0].picpaths.split(',')
          }
        })
      }
    },

    mounted: function () {

    }

  }
}

</script>

<style scoped>
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.demo-upload-list {
  display: inline-block;width: 60px;height: 60px;text-align: center;line-height: 60px;
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
