# vue-vaptcha

> VAPTCHA plugin for Vue2

## install

### using npm

```shell
npm install vue-vaptcha
```

### Import in Browser

```html
<script src="/dist/vue-vaptcha.js"></script>
```

## usage

### Import
```javascript
import VueVaptcha from 'vue-vaptcha'
const options = {
    vid: "*****",
}
Vue.use(VueVaptcha(options))
```

### Using Component

```html
<template>
  <div>
    <Vaptcha ref="captcha" v-model="token"></Vaptcha>
    <button @click="$refs.captcha.vaptcha.reset">Reset</button>
  </div>
</template>

<script>
export default {
  data() {
    token: ''
  }
}
</script>
```

### Using Invisible Mode

```html
<template>
  <div>
    <button @click="captcha.validate()">login</button>
  </div>
</template>

<script>
export default {
  data() {
    captcha: null,
    token: ''
  },
  mounted() {
    this.$vaptcha.getInvisibleVaptcha()
    .then(obj => {
      obj.listen('pass', () => {
        this.token = obj.getToken()
        this.login()
      })
      this.captcha = obj
    })
  },
  methods: {
    async login() {
      const result = await api.login()
      if(result) {
        // TODO
      } else {
        //
        this.captcha.reset()
      }
    }
  }
}
</script>
```

### License

The MIT License (MIT). Please see [License File](https://github.com/mazhaolin/vue-vaptcha/blob/master/LICENSE.MD) for more information.
