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
            <Form>
            <template v-for="it in form_meta.items" >
              <!--<h1>{{ it.item_name }}</h1>-->
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
            </template>
          </Form>
          <Form>
            <FormItem label="是否推荐为好评课" v-show="show_recommend" >
              <RadioGroup v-model="recommend_model" >
                <Radio  label="推荐" :value="1" ></Radio>
                <Radio label="不推荐" :value="0"></Radio>
              </RadioGroup>
            </FormItem>
          </Form>
            <Button type="primary" style="margin-left: 20px" @click="handleSave">保存</Button>
          <Button type="primary" style="margin-left: 20px" @click="handleSubmit">提交</Button>
          <Button type="warning" style="margin-left: 28px" @click="handleCancel">取消</Button>
        </div>
      </div>
    </scroll>
  </Card>

</template>
<script>
import { getFormMeta, postForm } from '../../service/api/dqs'
import { getLesson} from '../../service/api/lesson'
import Lesson from './components/lesson_meta_form'

export default {
  components: {
    Lesson
  },
  watch: {
    'meta.lesson': {
      deep:true,
      handler: function () {
        if (this.meta.lesson.lesson_model !== ""){
          this.show_recommend = true
        } else {
          this.show_recommend = false
          this.recommend_model = 0
        }
      },
      immediate:true
    }
  },
  data () {
    return {
      form_meta: {
        _id: undefined,
        items: []
      },
      form_inputs: {},
      meta: {lesson: {}},
      recommend_model: 0,
      show_recommend: false
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
      postForm(form).then(()=>{
        location.reload()
      })
      if (this.recommend_model){
        console.log("好评可 提及哦啊")
      }
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
      postForm(form).then(()=>{
        location.reload()
      })
    },
    handleCancel() {
      location.reload()
    }
  }
}
</script>

<style lang="less">

</style>
