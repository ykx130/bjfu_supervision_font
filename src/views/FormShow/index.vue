<template>
  <Scroll height="670">
    <div>
      <div>
        <Lesson v-model="form.meta"></Lesson>
      </div>
      <br/>
      <template v-for="(it, index) in form.values" >
        <Form>

          <template v-if="it.item_type === 'sub_title_block_start'">
            <h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.title }}</h1>
          </template>

          <template  v-else-if="it.item_type === 'radio_option'">
              <FormItem :label="it.item_name">
              <RadioGroup v-model="it.value">
                <Radio  v-for="op in it.payload.options" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'25px' }" disabled>
                  <span>{{op.label}}</span>
                </Radio>
              </RadioGroup>
            </FormItem>
            <span >{{ it.extra }} 权重:{{it.payload.weight}}</span>
          </template>

          <template v-else-if="it.item_type === 'checkbox_option'">
            <FormItem :label="it.item_name">
            <CheckboxGroup v-model="it.value">
              <Checkbox v-for="op in it.payload.options" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'25px' }" disabled>
                <span>{{op.label}}</span>
              </Checkbox>
            </CheckboxGroup>
            </FormItem>
            <span>{{ it.extra }} 权重:{{it.payload.weight}}</span>
          </template>

        <template v-if="it.item_type === 'raw_text'">
          <FormItem :label="it.item_name">
          <Input type="textarea" placeholder="Satisfation about teachers..." v-model="it.value" v-bind:style="{marginLeft:'25px',width:'85%'}" disabled></Input>
          </FormItem>
        </template>
        <template v-if="it.item_type === 'sub_title_block_end'">
          <h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.options }}</h1>
        </template>
        </Form>
      </template>
    </div>
  </Scroll>
</template>
<script>
  import { getForm } from "../../service/api/dqs"
  import Lesson from "./components/lesson_meta_form"

  export default {
    components:{
      Lesson
    },
    data () {
      return {
        form:{
          meta:{lesson:{}},
          values:[]
        }
      }
    },
    mounted() {
      let id=this.$route.params.id;
      getForm(id).then((newresp)=>{
        this.form=newresp.data.form
      });
    }
  }
</script>
