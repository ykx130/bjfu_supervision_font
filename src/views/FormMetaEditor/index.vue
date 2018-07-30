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
          <Input v-model="form_meta.meta.table_name" placeholder="enter name..."></Input>
        </FormItem>
        <FormItem label="Form Identifier">
          <Input v-model="form_meta.id" placeholder="enter identifier..."></Input>
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

          <Form v-for="(item, index) in form_meta.items" :key="item.item_id" label-position="left" label-width="150">

            <!--information begin-->

            <!--if sub_title_block_start begin-->

            <div v-if="item.item_type === 'sub_title_block_start' ">
              <h3> {{ item.payload.title }} </h3>
            </div>

            <!--if sub_title_block_start end-->

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

            <!--sub_title_block_end begin-->
            <div v-if="item.item_type === 'sub_title_block_end' ">
              <h3> end </h3>
            </div>
            <!--sub_title_block_end end-->

            <!--information end-->

            <!--button begin-->

            <div v-if="item.item_type === 'raw_text' || item.item_type === 'radio_options' || item.item_type === 'checkbox_options' ">
              <Poptip placement="right" width="400">
              <Button type="ghost" style="width: 300px" @click="prependItemShow = true; nowIndex = index;">
                Prepend New Block
              </Button>
                <div class="api" slot="content">
                  <AddItem @onOk="prependNewBlock(nowIndex, $event)"></AddItem>
                </div>
              </Poptip>

              <Poptip placement="right" width="400">
              <Button type="info" style="width: 300px" @click="editItemShow = true; nowIndex = index;">
                Edit this Block
              </Button>
              <div class="api" slot="content">
                <AddItem @onOk="editBlock(nowIndex, $event)"></AddItem>
              </div>
              </Poptip>

              <Poptip placement="right" width="400">
              <Button type="error" style="width: 200px" v-on:click="deleteNewBlock(item)">
                Delete this Block
              </Button>
                <div class="api" slot="content">
                  <AddItem @onOk="appendNewBlock(nowIndex, $event)"></AddItem>
                </div>
              </Poptip>

            </div>
            <br>
            <br>
            <!--button end-->

          </Form>

          <!--Modals begin-->
          <!--Modals end-->



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
        form_meta: {}
      }
    },
    created: function() {
      getFormMeta(0).then((response) => {
        this.form_meta = response.data.form_meta;
      })
    },
    mounted: function() {
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
        this.form_meta.items.push(value);
        this.$Message.info('Items appended!');
      },
      prependNewBlock: function(index, value) {
        this.form_meta.items.splice(index, 0, value);
        this.$Message.info('Items prepended!');
      },
      editBlock: function(index, value) {
        this.form_meta.items.splice(index, 1);
        this.form_meta.items.splice(index, 0, value);
        this.$Message.info('Items edited!');
      },
      deleteNewBlock: function(item) {
        let index = this.form_meta.items.indexOf(item);
        this.form_meta.items.splice(index, 1);
        this.$Message.info('Items deleted!');
      },
      submitForm: function() {
        postFormMeta(this.form_meta).then(function(response) {
          console.log(response);
        })
          .catch(function(error) {
            console.log(error);
          });
        this.$Message.info('Items submitted!');
      }
    }
  }
</script>
