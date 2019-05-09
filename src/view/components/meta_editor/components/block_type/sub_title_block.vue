
<template>
  <div>
    <!--<p>题目：{{this.qsItem.item_name}}</p>-->
    <!--<p>选项:{{this.qsItem.payload}}</p>-->
    <!--<Button type="primary" @click="modal1 = true">文本题</Button>-->

    <Form :label-width="60" style="width: 400px">
      <FormItem label="子标题:">
        <Row>
          <Col span="18">
            <Input v-model="item_start.payload.title" placeholder="输入子标题名字"></Input>
          </Col>
        </Row>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  // import
  export default {
    name: 'sub_title_block',
    watch: {
      item_start: {
        handler: function (val) {
          this.ok()
        },
        deep: true
      },
      item_end: {
        handler: function (val) {
          this.ok()
        },
        deep: true
      },
    },
    data () {
      return {
        item_start: {
          item_name: 'sub_title_block_start',
          type: 'block_item',
          item_type: 'sub_title_block',
          payload: {
            title: ''
          }
        },
        item_end: {
          item_name:'sub_title_block_end',
          type: 'block_item',
          item_type: 'sub_title_block'
        }
      }
    },
    props: {
      onInput: Function
    },
    methods: {
      ok () {
        this.$emit('onInput',[this.item_start, this.item_end])
      }
    }
  }
</script>
