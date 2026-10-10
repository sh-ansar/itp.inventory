<template>
  <div aria-hidden="true"></div>
</template>

<script>
import { AUTH_LOGOUT } from '../../../consts/auth'

export default {
  name: 'Logout',
  beforeCreate () {
    this.$store.dispatch(AUTH_LOGOUT)
      .then(() => {
        this.$router.push({ name: 'login' })
      })
  },
}
</script>

<style scoped>

</style>
