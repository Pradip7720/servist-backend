'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('report_posts', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4, // Use the appropriate function to generate UUID in your database
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      post_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      reason: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('report_posts');
  }
};
