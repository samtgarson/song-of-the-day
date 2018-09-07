<template>
  <base-section>
    <h2 class="subtitle is-level">
      <activity-icon />
      Connections
    </h2>
    <p>You have connected: <strong>{{ service }}</strong></p>
  </base-section>
</template>

<script>
// import { titleize } from 'inflect'

export default {
  computed: {
    service () {
      return 'nothing'
    }
  }
}
</script>

<style>

</style>
