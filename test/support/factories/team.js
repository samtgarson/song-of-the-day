import { Factory } from 'rosie'
import { random, commerce } from 'faker'
import { team as Team } from '../../../src/api/db/models'

export default new Factory(Team)
  .attrs({
    id: () => random.uuid(),
    name: () => commerce.department(),
    slackAttributes: () => ({}),
    channelId: () => random.uuid()
  })
