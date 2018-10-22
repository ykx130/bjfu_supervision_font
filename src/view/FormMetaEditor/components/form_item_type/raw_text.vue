
<template>
  <div>
    <!--<p>题目：{{this.qsItem.item_name}}</p>-->
    <!--<p>选项:{{this.qsItem.payload}}</p>-->
    <!--<Button type="primary" @click="modal1 = true">文本题</Button>-->

      <Form :label-width="50" style="width: 400px">
        <FormItem label="题目:">
          <Row>
            <Col span="18">
              <Input v-model="qsItem.item_name" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>
      </Form>
  </div>
</template>
<script>
// import
export default {
  name: 'raw_text.vue',
  watch: {
    qsItem: {
      handler: function (val) {
        this.ok()
      },
      deep: true
    }
  },
  data () {
    return {
      qsItem: {
        item_name: '',
        type: 'form_item',
        item_type: 'raw_text'
      }
    }
  },
  props: {
    onInput: Function
  },
  methods: {
    handleAdd () {
      this.index++
      this.qsInputOptions.push({
        label: '',
        value: ''
      })
    },
    handleRemove (index) {
      this.qsInputOptions.splice(index, 1)
    },
    ok () {
      this.$emit('onInput', {...this.qsItem})
    }
  }
}
</script>
