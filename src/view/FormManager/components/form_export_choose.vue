<template>
  <Modal
    :value="show"
    title="选择导出评价表类型："
    @on-ok="handleOK"
    @on-cancel="handleCancel"
>
    <RadioGroup v-model="form_choose">
      <Radio v-for="items in form_metas" :label="items.name" :key="items.name">
        <span>{{items.name}}</span>
      </Radio>
    </RadioGroup>
  </Modal>
</template>

<script>
  import { queryFormMetas} from "../../../service/api/dqs";

  export default {
      name: "FormExportChoose",
      props: {
        show: Boolean,
      },
      data:function () {
          return{
            form_choose:'',
            form_metas:[]
          }
        },
      methods:{
        fetchMetas () {
            // 数据表发生变化请求数据
            queryFormMetas({ _page: 1, _per_page: 30 }).then((resp) => {
              this.form_metas = resp.data.form_metas
            })
          },
        back() {
          this.$router.push({ name: "督导我的提交" });
        },
        handleOK: function () {
          this.$emit('onConfirm', this.form_choose)
        },
        handleCancel: function () {
          this.$emit('onCancel')
        }
      },
    mounted() {
        this.fetchMetas()
    }
  }
</script>

<style scoped>

</style>
