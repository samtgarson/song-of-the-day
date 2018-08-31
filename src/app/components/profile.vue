<template>
  <div class="level" v-if="user">
    <div class="level-left">
      <div class="profile-picture level-item" :style="{ 'background-image': `url(${user.picture})` }" />
      <b-dropdown hoverable>
        <p class="level-item" slot="trigger">{{ user.name }}</p>
        <b-dropdown-item has-link>
          <a @click="$logout('/')" class="is-level">
            <log-out-icon/>
            <span>Logout</span>
          </a>
        </b-dropdown-item>
      </b-dropdown>
    </div>
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
.profile-picture {
  width: 50px;
  height: 50px;
  background-color: lightgray;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50px;
}
</style>
