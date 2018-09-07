<template>
<div>
  <Dashboard />
</div>
</template>

<script>
import Dashboard from '@/components/dashboard'
import authenticated from '@/helpers/authenticated'

export default {
  mixins: [authenticated],
  components: { Dashboard }
}
</script>

<style>

</style>
