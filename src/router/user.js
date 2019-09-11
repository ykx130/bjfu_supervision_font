// 动态问卷相关的路由配置
import Main from '_c/main'
import parentView from '@/components/parent-view'

export default{
  name: '用户',
  path: '/user',
  component: Main,
  meta: {
    icon: 'md-people',
    title: '用户中心'
  },
  children: [
    {
      name: '用户管理',
      path: 'guiders', // xzl
      meta: {
        access: ['管理员', '学院领导']
      },
      component: resolve => require(['Views/UserManager/index'], resolve)
    },
    {
      name: '督导用户列表',
      path: 'teachers', // xzl
      meta: {
        access: ['管理员', '大组长', '小组长']
      },
      component: resolve => require(['Views/UserTeacherManagerList/index'], resolve)
    },
    {
      name: '学院负责人',
      path: 'supers', // xzl
      meta: {
        access: ['管理员']
      },
      component: resolve => require(['Views/UserSuperManager/index'], resolve)
    },
    {
      path: 'events/:username', // xzl
      name: '用户大事件',
      meta: {
        hideInMenu: true
      },
      component: resolve => require(['Views/UserEvents/index'], resolve)
    },
    {
      path: 'profile/:username', // xzl
      name: '用户详情页',
      meta: {
        hideInMenu: true
      },
      component: resolve => require(['Views/Profile/index'], resolve)
    }
  ]
}
