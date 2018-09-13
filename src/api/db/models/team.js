const days = require('../../../helpers/days')
const states = require('../../../helpers/team-states')

module.exports = (sequelize, DataTypes) => {
  const team = sequelize.define('team', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    name: DataTypes.STRING,
    days: DataTypes.ARRAY(DataTypes.ENUM(Object.values(days))),
    channelId: DataTypes.STRING,
    state: {
      type: DataTypes.ENUM(Object.values(states)),
      defaultValue: states.PERMISSIONS_REQUIRED,
      allowNull: false
    }
  }, {
    validate: {
      doNotTransitionToPermissionsRequired () {
        if (this._previousDataValues.state === undefined) return
        if (this._previousDataValues.state === states.PERMISSIONS_REQUIRED) return
        if (this.state === states.PERMISSIONS_REQUIRED) throw new Error('Cannot transition back to PERMISSIONS_REQUIRED')
      }
    }
  })

  team.associate = models => {
    team.belongsToMany(models.user, { through: models.membership })
    team.hasMany(models.membership)
    team.hasOne(models.connection)
  }
  return team
}
