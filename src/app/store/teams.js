import createCrudModule from 'vuex-crud'


export default {
  ...createCrudModule({
    resource: 'teams',
    only: [
      'FETCH_LIST',
      'FETCH_SINGLE',
      'CREATE',
      'DESTROY'
    ]
  }),
  namespaced: true
}
