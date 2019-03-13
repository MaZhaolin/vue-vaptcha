import Vaptcha from './Vaptcha.vue'

import getInvisibleVaptcha from './getInvisibleVaptcha'

export default options => {
  return {
    install(Vue) {
      Vue.prototype.$vaptcha = {
        options,
        getInvisibleVaptcha: getInvisibleVaptcha(options)
      }
      Vue.component(Vaptcha.name, Vaptcha)
    }
  }
}
