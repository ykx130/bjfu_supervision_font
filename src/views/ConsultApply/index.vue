<template>
  <div>
    <h1>咨询申请</h1>
    <br>
    <Form :label-width="80" :model="consults">
      <FormItem label="联系方式:" prop="phone">
        <Input style="width: 200px" v-model="consults.phone">
        </Input>
      </FormItem>

      <FormItem label="咨询细节:" prop="content">
        <Input type="textarea"  style="width: 600px" :rows="8" v-model="consults.content">
        </Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import {queryConsults, getConsults, queryConsult_types} from '../../service/api/consult'
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
          content:""
        },
        // consult_types: []
      }
    },

    methods: {
      onTableChange(query, pages) {
        //数据表发生变化请求数据
        let args = {...query, ...pages};
        queryConsults(args).then((resp)=>{
          this.data = resp.data.consults;
          this.total = resp.data.total;

        })

      },
      onSearch() {
        //查询变化
        this.pages._page = 1;
        this.onTableChange(this.query, this.pages)
      }
    },
    mounted: function () {
      const args = this.$route.query;
      queryConsults({...args, ...this.query}).then((resp)=>{
          this.data = resp.data.consults;
          this.total = resp.data.total;

        })

    }
  }

</script>

<style scoped>

</style>


