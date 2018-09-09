<template>
<nav v-if="$user" class="navbar">
  <div class="container">
    <div class="navbar-brand is-level">
      <nuxt-link to="/" class="navbar-item"><music-icon /></nuxt-link>
      <div class="breadcrumb has-arrow-separator" v-if="$route.path !== '/'">
        <ul>
          <li v-for="route in routes" :key="route.name" :class="{ 'is-active': route.active }">
            <nuxt-link :to="route.path">{{ route.name }}</nuxt-link>
          </li>
        </ul>
      </div>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="active = !active">
        <menu-icon aria-hidden="true" />
      </a>
    </div>
    <div :class="['navbar-menu', { 'is-active': active }]">
      <div class="navbar-end">
        <dropdown />
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import { titleize } from 'inflect'
import dropdown from './dropdown'

export default {
  components: { dropdown },
  data () {
    return { active: false }
  },
  computed: {
    routes () {
      const routes = this.$route.matched.filter(({ name }) => name !== 'index')
      return routes.map(({ name, path }, index) => ({
        name: titleize(name),
        path,
        active: index === routes.length - 1
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";

.breadcrumb {
  margin-bottom: 0;

  li:first-child:before {
    color: $grey-light;
    content: '\2192';
    margin-right: 0.75em;
  }
}

nav {
  min-height: 5em;
  background-color: $white-bis;

  svg.feather {
    margin: 0
  }
}

.navbar-burger {
  @include touch {
    display: flex;
  }

  justify-content: center;
  align-items: center;
  height: 5em;
  width: 5em;

  svg {
    margin: 0;
  }
}

/deep/ .navbar-link::after {
  border-width: 2px;
}

.navbar-brand,
.navbar-menu {
  min-height: 5em;
}

.navbar-menu {
  @include touch {
    background-color: $white-bis;
    border-top: 2px $white-ter solid;
  }
}
</style>
