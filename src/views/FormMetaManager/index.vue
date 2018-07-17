<template>
  <Table border :columns="columns1" :data="data1"></Table>
</template>
<script>
  import { getAllFormMetas } from '../../service/api/dqs'
  export default {
    data () {
      return {
        columns1: [
          {
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            render: function (h,params) {
              return (<span>{params.row.data.age}</span>)
            }
          }
        ],
        data1: [{
          name: "su",
          data: {
            age:"12"
          }
        }]
      }
    },
    mounted () {
    }
  }
</script>
