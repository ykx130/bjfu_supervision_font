
<template>
  <div>
  <h1>这是问卷编辑</h1>
    <p>传到最外面层的  item:{{item}}</p>
    <Form  style="width: 400px">
      <FormItem>
      <Row>
        <Col span="8">
          <Button type="primary" @click="modal1 = true">增加题目：</Button>
        </Col>
        <Col span="8">
          <AddItem v-if="modal1" @onOk="addItem"></AddItem>
        </Col>
      </Row>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import { getAllFormMetas, getFormMeta } from '../../service/api/dqs'
  import AddItem from './components/add_item'
  export default {
    components:{AddItem},
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

