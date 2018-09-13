module.exports = (sequelize, DataTypes) => {
  const connection = sequelize.define('connection', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    teamId: {
      type: DataTypes.UUID
    },
    refreshToken: {
      type: DataTypes.STRING
    },
    accessToken: {
      type: DataTypes.STRING
    },
    service: {
      type: DataTypes.STRING,
      unique: 'connectionUniqueIndex'
    },
    externalId: {
      type: DataTypes.STRING,
      unique: 'connectionUniqueIndex'
    },
    serviceAttributes: {
      type: DataTypes.JSONB,
      defaultValue: {}
    }
  }, {})

  connection.associate = models => {
    connection.belongsTo(models.user)
    connection.belongsTo(models.team)
  }

  return connection
}
