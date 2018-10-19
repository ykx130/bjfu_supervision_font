// 动态问卷相关的路由配置
import Main from '_c/main'
import parentView from '@/components/parent-view'

export default
{
  name: '活动',
  path: '/active',
  component: Main,
  meta: {
    icon: 'arrow-graph-up-right',
    title: '活动管理'
  },
  children: [
    {
      name: '教学辅导',
      path: 'manager', // xzl

      component: resolve => require(['Views/ActiveManager/index'], resolve),
      meta: {
        icon: 'arrow-graph-up-right',
        title: '教学辅导'
      },
      children: [{
        path: ':id',
        component: resolve => require(['Views/ActiveDetail/index'], resolve)
      }]
      // component: resolve => require(['Views/FormMetaManager/index'], resolve),
    },
    {
      name: '报名中心',
      path: '/attend',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '报名中心'
      },
      component: resolve => require(['Views/ActiveAttend/index'], resolve)
    }
  ]}
