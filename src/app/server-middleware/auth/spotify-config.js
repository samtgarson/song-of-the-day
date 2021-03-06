import Auth from '../../../api/services/auth'

export const spotifyConfig = {
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: '/auth/spotify/callback'
}

export const spotifyVerify = async (accessToken, refreshToken, expiresIn, profile, done) => {
  try {
    const { user } = await Auth.run({ profile, refreshToken, accessToken })
    done(null, user)
  } catch (err) {
    console.error(err)
    done(err)
  }
}

export const spotifyScope = ['user-read-email', 'user-read-recently-played', 'user-top-read']
