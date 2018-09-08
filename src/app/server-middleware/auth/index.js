import passport from 'passport'
import { Strategy as SpotifyStrategy } from 'passport-spotify'
import Router from 'node-async-router'
import bodyParser from 'body-parser'
import session from 'express-session'
import LokiStore from 'connect-loki'
import { user as User } from '../../../api/db/models'
import redirect from './redirect'
import query from './query'
import { spotifyConfig, spotifyVerify } from './spotify-config'

const router = new Router()
const Loki = LokiStore(session)

passport.serializeUser(({ id }, done) => {
  done(null, id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(new SpotifyStrategy(spotifyConfig, spotifyVerify))

router.use(
  session({
    secret: process.env.SECRET_KEY,
    store: new Loki({}),
    saveUninitialized: true,
    resave: true
  }),
  bodyParser.json(),
  passport.initialize(),
  passport.session(),
  redirect,
  query
)

router.get(
  '/auth/spotify/callback',
  passport.authenticate(
    'spotify',
    { failureRedirect: '/' }
  ),
  (req, res) => {
    const redirectUrl = req.session.redirectTo || '/teams'
    return res.redirect(redirectUrl)
  }
)

router.get(
  '/auth/spotify',
  (req, res, next) => {
    req.session.redirectTo = req.query['redirect-url']
    next()
  },
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-recently-played', 'user-top-read']
  })
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
