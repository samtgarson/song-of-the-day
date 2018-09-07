module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    name: DataTypes.STRING,
    picture: DataTypes.STRING,
    token: DataTypes.VIRTUAL,
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      unique: true
    }
  }, {})

  user.associate = models => {
    user.belongsToMany(models.team, { through: models.membership })
    user.hasMany(models.membership)
    user.hasMany(models.connection)
  }

  return user
}
