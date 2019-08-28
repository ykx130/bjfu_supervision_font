<template>
  <div>
    <Tabs v-model="current_page">
      <TabPane v-for="(item) in  pages" :label="item" :name="item" :key="item"></TabPane>
    </Tabs>
    <Form :model="values" ref="ruleform">
      <template v-for="it in items">
        <template v-if="it.item_type === 'sub_title_block' && it.payload.page === current_page">
          <span style="height: 80px;line-height: 80px;margin-left: 20px;font-weight: bold" v-if="it.item_name=== 'sub_title_block_start'">{{ it.payload.title }}</span>

          <template v-if="it.item_name=== 'sub_title_block_end'">
            <FormItem>
              <divider></divider>
            </FormItem>
          </template>

        </template>

        <template v-else-if="it.item_type === 'radio_option' && it.payload.page === current_page">
          <FormItem :rules="ruleValidate[it.item_name]" :prop="it.item_name">
            <Row>
              <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.title}}</span>
              <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
            </Row>
            <Row>
              <RadioGroup v-model="values[it.item_name].value">
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

        <template v-else-if="it.item_type === 'checkbox_option'  && it.payload.page === current_page">
          <FormItem :rules="ruleValidate[it.item_name]" :prop="it.item_name">
            <Row>
              <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.title}}</span>
              <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
            </Row>
            <Row>
              <CheckboxGroup v-model="values[it.item_name].value">
                <Checkbox v-for="op in it.payload.options" :label="op.label"
                          :key="op.label + op.value"
                          v-bind:style="{ fontSize:'15px',marginLeft:'25px' }" :disabled="disabled">
                  <span>{{op.label}}</span>
                </Checkbox>
              </CheckboxGroup>
            </Row>
          </FormItem>
        </template>

        <template v-if="it.item_type === 'raw_text'  && it.payload.page === current_page">
          <FormItem :rules="ruleValidate[it.item_name]" :prop="it.item_name">
            <Row>
              <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.title}}</span>
              <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
            </Row>
            <Row>
              <Input type="textarea" placeholder="Satisfation about teachers..." v-model="values[it.item_name].value"
                     v-bind:style="{marginLeft:'25px',width:'65%'}" :disabled="disabled"></Input>
            </Row>
          </FormItem>
        </template>

      </template>
      <slot v-if="((!pages) ||current_page === pages[pages.length - 1])"></slot>
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
    pages: Array
  },
  data: function () {
    return {
      ruleValidate: {},
      current_page: '评价表正面'
    }
  },
  model: {
    prop: 'values',
    event: 'change'
  },
  computed: {
    lessonInfoForm: function () {
      return this.$refs.ruleform
    }
  },
  watch: {
    values: {
      deep: true,
      handler: function () {
        this.$emit('change', this.values)
      }
    }
  },
  methods: {
    validate: function (f) {
      return this.$refs.ruleform.validate(f)
    }
  },
  mounted: function () {
    this.items.map((item) => {
      if (item.type==='form_item' && item.payload.rules){
        this.ruleValidate[item.item_name] = []
        item.payload.rules.map((rule) => {
          if (rule.type === 'required') {
            this.ruleValidate[item.item_name].push({ required: rule.required, message: '此选项必填', trigger: 'blur' })
          } else if (rule.type === 'length') {
            this.ruleValidate[item.item_name].push({min: rule.min, max: rule.max  ,message: `此选项长度在${rule.min} ~ ${rule.max} 之间`, trigger: 'blur' })
          }
        })
      }
    })
  }
}
</script>

<style scoped>

</style>
