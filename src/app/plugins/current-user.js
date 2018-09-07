import Vue from 'vue'

Vue.mixin({
  computed: {
    currentUser () { return this.$store.state.user }
  }
})
