import SlackAuth from '../../../api/services/slack'
import FindTeamByTeamId from '../../../api/services/teams/find-by-team-id'

const scopes = {
  identity: ['identity.team:read:user', 'identity:read:user'],
  furtherPermissions: ['chat:write', 'conversations:read', 'conversations:history', 'users:read']
}

export const slackConfig = (scopeKey = 'identity') => ({
  clientID: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  callbackURL: '/auth/slack/callback',
  passReqToCallback: true,
  skipUserProfile: true,
  singleChannel: true,
  scope: scopes[scopeKey]
})

export const slackAuthorize = async (req, { redirect }) => {
  const { user, query: { code } } = req
  if (!user) return redirect('/teams')

  try {
    const { connection } = await SlackAuth.run({ user, code })

    const { team: existingTeam, isMember } = await FindTeamByTeamId.run({
      teamId: connection.serviceAttributes.teamId
    })

    if (existingTeam) {
      if (isMember) return redirect(`/teams/${existingTeam.id}`)
      return redirect('/teams/already-exists')
    }

    const team = await connection.getTeam()
    if (team) return redirect(`/teams/${team.id}`)

    return redirect(`/teams/new?connectionId=${connection.id}`)
  } catch (err) {
    console.error(err)
    return redirect('/teams')
  }
}
