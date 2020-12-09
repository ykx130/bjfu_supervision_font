<!--<template>-->
<!--  <Modal-->
<!--    :value="show"-->
<!--    title="查看"-->
<!--    width="650"-->
<!--    @on-ok="handleOk"-->
<!--    @on-cancel="handleCancel"-->
<!--    @on-visible-change="onShowChange">-->

<!--    <Form  :model="activity_users" :label-width="80" >-->
<!--      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">-->
<!--        <Col span="10">-->
<!--          <FormItem prop="user.name" label="教师姓名：">-->
<!--            <Input  type="text" v-model="activity_users.user.name"  readonly>-->
<!--              <Icon type="ios-person-outline" slot="prepend"></Icon>-->
<!--            </Input>-->
<!--          </FormItem>-->
<!--        </Col>-->
<!--        <Col span="10">-->
<!--          <FormItem prop="activity.title" label="题目：">-->
<!--            <Input  type="text" v-model="activity_users.activity.title" readonly>-->
<!--            </Input>-->
<!--          </FormItem>-->
<!--        </Col>-->
<!--      </Row>-->

<!--      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">-->
<!--        <Col span="10">-->
<!--          <FormItem prop="activity.module" label="所属模块：">-->
<!--            <Input type="text" v-model="activity_users.activity.module" readonly>-->
<!--            </Input>-->
<!--          </FormItem>-->
<!--        </Col>-->
<!--        <Col span="10">-->
<!--          <FormItem prop="activity.name" label="主讲人：">-->
<!--            <Input type="text" v-model="activity_users.activity.presenter"  readonly>-->
<!--            </Input>-->
<!--          </FormItem>-->
<!--        </Col>-->
<!--      </Row>-->

<!--      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">-->
<!--        <Col span="10">-->
<!--          <FormItem prop="activity.start_time" label="培训时间：">-->
<!--            <DatePicker type="datetime" v-model="activity_users.activity.start_time" readonly></DatePicker>-->
<!--          </FormItem>-->
<!--        </Col>-->
<!--        <Col span="10">-->
<!--          <FormItem prop="activity.period" label="学时：">-->
<!--            <InputNumber v-model="activity_users.activity.period" readonly>-->
<!--            </InputNumber>-->
<!--          </FormItem>-->
<!--        </Col>-->

<!--      </Row>-->

<!--      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">-->
<!--        <Col span="10">-->
<!--          <FormItem prop="activity.organizer" label="主办单位：">-->
<!--            <Input type="text" v-model="activity_users.activity.organizer"  readonly>-->
<!--            </Input>-->
<!--          </FormItem>-->
<!--        </Col>-->
<!--        <Col span="10">-->
<!--          <FormItem prop="activity.place" label="培训地点：">-->
<!--            <Input type="text" v-model="activity_users.activity.place" readonly>-->
<!--            </Input>-->
<!--          </FormItem>-->
<!--        </Col>-->
<!--      </Row>-->



<!--    </Form>-->
<!--  </Modal>-->
<!--</template>-->

<!--<script>-->

<!--import {prorankList, sexList, stateList, statusList, unitlist, workStatelist} from "Views/UserManager/marcos";-->
<!--import {getUserByName, newPassword, queryGroups} from "@/service/api/user";-->
<!--import {updateWithinField} from "Libs/tools";-->
<!--import {getActiveUser, queryActiveUsers, queryTrainActiveUsers} from "@/service/api/actives";-->

<!--export default {-->
<!--name: "TrainProfileModal",-->

<!--  props: {-->
<!--    show: Boolean,-->
<!--    onCancel: Function,-->
<!--    onOk: Function,-->
<!--    active_id:Number,-->
<!--    username:String,-->

<!--  },-->
<!--  data: function () {-->
<!--    return {-->

<!--      activity_users:{-->
<!--        activity:{-->
<!--          title:undefined-->
<!--        },-->
<!--        user:{-->
<!--          name:undefined-->

<!--        }-->
<!--      },-->

<!--    }-->
<!--  },-->
<!--  methods: {-->

<!--    handleCancel: function () {-->
<!--      console.log(this.active_id)-->
<!--      console.log(this.username)-->
<!--      console.log(444,this.active_userr)-->
<!--      this.$emit('onCancel')-->
<!--    },-->
<!--    handleOk :function () {-->
<!--      this.$emit('onOk')-->
<!--    },-->
<!--    onShowChange: function (show) {-->
<!--      if (show) {-->

<!--       getActiveUser(this.active_id,this.username).then((resp)=>{-->
<!--          this.activity_users=resp.data.activity_users-->
<!--         console.log(resp)-->
<!--        })-->
<!--      }-->
<!--    },-->

<!--  },-->
<!--  mounted: function () {-->


<!--  }-->

<!--}-->

<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
  <Modal
    :value="show"
    title="查看"
    width="650"
    @on-ok="handleOk"
    @on-cancel="handleCancel">

    <Form  :model="active_user" :label-width="80" >
      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="10">
          <FormItem prop="user.name" label="教师姓名：">
            <Input  type="text" v-model="active_user.user.name"  readonly>
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem prop="activity.title" label="题目：">
            <Input  type="text" v-model="active_user.activity.title" readonly>
            </Input>
          </FormItem>
        </Col>
      </Row>

      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="10">
          <FormItem prop="activity.module" label="所属模块：">
            <Input type="text" v-model="active_user.activity.module" readonly>
            </Input>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem prop="activity.name" label="主讲人：">
            <Input type="text" v-model="active_user.activity.presenter"  readonly>
            </Input>
          </FormItem>
        </Col>
      </Row>

      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="10">
          <FormItem prop="activity.start_time" label="培训时间：">
            <DatePicker type="datetime" v-model="active_user.activity.start_time" readonly></DatePicker>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem prop="activity.period" label="学时：">
            <InputNumber v-model="active_user.activity.period" readonly>
            </InputNumber>
          </FormItem>
        </Col>

      </Row>

      <Row  :gutter="16" type="flex" justify="start" align="middle" class="code-row-bg">
        <Col span="10">
          <FormItem prop="activity.organizer" label="主办单位：">
            <Input type="text" v-model="active_user.activity.organizer"  readonly>
            </Input>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem prop="activity.place" label="培训地点：">
            <Input type="text" v-model="active_user.activity.place" readonly>
            </Input>
          </FormItem>
        </Col>
      </Row>



    </Form>
  </Modal>
</template>

<script>

import {prorankList, sexList, stateList, statusList, unitlist, workStatelist} from "Views/UserManager/marcos";
import {getUserByName, newPassword, queryGroups} from "@/service/api/user";
import {updateWithinField} from "Libs/tools";
import {getActiveUser, queryActiveUsers, queryTrainActiveUsers} from "@/service/api/actives";

export default {
  name: "TrainProfileModal",

  props: {
    show: Boolean,
    onCancel: Function,
    onOk: Function,
    active_user:Object
  },
  data: function () {
    return {

    }
  },
  //为什么不管点什么，start_time会变成undefined，之前没有吧
  methods: {

    handleCancel: function () {

      this.$emit('onCancel')
    },
    handleOk :function () {

      this.$emit('onOk')
    },

  },
  mounted: function () {


  }

}

</script>

<style scoped>

</style>
