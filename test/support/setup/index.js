import Vue from 'vue'
import '@/plugins/form'
import { logError } from '@/plugins/global'
import db from '@@/src/db'
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

afterAll(() => {
  db.close()
})
