<template>
<div>
  <Modal
  :value="show"
  title="教学研修计划"
  @on-ok="handleOK"
  @on-cancle="handleCancle"
  width="634px">
    <Button type="primary" @click="addRow">添加一行</Button>
    <Table :data="data" :columns="tbColumns" border></Table>
  </Modal>
</div>
</template>

<script>
export default {
name: "ActivityPlan",
  props:{
    show:{
      type:Boolean,
      default:false
    },
    onCancel:Function,
    onOK:Function,
  },
  data(){
  return{
    editTableIndex: -1,
    editmin_worktime: '',
    editmax_worktime: '',
    editperiod: '',
    tbColumns:
      [
        {
          title: 'id',
          width: 50,
          align: 'center',
          key: 'id'
        },
        {
          title: '最短工作时间（月）',
          width:150,
          align:'center',
          key: 'min_worktime',
          render: (h, { row, index }) => {
            return this.renderTableColumn('editmin_worktime', 'min_worktime', h, { row, index })
          }
        },
        {
          title: '最长工作时间（月）',
          key: 'max_worktime',
          width:150,
          align:'center',
          render: (h, { row, index }) => {
            return this.renderTableColumn('editmax_worktime', 'max_worktime', h, { row, index })
          }
        },
        {
          title: '必修学分',
          width:90,
          align:'center',
          key: 'period',
          render: (h, { row, index }) => {
            return this.renderTableColumn('editperiod', 'period', h, { row, index })
          }
        },
        {
          title: '操作',
          width:'160px',
          render: (h, { row, index }) => {
            if (this.editTableIndex === index) {
              return [
                h('Button', {
                  props: {
                    type: 'success',
                    size:'small'
                  },
                  style:{
                    marginLeft:'3px'
                  },
                  on: {
                    click: () => {
                      this.data[index].min_worktime = this.editmin_worktime
                      this.data[index].max_worktime = this.editmax_worktime
                      this.data[index].period = this.editperiod
                      this.editTableIndex = -1
                      // 可在此处配置异步提交（缺省）
                    }
                  }
                }, '保存'),
                h('Button', {
                  props: {
                    type: 'error',
                    size:'small',
                  },
                  style: {
                    marginLeft: '3px'
                  },
                  on: {
                    click: () => {
                      this.editTableIndex = -1
                    }
                  }
                }, '取消')
              ]
            } else {
              return [h('Button', {
                props: {
                  type: 'info',
                  size:'small'
                },
                style:{
                  marginLeft:'3px'
                },
                on: {
                  click: () => {
                    // this.editName = row.name
                    // this.editCode = row.code
                    // this.editRemark = row.remark
                    this.editTableIndex = index
                  }
                }
              }, '修改'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size:'small'
                  },
                  style:{
                    marginLeft:'3px'
                  },

                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '提示',
                        content: '确认要删除该行吗？',
                        onOk: () => {
                          this.data.splice(index, 1)
                        },
                        onCancel: () => {
                          this.$Message.info('您已取消删除.')
                        }
                      })
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size:'small'
                  },
                  style:{
                    marginLeft:'3px'
                  },

                  on: {
                    click: () => {
                      this.data.push({ id:index+1, min_worktime: '', max_worktime: '', period: '' })
                      this.editTableIndex = index + 1// 触发新增行的行编辑
                    }
                  }
                }, ' + ')]
            }
          }
        }
      ],
    data: [],
  }
  },

  methods:{
    handleOK(){
      this.$emit('onOK')
    },
    handleCancle(){
      this.$emit('onCancle')
    },

    // 对列的render处理：编辑和未编辑
    renderTableColumn (editName, columnName, h, { row, index }) {
      let edit
      if (this.editTableIndex === index) {
        this[editName] = row[columnName]
        edit = [h('Input', {
          props: {
            value: row[columnName]
          },
          on: {
            input: (val) => {
              this[editName] = val
            }
          }
        })]
      } else {
        edit = row[columnName]
      }
      return h('div', [edit])
    },
    // 添加一行
    addRow () {
      this.data.push({ id: this.editTableIndex+1, min_worktime: '', max_worktime: '', period: '' })
      this.editTableIndex = this.data.length + 1// 触发新增行的行编辑
    }
  }

}
</script>

<style scoped>

</style>
