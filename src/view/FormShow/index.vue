<template >
  <Card>
    <BackTop></BackTop>
    <div style="overflow: hidden;overflow-x: hidden">
      <!--{{ this.form}}-->
        <h1 style="text-align: center;color: #468847;background-color: #dff0d8;    border-color: #d6e9c6;">{{ form.bind_meta_name }}</h1>
        <br/>
        <div>
          <Lesson v-model="form.meta" :disabled="false"></Lesson>
        </div>
        <br/>
        <Alert type="error">
          <strong>注：</strong><br>
          （1）“教师授课情况总体评价”为“非常满意”，需满足如下条件：8项评价中，非常满意≥5，其中标★项目评价必须为非常满意；且没有“存在不足”及以下。<br>
          （2）“教师授课情况总体评价”为“存在明显不足”，需满足如下条件：8项评价中，存在明显不足≥3。
        </Alert>
        <divider orientation="left">问卷内容</divider>
        <div>

          <FormShow v-model="form_values" :pages="form.pages" :items="form.values" :disabled="disabled" ref="form_info" @judgePage="judgePage">
            <div slot-scope="Page">
              <div v-show="form.model_lesson.is_model_lesson" v-if="Page.current_page==='评价表正面'">
                <span style="height: 80px;line-height: 80px;margin-left: 20px;font-weight: bold">必填* (备注：该课堂在“好评课堂”可参评名单中)</span>
                <FormItem>
                  <Row>
                    <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：是否推荐为好评课?</span>
                  </Row>
                  <Row>
                    <RadioGroup v-model="form.model_lesson.recommend" >
                      <Radio
                        :label="1"
                        v-bind:style="{ fontSize:'15px',marginLeft:'25px' }"
                        disabled
                      >推荐</Radio>
                      <Radio :label="0"
                             v-bind:style="{ fontSize:'15px',marginLeft:'25px' }"
                             disabled
                      >不推荐</Radio>
                    </RadioGroup>
                  </Row>
                </FormItem>

                <span style="height: 80px;line-height: 80px;margin-left: 20px;font-weight: bold">（若选择为“推荐为好评课堂，请写出推荐理由； 若选择“待定，还需进一步完善”，请写出意见及建议。)</span>

                <FormItem>
                  <Row>
                    <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：结论及意见</span>
                  </Row>
                  <Row>
                    <Input type="textarea"
                           disabled
                           v-model="form.model_lesson.recommend_reason"
                           placeholder="Satisfation about teachers..."
                           v-bind:style="{marginLeft:'25px',width:'65%'}"></Input>
                  </Row>
                </FormItem>
              </div>
              <!--{{ruleValidate}}-->

            </div>
          </FormShow>

      </div>
      <Button type="primary" style="margin-left: 20px" @click="handleSave" :disabled="form.status==='已完成'">保存</Button>
      <Button type="primary" style="margin-left: 20px" @click="handleSubmit" :disabled="disabled">提交</Button>
      <Button type="warning" style="margin-left: 28px" @click="handleCancel">取消</Button>
      <Button style="margin-left: 28px" @click="prePage" v-show="pageshow[0]">
        <Icon type="ios-arrow-back"></Icon>
        上一页
      </Button>
      <Button  style="margin-left: 28px" @click="nextPage" v-show="pageshow[1]">
        下一页
        <Icon type="ios-arrow-forward"></Icon>
      </Button>

      <div style="overflow: hidden">
          <div v-if="form.status === '已完成'" class="form-status" style="background-color: #cce5ff"><p> {{ form.status }} </p></div>
          <div v-else class="form-status" style="background-color: #f8d7da"><p> {{ form.status }} </p></div>
        </div>
      </div>
  </Card>
</template>
<script>
import { getForm, postForm, putForm } from '../../service/api/dqs'
import Lesson from '@/view/components/form_show/lesson_meta_form.vue'
import FormShow from '@/view/components/form_show/form_show.vue'
import { getLesson, updateModelLessonsVote, postModelLessonsVote } from '../../service/api/lesson'
export default {
  components: {
    Lesson, FormShow
  },
  computed: {
    currentUser: function () {
      return this.$store.getters.userInfo
    },
    formInfo :function () {
      return this.$refs.form_info
    }
  },
  watch: {
  },
  data () {
    return {
      model_lesson: {
        id: '',
        vote: ''
      },
      form_id: undefined,
      form_values: {},
      form: {
        meta: { lesson: {} },
        values: [],
        model_lesson:{}
      },
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
      ruleValidate: {},
      pageshow:[false,true]
    }
  },
  mounted () {
    this.fetchForm()
  },
  methods: {
    formValue2Items () {
      this.form.values.map((item, index) => {
        if (item.type === 'form_item') {
          this.form.values[index].value = this.form_values[item.item_name]
        }
      })
      return this.form.values
    },
    produceFrom (status) {
      let form = {
        status: status,
        values: this.formValue2Items()
      }
      return form
    },
    fetchForm () {
      this.form_id = this.$route.params.id
      getForm(this.form_id).then((newresp) => {
        this.form = newresp.data.form
        if (this.form.status === '已完成') {
          this.disabled = true
        }
        newresp.data.form.values.forEach((item) => {
          // 添加数据
          if (item.type === 'form_item') {
            this.form_values[item.item_name] = item.value
          }
        })
      })
    },
    nextPage:function(){
      this.$refs.form_info.nextPage()
    },
    prePage:function(){
      this.$refs.form_info.prePage()
    },
    judgePage:function(pageShow){
      this.pageshow=pageShow
    },
    back () {
      this.$router.back()
    },
    handleSubmit () {
      this.formInfo.validate((valid) => {
            if (valid) {
              let form = this.produceFrom('已完成')
              putForm(this.form_id, form).then((resp) => {
                if (resp.data.code === 200) {
                  this.$Message.success({ content: '新建成功' })
                  this.back()
                }
              })
            } else {
              this.$Message.warning("检查问卷信息是否填写完整")
            }
          })
    },
    handleSave () {
      let form = this.produceFrom('草稿')
      putForm(this.form_id, form).then((resp) => {
        if (resp.data.code === 200) {
          this.$Message.success({ content: '新建成功' })
          this.back()
        }
      })
    },
    handleCancel () {
      this.back()
    }
  }
}
</script>
<style>
  .form-status{
    display: inline-block;
    position: absolute;
    text-align: center;
    right: -7%;
    top: 87%;
    width: 21%;
    transform: rotate(-50deg);
    border-radius: 3px;
    font-size: 30px;
    padding: 2px;
    text-overflow:ellipsis; white-space:nowrap;
    overflow: hidden;
    opacity:0.5;
  }
</style>
