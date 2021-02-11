<template>
  <div>
    <h1>Recent Posts</h1>

    <div v-for="post in this.postsPart" :key="post.id" class="post-wrapper">
      <h2>{{ post.title}}</h2>
      <p>{{ post.description }}</p>

      <div class="post-buttons-wrap" v-if="isLogedOn">
        <div class="columns">
          <div class="column">
            <p class="date-wrap">
            {{ dateDiff(post.updatedAt) }} days ago
            </p>
          </div>
          <div class="column is-one-quarter">
            <b-button
              v-if="user.role !== 'reader'&& user.id === post.uid "
              type="is-info"
              icon-left="lead-pencil"
              @click="handleEditPost(post)"
            >
              Изменить
            </b-button>
          </div>
          <div class="column is-one-fifth">
            <b-button
              v-if="user.role !== 'reader' && user.id === post.uid "
              type="is-danger"
              icon-left="delete"
              @click="handlePostDelete(post.id)"
            >
              Удалить
            </b-button>
          </div>
          <div class="column is-one-fifth">
            <b-button
              v-if="user.role !== 'writer'"
              type="is-info is-light"
              icon-left="hand-right"
              class="clap-wrap"
              @click="handleClap(post)"
            >
              {{ post.claps }}
            </b-button>
          </div>
        </div>

      </div>
    </div>

    <section>
    <hr>
      <b-pagination
        :total="total"
        v-model="current"
        :range-before="rangeBefore"
        :range-after="rangeAfter"
        :order="order"
        :size="size"
        :simple="isSimple"
        :rounded="isRounded"
        :per-page="perPage"
        :icon-prev="prevIcon"
        :icon-next="nextIcon"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        >
      </b-pagination>
    </section>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from "../router"

export default {

  data() {
    return {
      total: 0, // total count of items
      current: 1, // current page number 
      perPage: 10, //items count for each page
      rangeBefore: 3, //number of pagination to show before current page
      rangeAfter: 1, 
      order: 'is-centered',
      size: '',
      isSimple: false,
      isRounded: false,
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
    }
  },

  methods: {
    ...mapActions([
      'getPartOfPosts',
      'getNumberOfPosts',
      'clapThePost'
    ]),

    setNumForPagination() {
      this.total = this.postsNum
    },

    handleClap(post) {
      this.clapPost(post)
    },

    handlePostDelete(id) {
      this.deletePost(id)
    },

    handleEditPost(pid) {
      // redirect to main page
      router.push({name: 'EditPost', params: pid })
    },

    async clapPost(post) {
      post.claps = post.claps + 1
      await fetch(`http://localhost:3000/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(post)
      })
    },

    async deletePost(id) {
      await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE"
      })
    
      this.getNumberOfPosts()
      this.setNumForPagination()
      this.getPartOfPosts(this.current, 10)
    },

    dateDiff(date) {
      const date1 = date;
      const date2 = new Date();
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      return isNaN(diffDays) ? "0" : diffDays
    }
  }, 

  computed: {
    ...mapState([
      'postsNum',
      'postsPart',
      'isLogedOn',
      'user'
    ]),

  },

  watch: {
    // watch current page
    current: function () {
      this.getPartOfPosts(this.current, 10)
    },

    // as soon as we get global postsNum, we set local var for pagination
    postsNum: function () {
      this.setNumForPagination()
    },

  },

  mounted: function() {
    this.getNumberOfPosts()
    this.setNumForPagination()
    this.getPartOfPosts(this.current, 10)
  },
}
</script>

<style scoped>
  h1 {
    font-size: 2.5rem
  }

  .post-wrapper {
    border: 1px solid green;
    padding: 20px;
    max-width: 600px;
    margin: 2em auto;
  }

  .post-wrapper h2 {
    font-size: 1.5em;
    text-align: left;
  }

  .post-wrapper p {
    padding-top: 10px;
    text-align: left;
  }

  .clap-wrap span {
    font-size: 1.2rem;
    padding: 0 0.5em 0 0;
  }

  .post-buttons-wrap button{
    margin-top: 1em;
    margin-right: 0.5em;
  }

  .date-wrap {
    margin: 15px 0 0 0;
  }

</style>
