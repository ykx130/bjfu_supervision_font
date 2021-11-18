<template>
  <div>
    <Modal
      :value="show"
      title="培训模块列表"
      @on-ok="handleOK"
      @on-cancel="handleCancel"
      width="35%">
      <Button type="primary" @click="showAddModule=true" style="margin-bottom: 20px">增加</Button>
      <Table border stripe :columns="columns" :data="tableData" width="400" size="small">
        <template slot-scope="{ row, index }" slot="module">
          <Input type="text" v-model="editModule" v-if="editIndex === index" />
          <span v-else>{{ row.module }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Button @click="handleSave(row,index)" type="primary" size="small" style="margin-right: 15px">保存</Button>
            <Button @click="editIndex = -1" type="warning" size="small">取消</Button>
          </div>
          <div v-else>
            <Button @click="handleEdit(row, index)" type="primary" size="small">修改</Button>
            <Button @click="handleDelete(row, index)" type="error" size="small" style="margin-left: 15px">删除</Button>
          </div>

        </template>
      </Table>
      <AddActivityModule
      :show="showAddModule"
      @onOK="onActivityModuleAddOK"
      @onCancel="onActivityModuleAddCancel">

      </AddActivityModule>
    </Modal>
  </div>
</template>

<script>
import {
  deleteActivityModule,
  insertActivityModule,
  putActivityModule,
  queryActivityModules
} from "@/service/api/actives";
import AddActivityModule from "Views/DevelopTrainManage/components/AddActivityModule";

export default {
  name: "ActivityModuleModal",
  components: {AddActivityModule},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    onCancel: Function,
    onOK: Function
  },
  data () {
    return {
      tableData: [],
      total: 0,
      editIndex: -1,  // 当前聚焦的输入框的行数
      editModule: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      query: {
        module: ''
      },
      pages: {
        _page: 1,
        _per_page: 100,
      }, // 分页
      showAddModule: false,

      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '模块名称',
          align: 'center',
          width: 200,
          slot: 'module'
        },

        {
          title: '操作',
          align: 'center',
          slot: 'action'
        }
      ],
    }
  },
  methods: {
    onActivityModuleAddOK(data) {
      insertActivityModule(data).then(res=>{
        if( res.data.code === 200){
          this.$Message.success('添加成功')
          this.fetchData()
        }else {
          this.$Message.error('添加失败')
        }
      })
      this.showAddModule = false
    },
    onActivityModuleAddCancel () {
      this.showAddModule = false
    },
    handleOK () {
      this.$emit('onOK')
    },
    handleCancel () {
      this.$emit('onCancel')
    },
    handleEdit (row, index) {
      this.editModule = row.module;
      this.editIndex = index;
    },
    handleSave (row,index) {
      this.tableData[index].module = this.editModule;
      putActivityModule(row.id, { 'module': this.editModule }).then((Resp) => {
        if (Resp.data.code === 200) {
          this.$Message.success({ content: '修改成功' })
          this.fetchData()
        } else {
          this.$Message.error('修改失败')
        }
      })
      this.editIndex = -1;
    },

    handleDelete(row, index){
      deleteActivityModule(row.id).then((res=>{
        if(res.data.code === 200){
          this.$Message.success('删除成功')
          this.fetchData()
        }else {
          this.$Message.error('删除失败')
        }
      }))
    },

    fetchData(){
      queryActivityModules({...this.query, ...this.pages}).then(res=>{
        this.tableData = res.data.activity_modules
        this.total = res.data.total
      })

    }
  },
  mounted() {
    this.fetchData()
  }

}
</script>

<style scoped>

</style>
