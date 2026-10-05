<template>
  <va-button
    small
    color="primary"
    class="mr-0"
    @click="clear"
  >
    {{ $t('app.common.resetTable') }}
  </va-button>
</template>

<script>
import { CLEAR_USER_PREFERENCES } from '../consts/urls'

export default {
  name: 'ClearPreferencesButton',
  props: ['table_id'],
  methods: {
    clear () {
      this.$swal({
        title: this.$t('app.common.areYouSure'),
        text: this.$t('app.common.resetTableConfirm'),
        icon: 'info',
        showCancelButton: true,
        cancelButtonText: this.$t('app.common.cancel'),
        confirmButtonText: this.$t('app.common.confirm'),
      }).then((result) => {
        if (result.value) {
          const data = {
            table_id: this.table_id,
          }

          this.$http.post(CLEAR_USER_PREFERENCES, data)
            .then(() => {
              window.location.reload()
            })
        }

        return false
      })
    },
  },
}
</script>

<style scoped>
</style>
