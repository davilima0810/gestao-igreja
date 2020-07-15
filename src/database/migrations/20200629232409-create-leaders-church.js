'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => { 
    return queryInterface.createTable('ministers', { 
      id:  {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      leader_id: {
        type: Sequelize.INTEGER,
        references: { model: 'leaders', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false
      },
      church_id: {
        type: Sequelize.INTEGER,
        references: { model: 'churches', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('ministers');
  }
};
