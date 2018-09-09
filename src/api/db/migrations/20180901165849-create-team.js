module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('teams', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: Sequelize.UUID
    },
    name: {
      type: Sequelize.STRING
    },
    channelId: {
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
  }),
  down: queryInterface => queryInterface.dropTable('teams')
}
