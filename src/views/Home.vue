<template>
  <div class="home">
    <Posts />
  </div>
</template>

<script>
import Posts from '@/components/Posts.vue'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    Posts
  },
  
}
</script>
