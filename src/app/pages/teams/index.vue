<template>
<div>
  <h1 class="title is-spaced">Teams</h1>
  <base-section>
    <ul>
      <li v-if="teams.length === 0">You don't have any teams yet.</li>
      <li v-for="team in teams" :key="team.id">{{ team.name }}</li>
    </ul>
  </base-section>
  <base-button @click="showSlackRegister = true" icon="users" v-if="!showSlackRegister">Add a team</base-button>
  <div v-else>
    <base-button href="/auth/slack" icon="slack">Connect your Slack team</base-button>
    <base-button @click="showSlackRegister = false" colour="light">Never mind</base-button>
  </div>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('teams')

export default {
  middleware: 'authenticated',
  computed: mapGetters({ teams: 'list' }),
  asyncData ({ store }) {
    store.dispatch('teams/fetchList')
  },
  data () { return { showSlackRegister: false } },
  methods: {
    registerSlack () {

    }
  }
}
</script>

<style>

</style>
