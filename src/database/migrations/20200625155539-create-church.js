'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('church', { 
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
      city: { 
        type: Sequelize.STRING,
        allowNull: false,
      },
      uf: { 
        type: Sequelize.STRING,
        allowNull: false,
      },  
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('church');
  }
};
