<template>
<div>
  <h1 class="title is-spaced">Teams</h1>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('teams')

export default {
  middleware: 'authenticated',
  computed: mapGetters(['list']),
  asyncData ({ store }) {
    store.dispatch('teams/fetchList')
  }
}
</script>

<style>

</style>
