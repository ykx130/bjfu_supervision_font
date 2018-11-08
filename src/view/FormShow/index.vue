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
        <Form :model="form.values" ref="ruleform">
        <template v-for="it in form.values" >
            <template v-if="it.item_type === 'sub_title_block'">
              <span style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.title }}</span>
            </template>

            <template  v-else-if="it.item_type === 'radio_option'">
              <FormItem :rules="ruleValidate[it.item_name]" :prop="it.item_name +'.value'">
                <Row>
                  <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.item_name}}</span>
                  <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
                </Row>
                <Row>
                  <RadioGroup v-model="it.value">
                    <Radio  v-for="op in it.payload.options"  :value="op.value" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'25px' }" :disabled="disabled">
                      <span>{{op.label}}</span>
                    </Radio>
                  </RadioGroup>
                </Row>
              </FormItem>
            </template>

            <template v-else-if="it.item_type === 'checkbox_option'">
              <FormItem :rules="ruleValidate[it.item_name]" :prop="it.item_name +'.value'" >
                <Row>
                  <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.item_name}}</span>
                  <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
                </Row>
                <Row>
                  <CheckboxGroup v-model="it.value">
                    <Checkbox v-for="op in it.payload.options" :label="op.label" :key="op.value" v-bind:style="{ fontSize:'15px',marginLeft:'25px' }" :disabled="disabled">
                      <span>{{op.label}}</span>
                    </Checkbox>
                  </CheckboxGroup>
                </Row>
              </FormItem>
            </template>

            <template v-if="it.item_type === 'raw_text'">
              <FormItem :rules="ruleValidate[it.item_name]" :prop="it.item_name +'.value'" >
                <Row>
                  <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.item_name}}</span>
                  <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
                </Row>
                <Row>
                  <Input type="textarea" placeholder="Satisfation about teachers..." v-model="it.value" v-bind:style="{marginLeft:'25px',width:'65%'}" :disabled="disabled"></Input>
                </Row>
              </FormItem>
            </template>

            <template v-if="it.item_type === 'sub_title_block_end'">
              <FormItem>
                <h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.options }}</h1>
                <divider></divider>
              </FormItem>
            </template>

        </template>
          <FormItem label="是否推荐为好评课" v-show="show_recommend" v-bind:style="{marginLeft:'25px',fontSize:'15px' }">
            <RadioGroup v-model="recommend_model" >
              <Radio  label="推荐" :value="1"  :disabled="disabled"></Radio>
              <Radio label="不推荐" :value="0" :disabled="disabled"></Radio>
            </RadioGroup>
          </FormItem>
        </Form>

          <!--{{ruleValidate}}-->
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
        disabled:false,
        meta:{lesson:{}},
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
      let id = this.$route.params.id;
      getForm(id).then((newresp) => {
        this.form = newresp.data.form;
        if(this.form.status==='已完成'){
          this.disabled=true ;
        }
        this.form.values.forEach((item)=>{
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
        })
      });

    },
    methods: {
      handleSubmit() {
        this.$refs.ruleform.validate((valid)=>{
          if(valid){
            let form = {
              status: '已完成',
              // values: Object.values(this.form_inputs)
            };
            postForm(form).then(() => {
              location.reload()
            })
            this.$Message.success('添加成功！')
          }
          else{
            this.$Message.error('请填写完整信息！')
          }
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
