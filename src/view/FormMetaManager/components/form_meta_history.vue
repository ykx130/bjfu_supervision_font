<template>
  <Card>
    <Table :show-header="false" :data="data" :columns="columns"></Table>
  </Card>
</template>

<script>

import { getFormMetaHistory } from '@/service/api/dqs'

export default {
  name: 'form_meta_history',
  props: {
    meta_name: String
  },
  data: function () {
    return {
      data: [],
      columns: [
        {
          title: '评价体系名称',
          render: function (h, params) {
            return (
              <span>{ params.row.name }</span>
            )
          }
        },
        // {
        //   title: '版本',
        //   render: function (h, params) {
        //     return (
        //       <span>{ params.row.version }</span>
        //   )
        //   }
        // },
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
                    this.$router.push({ path: `/dqs/form_fill/${params.row.name}/${params.row.version}` })
                  }
                }
              }, '查看')
            ])
          }
        }
      ]
    }
  },
  methods: {

  },
  mounted: function () {
    getFormMetaHistory({ name: this.meta_name }).then((resp) => {
      this.data = resp.data.form_metas
    })
  }

}
</script>

<style scoped>

</style>
