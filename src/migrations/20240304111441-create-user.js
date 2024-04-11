'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING
      },
      middle_name: {
        type: Sequelize.STRING
      },
      middle_initial: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      salt: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
      },
      pincode: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      mobile_country_code: {
        type: Sequelize.STRING
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      is_licence_added: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      email_confirmation_token: {
        type: Sequelize.TEXT
      },
      email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      theme: {
        type: Sequelize.STRING
      },
      password_updated_at: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      created_by: {
        type: Sequelize.UUID
      },
      updated_by: {
        type: Sequelize.UUID
      },
      verified_by: {
        type: Sequelize.UUID
      },
      verified_at: {
        type: Sequelize.DATE
      },
      rejected_by: {
        type: Sequelize.UUID
      },
      rejected_at: {
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
