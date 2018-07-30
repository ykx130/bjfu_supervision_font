
<template>
  <div>
    <!--<p>choose:{{selected}}</p>-->
    <!--<p>item:{{item}}</p>-->
    <div v-for="item in itemList" @click="select(item.value)">
      <Card :value="item.value" :key="item.value" >{{ item.label }}</Card>
    </div>
    <Radio v-if="selected ==='radio_option'" @onOk="addItem"></Radio>
    <Checkbox v-if="selected ==='checkbox_option'" @onOk="addItem"></Checkbox>
    <Raw_text v-if="selected ==='raw_text'" @onOk="addItem"></Raw_text>
  </div>
</template>
<script>
  import Radio from './form_item_type/radio_option'
  import Checkbox from './form_item_type/checkbox_option'
  import Raw_text from './form_item_type/raw_text'
  export default {
    components:{Radio,Checkbox,Raw_text},
    data () {
      return {
        item:{key:123},
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
        props:{
          onOk: Function,
          onCancel: Function
        },
      }
    },
    methods:{
      addItem:function(value){
        this.item={};
        console.log("");
        this.item=value;
        this.$emit('onOk',this.item);
        this.$emit('onCancel','');
      },
      select: function (value) {
        this.selected = value
      }
    }
  }
</script>
