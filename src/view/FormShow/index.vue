<template>
  <Card>
    <!--{{this.form.form.values}}-->
    <Scroll height="670">
      <div>
        <h1 style="text-align: center">{{ form.form.bind_meta_name }}</h1>
        <div>
          <span v-bind:style="{float:'right', marginRight:'50px'}">问卷状态：{{form.form.status}}</span>
        </div>

        <divider orientation="left">课程信息</divider>
        <div>
          <Lesson v-model="form.form.meta"></Lesson>
        </div>
        <br/>
        <divider orientation="left">问卷内容</divider>
        <!--{{this.form.form.meta}}-->
        <div>
          <Form v-for="it in form.form.values" label-position="top">
            <template>
              <template v-if="it.item_type === 'sub_title_block_start'">
                <h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.title }}</h1>
              </template>

              <template  v-else-if="it.item_type === 'radio_option'">
                <FormItem :label="'Q'+(qsNum=qsNum+1)+'：'+it.item_name" :style="{marginLeft:'25px'}">

                  <RadioGroup v-model="it.value">
                    <Radio  v-for="op in it.payload.options" :value="op.value" :label="op.label" :key="op.value" v-bind:style="{marginLeft:'25px' }" :disabled="disabled">
                      <!--<span>{{op.label}}</span>-->
                    </Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem v-bind:style="{marginLeft:'50px' }" >
                  <span >({{ it.extra }} 权重：{{it.weight}})</span>
                </FormItem>

              </template>

              <template v-else-if="it.item_type === 'checkbox_option'">
                <FormItem :label="'Q'+(qsNum=qsNum+1)+'：'+it.item_name" :style="{marginLeft:'25px'}">
                  <CheckboxGroup v-model="it.value" :value="it.value">
                    <Checkbox v-for="op in it.payload.options"  :value="op.value" :label="op.label" :key="op.value" v-bind:style="{ marginLeft:'25px' }" :disabled="disabled">
                      <!--<span>{{op.label}}</span-->
                    </Checkbox>
                  </CheckboxGroup>
                </FormItem>
                <FormItem>
                  <span v-bind:style="{marginLeft:'50px' }">({{ it.extra }} 权重：{{it.weight}})</span>
                </FormItem>
              </template>

              <template v-if="it.item_type === 'raw_text'">
                <FormItem :label="'Q'+(qsNum=qsNum+1)+'：'+it.item_name" :style="{marginLeft:'25px'}">
                  <Input type="textarea" placeholder="Satisfation about teachers..." v-model="it.value" v-bind:style="{marginLeft:'25px',width:'65%'}" :disabled="disabled"></Input>
                </FormItem>
                <FormItem>
                  <span v-bind:style="{marginLeft:'50px' }">({{ it.extra }} 权重：{{it.weight}})</span>
                </FormItem>
              </template>
              <template v-if="it.item_type === 'sub_title_block_end'">
                <h1 style="height: 80px;line-height: 80px;margin-left: 20px">{{ it.payload.options }}</h1>
              </template>
            </template>
            <FormItem label="是否推荐为好评课" v-show="show_recommend" >
              <RadioGroup v-model="recommend_model" >
                <Radio  label="推荐" :value="1" ></Radio>
                <Radio label="不推荐" :value="0"></Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </div>
        <div style="text-align:center">
          <Button type="primary" style="margin-left: 20px" @click="handleSave"  :disabled="disabled">保存</Button>
          <Button type="primary" style="margin-left: 20px" @click="handleSubmit" :disabled="disabled">提交</Button>
          <Button type="warning" style="margin-left: 28px" @click="handleCancel":disabled="disabled">取消</Button>
        </div>
      </div>
    </Scroll>
  </Card>
</template>
<script>
import { postForm } from '../../service/api/dqs'
import { getForm } from '../../service/api/dqs'
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
      disabled: false,
      qsNum: 0,
      form: {},
      recommend_model: 0,
      show_recommend: false
    }
  },
  mounted () {
    let id = this.$route.params.id
    getForm(id).then((newresp) => {
      this.form = newresp.data
      if (this.form.form.status == '已完成') {
        this.disabled = true
      }
    })
  },
  methods: {
    handleSubmit () {
      this.form.form.status = '已完成'
      postForm(this.form.form).then(()=>{
        location.reload()
      })
    },
    handleSave () {
      this.form.form.status = '草稿'
      postForm(this.form.form).then(()=>{
        location.reload()
      })
    },
    handleCancel() {
      location.reload()
    }
  }
}
</script>
