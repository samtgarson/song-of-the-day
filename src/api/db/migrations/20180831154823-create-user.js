module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      service: {
        type: Sequelize.STRING
      },
      externalId: {
        type: Sequelize.STRING
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

    queryInterface.addIndex('Users', {
      fields: ['service', 'externalId'],
      unique: true,
      name: 'userUniqueIndex'
    })
  },
  down: queryInterface => queryInterface.dropTable('Users')
}
