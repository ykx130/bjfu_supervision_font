<template>
  <div>
    <h1>问卷结构管理</h1>
    <Table border stripe :columns="columns" :data="data"></Table>
  </div>
</template>
<script>
  import { queryFormMetas } from '../../service/api/dqs'
  import { handleDeleteFormMetas } from '../../service/api/dqs'
  export default {
    data: function () {
      return {
        columns: [
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
                      this.$router.push({path:`/form_show/${params.row.id}`})
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
                      this.$router.push({path:`/meta_editor/`})
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
                      this.remove(params.row)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data: []
      }
    },
    mounted: function () {
      queryFormMetas().then((resp) => {
        this.data = resp.data.form_metas
      })
    },
    methods: {
      remove: function (params) {
        handleDeleteFormMetas(params.id).then(()=>{
          queryFormMetas().then((resp) => {
            this.data = resp.data.form_metas
          })
        })
      }
    }
  }
</script>
