import Vue from 'vue'

GLOBAL.vbus = new Vue()

// import 'Components'// 全局组件注册
import 'Directives' // 指令

// 引入插件
import router from 'Plugins/router'
import inject from 'Plugins/inject'
import store from 'Plugins/store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import echarts from 'echarts'

// 引入根组件
import App from './App'

Vue.use(inject)
Vue.use(iView);
GLOBAL.vbus = new Vue()
// render
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
Vue.prototype.$echarts = echarts
