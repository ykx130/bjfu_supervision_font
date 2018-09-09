<template>
  <!--whole form meta editor begin-->
  <Card>
    <div>
      <!--adjust module start-->
      <!--adjust module end-->
      <!--dragging start-->

      <!--dragging end-->
      <!--form meta start-->
      <div id="form-header">
        <div>
          <h1>问卷结构</h1>
        </div>
        <br>
        <Form :model="form_meta" :label-width="100" inline label-position="left">
          <FormItem label="问卷名称：">
            <Input v-model="form_meta.name" placeholder="问卷名称..." style="width: 180px"></Input>
          </FormItem>
          <FormItem label="问卷版本：">
            <Input v-model="form_meta.version" placeholder="问卷辨识符..." style="width: 180px"></Input>
          </FormItem>
        </Form>
      </div>




      <!--form meta end-->

      <!--meta start-->
      <div id="form-detail">
        <Card :bordered="false">
          <p slot="title">{{ form_meta.meta.create_at }}</p>
          <p>{{ form_meta.meta.guider }}</p>
        </Card>
      </div>

      <!--meta end-->

      <Divider orientation="left">问卷题目</Divider>

      <!--form blocks start-->

      <!--items begin-->
      <div>
        <!--single item begin-->

        <!--card begin-->
        <Card id="form-card">
          <draggable v-model="form_meta.items" style="padding-bottom: 30px; width: 100%;" @start="drag=true" @end="drag=false">
            <Form class="form-card-form" v-for="(item, index) in form_meta.items " :key="item.item_name" label-position="left" label-width="150">
              <div class="form-card-form-option">
                <!--information begin-->
                <!--if sub_title_block_start begin-->
                <div v-if="item.item_type === 'sub_title_block_start' ">
                  <h3> {{ }} </h3>
                </div>
                <!--if sub_title_block_start end-->

                <!--if raw_text begin-->
                <div v-if="item.item_type === 'raw_text' ">
                  <h3 class="option-title">文本项</h3>
                  <Form :model="item" :label-width="80" inline class="option-form">
                    <FormItem label="名称">
                      <Input v-model="item.item_name" placeholder="表头名称..." style="width: 180px"></Input>
                    </FormItem>
                  </Form>
                </div>
                <!--if raw_text end-->

                <!--if radio_option start-->
                <div v-if="item.item_type === 'radio_option' ">
                  <h3 class="option-title">单选项</h3>
                  <Form :model="item" :label-width="80" inline class="option-form">
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
                  <h3 class="option-title">多选项</h3>
                  <Form :model="item" :label-width="80" inline class="option-form">
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
                  <Button @click="nowIndex = index; visible_e = true" class="option-button-edit">编辑</Button>
                  <Button icon="md-trash" type="warning" v-on:click="deleteNewBlock(item)" class="option-button-del" shape="circle"></Button>
                </div>
                <!--button end-->

              </div>

              <Divider />

            </Form>
          </draggable>
          <div>
            <Button class="form-buttons" @click="visible = true">追加题目</Button>
            <Button type="primary" @click="submitForm()" class="form-buttons">点击提交</Button>
          </div>
          <!--Modal start-->
            <AddItem :show="visible" @onOk="appendNewBlock($event)" @onCancel="()=>{this.visible=false}"></AddItem>

            <AddItem :show="visible_e" @onOk="editBlock(nowIndex, $event)" @onCancel="()=>{this.visible_e=false}"></AddItem>
          <!--Modal end-->

        </Card>


        <!--card end-->
        <!--whole form start-->
        <!--whole form end-->

        <!--Modals begin-->
        <!--Modals end-->




        <!--single item end-->



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
  </Card>

  <!--whole form meta editor end-->
</template>


<script>
  import {
    postFormMeta
  } from '../../service/api/dqs'
  import AddItem from './components/add_item'
  import draggable from 'vuedraggable'
  export default {
    name: 'form_meta_editor',
    components: {
      AddItem,
      draggable
    },
    data() {
      return {
        visible: false,
        visible_e: false,
        nowIndex: 0,
        form_meta: {
          "meta": {
          },
          "items": [
          ]
        }
      }
    },
    mounted: function () {
      // const args = this.$route.params;
      // if (args.name) {
      //   getFormMeta(args).then((response) => {
      //     this.form_meta = response.data.form_meta;
      //   })
      // }
    },
    methods: {
      close () {
        this.visible = false;
      },
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
        this.visible = false
      },
      editBlock: function (index, value) {
        this.form_meta.items.splice(index, 1);
        this.form_meta.items.splice(index, 0, value);
        this.$Message.info('Items edited!');
        this.visible = false
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

<style scoped lang="less">


  #form-header {
    text-align: center;
  };

  #form-detail {
    border-radius: 10px;
    background: #00a3cc;
    padding: 2px;
    width: 30%;
    margin: 0 auto;
  };

  #form-card {
    border: #eff5f5 solid 2px;
    border-radius: 10px;
    padding:10px;
    width: 60%;
    margin: 0 auto;
    .form-card-form {
      padding: 10px;
      .form-card-form-option {
        .option-button-edit {
          width: 30%;
          height: 35px;
        }
        .option-button-del {
          background-color: #ff9999;
          float: right;
        }
        .option-title {
          margin-left: 15px;
          margin-top: 15px;
        }
        .option-form {
          margin-left: 30px;
          margin-top: 30px;
        }
      }
    };
    .form-buttons {
      width: 30%;
      height: 60px;
    }
  };

  .form-button-submit {

  };

  .form-button-add {

  };

</style>
