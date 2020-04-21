export const loadV2Script = () => {
  if (typeof window.vaptcha === 'function') {
    //如果已经加载就直接放回
    return Promise.resolve()
  } else {
    return new Promise(resolve => {
      var script = document.createElement('script')
      script.src = 'https://v.vaptcha.com/v3.js'
      script.async = true
      script.onload = script.onreadystatechange = function() {
        if (
          !this.readyState ||
          this.readyState == 'loaded' ||
          this.readyState == 'complete'
        ) {
          resolve()
          script.onload = script.onreadystatechange = null
        }
      }
      document.getElementsByTagName('head')[0].appendChild(script)
    })
  }
}

export const optionsMerge = (target, source) => {
  Object.keys(source).map((val, i) => {
    target[val] = target[val] ? target[val] : source[val]
  })
}
