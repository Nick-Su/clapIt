<template>
  <div>
      
      <div class="column is-4 is-offset-4">
        <h1>Edit Mode</h1>

        <form>
          <b-field>
            <b-input 
              type="text"
              v-model="post.title"
            >
            </b-input>
          </b-field>

          <b-field>
            <b-input type="textarea" 
              v-model="post.description"
            >
            </b-input>
          </b-field>

          <p
            v-if="success"
            class="success-message"
          >✅ Post saved!</p>

          <div class="buttons">
            <b-button @click="handleSubmit"  type="is-success" size="is-medium">Save</b-button>
            <router-link to="/" class="button is-info is-medium">Back</router-link>
          </div>
        </form>
      </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'EditPost',
  data() {
    return {
      success: false,
      post: {}
    }
  },
  methods: {
    async getPostById(id) {
       const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=UTF-8'}
      })
      
      const data = await response.json()
      this.post = data
    },

    getUrlVars() {
      var vars = {};
      window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
          vars[key] = value;
      });
      return vars;
    },

    handleSubmit() {
      this.post.updatedAt = new Date()
      this.saveEditedPost(this.post)
    },

    async saveEditedPost(post) {
      try {
        await fetch(`http://localhost:3000/posts/${post.id}`, {
          method: 'PUT',
          headers: { 'Content-type': 'application/json; charset=UTF-8'},
          body: JSON.stringify(post)
        })

        this.success = true
      } catch(error) {
        console.error(error)
      }
    }

  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  mounted: function() {
    this.getPostById(this.getUrlVars()["id"])
  }
}
</script>


<style scoped>
  h1 {
    font-size: 2rem;
    margin: 1em;
  }

  .success-message {
    color: #32a95d;
  }
</style>