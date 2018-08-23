<template>
  <!--whole form meta editor begin-->
  <div>
    <!--adjust module start-->
    <!--adjust module end-->

    <!--form meta start-->
    <div>
      <h1>Form Editor</h1>
      <Form :model="form_meta" :label-width="80" inline label-position="left">
        <FormItem label="Form Name">
          <Input v-model="form_meta.forms.bind_meta_name" placeholder="enter name..." style="width: 180px"></Input>
        </FormItem>
        <FormItem label="Form Version">
          <Input v-model="form_meta.forms.bind_meta_version" placeholder="change version..." style="width: 180px"></Input>
        </FormItem>
      </Form>
    </div>


    <!--form meta end-->

    <!--meta start-->
    <div style="background:#eee;padding: 8px; width: 300px; margin: 8px;">
      <Card :bordered="false">
        <p slot="title">{{ form_meta.forms.meta.create_at }}</p>
        <p>{{ form_meta.forms.meta.create_by  }}</p>
      </Card>
    </div>

    <!--meta end-->


    <!--form blocks start-->
    <div>
      <!--items begin-->
      <div>
        <!--single item begin-->

        <Form v-for="(item, index) in form_meta.forms.values" :key="item.item_name" label-position="left" label-width="150">

          <!--information begin-->

          <!--if sub_title_block_start begin-->
          <div v-if="item.item_type === 'sub_title_block_start' ">
            <h3> {{  }} </h3>
          </div>
          <!--if sub_title_block_start end-->

          <!--if raw_text begin-->
          <div v-if="item.item_type === 'raw_text' " style="border:#eee solid 5px; padding:10px; width: 600px;">
            <h3>RawText</h3>
            <Form :model="item" :label-width="80" inline>
              <FormItem label="name">
                <Input v-model="item.item_name" placeholder="enter name..." style="width: 180px"></Input>
              </FormItem>
              <FormItem label="value">
                <Input v-model="item.value" placeholder="enter content..." style="width: 180px"></Input>
              </FormItem>
            </Form>
            <Poptip placement="right" width="400">
              <Button type="ghost" style="width: 220px;">
                Prepend New Block
              </Button>
              <div class="api" slot="content">
                <AddItem @onOk="prependNewBlock(nowIndex, $event)"></AddItem>
              </div>
            </Poptip>

            <Poptip placement="right" width="400">
              <Button type="info" style="width: 220px" @click="editItemShow = true; nowIndex = index;">
                Edit this Block
              </Button>
              <div class="api" slot="content">
                <AddItem @onOk="editBlock(nowIndex, $event)"></AddItem>
              </div>
            </Poptip>

            <Button type="error" style="width: 120px" v-on:click="deleteNewBlock(item)">
              Delete this Block
            </Button>
          </div>
          <!--if raw_text end-->

          <!--if radio_option start-->
          <div v-if="item.item_type === 'radio_option' " style="border:#eee solid 5px; padding:10px; width: 600px;">
            <h3>RadioOptions</h3>
            <Form :model="item" :label-width="80" inline>
              <FormItem label="name">
                <Input v-model="item.item_name" placeholder="enter name..." style="width: 180px"></Input>
              </FormItem>
              <FormItem label="OptionItem">
                <RadioGroup>
                  <Radio v-for="option in item.pyload.options" :label="option.label" :key="option.value">
                    <span v-model="option.value">{{ option.value }}</span>
                  </Radio>
                </RadioGroup>
              </FormItem>
              <FormItem v-if="item.pyload.weight" label="weight">
                <Input v-model="item.pyload.weight" placeholder="enter weight..." style="width: 180px"></Input>
              </FormItem>
            </Form>
            <Poptip placement="right" width="400">
              <Button type="ghost" style="width: 220px;">
                Prepend New Block
              </Button>
              <div class="api" slot="content">
                <AddItem @onOk="prependNewBlock(nowIndex, $event)"></AddItem>
              </div>
            </Poptip>

            <Poptip placement="right" width="400">
              <Button type="info" style="width: 220px" @click="editItemShow = true; nowIndex = index;">
                Edit this Block
              </Button>
              <div class="api" slot="content">
                <AddItem @onOk="editBlock(nowIndex, $event)"></AddItem>
              </div>
            </Poptip>

            <Button type="error" style="width: 120px" v-on:click="deleteNewBlock(item)">
              Delete this Block
            </Button>
          </div>
          <!--if radio_option end-->

          <!--if checkbox_option start-->
          <div v-if="item.item_type === 'checkbox_option' " style="border:#eee solid 5px; padding:10px; width: 600px;">
            <h3>CheckboxOptions</h3>
            <Form :model="item" :label-width="80" inline>
              <FormItem label="name">
                <Input v-model="item.item_name" placeholder="enter name..." style="width: 180px"></Input>
              </FormItem>
              <FormItem label="CheckboxItem">
                <CheckboxGroup>
                  <Checkbox v-for="option in item.pyload.options" :label="option.label" :key="option.value">
                    <span v-model="option.value">{{ option.value }}</span>
                  </Checkbox>
                </CheckboxGroup>
              </FormItem>
              <FormItem v-if="item.pyload.weight" label="weight">
                <Input v-model="item.pyload.weight" placeholder="enter weight..." style="width: 180px"></Input>
              </FormItem>
            </Form>
            <Poptip placement="right" width="400">
              <Button type="ghost" style="width: 220px;">
                Prepend New Block
              </Button>
              <div class="api" slot="content">
                <AddItem @onOk="prependNewBlock(nowIndex, $event)"></AddItem>
              </div>
            </Poptip>

            <Poptip placement="right" width="400">
              <Button type="info" style="width: 220px" @click="editItemShow = true; nowIndex = index;">
                Edit this Block
              </Button>
              <div class="api" slot="content">
                <AddItem @onOk="editBlock(nowIndex, $event)"></AddItem>
              </div>
            </Poptip>

            <Button type="error" style="width: 120px" v-on:click="deleteNewBlock(item)">
              Delete this Block
            </Button>
          </div>
          <!--if checkbox_option end-->

          <!--sub_title_block_end begin-->
          <div v-if="item.item_type === 'sub_title_block_end' ">
            <h3> end </h3>
          </div>
          <!--sub_title_block_end end-->

          <!--information end-->

          <!--button begin-->

          <div v-if="item.item_type === 'raw_text' || item.item_type === 'radio_options' || item.item_type === 'checkbox_options' ">

          </div>
          <br>
          <br>
          <!--button end-->

        </Form>

        <!--Modals begin-->
        <!--Modals end-->




        <!--single item end-->

        <Poptip placement="right" width="400">
          <Button type="ghost" style="width: 300px">
            Append New Block
          </Button>
          <div class="api" slot="content">
            <AddItem @onOk="appendNewBlock(nowIndex, $event)"></AddItem>
          </div>
        </Poptip>
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
    getFormMeta,
    postFormMeta
  } from '../../service/api/dqs'
  import AddItem from './components/add_item'
  export default {
    name: 'form_meta_editor',
    components: {
      AddItem
    },
    data() {
      return {
        nowIndex: 0,
        form_meta: {
          "code": 200,
          "forms":
            {
              "_id": "5b630a3014d67025407e8004",
              "bind_meta_id": "5b630ee114d67025a48c3b50",
              "bind_meta_name": "test",
              "bind_meta_version": "1.0",
              "status": "待提交",
              "meta": {
                "create_at": "2017-12-12 00:00:00",
                "updated_at": "2017-12-12 00:00:00",
                "create_by": "suchang",
                "term": "2017-2018-1",
                "lesson": {
                  "lesson_id": "a02b0216e1",
                  "id": 2628008,
                  "lesson_attribute": "实验课",
                  "lesson_state": "未完成",
                  "lesson_level": "自主听课",
                  "lesson_name": "Auto－CAD实验",
                  "lesson_teacher_id": "19761004",
                  "lesson_teacher_name": "饶良懿",
                  "lesson_teacher_unit": "水土保持学院",
                  "lesson_unit": "水土保持学院",
                  "lesson_year": "2016-2017",
                  "lesson_semester": "1",
                  "lesson_cases": {
                    "lesson_room": "计算中心-5",
                    "lesson_week": "3,7,9-14",
                    "lesson_time": "0708"
                  },
                  "lesson_class": "水保14-1-3",
                  "lesson_weekday": "5",
                  "assign_group": "",
                  "lesson_attention_reason": ""
                }
              },
              "values": [
                {
                  "item_name": "教师满意度",
                  "type": "form_item",
                  "item_type": "checkbox_option",
                  "pyload": {
                    "options": [
                      {
                        "label": "满意",
                        "value": "满意",
                        "score": 1
                      },
                      {
                        "label": "一般",
                        "value": "一般",
                        "score": 0.75
                      },
                      {
                        "label": "不满意",
                        "value": "不满意",
                        "score": 0.5
                      }
                    ],
                    "weight": 0.3
                  },
                  "value": "教师满意度"
                },
                {
                  "item_name": "教师满意度",
                  "type": "form_item",
                  "item_type": "radio_option",
                  "pyload": {
                    "options": [
                      {
                        "label": "满意",
                        "value": "满意",
                        "score": 1
                      },
                      {
                        "label": "一般",
                        "value": "一般",
                        "score": 0.75
                      },
                      {
                        "label": "不满意",
                        "value": "不满意",
                        "score": 0.5
                      }
                    ],
                    "weight": 0.3
                  },
                  "value": "教师满意度"
                },
                {
                  "item_name": "教师评价",
                  "type": "form_item",
                  "item_type": "raw_text",
                  "pyload": {},
                  "value": "不咋满意"
                }
              ]
            }

        }
      }
    },
    mounted: function () {
      // const args = this.$route.params;
      // if (args.id) {
      //   getFormMeta(args.id).then((response) => {
      //     this.form_meta = response.data.form_meta;
      //   })
      // }
    },
    methods: {
      ok() {
        this.$Message.info('Clicked ok');
      },
      cancel() {
        this.$Message.info('Clicked cancel');
      },
      appendNewBlock: function (index, value) {
        this.form_meta.items.push(value);
        this.$Message.info('Items appended!');
      },
      prependNewBlock: function (index, value) {
        this.form_meta.items.splice(index, 0, value);
        this.$Message.info('Items prepended!');
      },
      editBlock: function (index, value) {
        this.form_meta.items.splice(index, 1);
        this.form_meta.items.splice(index, 0, value);
        this.$Message.info('Items edited!');
      },
      deleteNewBlock: function (item) {
        let index = this.form_meta.items.indexOf(item);
        this.form_meta.items.splice(index, 1);
        this.$Message.info('Items deleted!');
      },
      submitForm: function () {
        postFormMeta(this.form_meta).then(function (response) {
          console.log(response);
        })
          .catch(function (error) {
            console.log(error);
          });
        this.$Message.info('Items submitted!');
      }
    }
  }
</script>
