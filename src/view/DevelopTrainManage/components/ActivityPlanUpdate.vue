<template>
  <div>
    <Modal
    :value="show"
    title="教学研修计划"
    @on-ok="handleOK"
    @on-cancle="handleCancle">
      <Button class="button" @click="add">Add</Button>
      <Table :columns="columns" :data="data" ></Table>
    </Modal>
  </div>
</template>

<script>
export default {
  name:"ActivityPlanUpdate",
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
      data: [
        {
          min_worktime: "",
          max_worktime: "",
          period: ""
        }
      ],
      columns: [
        {
          title: "最短工作时间",
          key: "min_worktime",
          render: (h, { row, index }) => {
            return h("Input", {
              props: {
                value: row.min_worktime
              },
              on: {
                input: val => {
                  this.data[index].min_worktime = val;
                }
              }
            });
          }
        },
        {
          title: "最长工作时间",
          key: "max_worktime",
          render: (h, { row, index }) => {
            return h("Input", {
                props: {
                  value: row.max_worktime
                },
                on: {
                    input: val => {
                    this.data[index].max_worktime = val;
                  }
                }
              },

            );
          }
        },
        {
          title: "必修学时",
          key: "period",
          render: (h, { row, index }) => {
            return h("Input", {
              props: {
                value: row.period
              },
              on: {
                input: val => {
                  this.data[index].period = val;
                }
              }
            });
          }
        },
        {
          title: "操作",
          key: "operation",
          render: (h, { row, index }) => {
            return h(
              "Button",{
              props: {
              type: 'primary',
            },
            style: {
              marginRight: '2px'
            },
                on: {
                  click: () => {
                    this.data.splice(index, 1)
                  }
                }
              },"删除");
          }
        }
      ],


    }


  },
  methods:{
    add() {
      const addData = {
        min_worktime: "",
        max_worktime: "",
        period: ""
      };
      this.data.push(addData);
    },
    handleOK(){
      this.$emit('onOK')
    },
    handleCancle(){
      this.$emit('onCancle')
    }
  }

}
</script>

<style scoped>

</style>
<!--<template>-->
<!--<div>-->
<!--  <Modal-->
<!--  :value="show"-->
<!--  title="教学研修计划"-->
<!--  @on-ok="handleOK"-->
<!--  @on-cancel="handleCancel"-->
<!--  width="500px">-->
<!--    <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">-->
<!--      <FormItem-->
<!--        v-for="(item, index) in activityplans"-->
<!--        :key="index"-->
<!--        :label="'Item'+item.index"-->
<!--        :prop="'item.' + index + '.value'"-->
<!--        :rules="rule">-->
<!--        <Row :gutter="5">-->
<!--          <Col span="10">-->
<!--            <Input type="text" v-model="item.TeacherEntrytime" placeholder="教师入职时间"></Input>-->
<!--          </Col>-->
<!--          <Col span="10">-->
<!--            <InputNumber v-model="item.CompulsoryCredits" placeholder="必修学时"></InputNumber>-->
<!--          </Col>-->
<!--          <Col span="2">-->
<!--            <Button @click="handleRemove(index)">删除</Button>-->
<!--          </Col>-->
<!--        </Row>-->
<!--      </FormItem>-->
<!--      <FormItem>-->
<!--        <Row>-->
<!--          <Col span="12">-->
<!--            <Button type="dashed" long @click="handleAdd" icon="md-add">Add item</Button>-->
<!--          </Col>-->
<!--        </Row>-->
<!--      </FormItem>-->
<!--      <FormItem>-->
<!--        <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>-->

<!--      </FormItem>-->
<!--    </Form>-->
<!--  </Modal>-->
<!--</div>-->
<!--</template>-->


<!--<script>-->
<!--import { queryUsers } from '../../../service/api/user'-->
<!--import { queryTerms, getCurrentTerms } from '../../../service/api/term'-->
<!--import { queryActives } from '../../../service/api/actives'-->
<!--import { dateToString } from '@/libs/tools'-->
<!--export default {-->
<!--  name: "ActivityPlanUpdate",-->
<!--  components:{queryUsers,queryActives,queryTerms,dateToString},-->
<!--  props: {-->
<!--    show:{-->
<!--      type:Boolean,-->
<!--      default:false-->
<!--    },-->
<!--    onCancel: Function,-->
<!--    onOK: Function-->
<!--  },-->
<!--  data(){-->
<!--    return {-->

<!--      index: 1,-->
<!--      activityplans: [{-->
<!--        TeacherEntrytime: '',-->
<!--        CompulsoryCredits: 0,-->
<!--        index: 1,-->
<!--      }],-->
<!--      formDynamic: {-->
<!--        type: 'form_item',-->
<!--        status: 1,-->

<!--      },-->
<!--      rule: {-->
<!--        activityplans: [{-->
<!--          required:true,-->
<!--          field:{-->
<!--            TeacherEntryTime:[{required:true,trigger:'blur',message:'请设置入职时间'}],-->
<!--            CompulsoryCredits:[{required:true,trigger:'change',message:'请设置必修学时'}]-->
<!--          }-->
<!--        }]-->

<!--      }-->
<!--    }-->
<!--  },-->


<!--  methods:{-->
<!--    handleSubmit (name) {-->
<!--      this.$refs[name].validate((valid) => {-->
<!--        if (valid) {-->
<!--          this.$Message.success('Success!');-->
<!--        } else {-->
<!--          this.$Message.error('Fail!');-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    handleAdd () {-->
<!--      this.index++;-->
<!--      this.activityplans.push({-->
<!--        TeacherEntrytime: '',-->
<!--        CompulsoryCredits: '',-->
<!--        index: this.index,-->
<!--        status: 1-->
<!--      });-->
<!--    },-->
<!--    handleRemove (index) {-->
<!--      this.activityplans.splice(index, 1);-->
<!--    },-->
<!--    handleOK(){-->
<!--      this.$emit('onOK')-->
<!--    },-->
<!--    handleCancel () {-->
<!--      this.$emit('onCancle')-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
