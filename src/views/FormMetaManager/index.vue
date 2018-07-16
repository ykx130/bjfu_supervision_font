<template>
  <h1>问卷结构管理</h1>
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
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          }
        ],
        data1: []
      }
    },
    mounted () {
      getAllFormMetas().then((resp)=>{
        this.data1 = resp.data.form_metas
      })
    }
  }
</script>
