// 动态问卷相关的路由配置
import Main from '_c/main'
import parentView from '@/components/parent-view'

export default{
  name: '问卷',
  path: '/dqs',
  meta: {
    icon: 'ios-book',
    title: '评价管理'
  },
  component: Main,
  children: [
    {
      name: '问卷结构管理',
      path: 'meta_manager', // xzl
      meta: {
        icon: 'arrow-graph-up-right',
        title: '评价体系管理',
        access: ['管理员']
      },
      component: resolve => require(['Views/FormMetaManager/index'], resolve)
    },
    {
      path: 'meta_editor', // yzr
      name: '问卷结构编辑',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '评价体系创建',
        access: ['管理员']

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
        title: '评价填写'
      },
      component: resolve => require(['Views/FormFill/index'], resolve)
    },
    {
      name: '问卷展示',
      path: 'form_show/:id', // hmx问卷查看
      meta: {
        hideInMenu: true,
        title: '评价展示'
      },
      component: resolve => require(['Views/FormShow/index'], resolve)
    },
    {
      name: '问卷管理',
      path: 'form_manager', // xzl
      meta: {
        title: '评价结果管理'
      },
      component: resolve => require(['Views/FormManager/index'], resolve)
    },
    {
      name: '各组评价情况查看',
      path: 'lesson_records', // xzl
      meta: {
      },
      component: resolve => require(['Views/GroupLessonList/index'], resolve)
    },
    {
      name: '问卷数据分析',
      path: 'form_sa', // xzl
      meta: {
        title: '评价结果预览'
      },
      component: resolve => require(['Views/FormStatic/index'], resolve)
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
        title: '工作假话制定'
      },
      component: resolve => require(['Views/WorkPlan/index'], resolve)
    }
  ]
}
