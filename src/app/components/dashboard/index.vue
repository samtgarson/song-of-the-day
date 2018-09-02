<template>
  <div>
    <h1 class="title is-spaced">Dashboard</h1>
    <Connections />
    <Teams />
  </div>
</template>

<script>
import Connections from './connections'
import Teams from './teams'

export default {
  components: { Connections, Teams }
}
</script>