<template>
  <base-section>
    <h2 class="subtitle is-level">
      <users-icon />
      Teams
    </h2>
    <ul>
      <li v-if="list.length === 0">You don't have any teams yet.</li>
      <li v-for="team in list" :key="team.id">{{ team.name }}</li>
    </ul>
  </base-section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('teams')

export default {
  computed: mapGetters(['list'])
}
</script>

<style>

</style>
