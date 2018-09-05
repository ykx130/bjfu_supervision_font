<template>
 <card>
  <div>
    <h1>咨询申请</h1>
    <br>
    <Form :label-width="80" :model="consults">
      <FormItem label="咨询类型:">
        <RadioGroup>
          <Radio v-for="type in consult_types" :key="type.id" :label="type.name">
            <span v-model="type.name">{{ type.name }}</span>
          </Radio>
        </RadioGroup>
      </FormItem>

      <FormItem label="联系方式:" prop="phone">
        <Input style="width: 200px" v-model="consults.phone">
        </Input>
      </FormItem>

      <FormItem label="咨询细节:" prop="meta_description">
        <Input type="textarea"  style="width: 600px" :rows="8" v-model="consults.meta_description">
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @on-click="onApplyClick">提交</Button>
      </FormItem>

    </Form>
  </div>
 </card>
</template>

<script>
  import {getConsults, queryConsult_types} from '../../service/api/consult'
  export default {
    data: function() {
      return {
        query: {}, // 查询用的参数
        total: 0, // 总数量
        data: [], //数据
        // terms: [],
        // selected_consult_id:"", //选中答复的活动
        consults: {
          phone: "",
          type_id: "",
          content:"",
          state: "未协调"
        },
         consult_types: []
      }
    },
    methods: {
      onApplyClick() {
        putConsults(consults).then((resp)=>{

        })
      }
    },
    mounted: function () {
      const args = this.$route.query;
      queryConsult_types(args).then((resp)=>{
        this.consult_types = resp.data.consult_types;
        })
    }
  }

</script>

<style scoped>

</style>


