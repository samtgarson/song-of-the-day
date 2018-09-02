import { Factory } from 'rosie'
import { User } from '../../../src/api/db/models'
import { random, internet, name } from 'faker'

export default new Factory(User)
  .attrs({
    id: () => random.uuid(),
    name: () => name.findName(),
    picture: () => internet.avatar(),
    externalId: () => internet.userName(),
    service: 'spotify'
  })
