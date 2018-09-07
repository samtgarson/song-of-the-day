import { Factory } from 'rosie'
import { random, internet, name } from 'faker'
import { user as User } from '../../../src/api/db/models'

export default new Factory(User)
  .attrs({
    id: () => random.uuid(),
    email: () => internet.email(),
    name: () => name.findName(),
    picture: () => internet.avatar()
  })
