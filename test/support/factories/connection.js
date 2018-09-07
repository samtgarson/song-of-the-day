import { Factory } from 'rosie'
import { random, internet } from 'faker'
import { connection as Connection } from '../../../src/api/db/models'

export default new Factory(Connection)
  .attrs({
    id: () => random.uuid(),
    userId: () => random.uuid(),
    externalId: () => internet.userName(),
    refreshToken: () => random.uuid(),
    service: () => random.arrayElement(['slack', 'spotify'])
  })
