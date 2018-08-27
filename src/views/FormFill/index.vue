<template>
  <Card>
    <Scroll height="670">
      <div :data="form_meta">
        <h1 style="text-align: center">{{ form_meta.name }}</h1>
        <br/>
        <div>
          <Lesson v-model="meta"></Lesson>
        </div>
        <br/>
        <Form>
          <template v-for="it in form_meta.items" >
            <div v-if="it.item_type === 'sub_title_block_start'">
              <h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.title }}</h1>
            </div>
            <FormItem  v-if="it.item_type === 'radio_option'">
              <h1 style="height: 70px;line-height: 70px;margin-left: 20px">{{ it.extra }} 权重:{{it.payload.weight}}</h1>
              <RadioGroup v-model="form_inputs[it.item_name].value">
                <Radio v-for="op in it.payload.options" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'25px' }">
                  <span>{{op.label}}</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem v-else-if="it.item_type === 'radio_option'">
              <h1 style="height: 70px;line-height: 70px;margin-left: 20px">{{ it.extra }} 权重:{{it.payload.weight}}</h1>
              <RadioGroup v-model="form_inputs[it.item_name].value">
                <Radio v-for="op in it.payload.options" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'25px' }">
                  <span>{{op.label}}</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem  v-else-if="it.item_type === 'checkbox_option'">
              <h1 style="height: 70px;line-height: 70px;margin-left: 20px">{{ it.extra }} 权重:{{it.payload.weight}}</h1>
              <CheckboxGroup v-model="form_inputs[it.item_name].value">
                <Checkbox v-for="op in it.payload.options" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'25px' }">
                  <span>{{op.label}}</span>
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem v-else-if="it.item_type === 'raw_text'">
              <h1 style="height: 70px;line-height: 70px;margin-left: 20px">{{ it.extra }} 权重:{{it.payload.weight}}</h1>
              <Input type="textarea" placeholder="Satisfation about teachers..." v-model="form_inputs[it.item_name].value" v-bind:style="{marginLeft:'25px',width:'85%'}"></Input>
            </FormItem>
            <div v-else-if="it.item_type === 'sub_title_block_end'">
              <h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.options }}</h1>
            </div>
          </template>
        </Form>
        <Button type="primary" style="margin-left: 20px" @click="handleSubmit">Submit</Button>
        <Button type="ghost" style="margin-left: 28px">Cancel</Button>
      </div>
    </Scroll>
  </Card>
</template>
<script>
  import { getFormMeta, postForm } from "../../service/api/dqs"
  import Lesson from "./components/lesson_meta_form"

  export default {
    components:{
      Lesson
    },
    data () {
      return {
        form_meta: {
          _id: undefined,
          meta: {
            lesson: {}
          },
          items: []
        },
        form_inputs:{},
        meta:{lesson:{}},
      }
    },
    mounted() {
      let id=this.$route.params.id;
      getFormMeta(id).then((resp)=>{
        this.form_meta=resp.data.form_meta
        this.form_meta.items.forEach((item) => {
            this.form_inputs[item.item_name] = item
        })
      })
    },
    methods:{
      handleSubmit() {
        let form = {
          bind_meta_id: this.form_meta._id,
          bind_meta_name: this.form_meta.name,
          bind_meta_version: this.form_meta.version,
          meta: this.meta,
          values: Object.values(this.form_inputs)
        }
        postForm(form)
      }
    }
  }
</script>
