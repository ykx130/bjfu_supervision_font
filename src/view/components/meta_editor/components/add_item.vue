
<template>
  <Modal
    :value="show"
    title="编辑选项"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
  >
    <!--<p>choose:{{selected}}</p>-->
    <!--<p>item:{{item}}</p>-->
    <div v-for="item in itemList" @click="select(item.value)" v-if="selected === ''">
      <Card :value="item.value" :key="item.value" >{{ item.label }}</Card>
    </div>

    <RadioItem v-if="selected ==='radio_option'" @onInput="handleChange"></RadioItem>
    <CheckboxItem v-if="selected ==='checkbox_option'" @onInput="handleChange"></CheckboxItem>
    <RawtextItem v-if="selected ==='raw_text'" @onInput="handleChange"></RawtextItem>
  </Modal>
</template>
<script>
import RadioItem from './form_item_type/radio_option'
import CheckboxItem from './form_item_type/checkbox_option'
import RawtextItem from './form_item_type/raw_text'
export default {
  name: 'AddItem',
  components: {RadioItem, CheckboxItem, RawtextItem},
  props: {
    show: Boolean,
    onCancel: Function,
    onOK: Function
  },
  data () {
    return {
      item: {key: 123},
      itemList: [
        {
          value: 'radio_option',
          label: '单选'
        },
        {
          value: 'checkbox_option',
          label: '多选'
        },
        {
          value: 'raw_text',
          label: '文本'
        }
      ],
      selected: '',
    }
  },
  methods: {
    handleOK: function () {
      this.selected = ''
      this.$emit('onOk', this.item)
    },
    handleCancel: function () {
      this.selected = ''
      this.$emit('onCancel')
    },
    select: function (value) {
      this.selected = value
    },
    handleChange: function (value) {
      this.item = value
    }
  }
}
</script>
