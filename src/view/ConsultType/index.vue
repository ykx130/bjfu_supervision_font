<template>
 <card>
  <div>
    <h1>咨询类型管理</h1>
    <br>
    <ConsultTypeAddModal
      :show="showConsultTypeAddModal"
      @onOK="onAddModalOK"
      @onCancel="onAddModalCancel"
    ></ConsultTypeAddModal>

    <Table @on-selection-change="selectConsultTypes" border stripe :columns="columns" :data="data"></Table>

    <Button type="primary" @click="()=>{this.showConsultTypeAddModal=true}" >
      新增
    </Button>
    <Button type="error" style="width: 55px" v-on:click="deleteNewBlock(item)">
      删除
    </Button>

  </div>
 </Card>
</template>

<script>
import {queryConsultTypes, getConsultTypes, postConsultTypes, deleteConsultTypes} from '../../service/api/consult'
import ConsultTypeAddModal from './components/ConsultTypeAddModal'
export default {
  components: {ConsultTypeAddModal},
  data: function () {
    return {
      query: {}, // 查询用的参数
      pages: {
        "_per_page":20,
      },
      total: 0, // 总数量
      data: [], // 数据
      terms: [],
      selected_consult_types_ids: [],
      selected_consult_types_id: '', // 选中答复的活动
      showConsultTypeAddModal: false,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '序号',
          render: function (h, params) {
            return (
              <span>{ params.row.id }</span>
            )
          }
        },
        {
          title: '咨询类型名称',
          render: function (h, params) {
            return (
              <span>{ params.row.name }</span>
            )
          }
        }
        // {
        //   title: '操作',
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Button', {
        //         props: {
        //           type: 'primary',
        //           size: 'small'
        //         },
        //         style: {
        //           marginRight: '2px'
        //         },
        //         on: {
        //           click: () => {
        //             this.selected_lesson_id = params.row.id;
        //             this.showLessonProfileModal=true
        //           }
        //         }
        //       }, '查看')
        //     ]);
        //   }
        // }
      ]
    }
  },
  methods: {
     fetchData() {
      // 数据表发生变化请求数据
       let args = {...this.query, ...this.pages}
      queryConsultTypes(args).then((resp) => {
        this.data = resp.data.consult_types
        this.total = resp.data.total
      })
    },
    onAddModalOK (consult_types) {
      // 更新框确定 关闭
      postConsultTypes(consult_types).then((resp) => {
        this.showConsultTypeAddModal = false
        this.fetchData( )
      })
    },
    onAddModalCancel () {
      this.showConsultTypeAddModal = false
    },
    onDeleteClcik: function (item) {
      deleteConsultTypes(item.row.id).then(() => {
        this.fetchData( )
      })
    },
    selectConsultTypes: function () {
      this.selected_consult_types_ids.push()
    }
  },
  mounted: function () {
    queryConsultTypes({...this.query, ...this.pages}).then((resp) => {
      this.data = resp.data.consult_types
      this.total = resp.data.total
    })
  }
}

</script>

<style scoped>

</style>
