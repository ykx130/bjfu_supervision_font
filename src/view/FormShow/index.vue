<template>
  <Card>
    <Scroll height="670">
      <div>
        <!--{{ this.form}}-->
        <h1 style="text-align: center">{{ form.bind_meta_name }}</h1>
        <span>问卷状态：{{form.status}}</span>
        <divider orientation="left">课程信息</divider>
        <div>
          <Lesson v-model="form.meta" :disabled="true"></Lesson>
        </div>
        <br/>
        <divider orientation="left">问卷内容</divider>
        <div>

          <FormShow v-model="form_values" :items="form.values" :disabled="false" ref="ruleform" :ruleValidate="ruleValidate">
            <FormItem label="是否推荐为好评课" v-show="show_recommend" v-bind:style="{marginLeft:'25px',fontSize:'15px' }">
              <RadioGroup v-model="recommend_model">
                <Radio label="推荐" :value="1" :disabled="false"></Radio>
                <Radio label="不推荐" :value="0" :disabled="false"></Radio>
              </RadioGroup>
            </FormItem>
          </FormShow>
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
import { getForm, postForm } from '../../service/api/dqs'
import Lesson from '@/view/components/form_show/lesson_meta_form.vue'
import FormShow from '@/view/components/form_show/form_show.vue'
import { getLesson, updateModelLessonsVote, getModelLessonsVote } from '../../service/api/lesson'
export default {
  components: {
    Lesson, FormShow
  },
  watch: {
    'meta.lesson': {
      deep: true,
      handler: function () {
        if (this.meta.lesson.lesson_model !== '') {
          this.show_recommend = true
        } else {
          this.show_recommend = false
          this.recommend_model = 0
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      model_lesson: {
        id: '',
        vote: ''
      },
      form_values: {},
      form: {
        meta: { lesson: {} },
        values: []
      },
      recommend_model: 0,
      show_recommend: false,
      disabled: false,
      meta: { lesson: {} },
      defaultValidateRules: {
        radio: [
          { required: false }
        ],
        checkbox: [
          { required: false }
        ],
        raw_text: [
          { required: false }
        ]
      },
      ruleValidate: {}
    }
  },
  mounted () {
    this.fetchForm()
  },
  methods: {
    fetchForm () {
      let id = this.$route.params.id
      getForm(id).then((newresp) => {
        this.form = newresp.data.form
        if (this.form.status === '已完成') {
          this.disabled = true
        }
        this.form.values.forEach((item) => {
          this.form_values[item.item_name] = item.value
          if (item.item_type === 'radio_option') {
            if (item.payload.rules) {
              this.ruleValidate[item.item_name] = [{ required: item.payload.rules[0].required,
                message: '请选择选项',
                trigger: 'blur' }]
            } else {
              this.ruleValidate[item.item_name] = this.ruleValidate.radio
            }
          }
          if (item.item_type === 'checkbox_option') {
            if (item.payload.rules) {
              this.ruleValidate[item.item_name] = [
                {
                  required: item.payload.rules[0].required,
                  type: 'array',
                  min: item.payload.rules[1].min,
                  message: '请至少选择' + item.payload.rules[1].min + '项',
                  trigger: 'change'
                },
                {
                  type: 'array',
                  max: item.payload.rules[1].max,
                  message: '最多选择' + item.payload.rules[1].max + '项',
                  trigger: 'change'
                }
              ]
            } else {
              this.ruleValidate[item.item_name] = this.ruleValidate.checkbox
            }
          }
          if (item.item_type === 'raw_text') {
            if (item.payload.rules) {
              this.ruleValidate[item.item_name] = [
                { required: item.payload.rules[0].required, message: '请填写内容', trigger: 'blur' },
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
              ]
            } else {
              this.ruleValidate[item.item_name] = this.ruleValidate.raw_text
            }
          }
        })
      })
    },
    handleSubmit () {
      if (this.meta.guider === '' || this.meta.lesson.lesson_name === '' ||
          this.meta.lesson.lesson_date === '' || this.meta.lesson.lesson_times === '') {
        this.$Message.error('请填写完成课程信息！')
      } else {
        this.$refs.ruleform.validate((valid) => {
          if (valid) {
            let form = {
              status: '已完成',
              values: Object.values(this.form_values)
            }
            if (this.recommend_model) {
              this.model_lesson.id = this.meta.lesson.lesson_id
              getModelLessonsVote(this.model_lesson)
            }
            postForm(form).then(() => {
              location.reload()
            })
            this.$Message.success('添加成功！')
          } else {
            this.$Message.error('请填写完整信息！')
          }
        })
      }
    },
    handleSave () {
      let form = {
        status: '草稿',
        values: Object.values(this.form_values)
      }
      postForm(form).then(() => {
        location.reload()
      })
    },
    handleCancel () {
      location.reload()
    }
  }
}
</script>
