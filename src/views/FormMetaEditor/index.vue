<template>
  <h1>这是问卷编辑</h1>
</template>
<script>
  import { getAllFormMetas, getFormMeta } from '../../service/api/dqs'
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
        data1: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          }
        ]
      }
    },
    mounted () {

    }
  }
</script>
