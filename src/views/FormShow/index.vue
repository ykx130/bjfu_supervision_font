<template>
  <div :data="form_meta">
    <h1 style="text-align: center">{{ form_meta.meta.table_name }}</h1>
    <br>
    <div>
      <div v-bind:style="{ fontSize:'15px',float:'left',width:'33%' }">创建时间：{{ form_meta.meta.created_at }}</div>
      <div v-bind:style="{ fontSize:'15px',float:'left',width:'33%' }">创建人：{{ form_meta.meta.created_by }}</div>
      <div v-bind:style="{ fontSize:'15px',float:'left',width:'33%' }">版本号：{{ form_meta.meta.version }}</div>
    </div>
    <br>
    <div v-for="it in form_meta.items">
      <div v-if="it.item_type === 'sub_title_block_start'">
        <h1 style="height: 80px;line-height: 80px">{{ it.payload.title }}</h1>
      </div>
      <div v-if="it.item_type === 'radio_options'">
        <h1 style="height: 70px;line-height: 70px">{{ it.extra }}</h1>
        <RadioGroup>
          <Radio label="满意" v-bind:style="{ fontSize:'15px' }">{{it.payload.options[0].label}}</Radio>
          <Radio label="不满意" v-bind:style="{ fontSize:'15px' }">{{it.payload.options[1].label}}</Radio>
        </RadioGroup>
      </div>
      <div v-if="it.item_type === 'raw_text'">
        <h1 style="height: 70px;line-height: 70px">{{ it.extra }}</h1>
        <Input v-model="it.payload.options" type="textarea" placeholder="Satisfation about teachers..."></Input>
      </div>
      <div v-if="it.item_type === 'sub_title_block_end'">
        <h1 style="height: 80px;line-height: 80px">{{ it.payload.opitons }}</h1>
      </div>
    </div>
    <Button type="primary">Submit</Button>
    <Button type="ghost" style="margin-left: 8px">Cancel</Button>
  </div>
</template>
<script>
  import { getFormMeta } from "../../service/api/dqs"

  export default {
    data () {
      return {
        form_meta: {
          id:"",
          identity:"",
          meta:{
            table_name:"",
            version:"",
            created_at:"",
            updated_at:"",
            created_by:""
          },
          items:[
            {
              item_id:"",
              item_name:"",
              item_type:"",
              extra:"",
              type:"",
              payload:{
                options:[]
              }
            }
          ]
        }
      }
    },
    mounted() {
      getFormMeta(1).then((resp)=>{this.form_meta=resp.data.form_meta})
    }
  }
</script>

