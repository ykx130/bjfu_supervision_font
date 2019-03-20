import { BarLandscape, StackedBar, StackedBarPortrait, ChartBar } from './index.js'

export default {
  install (Vue, options) {
    Vue.component('BarLandscape', BarLandscape)
    Vue.component('StackedBar', StackedBar)
    Vue.component('StackedBarPortrait', StackedBarPortrait)
    Vue.component('Bar', ChartBar)
  }
}
