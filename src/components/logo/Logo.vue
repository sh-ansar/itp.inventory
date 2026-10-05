<template>
  <span class="inventory-logo">
    <img
      class="inventory-logo__image"
      :src="logoSrc"
      alt="ITP Inventory"
    >
  </span>
</template>

<script>
import logoSrc from '../../assets/itp-inventory-logo.png'

export default {
  name: 'Logo',
  data () {
    return {
      logoSrc,
    }
  },
}
</script>

<style lang="scss">
.inventory-logo {
  display: inline-flex;
  align-items: center;
  width: 100%;
  min-width: 0;

  &__image {
    display: block;
    width: 100%;
    height: auto;
    max-height: 32px;
    object-fit: contain;
    object-position: left center;
  }
}
</style>
