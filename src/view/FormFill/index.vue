<template>
  <Card>
    <!--{{this.form_meta}}-->
    <scroll height="670">
      <div>
      <h1 style="text-align: center">{{ form_meta.name }}</h1>
      <br/>
      <divider orientation="left">课程信息</divider>
      <div>
        <Lesson v-model="meta"></Lesson>
      </div>
      <br/>
      <divider orientation="left">问卷内容</divider>
        <div>
          <template v-for="it in form_meta.items" >
            <!--<h1>{{ it.item_name }}</h1>-->
            <Form>
              <template v-if="it.item_type === 'sub_title_block_start'">
                <h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.item_name }}</h1>
              </template>

              <template v-else-if="it.item_type === 'radio_option'">
              <FormItem>
                <FormItem>
                  <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.item_name}}</span>
                  <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
                </FormItem>
                <FormItem>
                  <RadioGroup v-model="form_inputs[it.item_name].value">
                    <Radio v-for="op in it.payload.options" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'50px' }">
                      <span>{{op.label}}</span>
                    </Radio>
                  </RadioGroup>
                </FormItem>
              </FormItem>
              </template>

              <template v-else-if="it.item_type === 'checkbox_option'">
              <FormItem>
                <FormItem>
                  <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.item_name}}</span>
                  <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
                </FormItem>
                <FormItem>
                  <CheckboxGroup v-model="form_inputs[it.item_name].value">
                    <Checkbox v-for="op in it.payload.options" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'50px' }">
                      <span>{{op.label}}</span>
                    </Checkbox>
                  </CheckboxGroup>
                </FormItem>
              </FormItem>
              </template>

              <template v-else-if="it.item_type === 'raw_text' "  >
              <FormItem>
                <FormItem>
                  <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.item_name}}</span>
                  <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
                </FormItem>
                <FormItem>
                  <Input type="textarea" placeholder="Satisfation about teachers..." v-model="form_inputs[it.item_name].value" v-bind:style="{marginLeft:'50px',width:'50%'}"></Input>
                </FormItem>
              </FormItem>
              </template>

              <template v-else-if="it.item_type === 'sub_title_block_end'">
              <FormItem >
                <h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.options }}</h1>
              </FormItem>
              </template>
            </Form>
          </template>
        </div>
        <Button type="primary" style="margin-left: 20px" @click="handleSave">保存</Button>
        <Button type="primary" style="margin-left: 20px" @click="handleSubmit">提交</Button>
        <Button type="warning" style="margin-left: 28px">取消</Button>
      </div>
    </scroll>
  </Card>

</template>
<script>
import { getFormMeta, postForm } from '@/service/api/dqs'
import { getLesson} from '@/service/api/lesson'
import Lesson from './components/lesson_meta_form'

export default {
  components: {
    Lesson
  },
  data () {
    return {
      form_meta: {
        _id: undefined,
        items: []
      },
      form_inputs: {},
      meta: {lesson: {}}
    }
  },
  mounted () {
    let args = this.$route.params

    getFormMeta(args).then((resp) => {
      this.form_meta = resp.data.form_meta
      this.form_meta.items.forEach((item) => {
        this.form_inputs[item.item_name] = item
      })
    })
  },
  methods: {
    handleSubmit () {
      let form = {
        bind_meta_id: this.form_meta._id,
        bind_meta_name: this.form_meta.name,
        bind_meta_version: this.form_meta.version,
        meta: this.meta,
        status: '已完成',
        values: Object.values(this.form_inputs)
      }
      postForm(form)
    },
    handleSave () {
      let form = {
        bind_meta_id: this.form_meta._id,
        bind_meta_name: this.form_meta.name,
        bind_meta_version: this.form_meta.version,
        meta: this.meta,
        status: '草稿',
        values: Object.values(this.form_inputs)
      }
      postForm(form)
    }
  }
}
</script>

<style lang="less">

</style>
