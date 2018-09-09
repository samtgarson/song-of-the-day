<template>
  <form>
    <b-loading :active="isLoading" :is-full-page="false" />
    <h1 class="title">New Team</h1>
    <div class="team-field">
      <img :src="slackAttrs.image" />
      <b-field label="Slack Team">
        <b-input :value="slackAttrs.teamName" disabled/>
      </b-field>
    </div>
    <b-field label="Channel">
      <b-select 
        required 
        :loading="channelsLoading" 
        placeholder="Which channel should songs be posted?" 
        expanded>
        <option v-for="channel in channels" :key="channel.id">
          {{ channel.name }}
        </option>
      </b-select>
    </b-field>
    <base-button icon="arrow-right-circle" type="submit" loadable>Create Team</base-button>
  </form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapActions } = createNamespacedHelpers('connections')

export default {
  data () {
    return { channelsLoading: false, channels: [] }
  },
  mounted () {
    this.fetchSingle({ id: this.connectionId })
  },
  methods: {
    ...mapActions(['fetchSingle'])
  },
  computed: {
    ...mapGetters(['byId', 'isLoading']),
    connectionId () { return this.$route.query.connectionId },
    connection () { return this.byId(this.connectionId) || {} },
    slackAttrs () { return this.connection.serviceAttributes || {} }
  }
}
</script>

<style lang="scss" scoped>
form {
  max-width: 500px;
  margin: 0 auto;
}

.team-field {
  display: flex;
  margin-bottom: 0.75em;

  img {
    height: 70px;
    width: 70px;
    border-radius: 5px;
    margin-right: 10px;
  }

  .field {
    flex-grow: 1;
  }
}
</style>
