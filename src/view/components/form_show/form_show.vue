<template>
  <div>
    <Tabs :value="current_page">
      <TabPane v-for="(item) in  pages" :label="item" :name="item" :key="item"></TabPane>
    </Tabs>
    <Form :model="values" ref="ruleform">
      <template v-for="it in items">
        <template v-if="it.item_type === 'sub_title_block'">
          <div v-show="it.payload.page === current_page" style="margin-top: 1px">
              <span style="height: 50px;line-height: 50px;margin-left: 20px;font-weight: bold"
                    v-if="it.item_name=== 'sub_title_block_start'">{{ it.payload.title }}</span>

            <template v-if="it.item_name=== 'sub_title_block_end'">
              <FormItem>
                <divider style="margin-bottom: 0px"></divider>
              </FormItem>
            </template>
          </div>
        </template>

        <template v-if="it.item_type === 'radio_option'" >
          <FormItem :rules="ruleValidate[it.item_name]" :prop="it.item_name"  v-show="it.payload.page === current_page">
            <Row>
              <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.title}}</span>
              <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
            </Row>
            <Row>
              <RadioGroup v-model="values[it.item_name]">
                <Radio v-for="op in it.payload.options"
                       :label="op.value"
                       :key="op.label + op.value"
                       v-bind:style="{ fontSize:'15px',marginLeft:'25px' }" :disabled="disabled">
                  <span>{{op.label}}</span>
                </Radio>
              </RadioGroup>
            </Row>
          </FormItem>
        </template>

        <template v-if="it.item_type === 'checkbox_option'" >
          <FormItem :rules="ruleValidate[it.item_name]" :prop="it.item_name" v-show="it.payload.page === current_page">
            <Row>
              <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.title}}</span>
              <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
            </Row>
            <Row>
              <CheckboxGroup v-model="values[it.item_name]">
                <Checkbox v-for="op in it.payload.options" :label="op.label"
                          :key="op.label + op.value"
                          v-bind:style="{ fontSize:'15px',marginLeft:'25px' }" :disabled="disabled">
                  <span>{{op.label}}</span>
                </Checkbox>
              </CheckboxGroup>
            </Row>
          </FormItem>
        </template>

        <template v-if="it.item_type === 'raw_text'" >
          <FormItem :rules="ruleValidate[it.item_name]" :prop="it.item_name" v-show="it.payload.page === current_page">
            <Row>
              <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.title}}</span>
              <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
            </Row>
            <Row>
              <Input type="textarea" placeholder="Satisfation about teachers..." v-model="values[it.item_name]"
                     v-bind:style="{marginLeft:'25px',width:'65%'}" :disabled="disabled"></Input>
            </Row>
          </FormItem>
        </template>

      </template>
      <slot :current_page="current_page" ></slot>
<!--      v-if="((!pages) ||current_page === pages[0])"-->
    </Form>
  </div>
</template>

<script>
export default {
  name: 'form_show',
  props: {
    values: Object,
    disabled: Boolean,
    items: Array,
    pages: Array,
    judgePage: Function
  },
  data: function () {
    return {
      ruleValidate: {},
      current_page: '评价表正面',
      prePages:true,
      nextPages:true
    }
  },
  model: {
    prop: 'values',
    event: 'change'
  },
  computed: {

  },
  watch: {
    values: {
      deep: true,
      handler: function () {
        this.$emit('change', this.values)
      }
    },
    items: {
      deep: true,
      handler: function () {
        this.fillValidateRule()
        console.log(this.ruleValidate)
      }
    }
  },
  methods: {
    validate: function (f) {
      return this.$refs.ruleform.validate(f)
    },
    nextPage:function(){
      let i=this.pages.indexOf(this.current_page)
      if(i<this.pages.length-1) {
        this.current_page = this.pages[i+1]
      }
      this.judgeCurrentPage()

    },
    prePage:function(){
      let i=this.pages.indexOf(this.current_page)
      if(i>0) {
        this.current_page = this.pages[i-1]
      }
      this.judgeCurrentPage()
    },
    judgeCurrentPage:function(){
      let i=this.pages.indexOf(this.current_page)
      if(i===0){
        this.prePages=false
      }
      else {
        this.prePages=true
      }
      if(i===this.pages.length-1){
        this.nextPages=false
      }
      else{
        this.nextPages=true
      }
      this.$emit('judgePage', [this.prePages,this.nextPages]);
      },
    fillValidateRule: function () {
      this.items.map((item) => {
        if (item.type === 'form_item' && item.payload.rules) {
          this.ruleValidate[item.item_name] = []
          item.payload.rules.map((rule) => {
            if (rule.type === 'required') {
              this.ruleValidate[item.item_name].push({ validator: (rule, value, callback) => {
                if (!this.values[rule.fullField]) {
                  console.log(this.values[rule.fullField])
                  callback(new Error(`出错${rule.fullField}`))
                } else {
                  callback()
                }
              },
              message: '此选项必填',
              trigger: 'blur',
              item_name: item.item_name })
            } else if (rule.type === 'length') {
              this.ruleValidate[item.item_name].push({ validator: (rule, value, callback) => {
                if (!(this.values[rule.fullField].length > rule.min)) {
                  callback(new Error(`出错${rule.fullField}`))
                } else {
                  callback()
                }
              },
              message: '此选项必填',
              trigger: 'blur',
              item_name: item.item_name,
              min: rule.min,
              max: rule.max })
            } else if (rule.type === 'code') {
              this.ruleValidate[item.item_name].push({ validator: new Function('rule', 'value', 'callback', rule.code), message: '请检查条件是否满足！', trigger: 'blur', item_name: item.item_name, values: this.values })
            }
          })
        }
      })
    }
  },
  mounted: function () {
    this.fillValidateRule()
  }
}
</script>

<style scoped>

</style>
