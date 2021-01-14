<template>
  <div>
    <Card shadow>
      <p slot="title">培训信息</p>
      <Form v-model="activity" :label-width="80" ref="activity_form" :rules="ruleValidate">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">
          <Col span="8">
            <FormItem label="题目：" prop="title">
              <Input style="width: 170px" type="text" v-model="activity.title" placeholder="题目" />
            </FormItem>
          </Col>
<!--          <Col span="6">-->
<!--            <FormItem label="责任教师：">-->
<!--            <Input style="width: 170px" type="text" v-model="activity.teacher" placeholder="责任老师" >-->
<!--            </Input>-->
<!--            </FormItem>-->
<!--          </Col>-->
          <Col span="8">
           <FormItem label="主讲人：" prop="presenter">  <!--新增-->
              <Input style="width: 170px" type="text" v-model="activity.presenter" placeholder="主讲人" >
              </Input>
            </FormItem>
          </Col>
        </Row>

<!--        <Row type="flex" justify="start" align="middle" class="code-row-bg">-->
<!--          <Col span="6">-->
<!--            <FormItem label="活动地点：">-->
<!--              <Input style="width: 170px" type="text" v-model="activity.place" placeholder="活动地点" />-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--          <Col span="6">-->
<!--            <FormItem label="参与人数：">-->
<!--              <Input style="width: 170px" type="text" v-model="activity.all_num" placeholder="参与人数" />-->
<!--            </FormItem>-->
<!--          </Col>-->
<!--        </Row>-->
<!--        -->
        <Row type="flex" justify="start" align="middle" class="code-row-bg">
          <Col span="8">
            <FormItem label="所属模块：" prop="module">
              <Input style="width: 170px" type="text" v-model="activity.module" placeholder="所属模块" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="培训地点：" prop="place">
              <Input style="width: 170px" type="text" v-model="activity.place" placeholder="培训地点" />
            </FormItem>
          </Col>
        </Row>
<!--        <Row align="middle" class="code-row-bg" >-->
<!--          <FormItem label="活动时间：">-->
<!--          <Col span="24">-->
<!--              <DatePicker type="date" v-model="activity.start_time" placeholder="开时时间" style="width: 200px"></DatePicker>-->
<!--            &nbsp;—&nbsp;-->
<!--              <DatePicker type="date" v-model="activity.end_time" placeholder="结束时间" style="width: 200px"></DatePicker>-->
<!--          </Col>-->
<!--          </FormItem>-->
<!--        </Row>-->
        <Row type="flex" justify="start" align="middle" class="code-row-bg">
          <Col span="8">
            <FormItem label="主办单位：" prop="organizer">
              <Input style="width: 170px" type="text" v-model="activity.organizer" placeholder="主办单位" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="学时：" prop="period">
              <InputNumber style="width: 170px" type="text" v-model="activity.period" placeholder="学时" />
            </FormItem>
          </Col>
        </Row>
        <Row align="middle" class="code-row-bg" >
          <Col span="8">
          <FormItem label="培训时间：" prop="start_time">

              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="activity.start_time" placeholder="开时时间" style="width: 200px"></DatePicker>
          </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="总人数：" prop="all_num">
              <InputNumber style="width: 170px" type="text" v-model="activity.all_num" placeholder="总人数" />
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start" align="middle" class="code-row-bg">
          <Col span="8">
            <FormItem label="报名人数：" prop="attend_num">
              <InputNumber readonly style="width: 170px" type="text" v-model="activity.attend_num" placeholder="报名人数" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="剩余名额：" prop="remainder_num">
              <InputNumber readonly style="width: 170px" type="text" v-model="activity.remainder_num" placeholder="剩余名额" />
            </FormItem>
          </Col>
        </Row>

<!--        <Row type="flex" justify="start" align="middle" class="code-row-bg">-->
<!--          <FormItem label="活动信息：">-->
<!--          <Col span="24">-->
<!--            <Input style="width: 425px" type="textarea" v-model="activity.information" placeholder="活动信息" >-->
<!--            </Input>-->
<!--          </Col>-->
<!--          </FormItem>-->
<!--        </Row>-->
        <FormItem>
            <Button type="primary" @click="onUpdateActive" v-role="['教发管理员']">提交</Button>
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
      :active_user="selected_activeuser"
      @onCancel="onUpdateActiveUserModalCancel"
      @onOK="onUpdateActiveUserModalOK">
    </ActivesUserUpdateModal>

    <Card shadow>
      <p slot="title">报名信息</p>
      <Table border stripe :columns="columns" :data="data"></Table>
<Form inline>
  <FormItem>
      <Button type="primary" @click="showAddActiveUser=true"  v-role="['教发管理员']">新增参与人员</Button>
  </FormItem>
      <FormItem v-role ="['教发管理员']" >
        <Upload :action="uploadActivityUsersApi"
                :on-success="handleImportActivityUsersExcelSucc"
                name="filename"
               >
          <Button  icon="ios-cloud-upload-outline" type="primary"  >批量导入参与人员</Button>
        </Upload>
      </FormItem>
  <FormItem>
  <Button @click="onExportExcel" icon="ios-cloud-download-outline" type="primary" label="导出" v-role="['教发管理员']">导出报名名单</Button>
  </FormItem>
</Form>

    </Card>

  </div>
</template>

<script>
import { getActive, queryActivityUsers, putActive, postActiveUser, putActiveUser,uploadActivityUsersApi,exportRegisteredUsersExcel} from '../../service/api/actives'
import {dateToString, updateWithinField} from 'Libs/tools'
import ActivesUserAddModal from './components/ActivesUserAddModal'
import ActivesUserUpdateModal from './components/ActivesUserUpdateModal'
import {queryUsers} from "@/service/api/user";

// import {lessonLevel} from '../marcos'
export default {
  name: 'ActiveProfileModal',
  components: { ActivesUserAddModal, ActivesUserUpdateModal },
  props: {
    show: Boolean,
    //modal:Boolean,
    onCancel: Function,
    onOK: Function
    // activity_id:"0"
  },
  data: function () {
    return {
      activity_id: parseInt(this.$route.params.id),
      uploadActivityUsersApi:uploadActivityUsersApi,
      showAddActiveUser: false,
      showUpdateActiveUser: false,
      selected_activeuser:{},
      selected_username:'',
      data: [],
      total: 0,
      count:0,
      pages: {
        _page: 1,
        _per_page: 5
      }, // 分页
      activity: {
        id: '',
        title: '',
        //teacher: '',
        place: '',
        module: '',
        start_time: '',
        organizer:'',
        presenter:'',
        all_num:1,
        period: 0,
        //information: ''
      },
      ruleValidate: {
        title: [{ trigger:'change',message: '请填写活动名称'}],
        presenter: [{ message: '请填写主讲人姓名'}],
        start_time: [{ type: 'date',  message: '请选择培训时间'}],
        all_num: [{ type: 'number', min: 1, trigger: 'change', message: '参与人数必须大于等于1'}],
        place: [{ trigger: 'blur', message: '请填写培训地点'}],
        organizer: [{ trigger: 'blur', message: '请填写主办单位'}],
        module: [{trigger: 'blur', message: '请填写所属模块'}],
        term: [{ trigger: 'change', message: '请选择学期'}],
        period: [{type: 'number', min: 0,  message: '学时必须大于等于0'}],

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
          title: '工号',
          render: function (h, params) {
            return (
              <span>{ params.row.user.username }</span>
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
          title: '学院',
          render: function (h, params) {
            return (
              <span>{ params.row.user.unit }</span>
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
          title: '手机号',
          render: function (h, params) {
            return (
              <span>{ params.row.user.phone }</span>
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
                directives: [{
                  name: 'role',
                  value: ['教发管理员']
                }],
                style: {
                  marginRight: '2px'
                },
                on: {
                  click: () => {

                    this.selected_username = params.row.user.username
                    this.selected_activeuser=params.row
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
      this.$refs.activity_form.validate((valid) => {

        this.activity.start_time=dateToString(this.activity.start_time, 'yyyy-MM-dd hh:mm:ss')

          if (valid) {

            putActive(this.activity).then((resp) => {
              if (resp.data.code === 200) {
                this.$Message.success({content: '修改成功'})
                getActive(this.activity_id).then((new_resp) => {
                  updateWithinField(this.activity, new_resp.data.activity)
                })

              }
            })
          }})

    },
    onAddNewActiveUser: function () {
      this.showAddActiveUser = true
    },
    onAddActiveUserModalOK: function (active_user) {
      postActiveUser(this.activity_id, active_user).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({ content: '添加成功' })
          queryActivityUsers({activity_id:this.activity_id,activity_type:'培训'}).then((new_resp) => {
            this.data = new_resp.data.activity_users
            this.total = new_resp.data.total
          })
        }
        this.showAddActiveUser = false
      })
    },
    onAddActiveUserModalCancel: function () {
      this.showAddActiveUser = false
    },

    onUpdateActiveUserModalOK: function (active_user) {
      putActiveUser(this.activity_id, active_user).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({ content: '更新成功' })
          queryActivityUsers({activity_id:this.activity_id,activity_type:'培训'}).then((new_resp) => {
            this.data = new_resp.data.activity_users
            this.total = new_resp.data.total
          })
        }

      })
      this.showUpdateActiveUser = false
    },
    onUpdateActiveUserModalCancel: function () {
      this.showUpdateActiveUser = false
    },
//批量导入参与人员
    handleImportActivityUsersExcelSucc:function(response, file, fileList){
        if (response.code !== 200) {
          this.$Message.warning({ content: '部分导入失败' })
          window.open('/api/' + response.fail_excel_path)
        } else {
          this.$Message.success({ content: '导入成功' })
        }
      },

    //导出报名名单
    onExportExcel: function () {
      exportRegisteredUsersExcel({'activity_id':this.activity_id,'activity_type':'培训'}
      ).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({content: '导出成功'})
          window.open('/api/' + resp.data.filename)
        }
      })
    }

  },
  mounted: function () {
    getActive(this.activity_id).then((resp) => {
      this.activity = resp.data.activity
    })
    queryActivityUsers({activity_id:this.activity_id,activity_type:'培训'}).then((usrresp) => {
      this.data = usrresp.data.activity_users
      this.total=usrresp.data.activity_users.length



    })
  }
}
</script>

<style scoped>

</style>
