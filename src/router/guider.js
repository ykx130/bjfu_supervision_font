// 动态问卷相关的路由配置
import MainGuider from '_c/mainGuider'
import parentView from '@/components/parent-view'

export default {
  name: '督导端',
  path: '/_guider',
  meta: {
    icon: 'ios-book',
    hideInMenu: true,
  },
  component: MainGuider, // 一级目录必须使用Main组件作为component，
  children: [{
    name: '督导报名中心',
    path: 'attend',
    component: resolve => require(['Views/GuiderActiveAttend/index'], resolve)
  },
    {
      name: '督导咨询申请',
      path: 'consult_apply',
      component: resolve => require(['Views/ConsultApply/index'], resolve)
    },
    {
      name: '督导问卷填写',
      path: 'judge',
      component: resolve => require(['Views/GuiderFormChoose/index'], resolve)
    },
    {
      name: '问卷填写课程',
      path: 'lesson_form',
      component: resolve => require(['Views/GuiderLessonForm/index'], resolve)
    },
    {
      name: '督导问卷填写',
      path: 'judge/form_fill/:name/:version',
      component: resolve => require(['Views/FormFill/index'], resolve)
    },
    {
      name: '督导问卷查看',
      path: 'judge/form_show/:id',
      component: resolve => require(['Views/FormShow/index'], resolve)
    },
    {
      name: '督导我的提交',
      path: 'my_form',
      component: resolve => require(['Views/FormsMy/index'], resolve)
    },
  ]
}
