import userFactory from '../support/factories/user'

describe('User', () => {
  it('validates uniqueness per service', async () => {
    const externalId = 's'
    const a = await userFactory.build({ externalId })
    const b = await userFactory.build({ externalId })

    await a.save()
    await expect(b.save()).rejects.toMatchObject({ name: 'SequelizeUniqueConstraintError' })
  })
})
