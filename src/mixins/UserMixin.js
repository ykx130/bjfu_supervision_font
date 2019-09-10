import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      userInfo: state => state.user,
      roles: state => state.user.userInfo.role_names,
      current_role:state => state.user.access[0]
    })
  },
  methods: {
    ...mapActions([
      'getUserInfo'
    ])
  }
}
