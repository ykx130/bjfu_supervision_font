<template>
  <div>
    <Modal
      :value="show"
      title="教学研修计划"
      @on-ok="handleOK"
      @on-cancle="handleCancle"
      width="634px">
      <Table :data="data" :columns="tbColumns" border></Table>
    </Modal>
  </div>
</template>

<script>
import {queryActivityPlan} from "@/service/api/actives";

export default {
name: "ActivityPlanTable",
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
    data:[],

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
          return h('InputNumber', {

            props: {
              type: "number",
              value: params.row.period
            },

            on: {
              "on-blur": event => {

                params.row.period = event.target.value;
                this.data[params.index].period = event.target.value;
                this.$set(params.row, '$isEdit', false);
              },

            }
          })
        }
      },
      ]
  }
  },
  methods:{
    handleOK(){
      this.$emit('onOK')
    },
    handleCancle(){
      this.$emit('onCancle')
    },
  },
  mounted() {
  queryActivityPlan().then((resp)=>{
    this.data=resp.data.activity_plans
    console.log(11,resp)
  })

  }
}

</script>

<style scoped>

</style>
