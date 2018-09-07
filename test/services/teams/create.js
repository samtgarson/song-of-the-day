import { teamFactory, userFactory } from '../../support/factories'
import { team as Team, membership as Membership } from '../../../src/api/db/models'
import Create from '../../../src/api/services/teams/create'

describe('Teams::Create', () => {
  let user
  let params
  let result

  beforeEach(async () => {
    user = await userFactory.build().save()
    params = teamFactory.attributes()
    delete params.id

    result = (await Create.run({ user, params })).model
  })

  it('creates a team', async () => {
    expect(result).toBeInstanceOf(Team)
  })

  it('associates the team with the user', async () => {
    const membership = await Membership.findOne({ where: { teamId: result.id, userId: user.id } })
    expect(membership).toBeTruthy()
  })

  it('creates the membership as admin and owner', async () => {
    const { admin, owner } = await Membership.findOne({
      where: { teamId: result.id, userId: user.id }
    })

    expect(owner).toBeTruthy()
    expect(admin).toBeTruthy()
  })
})
