<template>
  <component :is="el" :class="_classes" @click="loading = true" v-bind="$attrs" v-on="$listeners">
    <component :is="iconComponent" v-if="icon" />
    <slot />
  </component>
</template>

<script>
const colours = [
  'white',
  'light',
  'dark',
  'black',
  'text',
  'primary',
  'link',
  'info',
  'success',
  'warning',
  'danger',
  false
]

const sizes = [
  'small',
  'normal',
  'medium',
  'large'
]

export default {
  props: {
    colour: {
      type: String,
      default: 'primary',
      validate: val => colours.includes(val)
    },
    classes: {
      type: Array,
      default: () => ([])
    },
    size: {
      type: String,
      default: 'normal',
      validate: val => sizes.includes(val)
    },
    loadable: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      validate: val => val.match(/^[a-z-]+$/)
    }
  },
  data () {
    return { loading: false }
  },
  computed: {
    el () {
      if (this.$attrs.to) return 'nuxt-link'
      return 'a'
    },
    iconComponent () {
      return this.icon && `${this.icon}-icon`
    },
    _classes () {
      return [
        'button',
        `is-${this.size}`,
        ...this.classes,
        {
          'is-loading': this.loadable && this.loading,
          'is-outlined': this.outlined,
          [`is-${this.colour}`]: this.colour
        }
      ]
    }
  }
}
</script>

<style>

</style>
