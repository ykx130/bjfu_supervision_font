<template>
  <!--whole form meta editor begin-->
  <div style="width: 820px;">
    <!--adjust module start-->
    <!--adjust module end-->

    <!--form meta start-->
    <div>
      <h1>Form Editor</h1>
      <Form :model="formLeft" label-position="left" :label-width="150">
        <FormItem label="Form Name">
          <Input v-model="meta.table_name" placeholder="enter name..."></Input>
        </FormItem>
        <FormItem label="Form Identifier">
          <Input v-model="id" placeholder="enter identifier..."></Input>
        </FormItem>
      </Form>
    </div>
    <!--form meta end-->

    <!--form blocks start-->
    <div>
      <!--items begin-->
      <div>
        <!--single item begin-->
        <Scroll height=600>
          <!--sub_title_block_start begin-->
          <h4>ToAdd: sub_title_block_start</h4>
          <!--sub_title_block_start end-->

          <Form v-for="(item, index) in items" label-position="left" label-width="150">

            <!--information begin-->

            <!--if raw_text begin-->
            <div v-if="item.item_type === 'raw_text' ">
              <FormItem label="TextItem">
                <Input v-model="item.item_name" placeholder="enter name..."></Input>
                <br><br>
                <Input v-model="item.extra" placeholder="enter extra..."></Input>
              </FormItem>
            </div>
            <!--if raw_text end-->

            <!--if radio_option start-->
            <div v-if="item.item_type === 'radio_options' ">
              <FormItem label="OptionItem">
                <Input v-model="item.item_name" placeholder="enter name..."></Input>
                <br><br>
                <Input v-model="item.extra" placeholder="enter extra..."></Input>
                <br><br>
                <RadioGroup>
                  <Radio v-for="option in item.payload.options" :label="option.label" :key="option.value">
                    <span>{{ option.label }}</span>
                  </Radio>
                </RadioGroup>
              </FormItem>
            </div>
            <!--if radio_option end-->

            <!--if checkbox_option start-->
            <div v-if="item.item_type === 'checkbox_options' ">
              <FormItem label="CheckboxItem">
                <Input v-model="item.item_name" placeholder="enter name..."></Input>
                <br><br>
                <Input v-model="item.extra" placeholder="enter extra..."></Input>
                <br><br>
                <CheckboxGroup>
                  <Checkbox v-for="option in item.payload.options" :label="option.label" :key="option.value">
                    <span>{{ option.label }}</span>
                  </Checkbox>
                </CheckboxGroup>
              </FormItem>
            </div>
            <!--if checkbox_option end-->



            <!--information end-->

            <!--button begin-->

            <Button type="ghost" style="width: 300px" @click="prependItemShow = true; nowIndex = index;">
              Prepend New Block
            </Button>

            <Button type="info" style="width: 300px" v-on:click="editBlock()">
              Edit this Block
            </Button>

            <Button type="error" style="width: 200px" v-on:click="deleteNewBlock(item)">
              Delete this Block
            </Button>
            <br>
            <br>
            <!--button end-->

          </Form>

          <!--Modals begin-->
          <Modal v-model="prependItemShow" title="Prepend Item" @on-ok="ok" @on-cancel="cancel">
            <AddItem @onOk="prependNewBlock(nowIndex, $event)"></AddItem>
          </Modal>

          <Modal v-model="appendItemShow" title="Append Item" @on-ok="ok" @on-cancel="cancel">
            <AddItem @onOk="appendNewBlock"></AddItem>
          </Modal>
          <!--Modals end-->

          <!--sub_title_block_end begin-->
          <h4>ToAdd: sub_title_block_end</h4>
          <!--sub_title_block_end end-->

        </Scroll>

        <!--single item end-->

        <Button type="success" @click="appendItemShow = true" style="width: 400px">
          Append New Block
        </Button>
        <Button type="primary" @click="submitForm" style="width: 400px">Click to Submit</Button>

      </div>
      <!--items end-->
    </div>
    <!--form blocks end-->
  </div>

  <!--whole form meta editor end-->
</template>


<script>
  import {
    getAllFormMetas,
    getFormMeta
  } from '../../service/api/dqs'
  import AddItem from './components/add_item'
  export default {
    name: 'form_meta_editor',
    components: {
      AddItem
    },
    data() {
      return {
        returnData: {},
        appendItemShow: false,
        prependItemShow: false,
        formEditable: false,
        nowIndex: 0,
        "id": "213b52f",
        "meta": {
          "table_name": "测试问卷一",
          "version": "3",
          "created_at": "2018/08/01",
          "updated_at": "2018/08/05",
        },
        "items": [{
          "item_id": 1,
          "item_name": "teach_in_class",
          "item_type": "checkbox_options",
          "extra": "老师上课情况",
          "type": "form_item",
          "payload": {
            "options": [{
              "label": "认真上课",
              "value": "yes"
            }, {
              "label": "平时分高",
              "value": "no"
            }, {
              "label": "考试不难",
              "value": "no"
            }]
          }
        },
          {
            "item_id": 2,
            "item_name": "stu_satisfy",
            "item_type": "raw_text",
            "extra": "学生对该教师满意",
            "type": "form_item",
            "payload": {
              "options": []
            }
          },
          {
            "item_id": 3,
            "item_name": "tea_satisfy",
            "item_type": "radio_options",
            "extra": "教师对该教师满意",
            "type": "form_item",
            "payload": {
              "options": [{
                "label": "满意",
                "value": "yes"
              }, {
                "label": "不满意",
                "value": "no"
              }]
            }
          },
          {
            "item_id": 4,
            "item_name": "tea_satisfy",
            "item_type": "radio_options",
            "extra": "学生对该教师满意",
            "type": "form_item",
            "payload": {
              "options": [{
                "label": "满意",
                "value": "yes"
              }, {
                "label": "不满意",
                "value": "no"
              }]
            }
          }
        ]
      }
    },
    created: {
      // DK what to do
    },
    mounted: {
      // DK what to do
    },
    methods: {
      ok() {
        this.$Message.info('Clicked ok');
      },
      cancel() {
        this.$Message.info('Clicked cancel');
      },
      appendNewBlock: function(value) {
        this.items.push(value);
        this.$Message.info('Items appended!');
      },
      prependNewBlock: function(index, value) {
        this.items.splice(index, 0, value);
        this.$Message.info('Items prepended!');
      },
      editBlock: function() {
        if (this.formEditable) {
          this.formEditable = !this.formEditable;
        } else {
          this.formEditable = !this.formEditable;
        }
      },
      deleteNewBlock: function(item) {
        this.items.splice(this.items.indexOf(item), 1);
        this.$Message.info('Items deleted!');
      },
      submitForm: function() {
        this.$http.post('/api', this.returnData).then(function(response) {
          // success actions
        });
      }
    }
  }
</script>
