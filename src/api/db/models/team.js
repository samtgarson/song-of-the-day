module.exports = (sequelize, DataTypes) => {
  const team = sequelize.define('team', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    name: DataTypes.STRING,
    channelId: DataTypes.STRING
  }, {})

  team.associate = models => {
    team.belongsToMany(models.user, { through: models.membership })
    team.hasMany(models.membership)
  }
  return team
}
