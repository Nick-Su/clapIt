<template>
  <div id="app">
     <b-navbar>
        <template #start>
            <b-navbar-item tag="div">
                <router-link to="/" class="button">Home</router-link> 
            </b-navbar-item>

            <b-navbar-item href="#" tag="div">
              {{ user.login }}
            </b-navbar-item>

            <b-navbar-item href="#" tag="div">
              {{ user.role }}
            </b-navbar-item>

        </template>
        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    
                    <router-link to="/create" class="button is-success" v-if="user.role === 'writer'">Create Post</router-link>
                    <router-link to="/login" class="button is-light" v-if="!user.login">Login</router-link>
                    <b-button type="is-primary" outlined @click="handleLogout" v-if="isLogedOn"> Log Out</b-button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>

    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'app',

  methods: {
    ...mapActions([
				'logoutUser'
      ]),
      
    handleLogout() {
      let payload = {}
      this.logoutUser(payload)
    }
  },

  computed: {
    ...mapState([
      'isLogedOn',
      'user'
    ])
  },
  
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
