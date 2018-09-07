export default {
  asyncData ({ store, redirect }) {
    if (store.state.user) return

    redirect('/')
  }
}
