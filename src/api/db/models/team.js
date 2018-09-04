module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    name: DataTypes.STRING,
    slackAttributes: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    channelId: DataTypes.STRING
  }, {})

  Team.associate = models => {
    Team.belongsToMany(models.User, { through: models.Membership, as: 'users', foreignKey: 'teamId' })
    Team.hasMany(models.Membership, { as: 'memberships', foreignKey: 'teamId' })
  }
  return Team
}
