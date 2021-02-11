export default {
  
  async loginUser ({commit}, {email, password}) {
    try {
      const response = await fetch(`http://localhost:3000/users/?login=${email}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=UTF-8'},
      })

      const data = await response.json()

      if(data.length === 0) {
        return false
      }

      if (data[0].password + '' !== password && data[0].login !== email) {
        return false
      }

      commit('LOGIN_USER', data[0])
    } catch (error) {
        console.log('error during login attempt', error)
    }
  },

  logoutUser: ({commit}) => {
    commit('LOGOUT_USER')
  },

  // Get number of Posts
  async getNumberOfPosts({commit}) {
    try {
      const response = await fetch(`http://localhost:3000/posts/`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=UTF-8'},
      })
      
      const data = await response.json()
      commit('GET_NUM_POSTS', data.length)

    } catch (error) {
      console.log('Failed to get post', error)
    }
  },

  // get part of post per page
  async getPartOfPosts({commit}, pageNum, postsPerPage = 10) {
    try {
      fetch(`http://localhost:3000/posts?_page=${pageNum}&_limit=${postsPerPage}`, {
      method: 'GET'
      })
      .then( (response) => {
        return response.json()
      })
      .then((jsonData) => {
        commit('SAVE_PART_OF_POSTS', jsonData)
      })
    } catch (error) {
      console.log('Failed to get part post', error)
    }
  },

}
