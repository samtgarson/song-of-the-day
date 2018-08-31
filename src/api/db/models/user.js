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
    service: {
      type: DataTypes.STRING,
      unique: 'userUniqueIndex'
    },
    externalId: {
      type: DataTypes.STRING,
      unique: 'userUniqueIndex'
    }
  }, {})

  return User
}
