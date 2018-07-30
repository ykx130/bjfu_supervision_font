<template>
  <div :data="form_meta">
    <h1 style="text-align: center">{{ form_meta.meta.table_name }}</h1>
    <br/>
    <div>
      <div v-bind:style="{ fontSize:'15px',float:'left',width:'33%' }">创建时间：{{ form_meta.meta.created_at }}</div>
      <div v-bind:style="{ fontSize:'15px',float:'left',width:'33%' }">创建人：{{ form_meta.meta.created_by }}</div>
      <div v-bind:style="{ fontSize:'15px',float:'left',width:'33%' }">版本号：{{ form_meta.meta.version }}</div>
    </div>
    <br/>
    <div>
      <!--<Select label="课程名称" v-model="form.meta.lesson" v-bind:style="{ fontSize:'15px',width:'400px' }"></Select>
      <Select label="课程内容" v-model="form.meta.content" v-bind:style="{ fontSize:'15px',width:'400px' }"></Select>
      <Select label="课程属性" v-model="form.meta.lesson_attr" v-bind:style="{ fontSize:'15px',width:'400px' }"></Select>
      <br/>-->
      <Input placeholder="授课教师" v-bind:style="{ fontSize:'15px',width:'400px' }"></Input>
      <Input placeholder="上课班级" v-bind:style="{ fontSize:'15px',width:'400px' }"></Input>
      <Input placeholder="上课地点" v-bind:style="{ fontSize:'15px',width:'400px' }"></Input>
    </div>
    <br/>
    <div v-for="it in form_meta.items" >
      <div v-for="v in form_input.values">
        <div v-if="it.item_type === 'sub_title_block_start'">
          <h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.title }}</h1>
        </div>
        <div v-if="it.item_type === 'radio_options'">
          <h1 style="height: 70px;line-height: 70px;margin-left: 20px">{{ it.extra }}</h1>
          <RadioGroup v-model="v.value" @click="change">
            <Radio v-for="op in it.payload.options" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'25px' }">
              <span>{{op.label}}</span>
            </Radio>
          </RadioGroup>
        </div>
        <div v-if="it.item_type === 'checkbox_options'">
          <h1 style="height: 70px;line-height: 70px;margin-left: 20px">{{ it.extra }}</h1>
          <CheckboxGroup v-model="v.value" @click="change">
            <Checkbox v-for="op in it.payload.options" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'25px' }">
              <span>{{op.label}}</span>
            </Checkbox>
          </CheckboxGroup>
        </div>
        <div v-if="it.item_type === 'raw_text'">
          <h1 style="height: 70px;line-height: 70px;margin-left: 20px">{{ it.extra }}</h1>
          <Input type="textarea" placeholder="Satisfation about teachers..." v-model="v.value" @click="change" v-bind:style="{marginLeft:'25px',width:'85%'}"></Input>
        </div>
        <div v-if="it.item_type === 'sub_title_block_end'">
          <h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.opitons }}</h1>
        </div>
      </div>
    </div>
    <Button type="primary" style="margin-left: 20px">Submit</Button>
    <Button type="ghost" style="margin-left: 28px">Cancel</Button>
  </div>
</template>
<script>
  import { getFormMeta } from "../../service/api/dqs"

  export default {
    data () {
      return {
        form_meta: {
          id: "",
          identify: "",
          meta: {
            table_name: "",
            version: "",
            created_at: "",
            updated_at: "",
            created_by: ""
          },
          items: [
            {
              item_id: "",
              item_name: "",
              item_type: "",
              extra: "",
              type: "",
              payload: {
                options:[]
              }
            }
          ]
        },
        form_input:{
          values:[
            {
            item_id:"",
            item_type:"",
            item_name:"",
            value:""
            }
          ]
        }
      }
    },
    mounted() {
      let id=this.$route.params.id;
      getFormMeta(id).then((resp)=>{this.form_meta=resp.data.form_meta})
    },
    methods:{
      change:function(index){
        this.form_input.values[index].item_id = this.form_meta.items[index].item_id
        this.form_input.values[index].item_type = this.form_meta.items[index].item_type
        this.form_input.values[index].item_name = this.form_meta.items[index].item_name
      }
    }
  }
</script>
