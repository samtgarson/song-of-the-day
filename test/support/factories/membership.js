import { Factory } from 'rosie'
import { Membership } from '../../../src/api/db/models'
import { random } from 'faker'

export default new Factory(Membership)
  .option('team')
  .option('user')
  .attrs({
    id: () => random.uuid(),
    owner: () => random.boolean()
  })
  .attr('admin', ['owner'], owner => owner ? true : random.boolean())
  .attr('teamId', ['team'], team => team.id)
  .attr('userId', ['user'], user => user.id)
