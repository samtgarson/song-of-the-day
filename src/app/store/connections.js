import createCrudModule from 'vuex-crud'


export default {
  ...createCrudModule({
    resource: 'connections',
    only: [
      'FETCH_LIST',
      'FETCH_SINGLE'
    ]
  }),
  namespaced: true
}
