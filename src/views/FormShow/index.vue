<template>
  <Scroll height="670">
    <div>
      <h1 style="text-align: center">{{ form_meta.meta.table_name }}</h1>
      <br/>
      <div>
        <div v-bind:style="{ fontSize:'15px',float:'left',width:'33%' }">创建时间：{{ form_meta.meta.created_at }}</div>
        <div v-bind:style="{ fontSize:'15px',float:'left',width:'33%' }">创建人：{{ form_meta.meta.created_by }}</div>
        <div v-bind:style="{ fontSize:'15px',float:'left',width:'33%' }">版本号：{{ form_meta.meta.version }}</div>
      </div>
      <br/>
      <div>
        <Lesson v-model="form.meta"></Lesson>
      </div>
      <br/>
      <div v-for="it in form_meta.items" >
        <div v-if="it.item_type === 'sub_title_block_start'">
          <h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.title }}</h1>
        </div>
        <div v-if="it.item_type === 'radio_option'">
          <h1 style="height: 70px;line-height: 70px;margin-left: 20px">{{ it.extra }} 权重:{{it.payload.weight}}</h1>
          <div v-for="(item, index) in form.values" v-if="form.values[index].item_type === 'radio_option'">
            <RadioGroup v-model="form.values[index].value">
              <Radio v-for="op in it.payload.options" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'25px' }" disabled>
                <span>{{op.label}}</span>
              </Radio>
            </RadioGroup>
          </div>
        </div>
        <div v-if="it.item_type === 'checkbox_option'">
          <h1 style="height: 70px;line-height: 70px;margin-left: 20px">{{ it.extra }} 权重:{{it.payload.weight}}</h1>
          <div v-for="(item, index) in form.values" v-if="form.values[index].item_type === 'checkbox_option'">
            <CheckboxGroup v-model="form.values[index].value">
              <Checkbox v-for="op in it.payload.options" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'25px' }" disabled>
                <span>{{op.label}}</span>
              </Checkbox>
            </CheckboxGroup>
          </div>
        </div>
        <div v-if="it.item_type === 'raw_text'">
          <h1 style="height: 70px;line-height: 70px;margin-left: 20px">{{ it.extra }} 权重:{{it.payload.weight}}</h1>
          <div v-for="(item, index) in form.values" v-if="form.values[index].item_type === 'raw_text'">
            <Input type="textarea" placeholder="Satisfation about teachers..." v-model="form.values[index].value" v-bind:style="{marginLeft:'25px',width:'85%'}" disabled></Input>
          </div>
        </div>
        <div v-if="it.item_type === 'sub_title_block_end'">
          <h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.options }}</h1>
        </div>
      </div>
    </div>
  </Scroll>
</template>
<script>
  import { getFormMeta, getForm } from "../../service/api/dqs"
  import Lesson from "./components/lesson_meta_form"

  export default {
    components:{
      Lesson
    },
    data () {
      return {
        form_meta: {
          id: "",
          identify: "",
          meta: {},
          items: []
        },
        form:{
          meta_table_id:"",
          meta:{},
          values:[]
        }
      }
    },
    mounted() {
      let id=this.$route.params.id;
      getFormMeta(id).then((newresp)=>{
        this.form_meta=newresp.data.form_meta
      });
      getForm(id).then((resp)=>{
        this.form=resp.data.form
      });
    }
  }
</script>
