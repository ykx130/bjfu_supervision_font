
<template>
  <div>
    <!--<p>题目：{{this.qsItem.item_name}}</p>-->
    <!--<p>选项:{{this.qsItem.payload}}</p>-->
    <!--<Button type="primary" @click="modal1 = true">多选题</Button>-->

    <Form :label-width="80" style="width: 400px" v-model="qsItem">
      <FormItem label="题目标题:">
        <Row>
          <Col span="18">
            <Input v-model="qsItem.title" placeholder="将在问卷上展示 可重复"></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="题目名称:">
        <Row>
          <Col span="18">
            <Input v-model="qsItem.item_name" placeholder="用于检索, 请保证全局唯一"></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="权重:"
      >
        <Row>
          <Col span="18">
            <Input v-model="qsItem.weight" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem v-for="(item, index) in qsInputOptions"
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
            <Button  @click="handleRemove(index)">Delete</Button>
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
    <Rule v-model="rules" :types="['required']"></Rule>
  </div>
</template>
<script>
// import
import Rule from '../rules'
export default {
  name: 'radio_option',
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
        title: '',
        item_name: '',
        weight: '',
        type: 'form_item',
        item_type: 'radio_option'
      },
      index: 1,
      qsInputOptions: [{
        label: '',
        value: ''
      }],
      rules:[]
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
      this.ok()
    },
    handleRemove (index) {
      this.qsInputOptions.splice(index, 1)
      this.ok()
    },
    ok () {
      this.$emit('onInput', {...this.qsItem,
        payload: {options: this.qsInputOptions, rules:this.rules}})
    }
  }
}
</script>
