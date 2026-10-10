const getDefaultOptions = () => {
  // if(appColors) {
  //   return {
  //     themes: {
  //       primary: appColors.primary || '#40e583',
  //       secondary: appColors.secondary || '#002c85',
  //       success: appColors.success || '#40e583',
  //       info: appColors.info || '#2c82e0',
  //       danger: appColors.danger || '#e34b4a',
  //       warning: appColors.warning || '#ffc200',
  //       gray: appColors.gray || '#babfc2',
  //       dark: appColors.dark || '#34495e',
  //     },
  //   }
  // } else {
    // return {
    //   themes: {
    //     primary: '#40e583',
    //     secondary: '#002c85',
    //     success: '#40e583',
    //     info: '#2c82e0',
    //     danger: '#e34b4a',
    //     warning: '#ffc200',
    //     gray: '#babfc2',
    //     dark: '#34495e',
    //   },
    // }
    return {
      themes: {
        primary: '#007BFF',
        secondary: '#111D2D',
        success: '#28A745',
        info: '#17A2B8',
        danger: '#DC3545',
        warning: '#FFC107',
        gray: '#C3CFD8',
        dark: '#343A40',
      },
    }
  //}
}


export const ColorThemePlugin = {
  install (Vue, options) {
    const defaultOptions = getDefaultOptions()

    if (options && options.themes) {
      Object.assign(defaultOptions.themes, options.themes)
    }

    Vue.prototype.$themes = defaultOptions.themes

    /* eslint-disable no-new */
    // This line is just to make themes reactive
    new Vue({ data: { themes: Vue.prototype.$themes } })
  },
}

export const ColorThemeMixin = {
  data () {
    return {
      colorThemeDefault: 'primary',
      colorDefault: '#000000',
    }
  },
  props: {
    color: {
      type: String,
    },
  },
  computed: {
    // This allows a multitude of defaults.
    // theme color => color => theme default => hard default
    colorComputed () {
      if (this.$themes && this.$themes[this.color]) {
        return this.$themes[this.color]
      }
      if (this.color) {
        return this.color
      }
      if (this.$themes && this.$themes[this.colorThemeDefault]) {
        return this.$themes[this.colorThemeDefault]
      }
      return this.colorDefault
    },
  },
}
