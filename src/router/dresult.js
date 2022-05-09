// 评价结果相关的路由配置
import Main from '_c/main'

export default{
  name: '问卷结果',
  path: '/dresult',
  meta: {
    icon: 'ios-book',
    title: '评价结果',
    access: ['管理员','大组长','小组长','校级管理员','学院领导'],
  },
  component: Main,
  children: [


    {
      name: '问卷管理',
      path: 'form_manager', // xzl
      meta: {
        title: '评价结果列表'
      },
      component: resolve => require(['Views/FormManager/index'], resolve)
    },
    {
      name: '督导听课统计',
      path: 'lesson_records', // xzl
      meta: {
        access: ['管理员','大组长','小组长','校级管理员'],

      },
      component: resolve => require(['Views/GroupLessonList/index'], resolve)
    },
    {
      name: '问卷数据分析',
      path: 'form_sa', // xzl
      meta: {
        access: ['管理员','校级管理员'],
        title: '评价结果统计'
      },
      component: resolve => require(['Views/FormStatic/index'], resolve)
    },
    {
      name: '问卷展示',
      path: 'form_show/:id', // hmx问卷查看
      meta: {
        hideInMenu: true,
        title: '听课评价表查看'
      },
      component: resolve => require(['Views/FormShow/index'], resolve)
    },
  ]
}
