<template>
  <section>
    <h1 class="title is-spaced is-level">
      <music-icon />
      jukebox.team
    </h1>
    <h2 class="subtitle is-level">
      Get a song each day from your team's rotation
    </h2>
    <base-button to="/teams" size="large" icon="arrow-right-circle" v-if="currentUser">
      Go to your dashboard
    </base-button>
    <base-button :href="loginUrl" :loadable="true" size="large" icon="log-in" v-else>
      Log In With Spotify
    </base-button>
  </section>
</template>

<script>
  export default {
    data () {
      return { loading: false }
    },
    computed: {
      loginUrl () {
        const url = '/auth/spotify'
        const redirect = this.$route.query['redirect-url']
        if (!redirect) return url
        return `${url}?redirect-url=${redirect}`
      }
    }
  }
</script>
