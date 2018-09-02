import { teamFactory, userFactory } from '../../support/factories'
import { Team, Membership } from '../../../src/api/db/models'
import Destroy from '../../../src/api/services/teams/destroy'

describe('Teams::Destroy', () => {
  let user
  let team

  beforeEach(async () => {
    user = await userFactory.build().save()
    team = await teamFactory.build().save()
    await user.addTeam(team)
  })

  describe('when the user is not an owner', () => {
    it('throws', async () => {
      const result = Destroy.run({ user, id: team.id })

      expect(result).rejects.toHaveProperty('message', 'Must be an owner to destroy a team')
      expect(result).rejects.toHaveProperty('statusCode', 403)
    })
  })

  describe('for an owner', () => {
    beforeEach(async () => {
      await Membership.update(
        { owner: true, admin: true },
        { where: { teamId: team.id, userId: user.id } }
      )
    })

    it('destroys the team', async () => {
      expect(await Team.count()).toEqual(1)

      await Destroy.run({ user, id: team.id })

      expect(await Team.count()).toEqual(0)
    })
  })
})
