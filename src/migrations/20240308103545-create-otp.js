'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Otps', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      otp: {
        type: Sequelize.STRING(6),
        allowNull: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      expire_time: {
        type: Sequelize.TIMESTAMP
      },
      created_at: {
        type: Sequelize.TIMESTAMP,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.TIMESTAMP,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('Otps', ['user_id'], {
      name: 'idx_otp_users_id'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Otps');
  }
};
