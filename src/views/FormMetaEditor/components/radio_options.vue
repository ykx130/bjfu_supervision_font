
<template>
  <div>
    <p>题目：{{qsItem.title}}</p>
    <p>选项:{{qsItem.options}}</p>
    <Button type="primary" @click="modal1 = true">单选题</Button>
    <Modal
      value=""
      v-model="modal1"
      title="增加一道单选题"
      @on-ok="ok"
      @on-cancel="cancel">

      <label>题目：<input type="text" v-model="qsInputTitle"></label>
      <label>选项：<input type="text" v-model="qsInputOptions"> </label>

    </Modal>
  </div>
</template>
<script>
  //import
  export default {
    name:'meta_editor_radio_options',
    data () {
      return {
        qsItem:{},
        qsInputTitle:'',
        qsInputOptions:'',
        modal1: false,
      }
    },
    methods: {
      itemTransfer(){
        this.$emit('itemTranfer',this.qsItem)
      },
      ok () {
        let Title=this.qsInputTitle.trim();
        // if(Title === '') return alert('题目不能为空');
        let Options=this.qsInputOptions.trim();
        // if(Options ==='') return alert('选项不能为空');
        Options=Options.split(',');
        // for(let Aoption in Options){
        //   if(Aoption ==='') return alert('存在某选项为空');
        // }
        this.qsItem.id='';
        this.qsItem.type='radio_options';
        this.qsItem.discribtion='单项选择';
        this.qsItem.title=Title;
        this.qsItem.options=Options;
        itemTransfer();
        this.$Message.info('Clicked ok');
      },
      cancel () {
        this.$Message.info('Clicked cancel');
      }
    }
  }
</script>
