import userFactory from '../support/factories/user'
import membershipFactory from '../support/factories/membership'
import teamFactory from '../support/factories/team'

describe('Membership', () => {
  let team
  let user

  beforeEach(async () => {
    user = userFactory.build()
    await user.save()

    team = teamFactory.build()
    await team.save()
  })

  it('validates uniqueness for a team and user', async () => {
    const membershipA = membershipFactory.build({}, { team, user })
    await membershipA.save()

    const membershipB = membershipFactory.build({}, { team, user })
    await expect(membershipB.save()).rejects.toMatchObject({ name: 'SequelizeUniqueConstraintError' })
  })

  it('validates admin if owner', async () => {
    const membership = membershipFactory.build(
      { admin: false, owner: true },
      { team, user }
    )

    await expect(membership.save()).rejects.toMatchObject({ name: 'SequelizeValidationError' })
  })
})
