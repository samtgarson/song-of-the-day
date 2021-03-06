import Vue from 'vue'
import { logError } from '@/plugins/global'
import MockComponents from './mock-vue-components'
import { reset } from '../db'

require('dotenv-safe').load({
  sample: 'config/.env.example',
  path: 'config/.env.test'
})

Vue.prototype.$logError = logError

MockComponents.forEach(MockComponent => Vue.component(MockComponent.name, MockComponent))

beforeEach(async () => {
  await reset()
})
