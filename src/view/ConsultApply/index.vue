<template>
 <card>
  <div>
    <h1>咨询申请</h1>
    <br>
    <Form :label-width="80" :model="consults">
      <FormItem label="咨询类型:">
        <RadioGroup v-model="consults.type">
          <Radio v-for="type in consult_types" :key="type.name+type.id" :label="type.name">
            <span >{{ type.name }}</span>
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
        <Button type="primary" @click="onApplyClick">提交</Button>
      </FormItem>

    </Form>
  </div>
 </card>
</template>

<script>
import { postConsults, queryConsultTypes } from '../../service/api/consult'
export default {
  data: function () {
    return {
      query: {}, // 查询用的参数
      total: 0, // 总数量
      data: [], // 数据
      // terms: [],
      // selected_consult_id:"", //选中答复的活动
      consults: {
        phone: '',
        type: '',
        content: '',
        state: '待协调'
      },
      consult_types: []
    }
  },
  methods: {
    onApplyClick: function () {
      postConsults(this.consults).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({ content: '新建成功' })
          this.consults = {
            phone: '',
            type: '',
            content: '',
            state: '待协调'
          }
        }
      })
    }
  },
  mounted: function () {
    queryConsultTypes().then((resp) => {
      this.consult_types = resp.data.consult_types
    })
  }
}

</script>

<style scoped>

</style>
