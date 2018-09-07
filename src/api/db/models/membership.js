module.exports = (sequelize, DataTypes) => {
  const membership = sequelize.define('membership', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    userId: {
      type: DataTypes.UUID,
      unique: 'membershipUniqueIndex'
    },
    teamId: {
      type: DataTypes.UUID,
      unique: 'membershipUniqueIndex'
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    owner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    validate: {
      adminWhenOwner () {
        if (this.owner && !this.admin) throw new Error('Owners must be admins')
      }
    }
  })

  membership.associate = models => {
    membership.belongsTo(models.user)
    membership.belongsTo(models.team)
  }

  return membership
}
