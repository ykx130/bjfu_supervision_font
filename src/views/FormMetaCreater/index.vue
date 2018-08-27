<template>
  <!--whole form meta editor begin-->
  <div>
    <!--adjust module start-->
    <!--adjust module end-->

    <!--form meta start-->
    <div>
      <h1>问卷结构</h1>
      <br>
      <Form :model="form_meta" :label-width="100" inline label-position="left">
        <FormItem label="问卷名称：">
          <Input v-model="form_meta.name" placeholder="问卷名称..." style="width: 180px"></Input>
        </FormItem>
        <FormItem label="问卷版本：">
          <Input v-model="form_meta._id" placeholder="问卷辨识符..." style="width: 180px"></Input>
        </FormItem>
      </Form>
    </div>


    <!--form meta end-->

    <!--meta start-->
    <div style="background:#eee;padding: 8px; width: 300px; margin: 8px;">
      <Card :bordered="false">
        <p slot="title">{{ form_meta.meta.create_at }}</p>
        <p>{{ form_meta.meta.guider }}</p>
      </Card>
    </div>

    <!--meta end-->

    <!--form blocks start-->

    <!--items begin-->
    <div>
      <!--single item begin-->

      <!--whole form start-->
      <div style="padding-bottom: 30px;">
        <Form v-for="(item, index) in form_meta.items " :key="item.item_name" label-position="left" label-width="150">

          <div style="border:#eee solid 5px; padding:10px; width: 600px;">
            <!--information begin-->

            <!--if sub_title_block_start begin-->
            <div v-if="item.item_type === 'sub_title_block_start' ">
              <h3> {{ }} </h3>
            </div>
            <!--if sub_title_block_start end-->

            <!--if raw_text begin-->
            <div v-if="item.item_type === 'raw_text' ">
              <h3>文本项</h3>
              <Form :model="item" :label-width="80" inline>
                <FormItem label="名称">
                  <Input v-model="item.item_name" placeholder="表头名称..." style="width: 180px"></Input>
                </FormItem>
              </Form>
            </div>
            <!--if raw_text end-->

            <!--if radio_option start-->
            <div v-if="item.item_type === 'radio_option' ">
              <h3>单选项</h3>
              <Form :model="item" :label-width="80" inline>
                <FormItem label="名称">
                  <Input v-model="item.item_name" placeholder="表头名称..." style="width: 180px"></Input>
                </FormItem>
                <FormItem label="单选项">
                  <RadioGroup>
                    <Radio v-for="option in item.payload.options" :label="option.label" :key="option.value">
                      <span v-model="option.value">{{ option.value }}</span>
                    </Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem v-if="item.payload.weight" label="权重">
                  <Input v-model="item.payload.weight" placeholder="权重..." style="width: 180px"></Input>
                </FormItem>
              </Form>
            </div>
            <!--if radio_option end-->

            <!--if checkbox_option start-->
            <div v-if="item.item_type === 'checkbox_option' ">
              <h3>多选项</h3>
              <Form :model="item" :label-width="80" inline>
                <FormItem label="名称">
                  <Input v-model="item.item_name" placeholder="表头名称..." style="width: 180px"></Input>
                </FormItem>
                <FormItem label="多选项">
                  <CheckboxGroup>
                    <Checkbox v-for="option in item.payload.options" :label="option.label" :key="option.value">
                      <span v-model="option.value">{{ option.value }}</span>
                    </Checkbox>
                  </CheckboxGroup>
                </FormItem>
                <FormItem v-if="item.payload.weight" label="权重">
                  <Input v-model="item.payload.weight" placeholder="权重..." style="width: 180px"></Input>
                </FormItem>
              </Form>
            </div>
            <!--if checkbox_option end-->

            <!--sub_title_block_end begin-->
            <div v-if="item.item_type === 'sub_title_block_end' ">
              <h3> end </h3>
            </div>
            <!--sub_title_block_end end-->

            <!--information end-->

            <!--button begin-->

            <div v-if="item.item_type === 'raw_text' || item.item_type === 'radio_option' || item.item_type === 'checkbox_option' ">
              <Poptip placement="right" width="400">
                <Button style="width: 220px;" @click="nowIndex = index;">
                  插入题目
                </Button>
                <div class="api" slot="content">
                  <AddItem @onOk="prependNewBlock(nowIndex, $event);"></AddItem>
                </div>
              </Poptip>

              <Poptip placement="right" width="400">
                <Button type="info" style="width: 220px" @click="nowIndex = index;">
                  编辑
                </Button>
                <div class="api" slot="content">
                  <AddItem @onOk="editBlock(nowIndex, $event)"></AddItem>
                </div>
              </Poptip>

              <Button type="error" style="width: 120px" v-on:click="deleteNewBlock(item)">
                删除
              </Button>
            </div>

            <br>
            <br>

            <!--button end-->
          </div>

        </Form>

        <br>
      </div>
      <!--whole form end-->

      <!--Modals begin-->
      <!--Modals end-->




      <!--single item end-->

      <div>
        <Affix :offset-bottom="20">
          <Poptip placement="right" width="300">
            <Button style="width: 300px">
              追加题目
            </Button>
            <div class="api" slot="content">
              <AddItem @onOk="appendNewBlock($event)"></AddItem>
            </div>
          </Poptip>
          <Button type="primary" @click="submitForm" style="width: 300px">点击提交</Button>
        </Affix>
      </div>

    </div>
    <!--items end-->
    <!--back to top start-->

    <div>
      <BackTop style="padding: 2px;
        color: #fff;
        text-align: center;
        border-radius: 3px;">
      </BackTop>
    </div>

    <!--back to top end-->
    <!--form blocks end-->
  </div>

  <!--whole form meta editor end-->
</template>


<script>
  import {
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
          meta : {

          },
          items: {

          }
        }
      }
    },
    mounted: function () {

    },
    methods: {
      ok() {
        this.$Message.info('Clicked ok');
      },
      cancel() {
        this.$Message.info('Clicked cancel');
      },
      appendNewBlock: function (value) {
        console.log(value);
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
        this.$Message.info('Items created!');
      }
    }
  }

</script>
