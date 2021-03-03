<template>
  <div>
    <Modal
      :value="show"
      title="教学研修计划"
      @on-ok="handleOK"
      @on-cancel="handleCancel"
      width="500px">
      <Table :data="tableData" :columns="tbColumns" border></Table>
    </Modal>
  </div>
</template>

<script>
import { queryActivityPlan, updateActivityPlan } from '@/service/api/actives'

export default {
  name: 'ActivityPlanTable',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    onCancel: Function,
    onOK: Function
  },
  data () {
    return {
      tableData: [],

      tbColumns: [
        {
          title: '最短工作年限',
          align: 'center',
          render: function (h, params) {
            return h('span', params.row.min_worktime)
          }
        },
        {
          title: '最长工作年限',
          align: 'center',
          render: function (h, params) {
            return h('span', params.row.max_worktime)
          }
        },
        // {
        //   title: '必修学时',
        //   align: 'center',
        //   render: function (h, params) {
        //     return h('span', params.row.period)
        //   }
        // },
        {
          title: '必修学分',
          align: 'center',
          render: function (h, params) {
            if (params.row.$isEdit) {
              return h('Input', {
                props: {
                  value: params.row.period
                },
                on: {
                  input: function (event) {
                    params.row.period = event
                  }
                }
              })
            } else {
              return h('span', params.row.period)
            }
          }
        },

        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: params.row.$isEdit ? 'warning' : 'info',
                  icon: ''
                },
                style: {
                  marginRight: '2px'
                },
                on: {
                  click: () => {
                    if (params.row.$isEdit) {
                      this.handleSave(params.row)
                    } else {
                      this.handleEdit(params.row)
                    }
                  }
                }
              }, params.row.$isEdit ? '保存' : '修改')

            ])
          }
        }]
    }
  },
  methods: {
    handleOK () {
      this.$emit('onOK')
    },
    handleCancel () {
      this.$emit('onCancel')
    },
    // 点击了修改按钮
    handleEdit (row) {
      this.$set(row, '$isEdit', true)
    },
    // 点击了保存按钮
    handleSave (row) {
      updateActivityPlan(row.id, { 'period': row.period }).then((Resp) => {
        if (Resp.data.code === 200) {
          this.$Message.success({ content: '修改成功' })
        } else {
          this.$Message.error('修改失败')
        }
      })
      this.$set(row, '$isEdit', false)
    }
  },
  created () {
    queryActivityPlan().then(res => {
      this.tableData = res.data.activity_plans

      // 为了能修改数据需要在此处给每行数据加一个是否修改状态
      this.tableData.forEach(value => {
        value.$isEdit = false
      })
    }).catch(function (error) {

    })
  }

}

</script>

<style scoped>

</style>
