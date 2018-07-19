
<template>
  <div>
  <h1>这是问卷编辑</h1>
    <Button type="primary" @click="modal1 = true">增加题目：{{item}}</Button>
    <modal
      v-model="modal1"
      :mask-closable="true"
      transfer="false">
    <Radio  @onOk="addItem">Radio</Radio>
    <Checkbox  @onOk="addItem">Checkbox</Checkbox>
    <Raw_text  @onOk="addItem">Raw_text</Raw_text>
    </modal>
  </div>
</template>
<script>
  import { getAllFormMetas, getFormMeta } from '../../service/api/dqs'
  import Radio from './components/form_item_ttype/radio_option'
  import Checkbox from './components/form_item_ttype/checkbox_option'
  import Raw_text from './components/form_item_ttype/raw_text'
  export default {
    components:{Radio,Checkbox,Raw_text},
    data () {
      return {
        item:{},
        columns1: [
          {
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          }
        ],
        data1: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          }
        ],
        modal1:false,
      }
    },
    methods:{
      change(){
        console.log("change");
        this.item={};
      },
      addItem:function(value){
        this.item={};
        console.log("");
        this.item=value;
      }
    },
    mounted () {

    }
  }
</script>

