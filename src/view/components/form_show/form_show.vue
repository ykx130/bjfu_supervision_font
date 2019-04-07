<template>
  <Form :model="values" ref="ruleform">
    <template v-for="it in items">
      <template v-if="it.item_type === 'sub_title_block'">
        <span style="height: 80px;line-height: 80px;margin-left: 20px;font-weight: bold">{{ it.payload.title }}</span>
      </template>

      <template v-else-if="it.item_type === 'radio_option'">
        <FormItem :rules="ruleValidate[it.item_name]" :prop="it.item_name">
          <Row>
            <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.item_name}}</span>
            <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
          </Row>
          <Row>
            <RadioGroup v-model="it.value">
              <Radio v-for="op in it.payload.options" :value="op.value" :label="op.label" :key="op.value"
                     v-bind:style="{ fontSize:'15px',marginLeft:'25px' }" :disabled="disabled">
                <span>{{op.label}}</span>
              </Radio>
            </RadioGroup>
          </Row>
        </FormItem>
      </template>

      <template v-else-if="it.item_type === 'checkbox_option'">
        <FormItem :rules="ruleValidate[it.item_name]" :prop="it.item_name">
          <Row>
            <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.item_name}}</span>
            <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
          </Row>
          <Row>
            <CheckboxGroup v-model="values[it.item_name]">
              <Checkbox v-for="op in it.payload.options" :label="op.label" :key="op.value"
                        v-bind:style="{ fontSize:'15px',marginLeft:'25px' }" :disabled="disabled">
                <span>{{op.label}}</span>
              </Checkbox>
            </CheckboxGroup>
          </Row>
        </FormItem>
      </template>

      <template v-if="it.item_type === 'raw_text'">
        <FormItem :rules="ruleValidate[it.item_name]" :prop="it.item_name">
          <Row>
            <span v-bind:style="{marginLeft:'25px',fontSize:'15px' }">Q：{{it.item_name}}</span>
            <span v-bind:style="{marginLeft:'0px',fontSize:'15px' }">【{{ it.extra }} 权重：{{it.weight}} 】</span>
          </Row>
          <Row>
            <Input type="textarea" placeholder="Satisfation about teachers..." v-model="values[it.item_name]"
                   v-bind:style="{marginLeft:'25px',width:'65%'}" :disabled="disabled"></Input>
          </Row>
        </FormItem>
      </template>

      <template v-if="it.item_type === 'sub_title_block_end'">
        <FormItem>
          <divider></divider>
        </FormItem>
      </template>

    </template>
    <slot></slot>
  </Form>
</template>

<script>
export default {
  name: 'form_show',
  props: {
    values: Object,
    ruleValidate: Object,
    disabled: Boolean,
    items: Array
  },
  model: {
    prop: 'values',
    event: 'change'
  },
  watch: {
    values: {
      deep: true,
      handler: function () {
        this.$emit('change', this.values)
      }
    }
  }
}
</script>

<style scoped>

</style>
