<template>
<div>
  <Modal
  :value="show"
  title="教学研修计划文件列表"
  @on-ok="handleOK"
  @on-cancle="handleCancle">
    <div v-for="item in files">
    <a @click="downloadPlanFile(item.title)" >{{item.title}}</a>
    </div>
  </Modal>
</div>
</template>

<script>
import {downloadPlanFiles, queryFiles} from "@/service/api/actives";

export default {
name: "DownloadPlanModal",
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

    files:[]
  }
  },
  methods:{
    downloadPlanFile: function (title) {
      downloadPlanFiles(title).then((resp) => {
        console.log(title)
        if (resp.data.code === 200) {
          this.$Message.success({ content: '导出成功' })
          window.open('/api/' + resp.data.filename)
        }
      })
    },
    handleOK(){
      this.$emit('onOK')
    },
    handleCancle(){
      this.$emit('onCancle')
    },
  },
  created() {
      queryFiles().then((fileResp)=>{
          this.files=fileResp.data.files
      })

  }

}
</script>

<style scoped>

</style>
