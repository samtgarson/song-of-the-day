import autoprefixer from 'autoprefixer'
import { readdirSync } from 'fs'
import { resolve } from 'path'

const PRODUCTION = process.env.NODE_ENV === 'production'
if (!PRODUCTION) {
  require('dotenv-safe').load({
    sample: 'config/.env.example',
    path: 'config/.env'
  })
}

const plugins = readdirSync(resolve(__dirname, 'src/app/plugins')).map(f => {
  const [name] = f.split('.')
  return `@/plugins/${name}`
})

const serverMiddleware = [
  { path: '/api', handler: '@@/src/api/index' },
  '@/server-middleware/auth'
]
if (PRODUCTION) serverMiddleware.unshift('@/server-middleware/logger.js')

export default {
  build: {
    postcss: [
      autoprefixer()
    ]
  },
  css: [
    '@@/node_modules/normalize.css/normalize.css',
    '@/assets/sass/main.scss'

  ],
  head: {
    bodyAttrs: {
      class: ''
    }
  },
  loading: false,
  manifest: {
    theme_color: '#3B8070'
  },
  plugins,
  router: {
    linkActiveClass: 'is-active'
  },
  srcDir: 'src/app/',
  serverMiddleware,
  modules: [
    ['nuxt-buefy', { materialDesignIcons: false, css: false }]
  ]
}
