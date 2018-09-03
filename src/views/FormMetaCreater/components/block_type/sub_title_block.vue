<template>
<div>
  <Modal
    :value="true"
    title="增加一个子标题"
    @on-ok="ok"
    @on-cancel="cancel"
    :mask-closable="true">
    <Form :label-width="50" style="width: 400px">
      <FormItem label="标题:">
        <Row>
          <Col span="18">
            <Input v-model="InputTitle" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
    </Form>
  </Modal>
</div>
</template>

<script>
    export default {
      name: "sub_title_block",
      data () {
        return {
          blockhead:{},
          InputTitle:"",
          blocktail:{}
        }
      },
      methods:{
        ok(){
          this.blockhead.item_id="";//?????
          this.blockhead.item_name="";
          this.blockhead.item_type="sub_title_block_start";
          this.blockhead.extra="";//?????
          this.blockhead.type="block_item";
          this.blockhead.payload={};
          this.blockhead.payload.push({
            title:this.InputTitle,
          });
          this.blocktail.item_id="";//?????
          this.blocktail.item_name="";
          this.blocktail.item_type="sub_title_block_end";
          this.blocktail.extra="";//?????
          this.blocktail.type="block_item";
          this.blocktail.payload={};
          this.$emit('onOk',this.blockhead,this.blocktail);
        },
        cancel () {
          this.$emit('onCancel','');
          this.$Message.info('Clicked cancel');
        }
      }
    }
</script>

