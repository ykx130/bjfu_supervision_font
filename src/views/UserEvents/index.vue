<template>
  <div>
    <h1>用户大事件</h1>
    <br>
    <div style="float: left" >
      <Timeline v-model="events">
          <TimelineItem v-for="event in events">
              <p style="font-size: 14px; font-weight: bold">{{ event.timestamp}}</p>
            <Collapse simple accordion style="width: 200px" @click.native="showTable(event)">
                <Panel>
                    {{ event.name }}
                    <p slot="content">{{ event.detail }}</p>
                </Panel>
            </Collapse>
          </TimelineItem>
      </Timeline>
    </div>
    <div style="float: left">
      <Table stripe :columns="columns" :data="data" style="width: 860px; margin-left: 20px; margin-top: 20px"></Table>
    </div>
  </div>
</template>

<script>
  import { getEvents } from '../../service/api/user'
  import { queryForms, getForm } from '../../service/api/dqs'
  export default {
    data: function() {
      return {
        events: [],
        query: {
          meta: {
            //create_at: '',
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
                ]);
              }
            }
        ],
        data: []
      }
    },
    mounted: function () {
      const args = this.$route.params;
      getEvents(args.username).then((resp) => {
        this.events = resp.data.events;
      });
    },
    methods: {
      showTable(event) {
        this.query.meta.lesson.lesson_teacher_name = event.username;
        this.query.meta.create_at_gte = event.timestamp;
        if(event.id < this.events.length) {
          this.query.meta.create_at_lte = this.events[event.id].timestamp;
        }
        queryForms(this.query).then((resp) => {
          this.data.push(...resp.data.forms);
        });
      }
    }
  }
</script>

<style scoped>

</style>
