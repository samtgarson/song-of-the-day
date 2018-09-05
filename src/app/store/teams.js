import createCrudModule from 'vuex-crud'


export default {
  ...createCrudModule({
    resource: 'articles',
    only: [
      'FETCH_LIST',
      'FETCH_SINGLE',
      'CREATE',
      'DESTROY'
    ]
  }),
  namespaced: true
}
