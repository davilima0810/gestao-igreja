'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'leaders',
      'church_id',
      {
        type: Sequelize.INTEGER,
        references: { model: 'churches', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }
    )
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('leaders', 'church_id');
  }
};
