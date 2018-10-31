<template xmlns="http://www.w3.org/1999/html">
  <div>
    <Card>
      <Row>
        <Col span="6">
        <span>
          问卷名字:
              <Select v-model="query.meta" style="width:200px" @on-change="onMetaChange">
                <Option v-for="item in metas" :value="item.name" :key="item.name+item.version">{{ item.name }}</Option>
            </Select>
        </span>
        </Col>
      </Row>
    </Card>
    <div style="padding-top: 30px"></div>
    <Card>
      <Row>
        <Col span="24" v-for="option in options">
          <div align="center">
            <ChartBar style="height: 260px;" :value="option.data" :text="option.title"></ChartBar>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <div align="center">
            <ChartWord style="height: 260px;" :text="'词云'"></ChartWord>
          </div>
        </Col>
      </Row>
    </Card>

  </div>

</template>
<script>
  import {getGraph} from '../../service/api/dqs'
  import {ChartBar,ChartWord} from '_c/charts'
  import {queryFormMetas} from '@/service/api/dqs'

  export default {
    components: {ChartBar, ChartWord},
    data: function () {
      return {
        options: [],
        data: [],
        query: {},
        metas: [],
      }
    },
    mounted() {
    queryFormMetas().then((resp) => {
    this.metas = resp.data.form_metas
    this.query.meta = this.metas[0].name
    getGraph(this.query).then((resp) => {
      this.data = resp.data.item_map
      this.options = this.data.map(function (item) {
        let graphItem = {
          data: {}
        }
        for (let index in item.point) {
          graphItem.data[item.point[index].option.value] = item.point[index].num
        }
        graphItem.title = item.item_name
        return graphItem
      })
    })
  })

  // queryTerms().then((resp) => {
  //   this.terms = resp.data.terms
  // })
  //
  // getCurrentTerms().then((resp) =>{
  //   this.query.term = resp.data.term.name
  // })
  },
  methods: {
    onMetaChange: function () {
      getGraph(this.query).then((resp) => {
        this.data = resp.data.item_map
        this.options = this.data.map(function (item) {
          let graphItem = {
            data: {}
          }
          for (let index in item.point) {
            graphItem.data[item.point[index].option.value] = item.point[index].num
          }
          graphItem.title = item.item_name
          return graphItem
        })
      })
    }
  }
  }
</script>

<style scoped>

</style>
