
<template>
  <div>
    <!--<p>题目：{{this.qsItem.item_name}}</p>-->
    <!--<p>选项:{{this.qsItem.payload}}</p>-->
    <!--<Button type="primary" @click="modal1 = true">单选题</Button>-->
    <Modal
      value="true"

      title="增加一道单选题"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :label-width="50" style="width: 400px">
        <FormItem label="题目:"
        >
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
        <FormItem v-for="(item, index) in qsInputOptions"
                  v-if="item.status"
                  :key="index"
                  :label="'选项:'"
                  :prop="'items.' + index + '.value'">
          <Row>
            <Col span="8">
              <Input v-model="item.label" placeholder="label..."></Input>
            </Col>
            <Col span="8"offset="1">
              <Input v-model="item.value" placeholder="value..."></Input>
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
        qsInputName:'',
        qsInputExtra:'',
        index:1,
        qsInputOptions:[{
          label:'',
          value:'',
          index:1,
          status:1
        }],
        modal1: false,
      }
    },
    props:{
      onOk: Function,
      onCancel: Function
    },
    methods: {
      handleAdd () {
        this.index++;
        this.qsInputOptions.push({
          label:'',
          value:'',
          index: this.index,
          status: 1
        });
      },
      handleRemove (index) {
        this.qsInputOptions[index].status = 0;
      },
      ok () {
        this.qsItem.item_id = '';
        this.qsItem.item_name = this.qsInputName;
        this.qsItem.item_type = 'radio_options';
        this.qsItem.extra=this.qsInputExtra;
        // this.qsItem.discribtion = '单项选择';
        this.qsItem.type="form_item";
        this.qsItem.payload={
          options:[]
        };
        for (var i=0;i<this.qsInputOptions.length;i++) {
          if(this.qsInputOptions[i].status===1){
            this.qsItem.payload.options.push({
              label: this.qsInputOptions[i].label,
              value: this.qsInputOptions[i].value
            })
          }
        }
        this.$emit('onOk',this.qsItem);
        this.$Message.info('Clicked ok');
        this.qsInputName="";
        this.qsInputExtra="";
        this.qsInputOptions=[{status:1}];
      },
      cancel () {
        this.$emit('onCancel','');
        this.$Message.info('Clicked cancel');
      }
    }
  }
</script>
