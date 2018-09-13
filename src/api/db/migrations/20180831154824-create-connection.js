module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('connections', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID
      },
      userId: Sequelize.UUID,
      service: {
        type: Sequelize.STRING
      },
      teamId: Sequelize.UUID,
      externalId: Sequelize.STRING,
      refreshToken: Sequelize.STRING,
      accessToken: Sequelize.STRING,
      serviceAttributes: {
        type: Sequelize.JSONB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    queryInterface.addIndex('connections', {
      fields: ['service', 'externalId'],
      unique: true,
      name: 'connectionUniqueIndex'
    })
  },
  down: queryInterface => queryInterface.dropTable('connections')
}
