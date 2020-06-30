'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'leaders',
      'church_id',
      {
        type: Sequelize.INTEGER,
        references: { model: 'church', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('leaders', 'church_id');
  }
};
