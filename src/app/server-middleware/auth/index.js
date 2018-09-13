import passport from 'passport'
import { Strategy as SpotifyStrategy } from 'passport-spotify'
import { Strategy as SlackStrategy } from '@mikestaub/passport-slack'
import Router from 'node-async-router'
import bodyParser from 'body-parser'
import session from 'express-session'
import LokiStore from 'connect-loki'
import AddJwt from '../../../api/services/auth/add-jwt'
import { user as User } from '../../../api/db/models'
import redirect from './redirect'
import { spotifyConfig, spotifyVerify, spotifyScope } from './spotify-config'
import { slackConfig, slackAuthorize } from './slack-config'

const router = new Router()
const Loki = LokiStore(session)

passport.serializeUser(({ id }, done) => {
  done(null, id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    if (!user) return done(null, user)

    await AddJwt.run({ user })
    return done(null, user)
  } catch (err) {
    return done(err, false)
  }
})

passport.use(new SpotifyStrategy(spotifyConfig, spotifyVerify))
passport.use(new SlackStrategy(slackConfig('identity'), () => {}))
passport.use('slack-again', new SlackStrategy(slackConfig('furtherPermissions'), () => {}))

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
  redirect
)

router.get(
  '/auth/spotify',
  passport.authenticate('spotify', { scope: spotifyScope })
)

router.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  (req, res) => {
    const redirectUrl = req.session.redirectTo || '/teams'
    return res.redirect(redirectUrl)
  }
)

router.get(
  '/auth/slack/callback',
  slackAuthorize
)

router.get(
  '/auth/slack',
  passport.authorize('slack')
)

router.get(
  '/auth/slack-permissions',
  passport.authorize('slack-again')
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
