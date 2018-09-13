<template>
  <div>
    <h1 class="title">Your team is already registered!</h1>
    <p>Your Slack team already gets a song of the day.</p>
    <p>Speak to your Slack admin to get invited!</p>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated'
}
</script>

<style>

</style>
