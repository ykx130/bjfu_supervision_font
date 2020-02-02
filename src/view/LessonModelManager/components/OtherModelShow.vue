<template>
    <modal
            :value="show"
            title="未开课好评课名单"
            @on-closed="CloseTable"
            :closable="false"
            width="600px"
    >
        <Table  border stripe :columns="columns" :data="data"></Table>
        <Row >
            <Page  style="float: right;" :total="total" show-total :page-size="pages._per_page" :current="pages._page" @on-change="onPageChange"></Page>
        </Row>
        <div slot="footer">
            <Button type="primary" size="large"  @click="CloseTable">关闭</Button>
        </div>
    </modal>


</template>

<script>
    import { queryOtherModelLessons} from '@/service/api/lesson'
    export default {
        name: "OtherModelShow",
        props: {
            show: Boolean,
            onClosed:Function
        },
        data : function(){
            return{
                data: [],
                total :0,
                pages: {
                    _page: 1,
                    _per_page: 10
                }, // 分页
                columns: [
                    // {
                    //     type: 'expand',
                    //     title: '未开课好评课名单',
                    //     width: 70,
                    //     render: (h, params) => {
                    //         return h(ModelJudge, {
                    //             props: {
                    //                 lesson_id: params.row.lesson_id
                    //             }
                    //         })
                    //     }
                    // },
                    {
                        title: '课程名字',
                        render: function (h, params) {
                            return (
                                <span>{ params.row.lesson_name }</span>
                        )
                        }
                    },

                    {
                        title: '课程属性',
                        render: function (h, params) {
                            return (
                                <span>{ params.row.lesson_attribute }</span>
                        )
                        }
                    },
                    {
                        title: '上课教师',
                        render: function (h, params) {
                            return h('span', params.row.lesson_teacher_name)
                        }
                    },
                    {
                        title: '上课学院',
                        render: function (h, params) {
                            return h('span', params.row.unit)
                        }
                    },

                    {
                        title: '分配组别',
                        render: function (h, params) {
                            return (
                                <span>{ params.row.group_name }</span>
                        )
                        }
                    },
                    {
                        title: '开课学期',
                        render: function (h, params) {
                            return (
                                <span>{ params.row.term }</span>
                        )
                        }
                    },

                ]
            }

        },
        methods:{
            fetchData () {
                // 数据表发生变化请求数据
                return queryOtherModelLessons(this.pages).then((resp) => {
                    this.data = resp.data.other_model_lessons
                    this.total = resp.data.total
                })
            },
            CloseTable:function(){
                this.$emit('onClosed')
            },
            onPageChange (page) {
                // 分页变化
                this.pages._page = page
                this.fetchData()
            }
        },
        mounted: function () {
            this.fetchData()
        }
    }
</script>

<style scoped>

</style>