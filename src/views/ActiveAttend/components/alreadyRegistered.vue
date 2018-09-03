<template>
  <Table border stripe :columns="columns" :data="data"></Table>
</template>

<script>
  import {queryCurrentuserActives} from '../../../service/api/actives'
  import {queryTerms, getCurrentTerms} from '../../../service/api/term'

    export default {
      name: "alreadyRegistered",
      data: function(){
        return {
          query: {}, // 查询用的参数
          total: 0, // 总数量
          data: [{
            activity:{},
            activity_user:{}
          }], //数据
          terms: [],
          selected_activity_id:"", //选中编辑的课程ids
          columns: [
            {
              title: '活动名称',
              render: function (h, params) {
                return (
                  <span>{ params.row.activity.name }</span>
              )
              }
            },
            {
              title: '活动地点',
              render: function (h, params) {
                return (
                  <span>{ params.row.activity.place }</span>
              )
              }
            },
            {
              title: '活动状态',
              render: function (h, params) {
                return (
                  <span>{ params.row.activity.state }</span>
              )
              }
            },
            {
              title: '参加状态',
              render: function (h, params) {
                return (
                  <span>{ params.row.activity_user.fin_state }</span>
              )
              }
            },
            {
              title: '开始时间',
              render: function (h, params) {
                return (
                  <span>{ params.row.activity.start_time }</span>
              )
              }
            },
            {
              title: '结束时间',
              render: function (h, params) {
                return (
                  <span>{ params.row.activity.end_time }</span>
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
                        this.selected_activity_id = params.row.activity.id;

                      }
                    }
                  }, '报名')
                ]);
              }
            }
          ]
        }
      },
      methods: {
        onTableChange(query, pages) {
          //数据表发生变化请求数据
          let args = {...query, ...pages};
          queryCurrentuserActives(args).then((resp) => {
            this.data = resp.data.activities;
            this.total = resp.data.total;
            this.$router.push({path: '/active/help', query: {...args, ...this.query}});
          })
        }
      },
      mounted: function () {
        const args = this.$route.query;
        queryTerms().then((resp)=>{
          this.terms = resp.data.terms
        });
        getCurrentTerms().then((termResp)=>{
          this.query.term = termResp.data.term.name;
          queryCurrentuserActives(args).then((resp)=>{
            this.data = resp.data.activities;
            this.total = resp.data.total;
            this.$router.push({path: '/attend', query: {...args, ...this.query}});
          })
        })
      }
    }
</script>

<style scoped>

</style>
