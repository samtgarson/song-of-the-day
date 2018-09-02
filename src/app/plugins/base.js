import Vue from 'vue'
import { camelize, underscore } from 'inflect'

const requireComponent = require.context('../components/base', false, /vue$/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = camelize(underscore(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')))
  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})
