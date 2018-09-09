import Slack from '../../../api/services/slack'

export const slackConfig = {
  clientID: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  callbackURL: '/auth/slack/callback',
  passReqToCallback: true,
  skipUserProfile: true
}

export const slackAuthorize = async (req, { redirect }) => {
  const { user, query: { code } } = req
  if (!user) return redirect('/teams')

  try {
    const { connection } = await Slack.run({ user, code })
    return redirect(`/teams/new?connectionId=${connection.id}`)
  } catch (err) {
    console.error(err)
    return redirect('/teams')
  }
}

export const slackScope = ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team', 'identity:read:user']
