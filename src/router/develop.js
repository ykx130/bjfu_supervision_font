// 动态问卷相关的路由配置
import Main from '_c/main'
import parentView from '@/components/parent-view'

export default
{
  name: '发展',
  path: '/develop',
  component: Main,
  meta: {
    icon: 'ios-outlet',
    title: '发展中心',
    access: ['管理员','校级管理员','教发管理员']
  },
  children: [
    {
      name: '培训管理',
      path: 'manage', // xzl
      component: resolve => require(['Views/DevelopTrainManage/index'], resolve),
      meta: {
        title: '培训管理'
      },
      children: []
      // component: resolve => require(['Views/FormMetaManager/index'], resolve),
    },
    {
      name: '培训信息',
      meta: {
        hideInMenu: true,
        notCache: true,
        title: '培训信息'
      },
      path: 'detaill/:id',
      component: resolve => require(['Views/DevelopTrainDetail/index'], resolve)
    },
    {
      name: '教师发展详情',
      path: 'teacherdevelopdetail',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '教师发展详情'
      },
      component: resolve => require(['Views/TeacherDevelopDetail/index'], resolve)
    },

  ] }
