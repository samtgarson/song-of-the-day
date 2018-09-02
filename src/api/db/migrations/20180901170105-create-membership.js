module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Memberships', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID
      },
      userId: {
        type: Sequelize.UUID
      },
      teamId: {
        type: Sequelize.UUID
      },
      admin: {
        type: Sequelize.BOOLEAN
      },
      owner: {
        type: Sequelize.BOOLEAN
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

    queryInterface.addIndex('Memberships', {
      fields: ['userId', 'teamId'],
      unique: true,
      name: 'membershipUniqueIndex'
    })
  },
  down: queryInterface => queryInterface.dropTable('Memberships')
}
