<template>
    <Modal
            :value="show"
            title="编辑页面名"
            @on-ok="handleOK"
            @on-cancel="handleCancel"
    >
    <Form :label-width="60" style="width: 400px">
        <FormItem label="页面名:">
            <Row>
                <Col span="18">
                    <Input v-model="page" placeholder="输入当前页面的名字"></Input>
                </Col>
            </Row>
        </FormItem>
    </Form>
    </Modal>
</template>

<script>
    export default {
        name: "add_page",
        props: {
            show: Boolean
        },
        data () {
            return {
                page:'',
                // item_page: {
                //     // title:'',
                //     // name:''
                //     type: 'page_item',
                //     item_type: 'add_page',
                //     payload: {
                //         page: ''
                //     }
                // },
                selected: '',
                props: {
                    onOk: Function,
                    onCancel: Function
                }
            }
        },

        methods: {
            handleOK: function () {
                this.selected = ''
                this.$emit('onOk', this.page)
                // console.log(this.item_page.payload.page)
            },
            handleCancel: function () {
                this.selected = ''
                this.$emit('onCancel')
            },
            select: function (value) {
                this.selected = value
            }
        }
    }
</script>

<style scoped>

</style>