
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
      <Form :label-width="80" style="width: 300px">
        <FormItem label="题目:"
        >
          <Row>
            <Col span="18">
              <Input v-model="qsInputTitle" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem v-for="(item, index) in qsInputOptions"
                  v-if="item.status"
                  :key="index"
                  :label="'选项:'"
                  :prop="'items.' + index + '.value'"
        >
          <Row>
            <Col span="18">
              <Input v-model="item.value" placeholder="Enter something..."></Input>
            </Col>
            <Col span="4" offset="1">
              <Button type="ghost" @click="handleRemove(index)">Delete</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row>
            <Col span="12">
              <Button type="dashed" long @click="handleAdd" icon="plus-round">Add item</Button>
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
    name:'radio_option.vue',
    data () {
      return {
        qsItem:{},
        qsInputTitle:'',
        index:1,
        qsInputOptions:[{
          value:'',
          index:1,
          status:1
        }],
        modal1: false,
      }
    },
    props:{
      onOk: Function,
      onCancle: Function
    },
    methods: {
      handleAdd () {
        this.index++;
        this.qsInputOptions.push({
          value: '',
          index: this.index,
          status: 1
        });
      },
      handleRemove (index) {
        this.qsInputOptions[index].status = 0;
      },
      itemTransfer(){
        this.$emit('onOk',this.qsItem)
      },
      ok () {
        this.qsItem.id = '';
        this.qsItem.type = 'radio_options';
        this.qsItem.discribtion = '单项选择';
        this.qsItem.title = this.qsInputTitle;
        this.qsItem.options=[];
        for (var i=0;i<this.qsInputOptions.length;i++) {
          if(this.qsInputOptions[i].status===1)
            this.qsItem.options.push(this.qsInputOptions[i].value);
        }
        this.$emit('onOk',this.qsItem);
        this.$Message.info('Clicked ok');
        this.qsInputTitle="";
        this.qsInputOptions=[{status:1}];
      },
      cancel () {
        this.$Message.info('Clicked cancel');
      }
    }
  }
</script>
