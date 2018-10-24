
<template>
  <Modal
    :value="show"
    title="编辑选项"
    @on-ok="handleOK"
    @on-cancel="handleCancel"
  >
    <div v-for="block in blockList" @click="select(block.value)"  v-if="selected === ''">
      <Card :value="block.value" :key="block.value" >{{ block.label }}</Card>
    </div>

    <SubTitle v-if="selected ==='sub_title_block'" @onInput="handleChange"></SubTitle>
  </Modal>
</template>
<script>
  import  SubTitle from './block_type/sub_title_block'
  export default {
    name: 'AddBlocm',
    components: {SubTitle},
    props: {
      show: Boolean,
      onCancel: Function,
      onOK: Function
    },
    data () {
      return {
        items: [],
        blockList: [
          {
            value: 'sub_title_block',
            label: '子标题项'
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
      handleOK: function () {
        this.selected = ''
        this.$emit('onOk', this.items)
      },
      handleCancel: function () {
        this.selected = ''
        this.$emit('onCancel')
      },
      select: function (value) {
        this.selected = value
      },
      handleChange: function (value) {
        this.items = value
      }
    }
  }
</script>
