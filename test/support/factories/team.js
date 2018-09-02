import { Factory } from 'rosie'
import { Team } from '../../../src/api/db/models'
import { random, commerce } from 'faker'

export default new Factory(Team)
  .attrs({
    id: () => random.uuid(),
    name: () => commerce.department(),
    slackAttributes: () => ({}),
    channelId: () => random.uuid()
  })
