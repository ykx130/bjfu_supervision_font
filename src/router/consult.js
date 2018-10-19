// 动态问卷相关的路由配置
import Main from '_c/main'
import parentView from '@/components/parent-view'

export default
{
  name: '咨询',
  path: '/consult',
  meta: {
    icon: 'arrow-graph-up-right',
    title: '咨询'
  },
  component: Main, // 一级目录必须使用Main组件作为component
  children: [
    {
      name: '咨询管理',
      path: 'manager', // xzl
      meta: {
        icon: 'arrow-graph-up-right',
        title: '咨询管理'
      },
      // component: resolve => require(['Views/FormMetaManager/index'], resolve),
      component: resolve => require(['Views/ConsultManager/index'], resolve)
    },
    {
      name: '咨询类型管理',
      path: 'type', // xzl
      meta: {
        icon: 'arrow-graph-up-right',
        title: '咨询类型管理'
      },
      component: resolve => require(['Views/ConsultType/index'], resolve)
    },
    {
      name: '咨询申请',
      path: 'apply', // xzl
      meta: {
        icon: 'arrow-graph-up-right',
        title: '咨询申请'
      },
      component: resolve => require(['Views/ConsultApply/index'], resolve)
    }
  ]}
