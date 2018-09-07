import passport from 'passport'
import { Strategy as SpotifyStrategy } from 'passport-spotify'
import Router from 'node-async-router'
import bodyParser from 'body-parser'
import session from 'express-session'
import { user as User } from '../../../api/db/models'
import redirect from './redirect'
import query from './query'
import { spotifyConfig, spotifyVerify } from './spotify-config'

const router = new Router()

passport.serializeUser(({ id }, done) => {
  done(null, id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(new SpotifyStrategy(spotifyConfig, spotifyVerify))

router.use(session({ secret: process.env.SECRET_KEY, saveUninitialized: true, resave: true }))
router.use(bodyParser.json())
router.use(passport.initialize())
router.use(passport.session())
router.use(redirect)
router.use(query)

router.get(
  '/auth/spotify/callback',
  passport.authenticate(
    'spotify',
    { successRedirect: '/dashboard', failureRedirect: '/' }
  )
)

router.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-recently-played', 'user-top-read']
  })
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
