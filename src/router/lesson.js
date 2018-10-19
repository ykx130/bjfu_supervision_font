// 动态问卷相关的路由配置
import Main from '_c/main'
import parentView from '@/components/parent-view'

export default{
  name: '课程',
  path: '/lesson',
  component: Main,
  meta: {
    icon: 'arrow-graph-up-right',
    title: '课程'
  },
  children: [
    {
      name: '课程管理',
      path: 'manager', // xzl
      meta: {
        icon: 'arrow-graph-up-right',
        title: '课程'
      },
      component: resolve => require(['Views/LessonManager/index'], resolve)
    },
    {
      name: '好评课堂',
      path: 'good_lesson', // xzl
      meta: {
        icon: 'arrow-graph-up-right',
        title: '课程'
      },
      component: resolve => require(['Views/FormMetaManager/index'], resolve)
    },
    {
      name: '关注课程',
      path: 'notice_lesson', // xzl
      meta: {
        icon: 'arrow-graph-up-right',
        title: '课程'
      },
      component: resolve => require(['Views/LessonNoticeManager/index'], resolve)
    },
    {
      name: '课程表',
      path: 'lesson_form', // xzl
      meta: {
        icon: 'arrow-graph-up-right',
        title: '课程'
      },
      component: resolve => require(['Views/LessonForm/index'], resolve)
    }
  ]
}
