<template>
  <div>
    <Card shadow>
      <p slot="title">基本信息</p>
      <Form v-model="activity" :label-width="80">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">
          <Col span="6">
            <FormItem label="活动名称：">
              <Input style="width: 170px" type="text" v-model="activity.name" placeholder="活动名称" />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="责任教师：">
            <Input style="width: 170px" type="text" v-model="activity.teacher" placeholder="责任老师" >
            </Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start" align="middle" class="code-row-bg">
          <Col span="6">
            <FormItem label="活动地点：">
              <Input style="width: 170px" type="text" v-model="activity.place" placeholder="活动地点" />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="参与人数：">
              <Input style="width: 170px" type="text" v-model="activity.all_num" placeholder="参与人数" />
            </FormItem>
          </Col>
        </Row>
        <Row align="middle" class="code-row-bg" >
          <FormItem label="活动时间：">
          <Col span="24">
              <DatePicker type="date" v-model="activity.start_time" placeholder="开时时间" style="width: 200px"></DatePicker>
            &nbsp;—&nbsp;
              <DatePicker type="date" v-model="activity.end_time" placeholder="结束时间" style="width: 200px"></DatePicker>
          </Col>
          </FormItem>
        </Row>
        <Row type="flex" justify="start" align="middle" class="code-row-bg">
          <FormItem label="活动信息：">
          <Col span="24">
            <Input style="width: 425px" type="textarea" v-model="activity.information" placeholder="活动信息" >
            </Input>
          </Col>
          </FormItem>
        </Row>
        <FormItem>
            <Button type="primary" @click="onUpdateActive">提交</Button>
        </FormItem>
      </Form>
    </Card>
    <p style="margin-top: 10px" />
    <ActivesUserAddModal
      :show="showAddActiveUser"
      @onCancel="onAddActiveUserModalCancel"
      @onOK="onAddActiveUserModalOK">
    </ActivesUserAddModal>
    <ActivesUserUpdateModal
      :show="showUpdateActiveUser"
      :active_id="activity_id"
      :username="selected_username"
      @onCancel="onUpdateActiveUserModalCancel"
      @onOK="onUpdateActiveUserModalOK">
    </ActivesUserUpdateModal>
    <Card shadow>
      <p slot="title">参与人员</p>
      <Table border stripe :columns="columns" :data="data"></Table>
      <Button type="primary" @click="onAddNewActiveUser" >新增参与人员</Button>
    </Card>
  </div>
</template>

<script>
import {getActive, queryActiveUsers, putActive, postActiveUser, putActiveUser} from '../../service/api/actives'
import {updateWithinField} from 'Libs/tools'
import ActivesUserAddModal from './components/ActivesUserAddModal'
import ActivesUserUpdateModal from './components/ActivesUserUpdateModal'

// import {lessonLevel} from '../marcos'
export default {
  name: 'ActiveProfileModal',
  components: {ActivesUserAddModal, ActivesUserUpdateModal},
  props: {
    show: Boolean,
    onCancel: Function,
    onOK: Function
    // activity_id:"0"
  },
  data: function () {
    return {
      activity_id: parseInt(this.$route.params.id),
      showAddActiveUser: false,
      showUpdateActiveUser: false,
      selected_username: '',
      data: [],
      total: 0,
      activity: {
        id: '',
        name: '',
        teacher: '',
        place: '',
        state: '',
        start_time: '',
        end_time: '',
        information: ''
      },
      activity_user: {},
      // lessonLevel: lessonLevel
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
        {
          title: '操作',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '2px'
                },
                on: {
                  click: () => {
                    this.selected_username = params.row.user.username
                    this.showUpdateActiveUser = true
                  }
                }
              }, '修改')
            ])
          }
        }
      ]

    }
  },
  methods: {
    onUpdateActive: function () {
      putActive(this.activity).then(() => {
        getActive(this.activity_id).then((resp) => {
          updateWithinField(this.activity, resp.data.activity)
        })
      })
    },
    onAddNewActiveUser: function () {
      this.showAddActiveUser = true
    },
    onAddActiveUserModalOK: function (active_user) {
      postActiveUser(this.activity_id, active_user).then(() => {
        queryActiveUsers(this.activity_id).then((usrresp) => {
          this.data = usrresp.data.activity_users
          this.total = usrresp.data.total
        })
      })
      this.showAddActiveUser = false
    },
    onAddActiveUserModalCancel: function () {
      this.showAddActiveUser = false
    },
    onUpdateActiveUserModalOK: function (active_user) {
      putActiveUser(this.activity_id, active_user).then(() => {
        queryActiveUsers(this.activity_id).then((usrresp) => {
          this.data = usrresp.data.activity_users
          this.total = usrresp.data.total
        })
      })
      this.showUpdateActiveUser = false
    },
    onUpdateActiveUserModalCancel: function () {
      this.showUpdateActiveUser = false
    }
  },
  mounted: function () {
    getActive(this.activity_id).then((resp) => {
      this.activity = resp.data.activity
    })
    queryActiveUsers(this.activity_id).then((usrresp) => {
      this.data = usrresp.data.activity_users
      this.total = usrresp.data.total
    })
  }
}
</script>

<style scoped>

</style>
