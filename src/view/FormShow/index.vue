<template>
  <Card>
    <Scroll height="670">
      <div>
        <!--{{ this.form}}-->
        <h1 style="text-align: center">{{ form.bind_meta_name }}</h1>
        <span>问卷状态：{{form.status}}</span>
        <divider orientation="left">课程信息</divider>
        <div>
          <Lesson v-model="form.meta"></Lesson>
        </div>
        <br/>
        <divider orientation="left">问卷内容</divider>
        <div>
        <Form label-position="top">
        <template v-for="it in form.values" >
            <template v-if="it.item_type === 'sub_title_block'">
              <span style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.title }}</span>
            </template>

            <template  v-else-if="it.item_type === 'radio_option'">
              <FormItem>
                <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.item_name}}</span>
                <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
              </FormItem>
              <FormItem>
                <RadioGroup v-model="it.value">
                  <Radio  v-for="op in it.payload.options"  :value="op.value" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'25px' }" :disabled="disabled">
                    <span>{{op.label}}</span>
                  </Radio>
                </RadioGroup>
              </FormItem>
            </template>

            <template v-else-if="it.item_type === 'checkbox_option'">
              <FormItem>
                <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.item_name}}</span>
                <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
              </FormItem>
              <FormItem>
                <CheckboxGroup v-model="it.value">
                  <Checkbox v-for="op in it.payload.options" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'25px' }" :disabled="disabled">
                    <span>{{op.label}}</span>
                  </Checkbox>
                </CheckboxGroup>
              </FormItem>
            </template>

            <template v-if="it.item_type === 'raw_text'">
              <FormItem>
                <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.item_name}}</span>
                <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
              </FormItem>
              <FormItem >
                <Input type="textarea" placeholder="Satisfation about teachers..." v-model="it.value" v-bind:style="{marginLeft:'25px',width:'65%'}" :disabled="disabled"></Input>
              </FormItem>
            </template>
            <template v-if="it.item_type === 'sub_title_block_end'">
              <h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.options }}</h1>
            </template>
        </template>
          <FormItem label="是否推荐为好评课" v-show="show_recommend" v-bind:style="{marginLeft:'25px',fontSize:'15px' }">
            <RadioGroup v-model="recommend_model" >
              <Radio  label="推荐" :value="1"  :disabled="disabled"></Radio>
              <Radio label="不推荐" :value="0" :disabled="disabled"></Radio>
            </RadioGroup>
          </FormItem>
        </Form>
        <Button type="primary" style="margin-left: 20px" @click="handleSave" :disabled="disabled">保存</Button>
        <Button type="primary" style="margin-left: 20px" @click="handleSubmit" :disabled="disabled">提交</Button>
        <Button type="warning" style="margin-left: 28px" @click="handleCancel">取消</Button>
      </div>
      </div>
    </Scroll>
  </Card>
</template>
<script>
  import { getForm,postForm} from '../../service/api/dqs'
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
            this.show_recommend = true;
          } else {
            this.show_recommend = false;
            this.recommend_model = 0;
          }
        },
        immediate:true
      }
    },
    data () {
      return {
        form: {
          meta: {lesson: {}},
          values: [],
        },
        recommend_model: 0,
        show_recommend: false,
        disabled:true,
        meta:{lesson:{}},
      }
    },
    mounted () {
      let id = this.$route.params.id
      getForm(id).then((newresp) => {
        this.form = newresp.data.form
      });
      if(this.form.status==='已完成'){
        this.disabled=false ;
      }
    },
    methods: {
      handleSubmit() {
        let form = {
          status: '已完成',
          // values: Object.values(this.form_inputs)
        };
        postForm(form).then(() => {
          location.reload()
        })
      },
      handleSave() {
        let form = {
          status: '草稿',
          // values: Object.values(this.form_inputs)
        };
        postForm(form).then(() => {
          location.reload()
        })
      },
      handleCancel() {
        location.reload()
      }
    }
  }
</script>
