<template>
  <header class="app-navbar">
    <div class="app-navbar__brand-zone">
      <button
        type="button"
        class="app-navbar__menu-button"
        :aria-label="$t('app.common.menu') || 'Menu'"
        @click="$emit('update:minimized', !minimized)"
      >
        <va-icon name="fa fa-bars" />
      </button>

      <router-link class="app-navbar__brand" to="/">
        <logo />
      </router-link>
    </div>

    <div class="app-navbar__company-zone">
      <span class="app-navbar__company-label">
        {{ $t('app.common.company') }}
      </span>
      <va-select
        class="app-navbar__company-select"
        :placeholder="$t('app.common.allCompanies')"
        max-height="320px"
        searchable
        v-model="company"
        text-by="name"
        :options="getCompanies"
        :no-options-text="$t('app.common.noData')"
      />
    </div>

    <div class="app-navbar__actions">
      <language-dropdown class="app-navbar__language" />

      <profile-dropdown class="app-navbar__profile">
        <span class="app-navbar__avatar">{{ userInitials }}</span>
        <span class="app-navbar__profile-name">{{ userLabel }}</span>
      </profile-dropdown>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import LanguageDropdown from './components/dropdowns/LanguageDropdown'
import ProfileDropdown from './components/dropdowns/ProfileDropdown'
import Logo from '../../logo/Logo'
import { SET_COMPANY } from '../../../consts/common'

export default {
  name: 'app-navbar',
  components: {
    Logo,
    LanguageDropdown,
    ProfileDropdown,
  },
  props: {
    minimized: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      company: '',
    }
  },
  computed: {
    ...mapGetters(['getCompanies']),
    userInfo () {
      return this.$store.getters.userInfo || {}
    },
    userLabel () {
      return (
        this.userInfo.fioinic ||
        this.userInfo.fio ||
        this.userInfo.email ||
        'ITP User'
      )
    },
    userInitials () {
      const value = this.userInfo.fio || this.userInfo.fioinic || this.userInfo.email || 'ITP User'
      const clean = String(value).replace(/[.@_-]+/g, ' ').trim()
      const parts = clean.split(/\s+/).filter(Boolean)
      if (parts.length > 1) {
        return (parts[0][0] + parts[1][0]).toUpperCase()
      }
      return clean.slice(0, 2).toUpperCase()
    },
  },
  watch: {
    company () {
      this.$store.commit(SET_COMPANY, this.company || '')
    },
  },
}
</script>

<style lang="scss">
.app-navbar {
  position: relative;
  z-index: 110;
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(260px, 360px) minmax(190px, 1fr);
  grid-template-areas: "brand company actions";
  align-items: center;
  column-gap: 1.25rem;
  height: 72px;
  padding: 0 1.5rem;
  background: #ffffff;
  border-bottom: 1px solid #e7edf4;
  box-shadow: 0 8px 28px rgba(26, 44, 66, .07);

  &__brand-zone {
    grid-area: brand;
    display: flex;
    align-items: center;
    min-width: 0;
    gap: .7rem;
  }

  &__menu-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    flex: 0 0 38px;
    padding: 0;
    color: #51657b;
    background: #f5f8fb;
    border: 1px solid #e5ebf2;
    border-radius: 11px;
    outline: none;
    cursor: pointer;
    transition: color .18s ease, background .18s ease, border-color .18s ease, transform .18s ease;

    &:hover {
      color: #258df1;
      background: #eef6ff;
      border-color: #cfe5fb;
    }

    &:active {
      transform: scale(.97);
    }

    .va-icon {
      font-size: .96rem;
    }
  }

  &__brand {
    display: flex;
    align-items: center;
    width: min(210px, 100%);
    min-width: 0;
    text-decoration: none;
  }

  &__company-zone {
    grid-area: company;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-width: 0;
    gap: 4px;
    padding: 0;
  }

  &__company-label {
    position: static;
    display: block;
    padding-left: 3px;
    color: #8292a5;
    font-size: .58rem;
    line-height: 1;
    font-weight: 800;
    letter-spacing: .11em;
    text-transform: uppercase;
    pointer-events: none;
  }

  &__company-select {
    width: 100%;
    margin: 0 !important;

    > .va-dropdown,
    .va-dropdown__anchor {
      width: 100% !important;
    }

    .va-select {
      min-height: 38px;
      padding: 0 !important;
      color: #263a50 !important;
      background: #f5f8fb !important;
      border: 1px solid #e1e8f0 !important;
      border-radius: 12px !important;
      box-shadow: none !important;
      transition: background .18s ease, border-color .18s ease, box-shadow .18s ease;

      &:hover {
        background: #f9fbfd !important;
        border-color: #cbd8e6 !important;
      }

      &--visible {
        background: #ffffff !important;
        border-color: #8ec8ff !important;
        box-shadow: 0 0 0 3px rgba(37, 141, 241, .1) !important;
      }
    }

    .va-select__input-wrapper {
      min-height: 36px;
      display: flex;
      align-items: center;
      padding: 0 2.15rem 0 .85rem !important;
    }

    .va-select__placeholder,
    .va-select__value {
      color: #263a50 !important;
      font-size: .86rem;
      line-height: 1.2;
    }

    .va-select__open-icon {
      right: .8rem !important;
      color: #70849a !important;
    }

    .va-dropdown__content {
      margin-top: .45rem;
      border: 1px solid #e4eaf1;
      border-radius: 12px;
      box-shadow: 0 18px 45px rgba(23, 42, 64, .15);
      overflow: hidden;
    }

    .va-dropdown__anchor-width-container {
      min-width: 260px;
      max-width: 360px !important;
    }

    .va-input__container {
      background: #f7f9fc !important;
      border-color: #e1e8f0 !important;
    }

    .va-input__container__input {
      color: #263a50 !important;
      font-size: .84rem;
    }

    .va-select__option-list {
      padding: .35rem;
      background: #ffffff;
    }

    .va-select__option {
      min-height: 38px;
      margin: .12rem 0;
      padding: .55rem .65rem !important;
      color: #31465c !important;
      border-radius: 9px;

      &:hover {
        background: #f2f7fc !important;
      }
    }
  }

  &__actions {
    grid-area: actions;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 0;
    gap: .55rem;
  }

  &__profile {
    margin: 0 !important;
  }

  &__avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
    color: #ffffff;
    background: linear-gradient(135deg, #258df1, #36b6dc);
    border-radius: 9px;
    font-size: .66rem;
    font-weight: 800;
    letter-spacing: .02em;
  }

  &__profile-name {
    max-width: 150px;
    overflow: hidden;
    color: #3a4e64;
    font-size: .79rem;
    font-weight: 650;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .profile-dropdown__anchor {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    min-height: 40px;
    padding: .25rem .35rem .25rem .3rem;
    color: #61768d !important;
    background: #f7f9fc;
    border: 1px solid #e5ebf2;
    border-radius: 12px;
  }

  .profile-dropdown__content {
    margin-top: .25rem;
    background: #ffffff;
    border: 1px solid #e5ebf2;
    box-shadow: 0 16px 42px rgba(17, 29, 45, .14);
  }

  @media (max-width: 1100px) {
    grid-template-columns: minmax(210px, 1fr) minmax(220px, 300px) auto;
    column-gap: .9rem;
    padding: 0 1rem;

    &__brand {
      width: 180px;
    }

    &__profile-name {
      display: none;
    }
  }

  @media (max-width: 767px) {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-rows: 58px 46px;
    grid-template-areas:
      "brand actions"
      "company company";
    align-items: center;
    height: 116px;
    padding: 6px .9rem 6px;
    row-gap: 0;
    column-gap: .6rem;

    &__brand-zone {
      min-width: 0;
      gap: .55rem;
    }

    &__brand {
      width: 164px;
    }

    &__menu-button {
      width: 36px;
      height: 36px;
      flex-basis: 36px;
      border-radius: 10px;
    }

    &__company-zone {
      width: min(420px, 100%);
      padding-top: 0;
      align-self: start;
    }

    &__company-label {
      display: none;
    }

    &__company-select .va-select {
      min-height: 40px;
      border-radius: 11px !important;
    }

    &__company-select .va-select__input-wrapper {
      min-height: 38px;
    }

    &__actions {
      gap: .35rem;
    }

    .profile-dropdown__anchor {
      min-height: 38px;
      padding: .2rem;
    }
  }

  @media (max-width: 640px) {
    grid-template-rows: 54px 46px;
    height: 108px;
    padding: 4px .65rem;
    column-gap: .35rem;

    &__brand-zone {
      gap: .4rem;
    }

    &__brand {
      width: 132px;
      max-width: 132px;
    }

    &__menu-button {
      width: 34px;
      height: 34px;
      flex-basis: 34px;
    }

    &__actions {
      min-width: 52px;
      gap: 0;
      flex-wrap: nowrap;
      justify-self: end;
      overflow: visible;
    }

    &__profile {
      display: none;
    }

    &__language {
      display: block;
      flex: 0 0 auto;
    }

    &__avatar {
      width: 28px;
      height: 28px;
      flex-basis: 28px;
    }

    &__company-zone {
      width: 100%;
    }

    &__company-select .va-select,
    &__company-select .va-select__input-wrapper {
      min-height: 38px;
    }
  }

  @media (max-width: 380px) {
    &__brand {
      width: 114px;
      max-width: 114px;
    }

    &__actions {
      gap: .1rem;
    }
  }
}
</style>
