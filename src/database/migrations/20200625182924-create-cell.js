'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('cells', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: { 
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: { 
        type: Sequelize.STRING,
        allowNull: false,
      },
      uf: { 
        type: Sequelize.STRING,
        allowNull: false,
      },
      leader_id: {
        type: Sequelize.INTEGER,
        references: { model: 'leaders', key: 'id'},
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

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cells');
  }
};
