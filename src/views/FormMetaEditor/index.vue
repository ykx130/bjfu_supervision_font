<template>
  <!--whole form meta editor begin-->
  <div style="width: 500px;">

    <!--adjust module begin-->
    <div>
      <AddItem @onOk="addItem"></AddItem>
    </div>
    <!--adjust module end-->

    <!--form meta start-->
    <div>
      <h1>Form Editor</h1>
      <Form :model="formLeft"
            label-position="left"
            :label-width="150">
        <FormItem label="Form Name">
          <Input v-model="meta.table_name"
                 placeholder="enter name..."></Input>
        </FormItem>
        <FormItem label="Form Identifier">
          <Input v-model="id"
                 placeholder="enter identifier..."></Input>
        </FormItem>
      </Form>
    </div>
    <!--form meta end-->

    <!--form blocks start-->
    <div>
      <!--items begin-->
      <div>
        <!--single item begin-->
        <Scroll>
          <Form v-for="item in items"
                :key="item.item_id"
                :model="formLeft"
                label-position="left"
                label-width="150">

            <!--payload begin-->

            <!--if raw_text begin-->
            <div v-if="item.item_type === 'raw_text' ">
              <FormItem label="Extra">
                <Input v-model="item.extra"
                       placeholder="enter extra..."></Input>
              </FormItem>
              <FormItem label="Type">
                <Input v-model="item.type"
                       placeholder="enter type..."></Input>
              </FormItem>
              <Form v-for="option in item.payload.options"
                    :key="option.value"
                    :model="formLeft"
                    label-position="left"
                    :label-width="150">
                <FormItem v-if="option.value === 'yes' "
                          label="Satisfied">
                  <Input v-model="option.label"
                         placeholder="enter..."></Input>
                </FormItem>
                <FormItem v-else
                          label="Not Satisfied">
                  <Input v-model="option.label"
                         placeholder="enter..."></Input>
                </FormItem>
              </Form>
            </div>
            <!--if raw_text end-->

            <!--if radio_option start-->
            <div v-if="item.item_type === 'radio_option' ">

            </div>
            <!--if radio_option end-->

            <!--if checkbox_option start-->
            <div v-if="item.item_type === 'checkbox_option' ">

            </div>
            <!--if checkbox_option end-->

            <!--payload end-->

            <!--button begin-->
            <Button type="ghost"
                    style="width: 180px"
                    v-on:click="prependNewBlock(item)">
              Prepend New Block
            </Button>
            <Button type="info"
                    style="width: 180px"
                    v-on:click="editBlock(item)">
              Edit this Block
            </Button>
            <Button type="error"
                    style="width: 130px"
                    v-on:click="deleteNewBlock(item)">
              Delete this Block
            </Button>
            <br>
            <br>
            <!--button end-->
          </Form>
        </Scroll>

        <!--single item end-->
        <Button type="success"
                long
                v-on:click="appendNewBlock">
          Append New Block
        </Button>
      </div>
      <!--items end-->
    </div>
    <!--form blocks end-->
  </div>
  <!--whole form meta editor end-->

</template>


<script>
  import { getAllFormMetas, getFormMeta } from '../../service/api/dqs'
  import AddItem from './components/add_item'
  export default {
    name: 'form_meta_editor',
    components: { AddItem },
    data () {
      return {
        "id":"213b52f",
        "meta": {
          "table_name": "测试问卷一",
          "version": "3",
          "created_at": "2018/08/01",
          "updated_at": "2018/08/05",
        },
        "items": [{
          "item_id": 1,
          "item_name": "teach_satisfy",
          "item_type":"raw_text",
          "extra": "教师满意度",
          "type": "block",
          "payload": {
            "options": [{
              "label": "满意",
              "value": "yes"
            },{
              "label": "不满意",
              "value": "no"
            }
            ]
          }
        },
          {
            "item_id": 2,
            "item_name": "study_satisfy",
            "item_type":"raw_text",
            "extra": "学生满意度",
            "type": "block",
            "payload": {
              "options": [{
                "label": "满意",
                "value": "yes"
              },{
                "label": "不满意",
                "value": "no"
              }
              ]
            }
          }
        ]
      }
    },
    created: {
      // AXIOS here
    },
    methods: {
      appendNewBlock: function () {
        this.items.push({
          "item_id": 100,
          "item_name": "satisfy",
          "item_type": "raw_text",
          "extra": "满意度",
          "type": "block",
          "payload": {
            "options": [{
              "label": "满意",
              "value": "yes",
            }, {
              "label": "不满意",
              "value": "no"
            }]
          }
        });
        this.$Message.info('Items appended!');
      },
      prependNewBlock: function (item) {
        var position = this.items.indexOf(item);
        this.items.splice(position, 0, {
          "item_id": 100,
          "item_name": "satisfy",
          "item_type": "raw_text",
          "extra": "满意度",
          "type": "block",
          "payload": {
            "options": [{
              "label": "满意",
              "value": "yes",
            }, {
              "label": "不满意",
              "value": "no"
            }]
          }
        });
        this.$Message.info('Items prepended!');
      },
      editBlock: function (item) {
      },
      deleteNewBlock: function (item) {
        this.items.splice(this.items.indexOf(item), 1);
        this.$Message.info('Items deleted!');
      }
    }
  }
</script>
