import { loadV2Script } from './util'

const getInvisibleVaptcha = config => () => {
  return new Promise((resolve, reject) => {
    var options = Object.assign(
      {
        type: 'invisible'
      },
      config
    )
    loadV2Script().then(() => {
      window.vaptcha(options).then(function(vaptchaObj) {
        resolve(vaptchaObj)
      })
    })
  })
}

export default getInvisibleVaptcha
