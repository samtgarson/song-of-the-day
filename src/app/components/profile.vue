<template>
  <div v-if="user" class="profile">
    <div class="profile-picture" :style="{ 'background-image': `url(${user.picture})` }" />
    <p>{{ user.name }}</p>
  </div>
</template>

<script>

export default {
  props: {
    user: {
      type: Object
    }
  }
}
</script>

<style scoped lang="scss">
.profile {
  display: flex;
  align-items: center;
}

.profile-picture {
  width: 50px;
  height: 50px;
  background-color: lightgray;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50px;
  margin-right: 1em;
}
</style>
