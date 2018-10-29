
export default {
  state: {
    lesson_id: undefined
  },
  mutations: {
    setLessonId (state, lesson_id) {
      state.lesson_id = lesson_id
    }
  },
  actions: {},
  getters: {
    lesson_id: state => {
      return state.lesson_id
    }
  }
}
