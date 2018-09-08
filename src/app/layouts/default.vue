<template>
<main>
  <Nav />
  <div class="section">
    <div class="container">
      
      <nuxt />
    </div>
  </div>
</main>
</template>

<script>
import Nav from '@/components/nav/index'

export default {
  components: { Nav }
}
</script>
