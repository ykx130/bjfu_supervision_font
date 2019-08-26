<template>
  <!--whole form meta editor begin-->
    <div>
      <!--adjust module start-->
      <!--adjust module end-->
      <!--dragging start-->

      <!--dragging end-->
      <!--form meta start-->
      <div id="form-header">
        <br>
        <Form ref="meta_form" :model="value" type="text" :label-width="100" inline label-position="left">
          <FormItem label="问卷名称：" required  prop="name">
            <Input v-model="value.name" placeholder="问卷名称..." style="width: 180px" ></Input>
          </FormItem>
        </Form>
      </div>

      <!--form meta end-->

      <!--meta start-->
      <div id="form-detail">
        <Card :bordered="false">
          <p slot="title">{{ value.meta.create_at }}</p >
          <p>{{ value.meta.guider }}</p >
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


          <draggable v-model="value.items" style="padding-bottom: 30px; width: 100%;" @update="onMoveEnd">
              <Tabs v-model="current_page">
                  <TabPane v-for="(item,idx) in  pages" :label="item" :name="item" :key="item"></TabPane>
              </Tabs>


            <Form class="form-card-form" v-for="(item, index) in value.items " :key="item.item_name" label-position="left" label-width="150" >
              <div class="form-card-form-option">
                <!--information begin-->
                <!--if sub_title_block_start begin-->
                <div v-if="item.item_type === 'sub_title_block' && item.payload.page === current_page ">
                  <div v-if="item.item_name === 'sub_title_block_start'"><h3> {{ item.payload.title }} </h3></div>
                  <div v-if="item.item_name === 'sub_title_block_end' ">
                    __end__


                  </div>
                </div>

                <!--if sub_title_block_start end-->

                <!--if raw_text begin-->
                <div v-if="item.item_type === 'raw_text'&& item.payload.page === current_page ">
                  <h3 class=  "option-title">文本项</h3>
                    <FormItem label="名称">
                      <Input v-model="item.item_name" placeholder="表头名称..." style="width: 180px"></Input>
                    </FormItem>
                    <div>
                        <Button @click="nowIndex = index; item_edit_visible = true" class="option-button-edit">编辑</Button>
                        <Button icon="md-trash" type="warning" v-on:click="deleteNewBlock(item)" class="option-button-del" shape="circle"></Button>
                    </div>
                </div>
                <!--if raw_text end-->

                <!--if radio_option start-->
                <div v-if="item.item_type === 'radio_option' && item.payload.page === current_page">
                  <h3 class="option-title">单选项</h3>
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
                    <div>
                        <Button @click="nowIndex = index; item_edit_visible = true" class="option-button-edit">编辑</Button>
                        <Button icon="md-trash" type="warning" v-on:click="deleteNewBlock(item)" class="option-button-del" shape="circle"></Button>
                    </div>
                </div>
                <!--if radio_option end-->

                <!--if checkbox_option start-->
                <div v-if="item.item_type === 'checkbox_option' && item.payload.page === current_page">
                  <h3 class="option-title">多选项</h3>
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
                    <div>
                        <Button @click="nowIndex = index; item_edit_visible = true" class="option-button-edit">编辑</Button>
                        <Button icon="md-trash" type="warning" v-on:click="deleteNewBlock(item)" class="option-button-del" shape="circle"></Button>
                    </div>
                </div>
                <!--if checkbox_option end-->

                <!--sub_title_block_end begin-->

                <!--sub_title_block_end end-->

                <!--information end-->

                <!--button begin-->


                <!--button end-->

              </div>

              <Divider />

            </Form>
            <Button style='position: absolute;right:24px;top:22px;' @click="page_visible=true"> + </Button>

          </draggable>
          <div>
            <Button class="form-buttons" @click="block_visible = true">追加样式</Button>
            <Button class="form-buttons" @click="item_visible = true">追加题目</Button>
            <Button type="primary" @click="submitForm()" class="form-buttons">点击提交</Button>
          </div>
          <!--Modal start-->
          <AddItem :show="item_visible" @onOk="appendNewItemBlock" @onCancel="()=>{this.item_visible=false}"></AddItem>

          <AddItem :show="item_edit_visible" @onOk="editItemBlock(nowIndex)" @onCancel="()=>{this.item_edit_visible=false}"></AddItem>
          <!--Modal end-->

          <AddBlock :show="block_visible" @onOk="appendNewBlockBlock" @onCancel="()=>{this.block_visible=false}" ></AddBlock>
          <AddBlock :show="block_edit_visible" @onOk="editBlockBlock(nowIndex, $event)" @onCancel="()=>{this.block_edit_visible=false}" ></AddBlock>
          <AddPage :show="page_visible"@onOk="appemdNewpage"@onCancel="()=>{this.page_visible=false}" ></AddPage>
<!--          <AddPage :show="page_edit_visible"@onCancel="()=>{this.page_edit_visible=false}"></AddPage>-->
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

  <!--whole form meta editor end-->
</template>

<script>
import {
  postFormMeta
} from '@/service/api/dqs'
import AddItem from './components/add_item'
import AddBlock from './components/add_block'
import AddPage from './components/add_page'

import draggable from 'vuedraggable'
export default {
  name: 'form_meta_editor',
  components: {
    AddPage,
    AddItem,
    draggable,
    AddBlock
  },
  props: {
    value: Object
  },
  watch: {
    value: {
      deep: true,
      handler: function () {
        this.$emit('input', this.value)
      }
    }
  },
  data () {
    return {
      item_visible: false,
      item_edit_visible: false,
      block_visible: false,
      block_edit_visible: false,
      page_visible:false,
      page_edit_visible:false,
      nowIndex: 0,
      pages:[],
      current_page:'',
    }
  },
  methods: {
    validateItem: function () {
      let stack = []
      for (let i in this.value.items) {
        if (this.value.items[i].type === 'block_item') {
          if (stack.length === 0) {
            // 空栈直接push
            stack.push(this.value.items[i])
          } else {
            // 非空栈查看第一个元素看是否可以归约
            if (stack[stack.length - 1].item_type === this.value.items[i].item_type) {
              // 相同类型
              if (this.value.items[i].item_name.endsWith('start')) {
                // 开始  不归约
                stack.push(this.value.items[i])
              } else {
                // end 规约
                stack.pop()
              }
            }
          }
        }
      }
      if (stack.length === 0) {
        return true
      } else {
        this.$Message.error('移动失败')
        return false
      }
    },
    onMoveEnd: function (evt) {
      console.log('拖动前的索引 :' + evt.oldIndex)
      console.log('拖动后的索引 :' + evt.newIndex)
      if (!this.validateItem()) {
        let v = this.value.items[evt.oldIndex]
        this.$set(this.value.items, evt.oldIndex, this.value.items[evt.newIndex])
        this.$set(this.value.items, evt.newIndex, v)
      }
    },
    appendNewItemBlock: function (value) {
      console.log(value)
      value.payload.page = this.current_page
      this.value.current_page.push(value)
      this.$Message.info('current_page appended!!!')
      this.item_visible = false
    },
    editItemBlock: function (index, value) {
      this.value.items.splice(index, 1)
      this.value.items.splice(index, 0, value)
      this.$Message.info('Items edited!')
      this.item_visible = false
    },
    deleteNewBlock: function (item) {
      let index = this.value.items.indexOf(item)
      this.value.items.splice(index, 1)
      this.$Message.info('Items deleted!')
    },
    appendNewBlockBlock: function (items) {
      this.value.items.push(items[0])
      this.value.items.push(items[1])
      value.payload.page = this.current_page
      this.$Message.info('Items appended!')
      this.block_visible = false
    },
    editBlockBlock: function (index, value) {

    },
    appemdNewpage:function(page) {

        this.pages.push(page);
        // this.Pages.splice(pages,-1
        this.page_visible=false;
    },
    submitForm: function () {
      this.$refs.meta_form.validate((vaild) => {
        if (vaild) {
          this.$emit('onSubmitClick')
        } else {
          this.$Message.warning('填写完整信息')
        }
      })
    },

    removeTab(targetName) {
     this.pages.pop()
    }

  },
  mounted: function () {
    this.value.version = 'default'
  }


  // addTab(targetName) {
  //   let newTabName = ++this.tabIndex + '';
  //   this.editableTabs.push({
  //     title: 'New Tab',
  //     name: newTabName,
  //     content: 'New Tab content'
  //   });
  //   this.editableTabsValue = newTabName;
  // },
  // removeTab(targetName) {
  //   let tabs = this.editableTabs;
  //   let activeName = this.editableTabsValue;
  //   if (activeName === targetName) {
  //     tabs.forEach((tab, index) => {
  //       if (tab.name === targetName) {
  //         let nextTab = tabs[index + 1] || tabs[index - 1];
  //         if (nextTab) {
  //           activeName = nextTab.name;
  //         }
  //       }
  //     });
  //   }
  //
  //   this.editableTabsValue = activeName;
  //   this.editableTabs = tabs.filter(tab => tab.name !== targetName);
  // }

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
