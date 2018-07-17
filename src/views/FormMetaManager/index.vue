<template>
  <div>
  <h1>问卷结构管理</h1>
  <Table border stripe :columns="columns1" :data="data1"></Table>
  </div>
</template>
<script>
  import { getAllFormMetas } from '../../service/api/dqs'
  export default {
    data: function () {
      return {
        columns1: [
          {
            title: '问卷名',
            render: function (h, params) {
            return (
                <span>{ params.row.meta.table_name }</span>
              )
            }
          },
          {
            title: '版本',
            render: function (h, params) {
              return (
                <span>{ params.row.meta.version }</span>
              )
            }
          },
          {
            title: '创建时间',
            render: function (h, params) {
              return (
                <span>{ params.row.meta.created_at }</span>
              )
            }
          },
          {
            title: '创建人',
            render: function (h, params) {
              return (
                <span>{ params.row.meta.created_by }</span>
              )
            }
          },
          {
            title: '最后更新时间',
            render: function (h, params) {
              return (
                <span>{ params.row.meta.updated_at }</span>
              )
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({path:'form_show'})
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({path:'meta_editor'})
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data1: [{
            "id": 1,
            "identify": "test_qs_1",
            "meta": {
              "table_name": "测试问卷一",
              "version": 0.1,
              "created_at": "2018-07-02 12:00:00",
              "updated_at": "2018-07-02 12:00:00",
              "updated_at": "admin",
              "created_by": "admin"
              }
          },
          {
            "id": 2,
            "identify": "test_qs_2",
            "meta": {
              "table_name": "测试问卷二",
              "version": 0.1,
              "created_at": "2018-07-02 12:00:00",
              "updated_at": "2018-07-02 12:00:00",
              "updated_at": "admin",
              "created_by": "admin"
            }
          }
        ]
      }
    }/*,
    mounted () {
      getAllFormMetas().then((resp)=>{
        this.data1 = resp.data.form_metas
      })
    }*/,
    methods: {
      remove: function (index) {
        this.data1.splice(index, 1);
      }
    }
  }
</script>
