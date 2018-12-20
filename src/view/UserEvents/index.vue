<template>
  <Card style="height: 100%;text-align: center">
      <h1>用户大事件</h1>

      <Col span="6">
        <div>
          <Timeline v-model="events" style="float:left;margin-left: 20px" >
            <TimelineItem v-for="(event,index) in events" :key="'event'+index" >
              <div  @click="showTable(event, index)">
                <p style="font-size: 14px; font-weight: bold;" :class="event.status" >{{ event.timestamp}}</p>
                <span >
              <p style="font-size: 14px">{{ event.name }}</p>
              <p>{{ event.detail }}</p>
            </span>
              </div>
            </TimelineItem>
          </Timeline>
        </div>
      </Col>
      <Col span="18">

        <div>
          <Table stripe :columns="columns" :data="data" style="width: 860px; margin-left: 20px; margin-top: 20px"></Table>
        </div>
        <div>
          <Button type="primary" @click="addEvents">新增</Button>
        </div>
      </Col>
    <EventAddModal
    :show="showAddModal"
    @onOK="onAddModalOK"
    @onCancel="onAddModalCancel"
    :username="username"
    >
    </EventAddModal>
  </Card>
</template>

<script>
  import { postEvents } from '@/service/api/events'
  import { getEvents } from '@/service/api/user'
import { queryForms, getForm } from '@/service/api/dqs'
  import EventLine from './components/event-line'
  import EventLineItem from './components/event-line-item'
  import EventAddModal from './components/EventAddModal'

  export default {
  components:{EventLine, EventLineItem,EventAddModal},
  data: function () {
    return {
      username: "",
      showAddModal: false,
      events: [],
      query: {
        meta: {
          // create_at: '',
          lesson: {
            lesson_teacher_name: ''
          }
        }
      },
      columns: [
        {
          title: '课程名字',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.lesson.lesson_name }</span>
            )
          }
        },
        {
          title: '课程属性',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.lesson.lesson_attribute }</span>
            )
          }
        },
        {
          title: '课程等级',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.lesson.lesson_level }</span>
            )
          }
        },
        {
          title: '上课班级',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.lesson.lesson_class }</span>
            )
          }
        },
        {
          title: '听课督导',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.create_by }</span>
            )
          }
        },
        {
          title: '创建时间',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.create_at }</span>
            )
          }
        },
        {
          title: '更新时间',
          render: function (h, params) {
            return (
              <span>{ params.row.meta.updated_at }</span>
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
                    this.$router.push({path: `/dqs/form_show/${params.row._id}`})
                  }
                }
              }, '查看')
            ])
          }
        }
      ],
      data: []
    }
  },
  mounted: function () {
    this.username = this.$route.params.username
    this.fetchEventsData()
  },
  methods: {
    fetchEventsData:function(){
      return getEvents(this.username).then((resp) => {
        this.events = resp.data.events
        this.events = this.events.map((item) => {
          return {
            ...item,
            status: 'unselect'
          }
        })
      })
    },
    showTable: function (event, index) {
      this.data = []
      this.query.meta.lesson.lesson_teacher_name = event.username
      this.query.meta.create_at_gte = event.timestamp
      if (event.id < this.events.length) {
        this.query.meta.create_at_lte = this.events[event.id].timestamp
      }
      this.resetColor()
      this.events[index].status = 'select'
      queryForms(this.query).then((resp) => {
        this.data = resp.data.forms
      })
    },
    onAddModalOK:function(event){
      postEvents(event).then((resp)=>{
        this.fetchEventsData()
        if(resp.code === 200){
          this.showAddModal = false
        }
      })
    },
    onAddModalCancel:function(){
      this.showAddModal = false
    },
    addEvents(){
      this.showAddModal = true
    },
    resetColor: function () {
      this.events = this.events.map((item) => {
        return {
          ...item,
          status: 'unselect'
        }
      })
    }
  }
}
</script>

<style scoped>
  .select {
    color: #0984e3;
  }
  .unselect {
    color: #444444;
  }
</style>
