<template>
  <Card>
    <Tabs :value="selected_group_name" @on-click="onTypeTabClick">
      <TabPane v-for="(item, index) in groups" :label="item.name" :name="item.name" :key="item.name + index"></TabPane>
    </Tabs>

    <template v-if="selected_group_name==='第一组'">
      <first-group></first-group>
    </template>
    <template v-else-if="selected_group_name==='第二组'">
      <second-group></second-group>
    </template>
  </Card>
</template>

<script>
  import {queryGroupLesson, putLesson} from '../../service/api/lesson'
  import {queryGroups} from '../../service/api/user'
  import  FloatBar from '../../components/float_bar/float_bar'
  import firstGroup from './components/firstGroup'
  import secondGroup from './components/secondGroup'


  export default {
    components:{
      firstGroup,
      secondGroup
    },
    data: function() {
      return {
        total: 0, // 总数量
        data: [], //数据
        groups:[],
        selected_group_name: ''
      }
    },
    methods: {
      onTableChange(query, pages) {
        //数据表发生变化请求数据
        let args = {...query, ...pages};
        queryGroupLesson(args).then((resp)=>{
          this.data = resp.data.lesson_records;
          this.total = resp.data.total;
        })
      },
      onTypeTabClick: function (name) {
        // 切换标签触发
        this.selected_group_name = name;
        this.onTableChange(this.query, this.pages)
      }
    },
    mounted: function() {
      queryGroups().then((resp)=>{
        this.groups = resp.data.groups;
        this.selected_group_name = this.groups[0].name;
      })
    }
  }
</script>

<style scoped>

</style>
