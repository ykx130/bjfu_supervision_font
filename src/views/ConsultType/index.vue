<template>
  <div>
    <h1>咨询类型管理</h1>
    <br>
    <ConsultTypeAddModal
      :show="showConsultTypeAddModal"
      @onOK="onAddModalOK"
      @onCancel="onAddModalCancel"
    ></ConsultTypeAddModal>

    <Table border stripe :columns="columns" :data="data"></Table>

    <Button type="primary" @click="()=>{this.showConsultTypeAddModal=true}" >
      新增
    </Button>
  </div>
</template>

<script>
  import {queryConsult_types, getConsult_types,postConsult_types } from '../../service/api/consult'
  import ConsultTypeAddModal from './components/ConsultTypeAddModal'
  export default {
      components:{ConsultTypeAddModal},
      data: function() {
        return {
          query: {}, // 查询用的参数
          total: 0, // 总数量
          data: [], //数据
          terms: [],
          selected_consult_types_ids: [],
          selected_consult_types_id:"", //选中答复的活动
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
            },
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
        onTableChange(query, pages) {
          //数据表发生变化请求数据
          let args = {...query, ...pages};
        },
        onAddModalOK(consult_types) {
          // 更新框确定 关闭
          postConsult_types(consult_types).then((resp)=>{
            this.showConsultTypeAddModal = false
            this.onTableChange(this.query, this.pages)
          })
        },
        onAddModalCancel() {
          this.showConsultTypeAddModal = false
        }
      },
      mounted: function () {
        const args = this.$route.query;
        queryConsult_types(args).then((resp)=>{
          this.data = resp.data.consult_types;
          this.total = resp.data.total;
        })
      }
    }

</script>

<style scoped>

</style>
