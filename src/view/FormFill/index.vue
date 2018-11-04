<template>
  <Card>
    <!--{{this.form_meta}}-->
<!--{{form_inputs}}-->
      <div>
        <h1 style="text-align: center">{{ form_meta.name }}</h1>
        <br/>
        <divider orientation="left">课程信息</divider>
        <div>
          <Lesson v-model="meta"></Lesson>
        </div>
        <br/>
        <divider orientation="left">问卷内容</divider>
            <Form :model="form_inputs" >
            <template v-for="it in form_meta.items" >
                <template v-if="it.item_name === 'sub_title_block_start' " >
                  <h3 style="height: 80px;line-height: 80px;margin-left: 10px">{{ it.payload.title }}</h3>
                </template>

                <template v-else-if="it.item_type === 'radio_option'">
                  <FormItem :rules="ruleValidate[it.item_name]" :prop="it.item_name +'.value'" >
                  <Row>
                    <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.item_name}}</span>
                    <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
                  </Row>
                  <Row>
                    <RadioGroup v-model="form_inputs[it.item_name].value">
                      <Radio v-for="op in it.payload.options" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'50px' }">
                        <span>{{op.label}}</span>
                      </Radio>
                    </RadioGroup>
                  </Row>
                </FormItem>
                </template>

                <template v-else-if="it.item_type === 'checkbox_option'">
                <FormItem  :rules="ruleValidate[it.item_name]" :prop="it.item_name +'.value'" >
                  <Row>
                    <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.item_name}}</span>
                    <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
                  </Row>
                  <Row>
                    <CheckboxGroup v-model="form_inputs[it.item_name].value">
                      <Checkbox v-for="op in it.payload.options" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'50px' }">
                        <span>{{op.label}}</span>
                      </Checkbox>
                    </CheckboxGroup>
                  </Row>
                </FormItem>
                </template>

                <template v-else-if="it.item_type === 'raw_text' "  >
                <FormItem :rules="ruleValidate[it.item_name]" :prop="it.item_name +'.value'" >
                  <Row>
                    <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.item_name}}</span>
                    <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
                  </Row>
                  <Row>
                    <Input type="textarea" placeholder="Satisfation about teachers..."  v-model="form_inputs[it.item_name].value" v-bind:style="{marginLeft:'50px',width:'50%'}"></Input>
                  </Row>
                </FormItem>
                </template>

                <template v-else-if="it.item_name === 'sub_title_block_end'" >
                <FormItem >
                  <!--<h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.options }}</h1>-->
                  <divider></divider>
                </FormItem>
                </template>
            </template>
              <!--{{form_inputs['总体评价']}}-->
              <FormItem label="是否推荐为好评课" v-show="show_recommend" v-bind:style="{marginLeft:'25px',fontSize:'15px' }">
                <RadioGroup v-model="recommend_model" >
                  <Radio  label="推荐" :value="1" ></Radio>
                  <Radio label="不推荐" :value="0"></Radio>
                </RadioGroup>
              </FormItem>
            </Form>

        <!--{{ruleValidate}}-->
            <Button type="primary" style="margin-left: 20px" @click="handleSave">保存</Button>
            <Button type="primary" style="margin-left: 20px" @click="handleSubmit">提交</Button>
            <Button type="warning" style="margin-left: 28px" @click="handleCancel">取消</Button>
          </div>

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
          this.show_recommend = false;
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
      show_recommend: false,
      formValidate:{
        radio:'',
        checkbox:'',
        raw_text:''
      },
      ruleValidate:{
        radio:[
           { required: false}
          ],
        checkbox: [
            { required: false}
          ],
        raw_text: [
            { required: false}
          ]
      }
    }
  },
  mounted () {
    let args = this.$route.params;

    getFormMeta(args).then((resp) => {
      this.form_meta = resp.data.form_meta;
      this.form_meta.items.forEach((item) => {
        this.form_inputs[item.item_name] = item;
        if(item.item_type==='radio_option'){
          if(item.payload.rules){
            this.ruleValidate[item.item_name]=[{ required: item.payload.rules[0].required,
              message: '请选择选项', trigger: 'blur' }];
          }
          else{
            this.ruleValidate[item.item_name]=this.ruleValidate.radio;
          }
        }
        if(item.item_type==='checkbox_option'){
          if(item.payload.rules) {
            this.ruleValidate[item.item_name] = [
              {
                required: item.payload.rules[0].required, type: 'array', min: item.payload.rules[1].min,
                message: '请至少选择' + item.payload.rules[1].min + '项', trigger: 'change'
              },
              {
                type: 'array',
                max: item.payload.rules[1].max,
                message: '最多选择' + item.payload.rules[1].max + '项',
                trigger: 'change'
              }
            ];
          }
          else {
            this.ruleValidate[item.item_name]=this.ruleValidate.checkbox;
          }
        }
        if(item.item_type==='raw_text'){
          if(item.payload.rules) {
            this.ruleValidate[item.item_name] = [
              {required: item.payload.rules[0].required, message: '请填写内容', trigger: 'blur'},
              {
                type: 'string',
                min: item.payload.rules[1].min,
                message: '内容多于' + item.payload.rules[1].min + '字',
                trigger: 'blur'
              },
              {
                type: 'string',
                max: item.payload.rules[1].max,
                message: '内容少于' + item.payload.rules[1].max + '字',
                trigger: 'blur'
              }
            ];
          }
          else{
            this.ruleValidate[item.item_name]=this.ruleValidate.raw_text;
          }
        }
        // this.form_inputs[item.item_name].value='[]';
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
