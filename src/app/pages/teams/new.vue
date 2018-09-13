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
    <b-field label="Days to post?">
      <div class="buttons has-addons">
        <base-button v-for="(val, name) in days" :key="name" @click="toggleDay(name)" :colour="val ? 'primary' : 'light'">{{ name | titleize }}</base-button>
      </div>
    </b-field>
    <b-field>
      <div class="buttons submit-button">
        <base-button icon="arrow-right-circle" type="submit" loadable @click="createTeam">Create Team</base-button>
        <base-button colour="light" exact :to="{ name: 'teams' }" loadable>Never Mind</base-button>
      </div>
    </b-field>
  </form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { titleize } from 'inflect'
import days from '../../../helpers/days'

const { mapGetters, mapActions, mapState } = createNamespacedHelpers('connections')

export default {
  middleware: 'authenticated',
  data () {
    return {
      days: {
        [days.SUN]: false,
        [days.MON]: true,
        [days.TUES]: true,
        [days.WEDS]: true,
        [days.THURS]: true,
        [days.FRI]: true,
        [days.SAT]: false
      }
    }
  },
  mounted () {
    this.fetchSingle({ id: this.connectionId })
  },
  methods: {
    ...mapActions(['fetchSingle']),
    toggleDay (name) {
      this.days[name] = !this.days[name]
    },
    async createTeam () {
      const data = {
        days: this.daysArray,
        name: this.slackAttrs.teamName,
        connectionId: this.connectionId
      }
      const { data: { id } } = await this.$store.dispatch('teams/create', { data })

      this.$router.push({ name: 'teams-id', params: { id } })
    }
  },
  filters: {
    titleize (str) { return titleize(str) }
  },
  watch: {
    fetchSingleError: {
      immediate: true,
      handler (err) {
        if (err) this.$router.replace('/teams')
      }
    }
  },
  computed: {
    ...mapGetters(['byId', 'isError', 'isLoading']),
    ...mapState(['fetchSingleError']),
    connectionId () { return this.$route.query.connectionId },
    connection () { return this.byId(this.connectionId) || {} },
    slackAttrs () { return this.connection.serviceAttributes || {} },
    daysArray () {
      return Object.keys(this.days).reduce((arr, day) => {
        if (this.days[day]) arr.push(day)
        return arr
      }, [])
    }
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

.submit-button {
  margin-top: 30px;
}
</style>
