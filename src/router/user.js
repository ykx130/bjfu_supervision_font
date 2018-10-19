// 动态问卷相关的路由配置
import Main from '_c/main'
import parentView from '@/components/parent-view'

export default{
  name: '用户',
  path: '/user',
  component: Main,
  children: [
    {
      name: '用户管理',
      path: 'guiders', // xzl
      meta: {
      },
      component: resolve => require(['Views/UserManager/index'], resolve)
    },
    {
      name: '督导管理',
      path: 'teachers', // xzl
      meta: {
      },
      component: resolve => require(['Views/UserTeacherManagerList/index'], resolve)
    },
    {
      name: '学院负责人',
      path: 'supers', // xzl
      meta: {
      },
      component: resolve => require(['Views/UserSuperManager/index'], resolve)
    },
    {
      path: 'events/:username', // xzl
      meta: {
        hideInMenu: true
      },
      component: resolve => require(['Views/UserEvents/index'], resolve)
    }
  ]
}
