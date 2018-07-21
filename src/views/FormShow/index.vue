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
        <h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.title }}</h1>
      </div>
      <div v-if="it.item_type === 'radio_options'">
        <h1 style="height: 70px;line-height: 70px;margin-left: 20px">{{ it.extra }}</h1>
        <RadioGroup>
          <Radio v-for="op in it.payload.options" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'25px' }">
            <span>{{op.label}}</span>
          </Radio>
        </RadioGroup>
      </div>
      <div v-if="it.item_type === 'raw_text'">
        <h1 style="height: 70px;line-height: 70px;margin-left: 20px">{{ it.extra }}</h1>
        <Input v-model="it.payload.options" type="textarea" placeholder="Satisfation about teachers..." v-bind:style="{marginLeft:'25px',width:'85%'}"></Input>
      </div>
      <div v-if="it.item_type === 'sub_title_block_end'">
        <h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.opitons }}</h1>
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
        }
      }
    },
    mounted() {
      let id=this.$route.params.id;
      //let id='http://localhost:8080/#/form_show/:id'.split('//')[1].split('/')[3];
      console.log(id);
      getFormMeta(id).then(
        (resp)=>{
          this.form_meta=resp.data.form_meta
        }
        )
    }
  }
</script>

