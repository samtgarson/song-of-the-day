import connectionFactory from '../support/factories/connection'

describe('Connection', () => {
  it('validates uniqueness per service', async () => {
    const externalId = 's'
    const params = { externalId, service: 'spotify' }
    await connectionFactory.build(params).save()

    const connectionB = await connectionFactory.build(params)
    await expect(connectionB.save()).rejects.toMatchObject({ name: 'SequelizeUniqueConstraintError' })
  })
})
