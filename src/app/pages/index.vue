<template>
  <section>
    <h1>song-of-the-day</h1>
    <h2>Little app to get a song of the day from your team's rotation</h2>
    <a 
      :class="['button is-primary is-large', { 'is-loading': loading }]" 
      @click="loading = true" 
      href="/auth/spotify">
      Get Started
    </a>
  </section>
</template>

<script>
  export default {
    data () {
      return { loading: false }
    }
  }
</script>
