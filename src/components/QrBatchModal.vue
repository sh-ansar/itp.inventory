<template>
  <va-modal
    v-model="open"
    size="large"
    :title="$t('app.pages.items.qrTitle')"
    :hide-default-actions="true"
  >
    <va-button
      slot="actions"
      color="primary"
      @click="open = false"
    >
      {{ $t('app.common.close') }}
    </va-button>

    <div class="qr-batch">
      <div
        v-for="item in items"
        :key="item.id"
        class="qr-batch__item"
      >
        <qrcode-vue
          :value="prefix + item.id"
          :size="160"
        />
        <strong>{{ item.name }}</strong>
        <span>{{ item.inventory_number || item.code }}</span>
      </div>
    </div>
  </va-modal>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'QrBatchModal',
  components: {
    QrcodeVue,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    prefix: {
      type: String,
      default: '',
    },
  },
  computed: {
    open: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style scoped>
.qr-batch {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 1rem;
}

.qr-batch__item {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  gap: .45rem;
  padding: 1rem;
  border: 1px solid #e2e8ef;
  border-radius: 12px;
  background: #fff;
  text-align: center;
}

.qr-batch__item strong,
.qr-batch__item span {
  width: 100%;
  overflow: hidden;
  color: #33485e;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.qr-batch__item span {
  color: #74869a;
  font-size: .78rem;
}

@media (max-width: 575px) {
  .qr-batch {
    grid-template-columns: 1fr;
  }
}
</style>
