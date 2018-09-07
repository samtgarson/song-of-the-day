<template>
  <main class="section">
    <div class="container">
      <Profile :user="currentUser" />
      <nuxt />
    </div>
  </main>
</template>

<script>
import Profile from '@/components/profile'

export default {
  components: { Profile }
}
</script>
