// 动态问卷相关的路由配置
import Main from '_c/main'
import parentView from '@/components/parent-view'

export default
{
  name: '活动',
  path: '/active',
  component: Main,
  meta: {
    icon: 'ios-outlet',
    title: '活动中心'
  },
  children: [
    {
      name: '教学辅导',
      path: 'manager', // xzl
      component: resolve => require(['Views/ActiveManager/index'], resolve),
      meta: {
        title: '教学辅导'
      },
      children: []
      // component: resolve => require(['Views/FormMetaManager/index'], resolve),
    },
    {
      name: '教学详情',
      meta: {
        hideInMenu: true,
        notCache: true,
        title: '教学详情'
      },
      path: 'detail/:id',
      component: resolve => require(['Views/ActiveDetail/index'], resolve)
    },
    {
      name: '报名中心',
      path: 'attend',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '报名中心'
      },
      component: resolve => require(['Views/ActiveAttend/index'], resolve)
    }
  ]}
