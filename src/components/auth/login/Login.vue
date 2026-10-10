<template>
<form @submit.prevent="onsubmit">
  <va-input
    v-model="username"
    type="text"
    :label="$t('app.common.login')"
    :error="!!usernameErrors.length"
    :error-messages="usernameErrors"
  />

  <va-input
    v-model="password"
    type="password"
    :label="$t('auth.password')"
    :error="!!passwordErrors.length"
    :error-messages="passwordErrors"
  />

  <div class="auth-layout__options d-flex align--center justify--space-between">
    <va-checkbox v-model="keepLoggedIn" class="mb-0" :label="$t('auth.keep_logged_in')"/>
<!--    <router-link class="ml-1 link" :to="{name: 'recover-password'}">{{$t('auth.recover_password')}}</router-link>-->
  </div>

  <div class="d-flex justify--center mt-3" v-if="!loading">
    <va-button type="submit" class="my-0">{{ $t('auth.login') }}</va-button>
  </div>

  <div class="d-flex justify--center mt-3" v-if="loading">
    <orbit-spinner
      :color="$themes.primary"
    >
    </orbit-spinner>
  </div>
</form>
</template>

<script>
import { AUTH_REQUEST } from '../../../consts/auth'
import { OrbitSpinner } from 'epic-spinners'
export default {
  components: {
    OrbitSpinner,
  },
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      keepLoggedIn: false,
      usernameErrors: [],
      passwordErrors: [],
      loading: false,
    }
  },
  computed: {
    formReady () {
      return !this.usernameErrors.length && !this.passwordErrors.length
    },
  },
  methods: {
    onsubmit () {
      this.usernameErrors = this.username ? [] : [this.$t('auth.validation.emailRequired')]
      this.passwordErrors = this.password ? [] : [this.$t('auth.validation.passwordRequired')]

      if (!this.formReady) {
        this.loading = false
        return
      }

      this.loading = true

      const { username, password, keepLoggedIn } = this

      this.$store.dispatch(AUTH_REQUEST, {
        credentials: { username, password },
        keepLoggedIn,
      }).then(() => {
        this.loading = false

        const redirect = this.$route.query.redirect
        this.$router.push(redirect || { name: 'dashboard' })
      }).catch(e => {
        this.loading = false

        const status = e && e.response && e.response.status

        if (status === 401) {
          this.$swal(
            this.$t('app.common.authErrorTitle'),
            this.$t('app.common.invalidCredentials'),
            'error',
          )
        } else if (!status) {
          this.$swal(
            this.$t('app.common.authErrorTitle'),
            this.$t('app.common.connectionError'),
            'error',
          )
        }
      })
    },
  },
}
</script>

<style lang="scss">
</style>
