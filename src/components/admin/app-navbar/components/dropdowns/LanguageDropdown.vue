<template>
  <va-dropdown
    class="language-dropdown"
    offset="0, 12px"
    fixed
  >
    <button slot="anchor" type="button" class="language-dropdown__anchor">
      <span class="language-dropdown__code">{{ currentLanguage.toUpperCase() }}</span>
      <va-icon name="fa fa-angle-down" />
    </button>

    <div class="language-dropdown__content">
      <button
        v-for="option in options"
        :key="option.code"
        type="button"
        class="language-dropdown__item"
        :class="{ 'language-dropdown__item--active': option.code === currentLanguage }"
        @click="setLanguage(option.code)"
      >
        <span class="language-dropdown__item-code">{{ option.code.toUpperCase() }}</span>
        <span>{{ option.name }}</span>
        <va-icon
          v-if="option.code === currentLanguage"
          name="fa fa-check"
          class="language-dropdown__check"
        />
      </button>
    </div>
  </va-dropdown>
</template>

<script>
import { getAppLanguage, setAppLanguage } from '../../../../../i18n/index'

export default {
  name: 'language-dropdown',
  data () {
    return {
      currentLanguage: getAppLanguage(),
    }
  },
  computed: {
    options () {
      return [
        { code: 'ru', name: this.$t('app.language.ru') },
        { code: 'en', name: this.$t('app.language.en') },
        { code: 'ka', name: this.$t('app.language.ka') },
      ]
    },
  },
  methods: {
    setLanguage (language) {
      this.currentLanguage = setAppLanguage(language)
      this.$root.$emit('app-language-changed', language)
    },
  },
}
</script>

<style lang="scss">
.language-dropdown {
  margin: 0;

  &__anchor {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .38rem;
    min-width: 66px;
    height: 40px;
    padding: 0 .68rem;
    color: #40556b;
    background: #f7f9fc;
    border: 1px solid #e5ebf2;
    border-radius: 12px;
    outline: none;
    cursor: pointer;
    transition: color .18s ease, background .18s ease, border-color .18s ease;

    &:hover {
      color: #258df1;
      background: #f1f7fd;
      border-color: #cfe4f8;
    }
  }

  &__code {
    min-width: 22px;
    font-size: .74rem;
    font-weight: 800;
    letter-spacing: .06em;
  }

  &__content {
    min-width: 190px;
    padding: .42rem;
    background: #ffffff;
    border: 1px solid #e5ebf2;
    border-radius: 12px;
    box-shadow: 0 16px 42px rgba(17, 29, 45, .14);
  }

  &__item {
    display: flex;
    align-items: center;
    width: 100%;
    gap: .65rem;
    min-height: 40px;
    padding: .62rem .72rem;
    color: #405166;
    background: transparent;
    border: 0;
    border-radius: 9px;
    font-size: .82rem;
    text-align: left;
    cursor: pointer;

    &:hover {
      background: #f4f8fc;
    }

    &--active {
      color: #1679d8;
      background: #eef6ff;
      font-weight: 650;
    }
  }

  &__item-code {
    width: 26px;
    color: #8a98aa;
    font-size: .68rem;
    font-weight: 800;
  }

  &__check {
    margin-left: auto;
    font-size: .72rem;
  }

  .va-dropdown__anchor {
    display: inline-flex;
  }

  @media (max-width: 480px) {
    &__anchor {
      min-width: 52px;
      height: 38px;
      padding: 0 .5rem;
    }

    &__anchor .va-icon {
      display: none;
    }
  }
}
</style>
