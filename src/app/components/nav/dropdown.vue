<template>
<div class="navbar-item has-dropdown is-hoverable is-right">
  <Profile :user="currentUser" class="navbar-link"/>
  <div class="navbar-dropdown is-boxed">
  <!-- <b-dropdown hoverable position="is-bottom-left" class="nav-dropdown"> -->
    <nuxt-link to="/" :exact="true" class="is-level navbar-item">
      <music-icon/>
      <span>Home</span>
    </nuxt-link>
    <nuxt-link to="/teams" class="is-level navbar-item">
      <users-icon/>
      <span>Teams</span>
    </nuxt-link>
    <nuxt-link to="/connections" class="is-level navbar-item">
      <activity-icon/>
      <span>Connections</span>
    </nuxt-link>
    <hr class="navbar-divider">
    <a href="/logout" class="is-level navbar-item">
      <log-out-icon/>
      <span>Logout</span>
    </a>
  </div>
  <!-- </b-dropdown> -->
</div>
</template>

<script>
import Profile from '../profile'

export default {
  components: { Profile }
}
</script>

<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";

/deep/ .dropdown-trigger {
  display: flex;
  align-items: center;
}

/deep/ .profile .profile-picture {
  @include desktop {
    order: 2;
  }

  margin: 0 0.75em;
  height: 30px;
  width: 30px;;
}
</style>
