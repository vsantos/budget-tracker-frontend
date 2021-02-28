<template>
  <div class="alerts">
    <b-alert show dismissible v-bind:variant="variant">
      <slot name="alert-content"></slot>
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'alerts',
  props: {
    variant: String,
  }
  
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_main';

.alerts {
  word-break: break-all;
}
</style>