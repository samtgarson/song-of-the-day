const days = require('../../../helpers/days')
const states = require('../../../helpers/team-states')

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
    days: {
      type: Sequelize.ARRAY(Sequelize.ENUM(Object.values(days)))
    },
    state: {
      type: Sequelize.ENUM(Object.values(states)),
      defaultValue: states.PERMISSIONS_REQUIRED,
      allowNull: false
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
