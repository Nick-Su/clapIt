import router from "../router"

export default {

  LOGIN_USER(state, data) {
    state.user = data
    state.isLogedOn = true
    router.push({name: 'Home'})
  },

  LOGOUT_USER (state) {
    try {
      state.user = {}
      state.isLogedOn = false
    } catch (error) {
        console.log("Failed logout")
    }
  },

  GET_NUM_POSTS (state, data) {
    state.postsNum = data
  },

  SAVE_PART_OF_POSTS (state, data) {
    state.postsPart = data
  }

}