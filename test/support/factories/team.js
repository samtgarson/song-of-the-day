import { Factory } from 'rosie'
import { helpers, random, commerce } from 'faker'
import { team as Team } from '../../../src/api/db/models'
import days from '../../../src/helpers/days'

export default new Factory(Team)
  .attrs({
    id: () => random.uuid(),
    name: () => commerce.department(),
    slackAttributes: () => ({}),
    channelId: () => random.uuid(),
    days: () => helpers.shuffle(Object.values(days)).slice(0, 3)
  })
