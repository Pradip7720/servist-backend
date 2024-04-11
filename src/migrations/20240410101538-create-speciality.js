'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('speciality_masters', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      speciality: {
        type: Sequelize.STRING(100), 
      allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });

    // Add any additional index or constraint definitions here if needed
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('speciality_masters');
  }
};
