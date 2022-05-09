// 动态问卷相关的路由配置
import Main from '_c/main'
import parentView from '@/components/parent-view'

export default{
  name: '问卷',
  path: '/dqs',
  meta: {
    icon: 'ios-book',
    title: '评价体系',
    // access: ['管理员','大组长','小组长','校级管理员','学院领导'],
    access: ['管理员','校级管理员'],
  },
  component: Main,
  children: [
    {
      name: '问卷结构管理',
      path: 'meta_manager', // xzl
      meta: {
        icon: 'arrow-graph-up-right',
        title: '评价体系管理',
        access: ['管理员','校级管理员']
      },
      component: resolve => require(['Views/FormMetaManager/index'], resolve)
    },
    {
      path: 'meta_editor', // yzr
      name: '问卷结构编辑',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '评价体系创建',
        access: ['管理员','校级管理员']

      },
      component: resolve => require(['Views/FormMetaCreater/index'], resolve)
    },
    {
      path: 'meta_editor/:name/:version', // yzr
      meta: {
        hideInMenu: true
      },
      component: resolve => require(['Views/FormMetaEditor/index'], resolve)
    },
    {
      name: '问卷填写',
      path: 'form_fill/:name/:version', // 问卷填写
      meta: {
        hideInMenu: true,
        title: '评价体系查看'
      },
      component: resolve => require(['Views/FormFill/index'], resolve)
    },
    {
      path: 'form_choose', // 问卷选择
      name: '问卷选择',
      meta: {
        hideInMenu: true,
        title: '评价体系选择'
      },
      component: resolve => require(['Views/FormChoose/index'], resolve)
    },
    {
      path: '/work_pan', // 问卷选择
      name: 'work_pan',
      meta: {
        access: ['管理员','校级管理员'],
        title: '工作计划制定'
      },
      component: resolve => require(['Views/WorkPlan/index'], resolve)
    }
  ]
}
