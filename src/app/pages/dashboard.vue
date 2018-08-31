<template>
<div>
  <h1 class="title is-spaced">Dashboard</h1>
  <h2 class="subtitle is-level">
    <activity-icon />
    Connections
  </h2>
  <p>You have connected: <strong>{{ service }}</strong></p>
</div>
</template>

<script>
import { titleize } from 'inflect'

export default {
  authenticated: true,
  computed: {
    service () {
      return titleize(this.$currentUser.service)
    }
  }
}
</script>

<style>

</style>
