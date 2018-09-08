<template>
  <div class="base-section" v-bind="$attrs">
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .base-section {
    padding-bottom: 20px !important;
    margin-bottom: 30px !important;
  }
</style>
