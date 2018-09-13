<template>
  <div>
    <h1 class="title">{{ team.name }}</h1>
    <b-loading :active="isLoading" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapActions } = createNamespacedHelpers('teams')

export default {
  middleware: 'authenticated',
  methods: {
    ...mapActions(['fetchSingle'])
  },
  mounted () {
    this.fetchSingle({ id: this.$route.params.id })
  },
  computed: {
    ...mapGetters(['byId', 'isLoading']),
    team () { return this.byId(this.$route.params.id) || {} }
  }
}
</script>

<style>

</style>
