import { Factory } from 'rosie'
import { random } from 'faker'
import { membership as Membership } from '../../../src/api/db/models'

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
