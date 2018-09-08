const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { user: User } = require('../db/models')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
}

const verify = async ({ id }, done) => {
  try {
    done(null, await User.findById(id))
  } catch (err) {
    done(err, false)
  }
}

passport.use(new Strategy(opts, verify))

module.exports = passport.authenticate('jwt', { session: false })
