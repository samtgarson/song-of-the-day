import autoprefixer from 'autoprefixer'
import { readdirSync } from 'fs'
import { resolve } from 'path'
import Auth from './src/api/services/auth'

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
  { path: '/api', handler: '@@/src/api/index' }
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
  srcDir: 'src/app/',
  serverMiddleware,
  oauth: {
    sessionName: 'sotdSession',
    secretKey: process.env.SECRET_KEY, // used to sign encrypted cookie
    oauthHost: process.env.OAUTH_HOST,
    oauthClientID: process.env.OAUTH_CLIENT_ID,
    oauthClientSecret: process.env.OAUTH_CLIENT_SECRET,
    scopes: ['user-read-recently-played', 'user-top-read'],
    accessTokenPath: '/api/token',
    fetchUser: async token => {
      const { user } = await Auth.run({ token })
      return user
    },
    onLogout: () => {}
  },
  modules: [
    'nuxt-oauth',
    ['nuxt-buefy', { materialDesignIcons: false }]
  ]
}
