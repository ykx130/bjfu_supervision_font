
<template>
  <div>
    <!--<p>题目：{{this.qsItem.item_name}}</p>-->
    <!--<p>选项:{{this.qsItem.payload}}</p>-->
    <!--<Button type="primary" @click="modal1 = true">文本题</Button>-->
    <Modal
      :value="true"

      title="增加一道文本题"
      @on-ok="ok"
      @on-cancel="cancel"
      :mask-closable="true">
      <Form :label-width="50" style="width: 400px">
        <FormItem label="题目:">
          <Row>
            <Col span="18">
              <Input v-model="qsInputName" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="说明:"
        >
          <Row>
            <Col span="18">
              <Input v-model="qsInputExtra" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
  //import
  export default {
    name:"raw_text",
    data () {
      return {
        qsItem:{},
        qsInputName:'',
        qsInputExtra:'',
      }
    },
    props:{
      onOk: Function,
      onCancel: Function
    },
    methods: {
      ok () {
        this.qsItem.item_name = this.qsInputName;
        this.qsItem.item_type = 'raw_text';
        this.qsItem.extra=this.qsInputExtra;
        // this.qsItem.discribtion = '单行文本';
        this.qsItem.type="form_item";
        this.qsItem.payload={};
        this.$emit('onOk',this.qsItem);
        this.$Message.info('Clicked ok');
        this.qsInputName="";
        this.qsInputExtra="";
      },
      cancel () {
        this.$emit('onCancel','');
        this.$Message.info('Clicked cancel');
      }
    }
  }
</script>
