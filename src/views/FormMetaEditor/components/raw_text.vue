
<template>
  <div>
    <p>题目：{{qsItem.title}}</p>
    <p>选项:{{qsItem.options}}</p>
    <Button type="primary" @click="modal1 = true">文本题</Button>
    <Modal
      value=""
      v-model="modal1"
      title="增加一道文本题"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :label-width="80" style="width: 300px">
        <FormItem label="题目:"
        >
          <Row>
            <Col span="18">
              <Input v-model="qsInputTitle" placeholder="Enter something..."></Input>
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
    name:'meta_editor',
    data () {
      return {
        qsItem:{},
        qsInputTitle:'',
        modal1: false,
      }
    },
    methods: {
      itemTransfer(){
        this.$emit('itemTranfer',this.qsItem)
      },
      ok () {
        this.qsItem.id = '';
        this.qsItem.type = 'raw_text';
        this.qsItem.discribtion = '单行文本';
        this.qsItem.title = this.qsInputTitle;
        this.qsItem.options=[];
        // itemTransfer();
        this.$Message.info('Clicked ok');
      },
      cancel () {
        this.$Message.info('Clicked cancel');
      }
    }
  }
</script>
