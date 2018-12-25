<template>
      <Table stripe :columns="columns" :data="work_plans"></Table>
</template>

<script>
export default {
  name: 'plan',
  props: {
    work_plans: Array
  },
  data: function () {
    return {
      columns: [{
        title: '计划评价体系名',
        key: 'meta_name'
      },
      {
        title: '计划评价体系版本',
        key: 'meta_version'
      },
      {
        title: '使用状态',
        render: (h, params) => {
          if (params.row.status) {
            return h('Tag', {
              props: {
                color: 'blue'
              }
            }, '使用')
          } else {
            return h('Tag', {
              props: {
                color: 'red'
              }
            }, '停用')
          }
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

                }
              }
            }, '编辑'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.$Modal.warning({
                    title: '是否确认删除?',
                    onOk: () => {

                    }
                  })
                }
              }
            }, '删除')
          ])
        }
      }
      ]
    }
  }

}
</script>

<style scoped>
 .work_plan{
 }
</style>
