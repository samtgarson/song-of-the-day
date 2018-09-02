module.exports = (sequelize, DataTypes) => {
  const Membership = sequelize.define('Membership', {
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

  Membership.associate = models => {
    Membership.belongsTo(models.User, { as: 'user' })
    Membership.belongsTo(models.Team, { as: 'team' })
  }

  return Membership
}
