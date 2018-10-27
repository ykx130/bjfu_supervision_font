<template>
<div>
  <div v-for="item in BlockList" @click="select(item.value)">
    <Card :value="item.value" :key="item.value" >{{ item.label }}</Card>
  </div>
  <Subtitle v-if="selected ==='sub_title_block'" @onInput="addBlock"></Subtitle>
</div>
</template>

<script>
import Subtitle from './block_type/sub_title_block'
export default {
  components: {Subtitle},
  name: 'add_block',
  data () {
    return {
      block: {key: 123},
      BlockList: [
        {
          value: 'sub_title_block',
          label: '子标题'
        }
      ],
      selected: '',
      props: {
        onOk: Function,
        onCancel: Function
      }
    }
  },
  methods: {
    addBlock: function (value) {
      this.$emit('onOk', value)
      this.$emit('onCancel', '')
    },
    select: function (value) {
      this.selected = value
    }
  }
}
</script>
