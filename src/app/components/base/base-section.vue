<template>
  <div class="spacer" v-bind="$attrs">
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .spacer {
    padding-bottom: 20px !important;
    margin-bottom: 30px !important;
  }
</style>
