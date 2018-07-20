
<template>
  <div>
    <!--<p>choose:{{model1}}</p>-->
    <!--<p>item:{{item}}</p>-->
  <Select v-model="model1" style="width:200px">
    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>

  </Select>
    <Radio v-if="model1 ==='radio_option'" @onOk="addItem"></Radio>
    <Checkbox v-if="model1 ==='checkbox_option'"  @onOk="addItem"></Checkbox>
    <Raw_text v-if="model1 ==='raw_text'"  @onOk="addItem"></Raw_text>
  </div>
</template>
<script>
  import Radio from './form_item_ttype/radio_option'
  import Checkbox from './form_item_ttype/checkbox_option'
  import Raw_text from './form_item_ttype/raw_text'
  export default {
    components:{Radio,Checkbox,Raw_text},
    data () {
      return {
        item:{key:123},
        cityList: [
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
        model1: '',
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
      }

    }
  }
</script>
