
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
    <Rule v-model="rules" :types="['required', 'length']"></Rule>
  </div>
</template>
<script>
// import
import Rule from '../rules'

export default {
  name: 'raw_text.vue',
  components:{Rule},
  watch: {
    qsItem: {
      handler: function (val) {
        this.ok()
      },
      deep: true
    },
    rules: {
      deep:true,
      handler: function () {
        this.ok()
      }
    }
  },
  data () {
    return {
      qsItem: {
        item_name: '',
        type: 'form_item',
        item_type: 'raw_text'
      },
      rules:[]
    }
  },
  props: {
    onInput: Function
  },
  methods: {
    ok () {
      this.$emit('onInput', {...this.qsItem, payload:{rules:this.rules}})
    }
  }
}
</script>
