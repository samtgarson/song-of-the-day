module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    name: DataTypes.STRING,
    picture: DataTypes.STRING,
    token: DataTypes.VIRTUAL,
    service: {
      type: DataTypes.STRING,
      unique: 'userUniqueIndex'
    },
    externalId: {
      type: DataTypes.STRING,
      unique: 'userUniqueIndex'
    }
  }, {})

  User.associate = models => {
    User.belongsToMany(models.Team, { through: models.Membership, as: 'teams', foreignKey: 'userId' })
    User.hasMany(models.Membership, { as: 'memberships', foreignKey: 'userId' })
  }

  return User
}
