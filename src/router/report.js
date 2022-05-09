// 动态问卷相关的路由配置
import Main from '_c/main'
import parentView from '@/components/parent-view'

export default{
  name: '报告',
  path: '/report',
  meta: {
    icon: 'ios-book',
    title: '质量报告',
    access: ['管理员','校级管理员']

  },
  component: Main,
  children: [
    {
      name: '模板管理',
      path: 'template_manager',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '报告模板管理',
        access: ['管理员','校级管理员']
      },
      component: resolve => require(['Views/TemplateManager/index'], resolve)
    },
    {
      name: '报告生成',
      path: 'render',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '教学质量报告导出',
        access: ['管理员','校级管理员']
      },
      component: resolve => require(['Views/ReportExporter/index'], resolve)
    }
  ]
}
